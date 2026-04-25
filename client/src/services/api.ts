import debug from 'debug';
import type { IAuthResponse, IWod, IWorkout, IRegisterRequest } from '@/types';

const log = debug('app:api');
const API_URL = import.meta.env.VITE_API_URL; // Base URL de la API obtenida del entorno (Vite)

/**
 * Función base centralizada. 
 * Añadimos <T> para que los servicios sepan qué reciben exactamente.
 */
const request = async <T>(endpoint: string, options?: RequestInit): Promise<T> => {
    // Recuperación del token para persistencia de sesión
    const token = localStorage.getItem("token");

    log('Iniciando petición a: %s', endpoint);

    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                // Inyección condicional del token de autorización
                ...(token && { Authorization: `Bearer ${token}` }),
                ...options?.headers,
            },
        });

        // Validación manual de la respuesta (fetch no lanza error en códigos 4xx o 5xx)
        if (!response.ok) {
            log('Error en la respuesta: %d %s', response.status, response.statusText);
            throw new Error(`Error ${response.status}`);
        }

        const data = await response.json();
        log('Petición exitosa para: %s', endpoint);
        return data;

    } catch (error) {
        log('Fallo en la conexión con la API: %O', error);
        throw error;
    }
};

// ─── SERVICIOS DE AUTENTICACIÓN (AUTH)──────────────────────────────────────────────
// Manejo de identidad, registro y persistencia local del estado de usuario
export const authService = {
    login: async (email: string, password: string): Promise<IAuthResponse> => {
        const data = await request<IAuthResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
        });
        // Persistencia del estado de autenticación en el cliente
        if (data.token) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            log('Token y usuario persistidos correctamente');
        }
        return data;
    },

    register: async (userData: IRegisterRequest): Promise<IAuthResponse> => {
    // Usamos IRegisterRequest para el envío y esperamos IAuthResponse
    return request<IAuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  /**
     * Obtiene el perfil completo del usuario autenticado.
     * El tipo IAuthResponse['user'] asegura que recibimos los datos del atleta.
     */
    getProfile: async (): Promise<IAuthResponse['user']> => {
        return request<IAuthResponse['user']>("/auth/profile");
    },

    /**
     * Actualiza datos del perfil (nombre, nivel, etc.)
     */
    updateProfile: async (updates: Partial<IAuthResponse['user']>): Promise<IAuthResponse['user']> => {
        return request<IAuthResponse['user']>("/auth/profile", {
            method: "PATCH",
            body: JSON.stringify(updates),
        });
    },

    logout: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        log('Sesión cerrada y localStorage limpio');
    },
};

// ─── SERVICIOS DE GENERACIÓN (WODs) ──────────────────────────────────────────
// Lógica de consulta al motor de generación de entrenamientos
export const wodService = {
  /**
   * Envía los filtros (lugar, equipo, objetivo) y recibe las 3 opciones.
   * Ahora usa POST y la función request que ya maneja el token.
   */
  generate: (params: { location: string; equipment: string[]; target: string }): Promise<IWod[]> =>
    request("/wods/generate", {
      method: "POST",
      body: JSON.stringify(params),
    }),
};
// ─── SERVICIOS DE ENTRENAMIENTOS (WORKOUTS) ──────────────────────────────────
// CRUD para la gestión de los entrenamientos guardados y sus resultados
export const workoutService = {
    // 1. Recibe el array directo
    getAll: (): Promise<IWorkout[]> => 
        request("/wods/saved"),

    // 2. Recibe el objeto guardado directo
    save: (data: { wodId: string; duration: string; score: string; notes?: string }): Promise<IWorkout> =>
        request("/wods/save", {
            method: "POST",
            body: JSON.stringify(data),
        }),

    // 3. Recibe el objeto actualizado directo
    update: (id: string, data: Partial<IWorkout>): Promise<IWorkout> =>
        request(`/wods/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        }),

    // 4. No recibe nada (204 No Content)
    delete: (id: string): Promise<void> =>
        request(`/wods/${id}`, {
            method: "DELETE"
        }),
};