import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/const/routes';
import debug from 'debug';

const log = debug('app:protected-route');

/**
 * Componente de Seguridad: ProtectedRoute
 * Punto 1: Robustez - Doble validación (Estado + Almacenamiento) para evitar redirecciones falsas.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  /**
   * 1. Bloqueo por Carga:
   * Si el AuthProvider está validando algo, mantenemos al usuario en espera.
   */
  if (isLoading) {
    log('Sincronizando estado de sesión...');
    return null; 
  }

  /**
   * 2. VALIDACIÓN DE EMERGENCIA (Anti-Bucle):
   * Si el estado dice que no está autenticado, comprobamos el localStorage físicamente.
   * Esto evita que la lentitud de React al actualizar el Context te bote al Login.
   */
  const hasToken = !!localStorage.getItem('token');
  const effectivelyAuthenticated = isAuthenticated || hasToken;

  if (!effectivelyAuthenticated) {
    log('Acceso denegado: No se detectó sesión activa. Redirigiendo a Login.');
    
    /**
     * Guardamos la ruta a la que intentaba ir el usuario para 
     * poder devolverlo allí después de que haga login.
     */
    return <Navigate to={ROUTES.LOGIN} state={{ from: location }} replace />;
  }

  log('Acceso concedido a: %s', location.pathname);
  
  // Si hay luz verde, renderizamos la página solicitada (Outlet)
  return <Outlet />;
};