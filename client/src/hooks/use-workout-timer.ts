import { useState, useEffect, useCallback } from 'react';

export const useWorkoutTimer = (initialSeconds: number) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        // Uso de argumento de función para evitar mutabilidad y asegurar valor real
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    // Implementación de función cleanup (Limpieza de intervalo)
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, seconds]);

  const toggleTimer = useCallback(() => setIsActive(prev => !prev), []);

  return { seconds, isActive, toggleTimer };
};