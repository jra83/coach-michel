import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useMetrics = () => {
  const [metrics, setMetrics] = useState(null);
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const [summary, recent] = await Promise.all([
          api.getMetricsSummary(),
          api.getRecentWorkouts(),
        ]);
        setMetrics(summary);
        setWorkouts(recent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  return { metrics, workouts, loading, error };
};

export const useWithings = () => {
  const [withingsData, setWithingsData] = useState([]);
  const [correlation, setCorrelation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWithings = async () => {
      try {
        setLoading(true);
        const [metrics, corr] = await Promise.all([
          api.getWithingsMetrics(),
          api.getWithingsCorrelation(),
        ]);
        setWithingsData(metrics);
        setCorrelation(corr);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWithings();
  }, []);

  return { withingsData, correlation, loading, error };
};

export const usePlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        setLoading(true);
        const data = await api.getCurrentPlan();
        setPlan(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, []);

  return { plan, loading, error };
};