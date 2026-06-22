#!/usr/bin/env python3
"""
API Backend pour Coach Michel
Endpoints pour les données d'entraînement et de santé
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
import sqlite3
from datetime import datetime, timedelta
import json

app = Flask(__name__)
CORS(app)

DB_PATH = '/home/debian/uploads/strava_raw_streams.db'

def get_db_connection():
    """Crée une connexion à la base de données"""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

# ==================== ROUTES API ====================

@app.route('/api/health')
def health_check():
    """Vérifie que l'API est en ligne"""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Coach Michel API'
    })

@app.route('/api/fitness')
def get_fitness():
    """État de forme (CTL/ATL/TSB)"""
    try:
        conn = get_db_connection()
        
        # Récupérer le volume hebdo sur les 90 derniers jours
        cursor = conn.execute('''
            SELECT 
                strftime('%Y', start_date) as year,
                strftime('%W', start_date) as week,
                SUM(distance) / 1000.0 as km,
                SUM(elevation_gain) as dplus
            FROM activities
            WHERE start_date >= date('now', '-90 days')
            GROUP BY year, week
            ORDER BY year, week
        ''')
        
        weeks = []
        for row in cursor.fetchall():
            weeks.append({
                's': int(row['week']),
                'km': round(row['km'], 1),
                'dplus': round(row['dplus'] or 0, 0)
            })
        
        # Calculer CTL/ATL/TSB
        ctl = 0  # Charge d'entraînement long terme (moyenne 42 jours)
        atl = 0  # Charge d'entraînement court terme (moyenne 7 jours)
        tsb = 0  # Training Stress Balance (CTL - ATL)
        limit = 55  # Limite de charge hebdo
        week_load = 0
        history = []
        
        if weeks:
            # ATL = moyenne sur les 7 derniers jours (donc sur 1 semaine la plus récente)
            if len(weeks) >= 1:
                atl = sum(w['km'] for w in weeks[-1:]) / len(weeks[-1:])
            
            # CTL = moyenne sur les 6 dernières semaines
            if len(weeks) >= 6:
                ctl = sum(w['km'] for w in weeks[-6:]) / 6
            elif len(weeks) > 0:
                ctl = sum(w['km'] for w in weeks) / len(weeks)
            
            # TSB = CTL - ATL
            tsb = ctl - atl
            
            # Charge de la semaine courante
            week_load = weeks[-1]['km'] if weeks else 0
            
            # Historique pour le graphique
            current_ctl = ctl
            current_atl = atl
            for i, w in enumerate(weeks):
                history.append({
                    'ctl': current_ctl,
                    'atl': current_atl,
                    'tsb': current_ctl - current_atl,
                    'week': w['s']
                })
                # Simulation historique
                current_atl = (current_atl * 6 + w['km']) / 7
                current_ctl = (current_ctl * 41 + w['km']) / 42
        
        return jsonify({
            'ctl': round(ctl, 1),
            'atl': round(atl, 1),
            'tsb': round(tsb, 1),
            'limit': limit,
            'weekLoad': round(week_load, 1),
            'history': history
        })
    finally:
        conn.close()

@app.route('/api/weekly-volume')
def get_weekly_volume():
    """Volume hebdo sur l'année en cours"""
    try:
        conn = get_db_connection()
        
        cursor = conn.execute('''
            SELECT 
                strftime('%W', start_date) as week,
                SUM(distance) / 1000.0 as km,
                SUM(elevation_gain) as dplus
            FROM activities
            WHERE strftime('%Y', start_date) = strftime('%Y', 'now')
            GROUP BY week
            ORDER BY week
        ''')
        
        weeks = []
        for row in cursor.fetchall():
            weeks.append({
                's': int(row['week']),
                'km': round(row['km'], 1),
                'dplus': round(row['dplus'] or 0, 0)
            })
        
        return jsonify(weeks)
    finally:
        conn.close()

