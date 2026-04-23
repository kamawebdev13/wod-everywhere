import { Dumbbell, Compass, BarChart2, User } from 'lucide-react';

/**
 * TIPO: TabId
 * Coincide con las claves que definimos en el orquestador (MainLayout).
 */
export type TabId = 'workouts' | 'explore' | 'stats' | 'profile';

interface TabbarProps {
  activeTab: TabId;
  onNavigate: (tab: TabId) => void;
}

export const Tabbar = ({ activeTab, onNavigate }: TabbarProps) => {
  
  /**
   * Definición de pestañas.
   * El ID aquí debe coincidir con las llaves del mapeo en MainLayout.
   */
  const tabs = [
    { id: 'workouts' as TabId, icon: Dumbbell, label: 'Workouts', aria: 'Ir a entrenamientos' },
    { id: 'explore'  as TabId, icon: Compass,  label: 'Explore',  aria: 'Explorar nuevos WODs' },
    { id: 'stats'    as TabId, icon: BarChart2, label: 'Stats',    aria: 'Ver mis estadísticas' },
    { id: 'profile'  as TabId, icon: User,      label: 'Profile',  aria: 'Ver mi perfil' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-iron-100 h-20 px-8 pb-4 flex items-center justify-between z-50">
      
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        
        return (
          <button 
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className="flex flex-col items-center gap-1 min-w-16 transition-all active:scale-95 cursor-pointer"
            aria-label={tab.aria}
            aria-current={isActive ? 'page' : undefined}
          >
            <tab.icon 
              size={24} 
              className={isActive ? 'text-red-700' : 'text-iron-400'} 
              // Marcamos el icono como decorativo ya que el botón tiene su aria-label
              aria-hidden="true"
            />
            
            <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
              isActive ? 'text-red-700' : 'text-iron-400'
            }`}>
              {tab.label}
            </span>
            
            {/* Indicador visual opcional: un puntito rojo si está activo */}
            {isActive && (
              <div className="w-1 h-1 bg-red-700 rounded-full mt-0.5 animate-in zoom-in duration-300" />
            )}
          </button>
        );
      })}

    </nav>
  );
};

