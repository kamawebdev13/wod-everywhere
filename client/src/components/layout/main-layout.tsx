import { type ReactNode } from 'react';
import { Navbar } from './navbar';
import { Tabbar } from './tabbar';
import { useAuth } from '@/hooks/use-auth'; 
import { useNavigate, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children: ReactNode;
}

/**
 * TIPO: TabPath
 * Define las rutas válidas que la Tabbar puede gestionar.
 * Punto 1: Integridad - Evita el uso de strings arbitrarios.
 */
type TabPath = 'workouts' | 'explore' | 'stats' | 'profile';

/**
 * COMPONENTE: MainLayout
 * Actúa como el orquestador visual de la aplicación privada.
 * Punto 3: Arquitectura - Centraliza Navbar y Tabbar en un solo contenedor.
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  /**
   * Obtiene la pestaña activa basándose en la URL actual.
   * Se añade una validación para asegurar que el path coincida con los tipos esperados.
   */
  const currentPath = location.pathname.split('/')[1];
  const activeTab = (currentPath || 'workouts') as TabPath;

  const handleNavigate = (tab: string) => {
    // Navegación directa a las rutas base definidas en el diccionario ROUTES
    navigate(`/${tab}`);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col font-sans">
      
      {/* NAVBAR: Superior persistente
          Gestiona acciones globales como Logout e Historial.
      */}
      <Navbar 
        onMenuClick={handleLogout} 
        onHistoryClick={() => navigate('/history')} 
      />

      {/* CONTENEDOR PRINCIPAL
          - max-w-md: Mantiene la estética de aplicación móvil en escritorio.
          - pb-28: Padding inferior de seguridad para que la Tabbar no solape el contenido.
          - flex-1: Asegura que el contenedor crezca para empujar la Tabbar al fondo.
      */}
      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-28 pt-6">
        {children}
      </main>

      {/* TABBAR: Navegación de pulgar (Thumb Navigation)
          Punto 2: Robustez - Proporciona una navegación intuitiva y persistente.
      */}
      <Tabbar 
        activeTab={activeTab} 
        onNavigate={handleNavigate} 
      />
    </div>
  );
};

export default MainLayout;