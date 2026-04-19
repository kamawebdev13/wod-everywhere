import { useState, useEffect, useCallback } from 'react';

/**
 * HOOK: useWorkoutTimer
 * Gestiona un temporizador descendente para las sesiones de entrenamiento.
 */
export const useWorkoutTimer = (initialSeconds: number) => {
    // Estado del tiempo restante en segundos (Punto 1: Integridad)
    const [seconds, setSeconds] = useState<number>(initialSeconds);
    
    // Control de ejecución del cronómetro
    const [isActive, setIsActive] = useState<boolean>(false);

    /**
     * EFECTO: Motor del temporizador.
     * Punto 2: Robustez - Se encarga de la creación y limpieza de intervalos
     * para evitar fugas de memoria (memory leaks).
     */
    useEffect(() => {
        let interval: ReturnType<typeof setInterval> | null = null;

        // Solo inicia el intervalo si está activo y queda tiempo
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                // Uso de callback para asegurar que trabajamos con el estado más reciente
                setSeconds((prev) => prev - 1);
            }, 1000);
        }

        // Función de limpieza: garantiza que el intervalo se detenga al desmontar
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds]);

    /**
     * Alterna el estado del temporizador (Play/Pause).
     * Se usa useCallback para evitar re-renderizados innecesarios en componentes hijos.
     */
    const toggleTimer = useCallback(() => setIsActive(prev => !prev), []);

    return { 
        seconds, 
        isActive, 
        toggleTimer 
    };
};