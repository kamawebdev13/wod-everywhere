import { useState, useEffect, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { workoutService } from '@/services/api';
import { type IWod } from '@/types'; // Importamos la interfaz del WOD

// 1. DEFINIMOS EL TIPO DE DATOS QUE VIENEN POR NAVEGACIÓN
interface ResumeState {
  selectedWod: IWod;
  timeSpent: string;
  completedCount: number;
}
// IMPORTAMOS LOS COMPONENTES DE RESUME PAGE
import { ResumeHeader } from '@/components/resume/resume-header'
import { ResumeTimerCard } from '@/components/resume/resume-timer-card';
import { StatCard } from '@/components/resume/statcard';
import { ResumeMotivation } from '@/components/resume/resume-motivation';

export const ResumeWodPage = (): ReactElement | null => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 2. USAMOS EL TIPO DEFINIDO 
  // Si no hay datos, inicializamos como null para la validación
  const state = location.state as ResumeState | null;
  const selectedWod = state?.selectedWod;
  const timeSpent = state?.timeSpent || '00:00';
  const completedCount = state?.completedCount || 0;

  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // 3. SEGURIDAD: SI NO HAY WOD, VOLVEMOS A EXPLORE
  useEffect(() => {
    if (!selectedWod) navigate('/explore');
  }, [selectedWod, navigate]);

  // 4. EVITAMOS RENDERIZAR SI NO HAY DATOS (Protección de nulidad)
  if (!selectedWod) return null;

  // 5. CÁLCULO DE PROGRESO REAL
  const progressPercentage = Math.round((completedCount / selectedWod.exercises.length) * 100);

  // 6. FUNCIÓN DE GUARDADO HACIA EL BACKEND
  const handleSave = async () => {
    try {
      setLoading(true);
      
      // Si el atleta terminó el 100%, su score es el TIEMPO.
      // Si no, su score es el % de completado.
      const finalScore = progressPercentage === 100 ? timeSpent : `${progressPercentage}%`;

      // Llamada al servicio que definimos en api.ts
      await workoutService.save({
        wodId: selectedWod._id,
        duration: timeSpent,
        score: finalScore,
        notes: notes.trim()
      });

      // Redirección limpia al historial
      navigate('/history', { replace: true });
    } catch {
      // Catch simple para evitar el error de 'err' sin usar
      alert("Error al persistir los datos en el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-10 font-sans">
      <ResumeHeader />
      
      {/* Tarjeta grande con el cronómetro final */}
      <ResumeTimerCard time={timeSpent} />

      {/* Grid de estadísticas usando componentes stateless reutilizables */}
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
          value={selectedWod.title} 
          className="flex-2" 
        />
      </section>

      {/* Imagen con Lazy Load para optimizar carga */}
      <ResumeMotivation />

      {/* Bloque de texto para comentarios personales */}
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

      {/* Footer con botón de acción y feedback de carga */}
      <footer className="px-6 mt-auto pt-10">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full h-16 bg-zinc-950 text-white rounded-xl font-bold uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
          {loading ? 'Sincronizando...' : 'Finalizar Registro'}
          <ArrowRight size={18} />
        </Button>
      </footer>
    </div>
  );
};