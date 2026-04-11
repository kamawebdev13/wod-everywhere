const API_URL = import.meta.env.VITE_API_URL;

export const wodService = {
  /**
   * Envía los filtros y recibe las 3 opciones de WOD.
   */
  generate: async (params: { location: string; equipment: string[]; target: string }) => {
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${API_URL}/wods/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) throw new Error('Error al generar opciones de WOD');
    return response.json(); // Esto devuelve el array de 3 WODs
  }
};