import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { workoutService } from '@/services/api';
import { type IWod } from '@/types';

/**
 * Interfaz local para validar los datos que llegan por el estado de navegación.
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
    
    // Casting de seguridad para acceder a los datos de la navegación previa
    const state = location.state as ResumeState | null;
    
    // Estados locales para la gestión de notas y feedback de carga/error
    const [notes, setNotes] = useState('');
    const [loading, setLoading] = useState(false);
    
    /**
     * Punto 2: Robustez - Sustituimos el 'alert' por un estado de error
     * que la interfaz puede consumir para mostrar feedback visual no bloqueante.
     */
    const [syncError, setSyncError] = useState<string | null>(null);

    /**
     * EFECTO DE SEGURIDAD
     * Redirección si se pierde el contexto de navegación (ej: refrescar página).
     */
    useEffect(() => {
        if (!state?.selectedWod) {
            navigate('/explore');
        }
    }, [state, navigate]);

    /**
     * LÓGICA DE RENDIMIENTO: Cálculo basado en ejercicios completados.
     */
    const progressPercentage = state 
        ? Math.round((state.completedCount / state.selectedWod.exercises.length) * 100) 
        : 0;

    /**
     * FUNCIÓN DE PERSISTENCIA (Save Session)
     * Desactiva el alert y gestiona el error mediante estado reactivo.
     */
    const handleSave = async () => {
        if (!state) return;

        try {
            setLoading(true);
            setSyncError(null); // Reseteamos errores previos
            
            const finalScore = progressPercentage === 100 ? state.timeSpent : `${progressPercentage}%`;

            // Intento de persistencia en el backend
            await workoutService.save({
                wodId: state.selectedWod._id,
                duration: state.timeSpent,
                score: finalScore,
                notes: notes.trim()
            });

            // Navegación tras éxito
            navigate('/history', { replace: true });
        } catch {
            /**
             * Punto 2: Robustez - Feedback profesional.
             * Seteamos el error en el estado en lugar de usar alerts bloqueantes.
             */
            setSyncError("ENGINE_SYNC_FAILURE: No se pudo sincronizar la sesión.");
        } finally {
            setLoading(false);
        }
    };

    return {
        state,
        notes,
        setNotes,
        loading,
        syncError, // Exportamos el error para la UI
        progressPercentage,
        handleSave
    };
};