import { useState, useEffect } from 'react';
import { workoutService } from '@/services/api';
import type { IWorkout } from '@/types';

export const useHistory = () => {
  const [history, setHistory] = useState<IWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const response = await workoutService.getAll();
        setHistory(response.data);
      } catch{
        setError('COULD NOT RETRIEVE PERFORMANCE LOGS.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return { history, isLoading, error };
};