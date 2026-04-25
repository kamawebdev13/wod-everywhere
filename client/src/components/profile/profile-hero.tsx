import { User, Settings, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IUser } from '@/types';

/**
 * COMPONENTE: ProfileHero
 * Muestra la identidad del atleta. 
 * Se añade validación de arrays para evitar errores de renderizado.
 */
export const ProfileHero = ({ user }: { user: IUser }) => {
    
    // Manejador temporal para el botón de configuración
    const handleSettingsClick = (): void => {
        console.log('Configuración: Próximamente...');
        // Por ahora no navegamos para evitar el rebote al login
    };

    return (
        <section className="px-6 pt-12 pb-8 bg-white">
            <div className="flex justify-between items-start mb-6">
                <div className="relative">
                    {/* Contenedor del Avatar con estilo agresivo */}
                    <div className="w-24 h-24 bg-zinc-950 rounded-2xl flex items-center justify-center border-2 border-white shadow-xl text-white">
                        <User size={48} strokeWidth={1.5} />
                    </div>
                    {/* Badge de nivel (Rayo) */}
                    <div className="absolute -bottom-2 -right-2 bg-red-800 text-white p-1.5 rounded-lg shadow-lg">
                        <Zap size={16} fill="currentColor" />
                    </div>
                </div>

                {/* BOTÓN DE AJUSTES: Desconectado temporalmente */}
                <Button 
                    variant="ghost" 
                    onClick={handleSettingsClick}
                    className="flex items-center justify-center bg-gray-50 rounded-xl text-zinc-950 w-10 h-10 p-0"
                >
                    <Settings size={20} />
                </Button>
            </div>

            <div className="text-left">
                <h1 className="text-3xl font-black text-zinc-950 uppercase tracking-tighter italic">
                    {user.name || 'ATHLETE'}
                </h1>
                <p className="text-[12px] font-bold text-red-800 uppercase tracking-[0.2em] mt-1 italic">
                    {user.level || 'RECRUIT'} ENGINE
                </p>
            </div>
            
            {/* TAGS: Validamos que existan antes de mapear */}
            <div className="flex flex-wrap gap-2 mt-4">
                {user.tags && user.tags.length > 0 ? (
                    user.tags.map((tag: string) => (
                        <span 
                            key={tag} 
                            className="text-[9px] font-black bg-gray-100 text-gray-500 px-3 py-1.5 rounded-sm uppercase tracking-widest"
                        >
                            {tag}
                        </span>
                    ))
                ) : (
                    /* Tag por defecto si no hay etiquetas */
                    <span className="text-[9px] font-black bg-gray-50 text-gray-400 px-3 py-1.5 rounded-sm uppercase tracking-widest">
                        NO TAGS ASSIGNED
                    </span>
                )}
            </div>
        </section>
    );
};