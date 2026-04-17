import { useState, useEffect, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, CheckCircle2, Trophy, ArrowRight, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { workoutService } from '@/services/api';
import { type IWod } from '@/types/index'; 

export const ResumeWodPage = (): ReactElement | null => {
  const location = useLocation();
  const navigate = useNavigate();

  // 1. Extracción de datos con tipado seguro
  const { selectedWod, timeSpent, completedCount } = (location.state as { 
    selectedWod: IWod, 
    timeSpent: string, 
    completedCount: number 
  }) || { selectedWod: null, timeSpent: '00:00', completedCount: 0 };

  // 2. Estados locales
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // 3. Validación de seguridad (Guarda)
  useEffect(() => {
    if (!selectedWod) {
      navigate('/explore');
    }
  }, [selectedWod, navigate]);

  // 4. Cálculos de progreso
  const totalExercises = selectedWod?.exercises.length || 0;
  const progressPercentage = totalExercises > 0 
    ? Math.round((completedCount / totalExercises) * 100) 
    : 0;

  // 5. Función para persistir en DB
  const handleSave = async () => {
    try {
      setLoading(true);
      const workoutData = {
        wodId: selectedWod?._id,
        duration: timeSpent,
        score: `${progressPercentage}%`,
        notes: notes
      };

      await workoutService.save(workoutData);
      navigate('/dashboard', { replace: true });
    } catch (error) {
      console.error("Error al guardar el entrenamiento:", error);
    } finally {
      setLoading(false);
    }
  };

  // Renderizado condicional para evitar errores de null
  if (!selectedWod) return null;

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-10">
      
      {/* HEADER */}
      <header className="px-6 pt-10 text-left">
        <span className="text-brand-red font-bold text-[10px] tracking-widest uppercase">
          Sesión Finalizada
        </span>
        <h1 className="text-5xl font-black text-iron-950 leading-[0.85] mt-2 uppercase tracking-tighter">
          WOD<br />Completado
        </h1>
      </header>

      {/* TARJETA TIEMPO TOTAL */}
      <section className="px-6 mt-8">
        <div className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden border border-gray-100">
          <div className="relative z-10">
            <span className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">
              Tiempo Total
            </span>
            <div className="text-7xl font-black text-iron-950 mt-2 tracking-tighter">
              {timeSpent}
            </div>
            <div className="flex items-center mt-4 text-brand-red font-bold text-[10px] tracking-widest uppercase italic">
              <Trophy size={14} className="mr-1 fill-brand-red" />
              Nuevo Récord Personal
            </div>
          </div>
          <Clock className="absolute -right-5 -top-2.5 w-40 h-40 text-brand-red/5 -rotate-12" />
        </div>
      </section>

      {/* FILA DE ESTADÍSTICAS */}
      <section className="px-6 mt-4 flex gap-4">
        {/* Cuadro Porcentaje */}
        <div className="flex-1 bg-iron-950 rounded-xl p-6 flex flex-col items-center justify-center text-white relative overflow-hidden">
          <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest mb-1">
            Completado
          </span>
          <div className="text-4xl font-black">{progressPercentage}%</div>
          <CheckCircle2 className="absolute bottom-2 right-2 text-brand-red opacity-20" size={40} />
        </div>

        {/* Cuadro Nombre WOD */}
        <div className="flex-2 bg-white rounded-xl p-6 border-l-4 border-brand-red shadow-sm flex flex-col justify-center">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
            Workout
          </span>
          <div className="text-xl font-bold text-iron-950 uppercase italic leading-tight">
            {selectedWod.title}
          </div>
        </div>
      </section>

      {/* SECCIÓN DE NOTAS */}
      <section className="px-6 mt-8">
        <div className="flex items-center gap-2 mb-3">
          <MessageSquare size={16} className="text-gray-400" />
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            Notas de la sesión
          </span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="¿Cómo te has sentido? ¿Rompiste algún récord?"
          className="w-full h-32 p-4 bg-white rounded-xl border border-gray-100 shadow-sm focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red outline-none transition-all text-iron-950 text-sm resize-none"
        />
      </section>

      {/* BOTÓN FINAL */}
      <footer className="px-6 mt-auto pt-10">
        <Button
          onClick={handleSave}
          disabled={loading}
          className="w-full h-16 bg-iron-950 hover:bg-iron-900 text-white rounded-xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
        >
          {loading ? 'Guardando...' : 'Guardar Entrenamiento'}
          <ArrowRight size={18} />
        </Button>
      </footer>
    </div>
  );
};

export default ResumeWodPage;