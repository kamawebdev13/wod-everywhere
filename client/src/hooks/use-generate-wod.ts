import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { wodService } from '@/services/api';
import { type GenerateWodPayload } from '@/types/training'; // Importación absoluta

/**
 * Hook personalizado para gestionar la generación de WODs.
 * Sigue la nomenclatura camelCase y gestiona estados de carga y error.
 */
export const useGenerateWod = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getOptions = async (filters: GenerateWodPayload) => {
    setLoading(true);
    setError(null);
    
    try {
      // Llamada al servicio (POST /api/v1/wods/generate)
      const options = await wodService.generate(filters);
      
      /**
       * Navegamos a la nueva página 'generated-wods'.
       * Pasamos el array de 3 WODs en el 'state' de la navegación.
       */
      navigate('/generated-wods', { 
        state: { wods: options },
        replace: true // Opcional: evita que el usuario vuelva a "generar" al darle atrás
      });
      
    } catch (err) {
      // Manejo de error silencioso para el linter
      const message = err instanceof Error ? err.message : 'Error de conexión';
      setError(message);
      alert('Hubo un fallo al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return { getOptions, loading, error };
};