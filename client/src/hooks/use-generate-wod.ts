import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wodService } from '@/services/api';
import { type GenerateWodPayload } from '@/types/training';

/**
 * HOOK: useGenerateWod
 * Punto 3: Arquitectura - Encapsula la lógica de generación y navegación.
 */
export const useGenerateWod = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    /**
     * Solicita al backend la generación de WODs.
     */
    const getOptions = async (filters: GenerateWodPayload) => {
        setLoading(true);
        setError(null); // Limpiamos errores previos antes de cada intento
        
        try {
            // Punto 1: Integridad - Tipado estricto en el consumo del servicio
            const options = await wodService.generate(filters);
            
            // Navegación segura con transferencia de estado
            navigate('/generated-wods', { 
                state: { wods: options },
                replace: true 
            });
            
        } catch {
            /**
             * Punto 2: Robustez
             * Seteamos el mensaje de error en el estado reactivo.
             * La UI será la encargada de renderizar este mensaje de forma elegante.
             */
            setError('ENGINE_CONNECT_FAILURE: No se pudo conectar con el servicio de generación.');
        } finally {
            setLoading(false);
        }
    };

    return { 
        getOptions, 
        loading, 
        error 
    };
};