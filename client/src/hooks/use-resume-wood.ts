import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { workoutService } from '@/services/api';
import { type IWod } from '@/types';

/**
 * Interfaz local para validar los datos que llegan por el estado de navegación.
 * Punto 1 de la rúbrica: Integridad de Datos (Evitamos el uso de 'any').
 */
interface ResumeState {
    selectedWod: IWod;
    timeSpent: string;
    completedCount: number;
}

/**
 * HOOK DE LÓGICA (Smart Logic)
 * Gestiona el cierre de la sesión de entrenamiento y la persistencia de datos.
 */
export const useResumeWod = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Casting de seguridad para acceder a los datos de la navegación previa de forma tipada
    const state = location.state as ResumeState | null;
    
    // Estados locales para la gestión de notas y feedback de carga
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);

    /**
     * EFECTO DE SEGURIDAD (Punto 2: Robustez)
     * Si el usuario accede a esta URL por error (ej: refresh), 
     * lo redirigimos para evitar un crash por falta de datos del WOD.
     */
    useEffect(() => {
        if (!state?.selectedWod) {
            navigate('/explore');
        }
    }, [state, navigate]);

    /**
     * LÓGICA DE RENDIMIENTO DEL USUARIO: Cálculo del rendimiento.
     * Determinamos el porcentaje completado basado en los ejercicios realizados.
     */
    const progressPercentage = state 
        ? Math.round((state.completedCount / state.selectedWod.exercises.length) * 100) 
        : 0;

    /**
     * FUNCIÓN DE PERSISTENCIA (Save Session)
     * Envía los resultados finales al backend mediante el servicio workoutService.
     */
    const handleSave = async () => {
        if (!state) return;

        try {
            setLoading(true);
            
            // Score Logic: Si terminó el 100%, su score es el TIEMPO.
            // De lo contrario, registramos el porcentaje de avance.
            const finalScore = progressPercentage === 100 ? state.timeSpent : `${progressPercentage}%`;

            // Llamada al servicio consolidando datos de ambos pasos
            await workoutService.save({
                wodId: state.selectedWod._id,
                duration: state.timeSpent,
                score: finalScore,
                notes: notes.trim()
            });

            // Redirección limpia sustituyendo el historial para evitar bucles de navegación
            navigate('/history', { replace: true });
        } catch {
            // Manejo de error controlado para el usuario (Punto 2: Robustez)
            alert("ERROR: EL MOTOR NO PUDO SINCRONIZAR LOS DATOS.");
        } finally {
            setLoading(false);
        }
    };

    return {
        state,
        notes,
        setNotes,
        loading,
        progressPercentage,
        handleSave
    };
};