import React from 'react';
import Card from '../components/UI/Card';

const Summaries = () => {
  return (
    <div className="pb-20">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-6">Résumés analytiques</h2>

        {/* Performance */}
        <Card className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Performance</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-dark">Progression distance</span>
              <span className="text-sm font-semibold text-green-600">+12%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-dark">Progression allure</span>
              <span className="text-sm font-semibold text-green-600">-3%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-dark">Progression FC</span>
              <span className="text-sm font-semibold text-gray-dark">Stable</span>
            </div>
          </div>
        </Card>

        {/* Recommandations */}
        <Card>
          <h3 className="text-lg font-semibold mb-4">Recommandations</h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg">
              <p className="text-sm font-semibold text-green-800 mb-1">✓ Bonnes performances</p>
              <p className="text-sm text-gray-dark">
                Vos performances sont en hausse depuis 2 semaines. Continuez à suivre votre plan actuel.
              </p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-blue-800 mb-1">ℹ️ Conseil</p>
              <p className="text-sm text-gray-dark">
                Augmentez progressivement votre volume d'entraînement pour éviter les blessures.
              </p>
            </div>
            <div className="p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm font-semibold text-yellow-800 mb-1">⚠️ Attention</p>
              <p className="text-sm text-gray-dark">
                Surveillez votre niveau de fatigue. Si vous ressentez une fatigue excessive, prévoyez une journée de repos supplémentaire.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Summaries;