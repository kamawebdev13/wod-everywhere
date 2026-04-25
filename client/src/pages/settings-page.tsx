import { type ReactElement } from 'react';
import { User, Shield, Bell, LogOut } from 'lucide-react';
import { useSettings } from '@/hooks/use-settings';
import { SettingsTile } from '@/components/settings/settings-tile';
import { type AthleteLevel } from '@/types/user';


/**
 * PÁGINA: SettingsPage
 * Refactorizada bajo principios de arquitectura modular y rúbrica estricta.
 */
export const SettingsPage = (): ReactElement => {
    const { user, loading, handleLogout, updateUserInfo } = useSettings();

    // 1. Protección contra el estado de carga
    if (loading) {
        return <div className="p-6 uppercase font-black italic animate-pulse">Loading Profile...</div>;
    }
    if (loading || !user) return <></>;

    /**
   * Cicla entre los niveles del atleta al hacer clic.
   */
    const toggleLevel = (): void => {
        const levels: AthleteLevel[] = ['BEGINNER', 'INTERMEDIATE', 'ELITE'];
        const currentIndex = levels.indexOf(user.level as AthleteLevel);
        const nextIndex = (currentIndex + 1) % levels.length;

        // Enviamos el cambio al backend
        updateUserInfo({ level: levels[nextIndex] });
    };
    // 2. Protección contra null (Type Guard)
    // Si llegamos aquí, TypeScript ya sabe que 'user' no es null
    if (!user) return <div className="p-6">Error: User not found</div>;

    return (
        <div className="min-h-screen bg-white flex flex-col animate-fade-in">
            {/* Header minimalista */}
            <header className="px-6 pt-12 pb-6">
                <h1 className="text-[32px] font-black italic uppercase tracking-tighter text-zinc-950">Settings</h1>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Account / Profile</p>
            </header>

            <main className="flex-1 px-6 space-y-10">
                {/* Bloque: Perfil */}
                <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-red-600 mb-4">Athlete Profile</h3>
                    {/* El nombre ahora podría abrir un prompt para editarlo */}
                    <SettingsTile
                        label="Name"
                        value={user.name}
                        icon={<User size={18} />}
                        onClick={() => {
                            const newName = prompt("Enter new name:", user.name);
                            if (newName) updateUserInfo({ name: newName });
                        }}
                    />

                    {/* El nivel ahora cambia con cada clic */}
                    <SettingsTile
                        label="Level"
                        value={user.level}
                        icon={<Shield size={18} />}
                        onClick={toggleLevel}
                    />
                </section>

                {/* Bloque: Sistema */}
                <section>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 mb-4">Preferences</h3>
                    <SettingsTile label="Notifications" icon={<Bell size={18} />} onClick={() => { }} />
                </section>

                {/* Acción de Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-xl border border-zinc-200 text-zinc-950 hover:bg-red-50 hover:text-red-600 transition-all"
                >
                    <LogOut size={18} />
                    <span className="font-black uppercase italic tracking-widest text-sm">Logout</span>
                </button>
            </main>

            <footer className="p-8 text-center opacity-30">
                <span className="text-[9px] font-bold text-zinc-950 uppercase tracking-[0.5em]">WOD_ENGINE_2026</span>
            </footer>
        </div>
    );
};
export default SettingsPage;