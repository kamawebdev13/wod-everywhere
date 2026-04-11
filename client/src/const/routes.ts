/**
 * Diccionario centralizado de rutas.
 */
export const ROUTES = {
  // --- Rutas Públicas ---
  LANDING: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // --- Rutas Privadas (Dashboard y Tab Bar) ---
  HOME: '/workouts',         // El Dashboard principal
  HISTORY: '/history',       // Tu ruta actual de historial
  WORKOUT: '/workout/:id',   // Vista de un WOD específico
  
  // --- Futuras pestañas de la Tab Bar ---
  EXPLORE: '/explore',
  STATS: '/stats',
  PROFILE: '/profile',
} as const;
// Tipo útil por si se necesita referenciar las rutas en otras interfaces
export type AppRoutes = typeof ROUTES[keyof typeof ROUTES];