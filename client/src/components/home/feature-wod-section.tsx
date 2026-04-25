import { type ReactElement } from 'react';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IWorkout } from '@/types';

/**
 * PROPS: FeaturedWodProps
 * Definición de datos para el componente de entrenamiento destacado.
 */
interface FeaturedWodProps {
    workout: IWorkout | null;
    loading: boolean;
    onStart: () => void;
}

/**
 * COMPONENTE: FeaturedWodSection
 * Muestra el último WOD realizado o una invitación a empezar si el usuario es nuevo.
 
 */
export const FeaturedWodSection = ({ 
    workout, 
    loading, 
    onStart 
}: FeaturedWodProps): ReactElement => {
    
    //  Deconstrucción segura para evitar errores de renderizado
    const wodTitle = workout?.wodId?.title || "NO RECENT WOD";
    const wodType = workout?.wodId?.type || "AMRAP 20";
    const wodEquipment = workout?.wodId?.equipment?.[0] || "BODYWEIGHT";

    return (
        <section className="px-6 -mt-4 mb-8">
            <div className="relative bg-white border-2 border-red-700 p-8 shadow-2xl overflow-hidden">
                <div className="absolute top-0 right-0 text-[180px] font-black text-gray-50 opacity-10 select-none leading-none -mr-10">
                    X
                </div>
                
                <div className="relative z-10 text-left">
                    <span className="inline-block bg-red-100 text-red-800 text-[10px] font-black px-3 py-1 uppercase tracking-tighter mb-6">
                        FEATURED WORKOUT
                    </span>
                    
                    <h2 className="text-6xl font-black text-black italic uppercase leading-none mb-10 tracking-tighter break-words overflow-hidden">
                        {loading ? "..." : wodTitle}
                    </h2>
                    
                    <div className="grid grid-cols-2 gap-8 mb-10">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TYPE</p>
                            <p className="text-lg font-black uppercase">{wodType}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EQUIPMENT</p>
                            <p className="text-lg font-black uppercase">{wodEquipment}</p>
                        </div>
                    </div>
                    
                    {/* CORRECCIÓN CRÍTICA:
                        Ahora el botón responde siempre, permitiendo que la lógica 
                        del padre (Home) decida si enviar a /explore o /selection.
                    */}
                    <Button
                        onClick={onStart}
                        disabled={loading} 
                        className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold py-8 rounded-none flex items-center justify-center gap-3 tracking-widest transition-all uppercase cursor-pointer active:scale-95"
                    >
                        START WORKOUT <Play size={16} fill="white" />
                    </Button>
                </div>
            </div>
        </section>
    );
};