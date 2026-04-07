import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/const/routes';
import debug from 'debug';

const log = debug('app:protected-route');

/**
 * Componente de orden superior para proteger rutas privadas.
 * Si el usuario no está autenticado, lo redirige al login.
 */
export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    log('Acceso denegado: Redirigiendo a Login');
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  log('Acceso concedido a ruta protegida');
  
  // Outlet permite renderizar las rutas hijas definidas en App.tsx
  return <Outlet />;
};