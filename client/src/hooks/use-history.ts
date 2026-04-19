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
        setHistory(response);
      } catch (err) {
        // Capturamos el mensaje que viene del backend si existe
        const message = err instanceof Error ? err.message : 'COULD NOT RETRIEVE PERFORMANCE LOGS.';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return { history, isLoading, error };
};