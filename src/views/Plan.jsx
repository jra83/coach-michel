import React from 'react';
import { usePlan } from '../hooks/useData';
import Card from '../components/UI/Card';
import Loader from '../components/UI/Loader';

const Plan = () => {
  const { plan, loading, error } = usePlan();

  if (loading) return <Loader />;
  if (error) return <div className="p-4 text-red-500">Erreur: {error}</div>;

  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = {
    monday: 'Lundi',
    tuesday: 'Mardi',
    wednesday: 'Mercredi',
    thursday: 'Jeudi',
    friday: 'Vendredi',
    saturday: 'Samedi',
    sunday: 'Dimanche',
  };

  return (
    <div className="pb-20">
      <div className="max-w-md mx-auto p-4">
        <h2 className="text-2xl font-bold mb-2">{plan?.name}</h2>
        <p className="text-sm text-gray-dark mb-6">
          Semaine {plan?.current_week} sur {plan?.weeks} • Cible: {plan?.target_time}
        </p>

        <div className="space-y-3">
          {days.map((day) => {
            const session = plan?.weekly_schedule[day];
            return (
              <Card key={day}>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-darkest">{dayNames[day]}</p>
                    {session.duration > 0 ? (
                      <>
                        <p className="text-sm text-gray-dark">{session.type}</p>
                        <p className="text-sm text-gray-dark">
                          {session.distance} km • {session.duration} min
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-gray-dark">Repos</p>
                    )}
                  </div>
                  {session.duration > 0 && (
                    <div className="w-6 h-6 rounded-full border-2 border-primary flex items-center justify-center">
                      <span className="text-xs text-primary">○</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Plan;