import { useState } from 'react';
import { wodService } from '@/services/api';
import { useNavigate } from 'react-router-dom';

export const useGenerateWod = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const getOptions = async (filters: { location: string; equipment: string[]; target: string }) => {
    setLoading(true);
    setError(null);
    try {
      const options = await wodService.generate(filters);
      // Navegamos a la pantalla de selección pasando los 3 WODs en el estado de la ruta
      navigate('/selection', { state: { wods: options } });
    } catch {
      setError('Hubo un fallo al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return { getOptions, loading, error };
};