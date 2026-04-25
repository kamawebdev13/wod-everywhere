import { type ReactElement } from 'react';
import { Menu, History, LogOut, Settings, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * INTERFAZ: NavbarProps
 * Define las acciones y estados del encabezado global.
 */
interface NavbarProps {
    onMenuClick: () => void;
    onHistoryClick: () => void;
    isMenuOpen: boolean;
    onCloseMenu: () => void;
    onLogout: () => void;
}

/**
 * COMPONENTE: Navbar
 * Encabezado persistente con sistema de navegación rápida y menú de configuración.
 * 
 */
export const Navbar = ({
    onMenuClick,
    onHistoryClick,
    isMenuOpen,
    onCloseMenu,
    onLogout
}: NavbarProps): ReactElement => {

    const navigate = useNavigate();

    return (
        <header className="w-full h-16 flex items-center justify-between px-6 bg-white border-b border-zinc-100 sticky top-0 z-[100]">

            {/* ACCIÓN: Toggle Menú Configuración */}
            <button
                onClick={onMenuClick}
                className="text-zinc-950 hover:opacity-70 transition-all p-1 z-50 cursor-pointer"
                aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú de configuración"}
            >
                {isMenuOpen ? <X size={26} /> : <Menu size={26} strokeWidth={2.5} />}
            </button>

            {/* IDENTIDAD: Logo de la App (Strings directos sin interpolación) */}
            <div className="flex items-center tracking-tighter select-none">
                <span className="text-xl font-black text-zinc-950">WOD</span>
                <span className="text-xl font-bold italic text-red-600 ml-0.5">everywhere</span>
            </div>

            {/* ACCIÓN: Navegación al Historial */}
            <button
                onClick={onHistoryClick}
                className="text-zinc-950 hover:opacity-70 transition-opacity p-1 cursor-pointer"
                aria-label="Ver historial de entrenamientos"
            >
                <History size={26} strokeWidth={2} />
            </button>

            {/* DROPDOWN MENU: Renderizado condicional eficiente */}
            {isMenuOpen && (
                <>
                    {/* OVERLAY: Fondo para cerrar el menú al hacer clic fuera */}
                    <div
                        className="fixed inset-0 bg-black/5 z-80 backdrop-blur-[1px] animate-in fade-in duration-300"
                        onClick={onCloseMenu}
                    />

                    {/* PANEL DE OPCIONES: Posicionamiento absoluto relativo al header */}
                    <div className="absolute top-[110%] left-6 w-60 bg-white border border-zinc-100 rounded-2xl shadow-2xl z-[90] overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                        <div className="p-2.5">

                            {/* Opción: Configuración */}
                            <button
                                className="w-full flex items-center gap-3 px-4 py-4 text-sm font-semibold text-zinc-600 hover:bg-zinc-50 rounded-xl transition-colors cursor-pointer outline-none group"
                                onClick={() => {
                                    navigate('/settings-page');
                                    onCloseMenu();         // Cierra el menú lateral
                                }}
                            >
                                <Settings size={18} className="group-hover:rotate-45 transition-transform duration-300" />
                                Configuración
                            </button>

                            {/* Separador visual */}
                            <div className="h-px bg-zinc-100 my-1.5 mx-2" />

                            {/* Opción: Logout */}
                            <button
                                className="w-full flex items-center gap-3 px-4 py-4 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer outline-none"
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