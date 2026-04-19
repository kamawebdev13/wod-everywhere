import { useState, useEffect } from 'react';
import { workoutService } from '@/services/api';
import type { IWorkout } from '@/types';

/**
 * HOOK: useHistory
 * Gestiona la recuperación del historial completo de entrenamientos del atleta.
 * Centraliza el estado de carga y la captura de errores de red.
 */
export const useHistory = () => {
    // Estado para la colección de entrenamientos (Punto 1: Integridad)
    const [history, setHistory] = useState<IWorkout[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * EFECTO: Sincronización con el log de rendimiento.
     * Punto 2: Robustez - Recupera los datos y gestiona el feedback de error en la UI.
     */
    useEffect(() => {
        const fetchHistory = async () => {
            try {
                setIsLoading(true);
                // Llamada al servicio: El backend retorna el array directo tipado
                const response = await workoutService.getAll();
                
                // Aseguramos integridad: si no hay respuesta, inicializamos array vacío
                setHistory(response || []);
            } catch {
                // Mensaje de error corporativo alineado con la estética de la app
                setError('COULD NOT RETRIEVE PERFORMANCE LOGS.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return { 
        history, 
        isLoading, 
        error 
    };
};