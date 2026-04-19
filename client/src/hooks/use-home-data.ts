import { useState, useEffect } from 'react';
import { workoutService } from '@/services/api';
import type { IWorkout, IUser } from '@/types';

export const useHomeData = () => {
    const [latestWorkout, setLatestWorkout] = useState<IWorkout | null>(null);
    const [loading, setLoading] = useState(true);

    // Obtenemos el usuario del storage una sola vez
    const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;

  
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
          /**
          * pide al backend todos los entrenamientos guardados.
          */
        const fetchLatest = async () => {
            try {
                const res = await workoutService.getAll();
                if (res && res.length > 0) {
                    setLatestWorkout(res[0]);
                }
            } catch (err) {
                // Usamos 'err' para extraer el mensaje y actualizar el estado
                const errorMessage = err instanceof Error ? err.message : 'Failed to load home data';
                setError(errorMessage);
                console.error('Home Data Error:', errorMessage); // Opcional, pero ayuda en debug
            } finally {
                setLoading(false);
            }
        };
        fetchLatest();
    }, []);

    return { latestWorkout, loading, user, error };
};