@app.route('/api/yearly-volume')
def get_yearly_volume():
    """Volume annuel"""
    try:
        conn = get_db_connection()
        
        cursor = conn.execute('''
            SELECT 
                strftime('%Y', start_date) as year,
                SUM(distance) / 1000.0 as km
            FROM activities
            GROUP BY year
            ORDER BY year
        ''')
        
        years = []
        vol = []
        for row in cursor.fetchall():
            years.append(row['year'])
            vol.append(round(row['km'], 1))
        
        return jsonify({'years': years, 'vol': vol})
    finally:
        conn.close()

@app.route('/api/workouts/recent')
def get_recent_workouts():
    """Dernières sorties"""
    try:
        conn = get_db_connection()
        
        cursor = conn.execute('''
            SELECT 
                start_date,
                name,
                distance,
                elapsed_time,
                elevation_gain,
                avg_heartrate,
                max_heartrate
            FROM activities
            ORDER BY start_date DESC
            LIMIT 10
        ''')
        
        workouts = cursor.fetchall()
        
        return jsonify([{
            'date': w['start_date'][:10],
            'name': w['name'],
            'dist': round(w['distance'], 2),
            'time': w['elapsed_time'],
            'dplus': round(w['elevation_gain'] or 0, 0),
            'fcavg': round(w['avg_heartrate'] or 0, 0),
            'fcmax': round(w['max_heartrate'] or 0, 0),
            'avgPace': round(w['elapsed_time'] / 60 / w['distance'], 1) if w['distance'] > 0 else 0,
            'hrZones': {'z1': 30, 'z2': 40, 'z3': 20, 'z4': 10, 'z5': 0}  # Placeholder
        } for w in workouts])
    finally:
        conn.close()

@app.route('/api/plan')
def get_plan():
    """Plan d'entraînement actuel"""
    # Plan statique pour l'instant
    return jsonify({
        'plan': [
            {'day': 'Lundi', 'name': 'Repos', 'done': True, 'type': 'rest', 'dist': 0, 'dur': 0, 'pace': '', 'zones': {'z1': 0, 'z2': 0, 'z3': 0, 'z4': 0, 'z5': 0}, 'desc': 'Repos complet'},
            {'day': 'Mardi', 'name': '8km facile', 'done': True, 'type': 'easy', 'dist': 8, 'dur': 45, 'pace': '5:30-6:00', 'zones': {'z1': 70, 'z2': 30, 'z3': 0, 'z4': 0, 'z5': 0}, 'desc': 'Récupération active, allure confortable'},
            {'day': 'Mercredi', 'name': '10km tempo', 'done': False, 'type': 'tempo', 'dist': 10, 'dur': 60, 'pace': '4:45-5:00', 'zones': {'z1': 10, 'z2': 20, 'z3': 50, 'z4': 20, 'z5': 0}, 'desc': '10km avec 4x2km @ 4:45/km, récup 400m jog'},
            {'day': 'Jeudi', 'name': 'Repos', 'done': False, 'type': 'rest', 'dist': 0, 'dur': 0, 'pace': '', 'zones': {'z1': 0, 'z2': 0, 'z3': 0, 'z4': 0, 'z5': 0}, 'desc': 'Repos complet'},
            {'day': 'Vendredi', 'name': '12km avec côte', 'done': False, 'type': 'hills', 'dist': 12, 'dur': 70, 'pace': '5:15-5:30', 'zones': {'z1': 20, 'z2': 30, 'z3': 30, 'z4': 20, 'z5': 0}, 'desc': '12km avec 6x500m côte, récup descente jog'},
            {'day': 'Samedi', 'name': 'Longue 16km', 'done': False, 'type': 'long', 'dist': 16, 'dur': 120, 'pace': '5:15-5:30', 'zones': {'z1': 40, 'z2': 40, 'z3': 15, 'z4': 5, 'z5': 0}, 'desc': 'Long run progressif, allure marathon sur les 8 derniers km'},
            {'day': 'Dimanche', 'name': 'Repos', 'done': False, 'type': 'rest', 'dist': 0, 'dur': 0, 'pace': '', 'zones': {'z1': 0, 'z2': 0, 'z3': 0, 'z4': 0, 'z5': 0}, 'desc': 'Repos complet'}
        ]
    })

