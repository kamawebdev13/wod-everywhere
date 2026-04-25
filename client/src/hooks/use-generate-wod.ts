import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wodService } from '@/services/api';
import { type GenerateWodPayload } from '@/types/training';

/**
 * HOOK: useGenerateWod
 * Encapsula la lógica de petición al motor de generación de WODs.
 */
export const useGenerateWod = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    /**
     * Solicita al backend la generación de WODs basados en los filtros.
     * @param filters - Criterios de selección (location, equipment, target).
     */
    const getOptions = async (filters: GenerateWodPayload) => {
        setLoading(true);
        setError(null);
        
        try {
            // Punto 1: Efecto de carga UX y petición en paralelo
            // Añadimos un pequeño delay artificial para mejorar la sensación de "generación"
            const [options] = await Promise.all([
                wodService.generate(filters),
                new Promise(resolve => setTimeout(resolve, 1500))
            ]);
            
            if (!options || options.length === 0) {
                throw new Error('NO_WODS_AVAILABLE');
            }
            
            // Navegación hacia la pantalla de selección con el estado de los WODs
            navigate('/generated-wods', { 
                state: { wods: options },
                replace: true 
            });
            
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : 'GENERATION_FAILED';
            setError(`ENGINE_FAILURE: ${message}`);
            
            
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