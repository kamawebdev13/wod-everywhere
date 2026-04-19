import { useState } from 'react';
import { Navbar } from './navbar';
import { Tabbar } from './tabbar';
import { useAuth } from '@/hooks/use-auth'; 
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { ROUTES } from '@/const/routes';

/**
 * TIPO: TabPath
 * Define las claves válidas para la navegación de la Tabbar.
 */
type TabId = 'workouts' | 'explore' | 'stats' | 'profile';

export const MainLayout = () => {
  // Estado para controlar la visibilidad del Dropdown del Navbar
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Mapeo de IDs de la Tabbar a las rutas reales del diccionario ROUTES.
   * Esto asegura que la navegación sea 100% precisa.
   */
  const tabToRoute: Record<TabId, string> = {
    workouts: ROUTES.HOME,
    explore: ROUTES.EXPLORE,
    stats: ROUTES.STATS,
    profile: ROUTES.PROFILE
  };

  /**
   * Lógica para identificar qué pestaña debe estar activa según la URL.
   */
  const currentPath = location.pathname;
  const activeTab = (Object.keys(tabToRoute).find(
    key => tabToRoute[key as TabId] === currentPath
  ) || 'workouts') as TabId;

  const handleNavigate = (tabId: TabId) => {
    // Navegamos usando el diccionario centralizado
    navigate(tabToRoute[tabId]);
  };

  const handleLogout = () => {
    setIsMenuOpen(false); // Cerramos el menú antes de salir
    logout(); 
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans relative">
      
      {/* NAVBAR: Ahora recibe el estado y la función de toggle */}
      <Navbar 
        onMenuClick={() => setIsMenuOpen(!isMenuOpen)} 
        onHistoryClick={() => navigate(ROUTES.HISTORY)} 
        isMenuOpen={isMenuOpen}
        onCloseMenu={() => setIsMenuOpen(false)}
        onLogout={handleLogout}
      />

      {/* CONTENEDOR DINÁMICO
          Usamos Outlet para que React Router inyecte las páginas hijas aquí.
      */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-28 pt-6">
        <Outlet />
      </main>

      {/* TABBAR: Navegación sincronizada */}
      <Tabbar 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
};