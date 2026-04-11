import { type ReactNode } from 'react';
import { Navbar } from './navbar';
import { Tabbar } from './tabbar';
import { useAuth } from '@/hooks/use-auth'; 
import { useNavigate, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * MainLayout: Orquestador para Web y Móvil.
 * Gestiona la navegación y la conexión lógica con el Backend.
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  const { logout} = useAuth(); // Extraemos el token para asegurar que las rutas están protegidas
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Lógica de Sincronización con el Backend:
   * Al navegar, podríamos disparar una precarga de datos si fuera necesario.
   */
  const handleNavigate = (tab: string) => {
    // Si el usuario cambia a una pestaña que requiere datos frescos, 
    // la navegación dispara el ciclo de vida de la página destino que usa tu 'request' fetch.
    navigate(`/${tab}`);
  };

  const handleLogout = () => {
    logout(); // Limpia localStorage y estado global
    navigate('/login');
  };

  return (
    // 'bg-ivory-50': Color de fondo de la marca para toda la app.
    <div className="min-h-screen bg-ivory-50 flex flex-col">
      
      {/* NAVBAR: Superior fija */}
      <Navbar 
        onMenuClick={handleLogout} 
        onHistoryClick={() => navigate('/history')} 
      />

      {/* CONTENEDOR DE CONTENIDO (ADAPTABLE)
          
      */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-28 pt-6 overflow-y-auto">
        {children}
      </main>

      {/* TABBAR: Inferior fija
          Aquí es donde el usuario siente la experiencia 'App'.
      */}
      <Tabbar 
        activeTab={location.pathname.split('/')[1] as 'workouts' | 'explore' | 'stats' | 'profile'} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
};