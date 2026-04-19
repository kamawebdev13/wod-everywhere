import { useState, useEffect } from 'react';
import { workoutService } from '@/services/api';
import type { IWorkout, IUser } from '@/types';

/**
 * HOOK: useProfile
 * Encargado del inyectado de datos del atleta y la sincronización del historial.
 */
export const useProfile = () => {
    // 1. INYECTADO DEL USUARIO (Integridad de Datos)
    // Recuperamos el perfil del atleta desde el storage local
    const [user] = useState<IUser>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : ({} as IUser);
    });

    // 2. ESTADOS DE SINCRONIZACIÓN
    const [workouts, setWorkouts] = useState<IWorkout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    /**
     * Sincroniza el historial de entrenamientos con el Backend.
     * Punto 2: Robustez - Maneja el nuevo formato de respuesta sin envoltorios extra.
     */
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                
                // LLAMADA AL SERVICIO: 
                const data = await workoutService.getAll();
                
                // Verificación de integridad para el array de workouts
                setWorkouts(Array.isArray(data) ? data : []);
                setHasError(false);
            } catch {
                // Gestión de errores mediante estado de UI 
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return {
        user,
        workouts,
        isLoading,
        hasError,
        // Propiedad calculada para saber si el perfil está incompleto
        isIdentityLoaded: !!user.name
    };
};