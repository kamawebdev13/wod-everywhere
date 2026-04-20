import { Trophy, TrendingUp } from 'lucide-react';
import FeatureCard from '@/components/common/feature-card';
import type { IUser } from '@/types';

/**
 * Componente ProfileStats
 * Ahora con lógica de barra de progreso dinámica.
 */
export const ProfileStats = ({ stats }: { stats: IUser['stats'] }) => {

    // 1. Lógica de la barra (Meta de 50 WODs)
    const GOAL = 50;
    const completed = stats?.wodsCompleted ?? 0;
    const percentage = Math.min(Math.round(((completed / GOAL) * 100) / 10) * 10, 100);
    // Diccionario de clases de ancho de Tailwind
    const widthClasses: Record<number, string> = {
        0: 'w-0', 10: 'w-[10%]', 20: 'w-[20%]', 30: 'w-[30%]', 40: 'w-[40%]',
        50: 'w-[50%]', 60: 'w-[60%]', 70: 'w-[70%]', 80: 'w-[80%]', 90: 'w-[90%]', 100: 'w-full'
    };

    return (
        <section className="px-6 grid grid-cols-1 gap-4">
            {/* Wods Completados con barra dinámica */}
            <FeatureCard title="Wods Completed" showBorder borderColor="border-red-800">
                <div className="text-5xl font-black text-zinc-950 leading-none mt-1 italic">
                    {completed}
                </div>
                <div className="w-full bg-gray-100 h-1.5 mt-5 rounded-full overflow-hidden">
                    {/* Barra porcentaje de wods completados */}
                    <div 
                        className={`bg-red-800 h-full transition-all duration-700 ease-out ${widthClasses[percentage] || 'w-0'}`} 
                    />
                </div>
            </FeatureCard>

            {/* Grid de Streak y PRs */}
            <div className="grid grid-cols-2 gap-4 text-left">
                <FeatureCard title="Current Streak">
                    <div className="flex items-center gap-2">
                        <Trophy size={18} className="text-red-800" />
                        <span className="text-3xl font-black text-zinc-950 italic">
                            {stats?.currentStreak ?? 0}
                        </span>
                    </div>
                </FeatureCard>

                <FeatureCard title="Personal Records">
                    <div className="flex items-center gap-2 text-left">
                        <TrendingUp size={18} className="text-red-800" />
                        <span className="text-3xl font-black text-zinc-950 italic">
                            {stats?.personalRecords ?? 0}
                        </span>
                    </div>
                    {/* Arreglado: Añadido ?. para evitar crash si stats es undefined */}
                    {(stats?.prsThisMonth ?? 0) > 0 && (
                        <p className="text-[9px] font-black text-red-800 uppercase mt-2 tracking-tighter">
                            ↗ +{stats?.prsThisMonth} THIS MONTH
                        </p>
                    )}
                </FeatureCard>
            </div>
        </section>
    );
};