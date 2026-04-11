import { Dumbbell, Compass, BarChart2, User } from 'lucide-react';

/**
 * Interfaz TabbarProps: Define qué necesita el componente para funcionar.
 * activeTab: Indica cuál de las 4 opciones debe iluminarse en rojo.
 * onNavigate: Función que se dispara al pulsar, permitiendo cambiar de página o cargar datos.
 */
interface TabbarProps {
  activeTab: 'workouts' | 'explore' | 'stats' | 'profile';
  onNavigate: (tab: 'workouts' | 'explore' | 'stats' | 'profile') => void;
}

export const Tabbar = ({ activeTab, onNavigate }: TabbarProps) => {
  
  /**
   * Paso 1: Definición de la estructura de navegación.
   * Creamos un array de objetos para evitar repetir código JSX 4 veces.
   * Esto facilita añadir nuevas secciones en el futuro.
   */
  const tabs = [
    { id: 'workouts', icon: Dumbbell, label: 'Workouts' },
    { id: 'explore',  icon: Compass,  label: 'Explore'  },
    { id: 'stats',    icon: BarChart2, label: 'Stats'    },
    { id: 'profile',  icon: User,      label: 'Profile'  }
  ];

  return (
    /**
     * Paso 2: Contenedor principal (Nav).
     */
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-iron-100 h-20 px-8 pb-4 flex items-center justify-between z-50">
      
      {/* Paso 3: Renderizado dinámico de los botones */}
      {tabs.map((tab) => (
        <button 
          key={tab.id}
          // Paso 4: Manejo del evento Click.
          // Llama a la función onNavigate pasando el ID de la pestaña pulsada.
          onClick={() => onNavigate(tab.id as 'workouts' | 'explore' | 'stats' | 'profile')}
          className="flex flex-col items-center gap-1 min-w-16 transition-all active:scale-95"
        >
          {/* Paso 5: El Icono.
              La lógica condicional cambia el color a rojo si el ID coincide con 'activeTab'.
          */}
          <tab.icon 
            size={24} 
            className={activeTab === tab.id ? 'text-red-700' : 'text-iron-400'} 
          />
          
          {/* Paso 6: Etiqueta de texto.
        
          */}
          <span className={`text-[10px] font-bold uppercase tracking-widest ${
            activeTab === tab.id ? 'text-red-700' : 'text-iron-400'
          }`}>
            {tab.label}
          </span>
        </button>
      ))}

    </nav>
  );
};