import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/const/routes';
import debug from 'debug';

const log = debug('app:protected-route');
/**
 * Componente de orden superior para proteger rutas privadas.
 * Ahora maneja el estado de carga para evitar redirecciones falsas.
 */
export const ProtectedRoute = () => {
  // Extraemos isLoading para bloquear la ejecución hasta que el AuthProvider esté listo
  const { isAuthenticated, isLoading } = useAuth();

  /**
   * Mientras la aplicación está recuperando el token del localStorage,
   * no tomamos ninguna decisión de navegación.
   */
  if (isLoading) {
    log('Comprobando autenticación...');
    return null; // O un spinner de carga
  }

  if (!isAuthenticated) {
    log('Acceso denegado: Redirigiendo a Login');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  log('Acceso concedido a ruta protegida');
  
  // Si está autenticado y no está cargando, renderiza la ruta hija
  return <Outlet />;
};