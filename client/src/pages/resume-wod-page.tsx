import { type ReactElement } from 'react';
import { CheckCircle2, ArrowRight, MessageSquare, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useResumeWod } from '@/hooks/use-resume-wood';

// COMPONENTES STATELESS
import { ResumeHeader } from '@/components/resume/resume-header';
import { ResumeTimerCard } from '@/components/resume/resume-timer-card';
import { StatCard } from '@/components/resume/statcard';
import { ResumeMotivation } from '@/components/resume/resume-motivation';

/**
 * PÁGINA DE RESUMEN (Container Component)
 * Muestra el resultado de la sesión y gestiona el feedback de persistencia.
 */
export const ResumeWodPage = (): ReactElement | null => {
    // 1. Extraemos lógica, estados y el nuevo syncError del Hook
    const { 
        state, 
        notes, 
        setNotes, 
        loading, 
        syncError, 
        progressPercentage, 
        handleSave 
    } = useResumeWod();

    // 2. Renderizado condicional de seguridad
    if (!state?.selectedWod) return null;

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-10 font-sans">
            
            <ResumeHeader />
            
            <ResumeTimerCard time={state.timeSpent} />

            <section className="px-6 mt-4 flex gap-4">
                <StatCard 
                    label="Completado" 
                    value={`${progressPercentage}%`} 
                    variant="dark" 
                    className="flex-1"
                    icon={<CheckCircle2 size={40} />}
                />
                <StatCard 
                    label="Workout" 
                    value={state.selectedWod.title} 
                    className="flex-2" 
                />
            </section>

            <ResumeMotivation />

            <section className="px-6 mt-8">
                <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={16} className="text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                        Notas de la sesión
                    </span>
                </div>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="¿Cómo te has sentido?"
                    className="w-full h-32 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm outline-none text-sm resize-none"
                />
            </section>

            {/* --- FEEDBACK DE ERROR (Punto 2: Robustez) --- */}
            {syncError && (
                <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                    <AlertTriangle className="text-red-600" size={20} />
                    <p className="text-[10px] font-black text-red-800 uppercase italic leading-tight">
                        {syncError}
                    </p>
                </div>
            )}

            <footer className="px-6 mt-auto pt-10">
                <Button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full h-16 bg-zinc-950 text-white rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-lg"
                >
                    {loading ? 'SINCRONIZANDO...' : 'FINALIZAR REGISTRO'}
                    <ArrowRight size={18} />
                </Button>
            </footer>
        </div>
    );
};