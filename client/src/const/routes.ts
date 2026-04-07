/**
 * Diccionario centralizado de rutas de la aplicación.
 * Usamos 'as const' para que TypeScript trate los valores como literales inmutables.
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  HISTORY: '/history',
  WORKOUT: '/workout/:id', // Ruta dinámica para ver un entreno específico
} as const;

// Tipo útil por si necesitas referenciar las rutas en otras interfaces
export type AppRoutes = typeof ROUTES[keyof typeof ROUTES];