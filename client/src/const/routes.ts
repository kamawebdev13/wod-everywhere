/**
 * Diccionario centralizado de rutas.
 * Punto 3: Arquitectura - Mantiene la coherencia entre el Router y la navegación.
 */
export const ROUTES = {
  // --- Rutas Públicas ---
  LANDING: '/',
  LOGIN: '/login',
  REGISTER_STEP_ONE: '/register-step-1',
  REGISTER_STEP_TWO: '/register-step-2',
  
  // --- Rutas Privadas (Dashboard y Tab Bar) ---
  HOME: '/workouts',         // El Dashboard principal
  HISTORY: '/history',       // Historial de sesiones
  WORKOUT: '/workout/:id',   // Vista de un WOD específico
  PROFILE: '/profile',       // Perfil de usuario
  
  // --- Flujo de Generación y Motor (Nuevas) ---
  EXPLORE: '/explore',              // Configuración de filtros
  GENERATED_WODS: '/generated-wods', // Resultados del motor
  
  // --- Flujo de Entrenamiento Activo ---
  SELECTION: '/selection',   // Entrenamiento en curso (SelectionPage)
  SUMMARY: '/summary',       // Resumen final (ResumeWodPage)
  
  // --- Futuras pestañas ---
  STATS: '/stats',
  RESUME: '/resume'
} as const;

/**
 * Tipo útil para referenciar las rutas en interfaces de TypeScript.
 * Punto 1: Integridad - Asegura que solo se usen rutas definidas.
 */
export type AppRoutes = typeof ROUTES[keyof typeof ROUTES];