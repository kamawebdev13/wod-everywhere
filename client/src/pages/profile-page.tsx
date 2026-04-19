import { type ReactElement } from 'react';
import { useProfile } from '@/hooks/use-profile';
import { ProfileHero } from '@/components/profile/profile-hero';
import { ProfileStats } from '@/components/profile/profile-stats';
import { ActivityHistory } from '@/components/profile/activity-history';

/**
 * PROFILE PAGE (Smart Container)
 * Orquesta la identidad, estadísticas e historial del atleta.
 * Punto 3: Arquitectura basada en Smart/Dumb components.
 */
export const ProfilePage = (): ReactElement => {
    // 1. Hook de lógica: Maneja la hidratación y sincronización (Punto 2: Robustez)
    const { user, workouts, hasError, isLoading } = useProfile();

    return (
        <div className="flex flex-col min-h-screen bg-white pb-24 font-sans">
            
            {/* Sección: Identidad (Hero) */}
            <ProfileHero user={user} />

            {/* Sección: Métricas de Rendimiento */}
            <ProfileStats stats={user.stats} />

            {/* Gestión de Feedback de Errores (Integridad) */}
            {hasError && (
                <div className="mx-6 my-6 p-4 bg-red-50 border border-red-100 rounded-sm">
                    <p className="text-[10px] font-bold text-red-800 uppercase tracking-widest text-center italic">
                        Unable to sync workout history
                    </p>
                </div>
            )}

            {/* Sección: Historial de Actividad Asíncrono */}
            {isLoading ? (
                <div className="py-10 text-center">
                    <p className="text-[10px] font-black uppercase text-gray-300 animate-pulse tracking-[0.2em]">
                        Syncing Engine...
                    </p>
                </div>
            ) : (
                <ActivityHistory workouts={workouts} />
            )}
            
        </div>
    );
};

export default ProfilePage;