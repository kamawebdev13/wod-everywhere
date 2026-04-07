import debug from 'debug';
import type { IAuthResponse, IWod, IWorkout } from '@/types';

const log = debug('app:api');
const API_URL = import.meta.env.VITE_API_URL; // Base URL de la API obtenida del entorno (Vite)

/**
 * Función base para realizar peticiones HTTP (fetch) centralizadas.
 * Gestiona automáticamente el token JWT y la serialización JSON.
 */
const request = async (endpoint: string, options?: RequestInit) => {
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
        const data = await request("/api/v1/auth/login", {
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

    register: async (userData: object) => {
        return request("/api/v1/auth/register", {
            method: "POST",
            body: JSON.stringify(userData),
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
    // Añadimos Promise<IWod[]> para que React sepa que recibe un array de WODs
    generate: (location: string, equipment: string, target: string): Promise<IWod[]> =>
        request(`/api/v1/wods/generate?location=${location}&equipment=${equipment}&target=${target}`),
};

// ─── SERVICIOS DE ENTRENAMIENTOS (WORKOUTS) ──────────────────────────────────
// CRUD para la gestión de los entrenamientos guardados y sus resultados
export const workoutService = {
    getAll: () => request("/api/v1/wods/saved"),

    save: (wodId: string) =>
        request("/api/v1/wods/save", {
            method: "POST",
            body: JSON.stringify({ wodId }),
        }),

    update: (id: string, data: Partial<IWorkout>): Promise<IWorkout> =>
        request(`/api/v1/wods/${id}`, {
            method: "PATCH",
            body: JSON.stringify(data),
        }),

    delete: (id: string): Promise<{ message: string }> =>
        request(`/api/v1/wods/${id}`, {
            method: "DELETE"
        }),
};