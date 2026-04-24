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
    /* 1. CONTENEDOR EXTERIOR: Centra todo el contenido en pantallas grandes */
    <div className="min-h-screen bg-[#F8F9FA] flex justify-center">
      
      /* 2. CONTENEDOR DE CONTENCIÓN: Limita el ancho máximo a 448px (max-w-md) */
      <div className="w-full max-w-md flex flex-col min-h-screen relative shadow-2xl bg-white">
        
        /* Contenido con scroll independiente si fuera necesario */
        <div className="flex-1 pb-32"> 
          
          {/* Header de la página */}
          <ResumeHeader />
          
          {/* Card del temporizador con el tiempo transcurrido */}
          <ResumeTimerCard time={state.timeSpent} />

          {/* Sección de estadísticas: Usamos gap-4 para separar las cards */}
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

          {/* Componente de motivación/frase */}
          <ResumeMotivation />

          {/* Área de notas de la sesión */}
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
              className="w-full h-32 p-4 bg-gray-50 rounded-xl border border-zinc-100 shadow-sm outline-none text-sm resize-none focus:border-zinc-950 transition-colors"
            />
          </section>

          {/* Feedback de error si la sincronización falla */}
          {syncError && (
            <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <AlertTriangle className="text-red-600" size={20} />
              <p className="text-[10px] font-black text-red-800 uppercase italic leading-tight">
                {syncError}
              </p>
            </div>
          )}
        </div>

        /* 3. FOOTER FIJO: El botón ahora siempre estará al final del contenedor max-w-md */
        <footer className="absolute bottom-0 left-0 w-full px-6 pb-10 bg-gradient-to-t from-[#F8F9FA] to-transparent pt-10">
          <Button
            onClick={handleSave}
            disabled={loading}
            className="w-full h-16 bg-zinc-950 text-white rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-xl cursor-pointer"
          >
            {loading ? 'SINCRONIZANDO...' : 'FINALIZAR REGISTRO'}
            <ArrowRight size={18} />
          </Button>
        </footer>

      </div>
    </div>
  );
};

export default ResumeWodPage;