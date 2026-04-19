import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWorkoutTimer } from '@/hooks/use-workout-timer';
import { type IWod } from '@/types/index';

/**
 * HOOK: useSelection
 * Orquesta la lógica de una sesión de entrenamiento activa.
 */
export const useSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Recuperación y tipado del WOD (Punto 1: Integridad)
    const state = location.state as { selectedWod: IWod } | null;
    const selectedWod = state?.selectedWod;

    // Redirección de seguridad si no hay datos de sesión
    useEffect(() => {
        if (!selectedWod) navigate('/explore');
    }, [selectedWod, navigate]);

    // Configuración del temporizador descendente
    const initialSeconds = (selectedWod?.duration || 20) * 60;
    const { seconds, isActive, toggleTimer } = useWorkoutTimer(initialSeconds);

    // Estados de UI agrupados para el seguimiento del WOD
    const [workoutUI, setWorkoutUI] = useState({
        completedExercises: [] as string[],
        expandedExercise: null as string | null,
    });

    /**
     * Alterna el estado de completado de un ejercicio.
     */
    const toggleComplete = useCallback((name: string) => {
        setWorkoutUI((prev) => ({
            ...prev,
            completedExercises: prev.completedExercises.includes(name)
                ? prev.completedExercises.filter((item) => item !== name)
                : [...prev.completedExercises, name],
        }));
    }, []);

    /**
     * Gestiona qué ejercicio muestra sus detalles (video/tutorial).
     */
    const handleExpand = useCallback((name: string) => {
        setWorkoutUI((prev) => ({
            ...prev,
            expandedExercise: prev.expandedExercise === name ? null : name,
        }));
    }, []);

    /**
     * Formatea segundos a string MM:SS para visualización.
     */
    const formatTime = (totalSeconds: number): string => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    /**
     * Finaliza la sesión calculando el tiempo invertido y navegando al resumen.
     */
    const handleFinish = () => {
        if (!selectedWod) return;
        
        const secondsElapsed = initialSeconds - seconds; 
        const finalTime = formatTime(secondsElapsed);

        navigate('/summary', {
            state: {
                selectedWod,
                timeSpent: finalTime,
                completedCount: workoutUI.completedExercises.length
            }
        });
    };

    return {
        selectedWod,
        initialSeconds,
        seconds,
        isActive,
        workoutUI,
        toggleTimer,
        toggleComplete,
        handleExpand,
        handleFinish,
        formatTime
    };
};