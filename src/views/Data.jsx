import React from 'react';
import { useWithings } from '../hooks/useData';
import Card from '../components/UI/Card';
import Loader from '../components/UI/Loader';

const Data = () => {
  const { withingsData, correlation, loading, error } = useWithings();

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  const latestMeasure = withingsData[0];

  return (
    <div className="pb-20">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Données corporelles</h2>

        {/* Dernière mesure */}
        {latestMeasure && (
          <Card className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Dernière mesure</h3>
            <p className="text-sm text-gray-dark mb-4">
              {new Date(latestMeasure.date).toLocaleDateString('fr-FR')}
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-dark">Poids</p>
                <p className="text-xl font-bold text-gray-darkest">
                  {latestMeasure.weight} kg
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-dark">Graisse</p>
                <p className="text-xl font-bold text-gray-darkest">
                  {latestMeasure.fat}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-dark">Muscle</p>
                <p className="text-xl font-bold text-gray-darkest">
                  {latestMeasure.muscle}%
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-dark">Eau</p>
                <p className="text-xl font-bold text-gray-darkest">
                  {latestMeasure.water} kg
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Corrélation */}
        <h3 className="text-lg font-semibold mb-4">Corrélation avec l'entraînement</h3>
        <div className="space-y-3">
          {correlation.map((corr, index) => (
            <Card key={index}>
              <div className="mb-3">
                <p className="text-sm text-gray-dark">
                  {new Date(corr.date).toLocaleDateString('fr-FR')}
                </p>
                <div className="flex gap-4 mt-2">
                  <div>
                    <p className="text-xs text-gray-dark">Poids</p>
                    <p className="font-semibold">{corr.weight} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-dark">Graisse</p>
                    <p className="font-semibold">{corr.fat}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-dark">Muscle</p>
                    <p className="font-semibold">{corr.muscle}%</p>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-lighter pt-3">
                <p className="text-sm text-gray-dark mb-1">
                  {corr.workout_count} sorties • {corr.total_distance.toFixed(2)} km
                </p>
                <p className="text-sm text-gray-dark">
                  Score corrélation: <span className="font-semibold">{corr.correlation_score}/100</span>
                </p>
                {corr.workout_count > 0 && corr.correlation_score > 50 && (
                  <p className="text-sm text-green-600 mt-2">
                    ✅ Bonne corrélation entre entraînement et progression
                  </p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Data;