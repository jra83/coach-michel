# Coach Michel - Frontend

Interface web complète pour Coach Michel, connectée à la base de données SQLite Strava.

## Architecture

- **Frontend** : `/home/debian/coach-michel/index.html` (single-page app avec JavaScript inline)
- **API** : `/home/debian/coach_michel/coach_michel_api.py` (Flask, port 5000)
- **Base de données** : `/home/debian/uploads/strava_raw_streams.db` (SQLite Strava activities)
- **HTTP server** : Python http.server (port 3000)

## Services

### Frontend
```bash
cd /home/debian/coach-michel
python3 -m http.server 3000 --bind 0.0.0.0
```

Accès : http://51.210.242.179:3000/

### API
```bash
sudo systemctl restart coach-michel.service
```

Accès API : http://51.210.242.179:5000/

## Endpoints API

| Endpoint | Description | Données |
|----------|-------------|---------|
| `/api/health` | Health check | Service status |
| `/api/fitness` | État de forme (CTL/ATL/TSB) | Calculé depuis volume hebdo |
| `/api/weekly-volume` | Volume hebdomadaire 2026 | SQLite `activities` |
| `/api/yearly-volume` | Volume annuel | SQLite `activities` |
| `/api/workouts/recent` | Dernières sorties | SQLite `activities` |
| `/api/plan` | Plan d'entraînement | Statique pour l'instant |

## Sections Frontend

1. **Dashboard** : État de forme, volume hebdo, dernières sorties
2. **Métriques & Dérives** : Évolution vitesse, dérive cardiaque
3. **Plan** : Plan d'entraînement hebdomadaire
4. **Données corporelles** : Poids, graisse, muscle (placeholder)
5. **Chat Coach** : Interface chat avec Coach Michel

## Structure des données

### Frontend (`const D`)
```javascript
{
  years: [],        // Années
  vol: [],          // Volume annuel (km)
  weeks: [],        // Volume hebdo (s, km, dplus)
  workouts: [],     // Dernières sorties
  plan: [],         // Plan d'entraînement
  body: [],         // Données corporelles (placeholder)
  paceEvolution: [], // Évolution vitesse (placeholder)
  hrDrift: [],      // Dérive cardiaque (placeholder)
  fitness: {        // État de forme
    ctl: 0,
    atl: 0,
    tsb: 0,
    limit: 55,
    weekLoad: 0,
    history: []     // Évolution 12 semaines
  }
}
```

### Chargement des données
1. `loadData()` fetch les données depuis l'API
2. `renderAll()` re-rend tous les graphiques
3. Fonctions protégées contre les données vides

## Déploiement

```bash
# Redémarrer l'API
sudo systemctl restart coach-michel.service

# Vérifier le statut
sudo systemctl status coach-michel.service

# Logs API
journalctl -u coach-michel.service -f
```

## GitHub

Dépôt : https://github.com/jra83/coach-michel

Branch : `master`

## TODO

- Connecter les données Withings (poids, graisse, muscle)
- Connecter l'évolution vitesse par zone FC
- Connecter la dérive cardiaque
- Générer le plan d'entraînement dynamiquement via Coach Michel
- Ajouter les tests de régression
- Optimiser les calculs CTL/ATL/TSB (exponentielle réelle)