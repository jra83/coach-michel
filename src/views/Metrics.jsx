import React from 'react';
import { useMetrics } from '../hooks/useData';
import Card from '../components/UI/Card';
import Loader from '../components/UI/Loader';

const Metrics = () => {
  const { metrics, workouts, loading, error } = useMetrics();

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  return (
    <div className="pb-20">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Métriques</h2>

        {/* Statistiques clés */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <h3 className="text-sm text-gray-dark mb-1">Distance totale</h3>
            <p className="text-2xl font-bold">{metrics?.total_distance || 0} km</p>
          </Card>
          <Card>
            <h3 className="text-sm text-gray-dark mb-1">Temps total</h3>
            <p className="text-2xl font-bold">{metrics?.total_time_hours || 0} h</p>
          </Card>
          <Card>
            <h3 className="text-sm text-gray-dark mb-1">Dénivelé+</h3>
            <p className="text-2xl font-bold">{metrics?.total_elevation || 0} m</p>
          </Card>
          <Card>
            <h3 className="text-sm text-gray-dark mb-1">FC Moy</h3>
            <p className="text-2xl font-bold">{metrics?.avg_heart_rate || 0} bpm</p>
          </Card>
        </div>

        {/* Historique des sorties */}
        <h3 className="text-lg font-semibold mb-4">Historique des sorties</h3>
        <div className="space-y-3">
          {workouts.map((workout) => (
            <Card key={workout.id}>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-gray-darkest">
                    {new Date(workout.date).toLocaleDateString('fr-FR')} -{' '}
                    {workout.type === 'Run' ? 'Course' : 'Vélo'}
                  </p>
                  <p className="text-sm text-gray-dark">
                    {workout.distance.toFixed(2)} km - {Math.floor(workout.time / 60)}min
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-dark">FC: {workout.avg_hr.toFixed(0)} bpm</p>
                  {workout.elevation > 0 && (
                    <p className="text-sm text-gray-dark">D+: {workout.elevation.toFixed(0)} m</p>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Metrics;