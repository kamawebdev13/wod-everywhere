import { Menu, History } from 'lucide-react';

/**
 * Componente Navbar: Estructura de navegación superior.
 * Sigue la arquitectura de componentes Stateless de la rúbrica.
 */
interface NavbarProps {
  onMenuClick?: () => void;
  onHistoryClick?: () => void;
}

export const Navbar = ({ onMenuClick, onHistoryClick }: NavbarProps) => {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-iron-100 sticky top-0 z-50">
      
      {/* Icono de Menú: con el evento onClick para hacer llamado Sign Out */}
      <button 
        onClick={onMenuClick}
        className="text-iron-950 hover:opacity-70 transition-opacity p-1" 
        title="Open Menu"
      >
        <Menu size={26} strokeWidth={2.5} />
      </button>

      {/* Logo Central */}
      <div className="flex items-center tracking-tighter select-none">
        <span className="text-xl font-black text-iron-950">WOD</span>
        <span className="text-xl font-bold italic tracking-tighter text-brand-red ml-0.5">
          everywhere
        </span>
      </div>

      {/* Icono Historial: Ahora tiene el evento onClick para llamar el historial del usuario*/}
      <button 
        onClick={onHistoryClick}
        className="text-iron-950 hover:opacity-70 transition-opacity p-1" 
        title="View History"
      >
        <History size={26} strokeWidth={2} />
      </button>
    </header>
  );
};