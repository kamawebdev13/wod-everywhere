import { Menu, History, LogOut, Settings, X } from 'lucide-react';

interface NavbarProps {
  onMenuClick: () => void;
  onHistoryClick: () => void;
  isMenuOpen: boolean;
  onCloseMenu: () => void;
  onLogout: () => void;
}

export const Navbar = ({ 
  onMenuClick, 
  onHistoryClick, 
  isMenuOpen, 
  onCloseMenu, 
  onLogout 
}: NavbarProps) => {
  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-iron-100 sticky top-0 z-[100]">
      
      {/* Botón Hamburguesa */}
      <button 
        onClick={onMenuClick}
        className="text-iron-950 hover:opacity-70 transition-all p-1 z-50 cursor-pointer"
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú de configuración"}
      >
        {isMenuOpen ? <X size={26} /> : <Menu size={26} strokeWidth={2.5} />}
      </button>

      {/* Logo */}
      <div className="flex items-center tracking-tighter select-none">
        <span className="text-xl font-black text-iron-950">WOD</span>
        <span className="text-xl font-bold italic text-brand-red ml-0.5">everywhere</span>
      </div>

      {/* Historial */}
      <button 
        onClick={onHistoryClick}
        className="text-iron-950 hover:opacity-70 transition-opacity p-1 cursor-pointer"
        aria-label="Ver historial de entrenamientos"
      >
        <History size={26} strokeWidth={2} />
      </button>

      {/* DROPDOWN MENU */}
      {isMenuOpen && (
        <>
          {/* Overlay  */}
          <div 
            className="fixed inset-0 bg-black/10 z-80 backdrop-blur-[1px] animate-in fade-in duration-300" 
            onClick={onCloseMenu}
          />
          
          {/* Tarjeta del Menú - Z-index superior al overlay */}
          <div className="absolute top-[110%] left-6 w-60 bg-white border border-iron-100 rounded-2xl shadow-2xl z-[90] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="p-2.5">
              <button 
                className="w-full flex items-center gap-3 px-4 py-4 text-sm font-semibold text-iron-600 hover:bg-iron-50 rounded-xl transition-colors cursor-pointer"
                onClick={() => { /* Futura config */ onCloseMenu(); }}
              >
                <Settings size={18} />
                Configuración
              </button>
              
              <div className="h-px bg-iron-100 my-1.5 mx-2" />
              
              <button 
                className="w-full flex items-center gap-3 px-4 py-4 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                onClick={onLogout}
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
};