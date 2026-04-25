import { type ReactElement } from 'react';
import { ChevronRight } from 'lucide-react';

interface SettingsTileProps {
    label: string;
    value?: string;
    icon: ReactElement;
    onClick?: () => void;
}

/**
 * COMPONENTE: SettingsTile
 * Fila estandarizada para opciones de configuración.
 */
export const SettingsTile = ({ label, value, icon, onClick }: SettingsTileProps): ReactElement => (
    <button 
        onClick={onClick}
        disabled={!onClick}
        className={`w-full flex items-center justify-between py-4 border-b border-zinc-100 transition-colors ${onClick ? 'hover:bg-zinc-50 cursor-pointer group' : 'cursor-default'}`}
    >
        <div className="flex items-center gap-4">
            <div className="text-zinc-400">
                {icon}
            </div>
            <span className="font-bold uppercase italic text-zinc-950">{label}</span>
        </div>
        
        <div className="flex items-center gap-2">
            {value && <span className="text-zinc-500 font-medium">{value}</span>}
            {onClick && (
                <ChevronRight size={16} className="text-zinc-300 group-hover:translate-x-1 transition-transform" />
            )}
        </div>
    </button>
);