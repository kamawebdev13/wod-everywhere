import { Trophy, TrendingUp } from 'lucide-react';
import FeatureCard from '@/components/common/feature-card';
import type { IUser } from '@/types';

/**
 * Componente Stateless: ProfileStats
 * Muestra las métricas de rendimiento extraídas del perfil del atleta.
 */
export const ProfileStats = ({ stats }: { stats: IUser['stats'] }) => (
    <section className="px-6 grid grid-cols-1 gap-4">
        {/* Wods Completados con barra de progreso */}
        <FeatureCard title="Wods Completed" showBorder borderColor="border-red-800">
            <div className="text-5xl font-black text-zinc-950 leading-none mt-1 italic">
                {stats.wodsCompleted}
            </div>
            <div className="w-full bg-gray-100 h-1.5 mt-5 rounded-full overflow-hidden">
                <div className="bg-red-800 h-full w-[65%]" />
            </div>
        </FeatureCard>

        {/* Grid de Streak y PRs */}
        <div className="grid grid-cols-2 gap-4 text-left">
            <FeatureCard title="Current Streak">
                <div className="flex items-center gap-2">
                    <Trophy size={18} className="text-red-800" />
                    <span className="text-3xl font-black text-zinc-950 italic">
                        {stats.currentStreak}
                    </span>
                </div>
            </FeatureCard>

            <FeatureCard title="Personal Records">
                <div className="flex items-center gap-2 text-left">
                    <TrendingUp size={18} className="text-red-800" />
                    <span className="text-3xl font-black text-zinc-950 italic">
                        {stats.personalRecords}
                    </span>
                </div>
                {stats.prsThisMonth > 0 && (
                    <p className="text-[9px] font-black text-red-800 uppercase mt-2 tracking-tighter">
                        ↗ +{stats.prsThisMonth} THIS MONTH
                    </p>
                )}
            </FeatureCard>
        </div>
    </section>
);