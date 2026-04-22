import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWorkoutTimer } from '@/hooks/use-workout-timer';
import { workoutService } from '@/services/api'; // Importamos el servicio de persistencia
import { type IWod } from '@/types/index';

/**
 * HOOK: useSelection
 * Orquesta la lógica de una sesión de entrenamiento activa y su persistencia final.
 */
export const useSelection = () => {
    const location = useLocation();
    const navigate = useNavigate();

    /**
     *  Recuperación segura del estado.
     * Se define la interfaz del estado de navegación para evitar el uso de 'any'.
     */
    const state = location.state as { selectedWod: IWod } | null;
    const selectedWod = state?.selectedWod;

    // Redirección de seguridad si el usuario accede a la URL sin haber pasado por la generación
    useEffect(() => {
        if (!selectedWod) navigate('/explore', { replace: true });
    }, [selectedWod, navigate]);

    // Configuración del tiempo inicial (basado en la duración del WOD o 20 min por defecto)
    const initialSeconds = (selectedWod?.duration || 20) * 60;
    const { seconds, isActive, toggleTimer } = useWorkoutTimer(initialSeconds);

    // Estado agrupado para la gestión de la interfaz y procesos de carga
    const [workoutUI, setWorkoutUI] = useState({
        completedExercises: [] as string[],
        expandedExercise: null as string | null,
        isSaving: false // Flag para controlar el estado de la petición a la API
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
     * Gestiona la expansión visual para mostrar tutoriales.
     */
    const handleExpand = useCallback((name: string) => {
        setWorkoutUI((prev) => ({
            ...prev,
            expandedExercise: prev.expandedExercise === name ? null : name,
        }));
    }, []);

    /**
     * Formatea segundos a MM:SS.
     */
    const formatTime = (totalSeconds: number): string => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    /**
     * 
     * Función asíncrona que utiliza servicios externos y deconstrucción.
     */
    const handleFinish = async () => {
        if (!selectedWod || workoutUI.isSaving) return;

        try {
            // Activamos estado de carga
            setWorkoutUI(prev => ({ ...prev, isSaving: true }));

            const secondsElapsed = initialSeconds - seconds;
            const finalTime = formatTime(secondsElapsed);

            /**
             * PERSISTENCIA: Se prepara el objeto según lo que espera el workoutService.save
             * de tu archivo api.ts.
             */
            const workoutData = {
                wodId: selectedWod._id,
                duration: finalTime,
                score: `${workoutUI.completedExercises.length}/${selectedWod.exercises.length}`,
                notes: "Entrenamiento completado exitosamente."
            };

            // Llamada real a la API 
            await workoutService.save(workoutData);

            // Navegación al resumen enviando los datos finales
            navigate('/summary', {
                state: {
                    selectedWod,
                    timeSpent: finalTime,
                    completedCount: workoutUI.completedExercises.length
                },
                replace: true // Evita que el usuario regrese al timer tras terminar
            });

        } catch (error) {
            console.error("Fallo al guardar el entrenamiento:", error);
        } finally {
            setWorkoutUI(prev => ({ ...prev, isSaving: false }));
        }
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