@app.route('/api/fitness-projection')
def get_fitness_projection():
    """Projection de charge basée sur le plan"""
    try:
        conn = get_db_connection()
        
        # Récupérer l'historique de volume hebdo réel
        cursor = conn.execute('''
            SELECT 
                strftime('%Y', start_date) as year,
                strftime('%W', start_date) as week,
                SUM(distance) / 1000.0 as km,
                SUM(elevation_gain) as dplus
            FROM activities
            WHERE start_date >= date('now', '-90 days')
            GROUP BY year, week
            ORDER BY year, week
        ''')
        
        historical = []
        for row in cursor.fetchall():
            historical.append({
                's': int(row['week']),
                'km': round(row['km'], 1),
                'dplus': round(row['dplus'] or 0, 0)
            })
        
        # Plan actuel (7 jours)
        plan_distances = [0, 8, 10, 0, 12, 16, 0]  # Lundi-Dimanche
        planned_load = sum(plan_distances)  # 46 km/sem
        
        # Projections sur 4 semaines à venir
        projected = []
        for week in range(1, 5):
            week_load = planned_load * (1 + (week * 0.1))  # +10% par semaine
            projected.append({
                's': int(historical[-1]['s']) + week if historical else week,
                'km': round(week_load, 1),
                'dplus': round(week_load * 15, 0),  # Estimation D+ : 15m D+ par km
                'is_projection': True
            })
        
        # Fusionner historique et projection
        all_weeks = historical + projected
        
        # Calculer CTL/ATL historique
        real_ctl = 0
        real_atl = 0
        real_tsb = 0
        real_limit = 55
        real_week_load = 0
        
        if historical:
            last_week = historical[-1]
            real_week_load = last_week['km']
            
            if len(historical) >= 6:
                real_atl = sum(w['km'] for w in historical[-6:]) / 6
            if len(historical) >= 6:
                real_ctl = sum(w['km'] for w in historical) / len(historical)
            
            real_tsb = real_ctl - real_atl
            real_week_load = historical[-1]['km']
        
        # Projeter CTL/ATL sur les 4 prochaines semaines
        projection_history = []
        current_ctl = real_ctl
        current_atl = real_atl
        
        for week in all_weeks:
            if not week.get('is_projection'):
                projection_history.append({
                    'ctl': current_ctl,
                    'atl': current_atl,
                    'tsb': current_ctl - current_atl,
                    'week': week['s']
                })
            else:
                new_atl = (current_atl * 6 + week['km']) / 7
                new_ctl = (current_ctl * 41 + week['km']) / 42
                current_atl = new_atl
                current_ctl = new_ctl
                
                projection_history.append({
                    'ctl': current_ctl,
                    'atl': current_atl,
                    'tsb': current_ctl - current_atl,
                    'week': week['s'],
                    'is_projection': True
                })
        
        return jsonify({
            'ctl': round(real_ctl, 1),
            'atl': round(real_atl, 1),
            'tsb': round(real_tsb, 1),
            'limit': real_limit,
            'weekLoad': round(real_week_load, 1),
            'history': projection_history,
            'projected_weeks': projected
        })
    finally:
        conn.close()

# ==================== ROUTE FRONTEND (CATCH-ALL) ====================

@app.route('/')
@app.route('/<path:path>')
def serve_frontend(path=None):
    """Sert le frontend HTML"""
    if path:
        import os
        frontend_path = '/home/debian/coach-michel'
        file_path = os.path.join(frontend_path, path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            from flask import send_from_directory
            return send_from_directory(frontend_path, path)
    from flask import send_from_directory
    return send_from_directory('/home/debian/coach-michel', 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)