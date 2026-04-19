import { useState, useEffect } from 'react';
import { workoutService } from '@/services/api';
import type { IWorkout, IUser } from '@/types';

/**
 * HOOK: useHomeData
 * Orquesta la carga de información para la pantalla principal.
 * inyecta el perfil del usuario y recupera la última actividad del motor.
 */
export const useHomeData = () => {
    // Estado para el entrenamiento más reciente (Punto 1: Integridad)
    const [latestWorkout, setLatestWorkout] = useState<IWorkout | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Recuperación síncrona del usuario (Smart Logic)
    // Se inicializa con un objeto vacío tipado para evitar fallos de lectura
    const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;

    /**
     * EFECTO: Sincronización con el historial.
     * Punto 2: Robustez - Recupera todos los registros y selecciona el último.
     */
    useEffect(() => {
        const fetchLatest = async () => {
            try {
                setLoading(true);
                
                // Llamada al servicio que retorna el array directo (Clean API)
                const res = await workoutService.getAll();
                
                // Si hay datos, tomamos la primera posición (el más reciente)
                if (res && res.length > 0) {
                    setLatestWorkout(res[0]);
                }
            } catch {
                // Gestión de error genérica para evitar variables no usadas
                setError('Failed to load home data');
            } finally {
                setLoading(false);
            }
        };

        fetchLatest();
    }, []);

    return { 
        latestWorkout, 
        loading, 
        user, 
        error 
    };
};