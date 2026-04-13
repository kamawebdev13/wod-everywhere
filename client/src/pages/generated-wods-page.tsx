import { type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type IWod } from '@/types/index';

/**
 * Página que muestra las 3 opciones de WOD generadas por el backend.
 * Utiliza la interfaz IWod para asegurar la compatibilidad con el seed.ts.
 */
export const GeneratedWodsPage = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recuperamos los WODs del estado de navegación
  const { wods } = (location.state as { wods: IWod[] }) || { wods: [] };

  const handleSelectWod = (wod: IWod): void => {
    // Navegamos a la página de ejecución del entrenamiento
    navigate('/selection-page', { state: { selectedWod: wod } });
  };

  return (
    <div className="animate-fade-in pb-20 px-6 bg-gray-50 min-h-screen">
      <header className="py-10">
        <h1 className="font-display text-5xl font-black text-iron-950 uppercase tracking-tighter leading-[0.8]">
          Tus <br /> Opciones
        </h1>
        <div className="h-1.5 w-16 bg-brand-red mt-6" />
      </header>

      <div className="space-y-8">
        {wods.map((wod, index) => (
          <div key={wod._id} className="relative">
            {/* Solo la primera opción lleva el badge de recomendado (visual) */}
            {index === 0 && (
              <div className="absolute -top-3 right-4 z-10 bg-brand-red text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                Recomendado
              </div>
            )}

            <div className={`bg-white rounded-sm shadow-xl overflow-hidden border-l-4 ${
              index === 0 ? 'border-brand-red' : 'border-transparent'
            }`}>
              <div className="p-8">
                {/* Info de cabecera: Tiempo (estimado) y Tipo */}
                <div className="flex gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} className="text-brand-red" />
                    20 MIN
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Zap size={14} className="text-brand-red" />
                    {wod.type}
                  </div>
                </div>

                <h2 className="font-display text-3xl font-black uppercase italic text-iron-950 mb-6">
                  {wod.title}
                </h2>

                {/* Lista de ejercicios basada en IExercise */}
                <ul className="space-y-3 mb-8">
                  {wod.exercises.map((exercise, idx) => (
                    <li key={idx} className="flex items-baseline gap-3">
                      <span className="font-display font-bold text-gray-300 tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-medium text-iron-800">
                        {exercise.reps && `${exercise.reps} `}
                        {exercise.name}
                        {exercise.weight && ` (${exercise.weight})`}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handleSelectWod(wod)}
                  className={`w-full h-14 uppercase font-bold tracking-widest text-xs transition-all ${
                    index === 0 
                      ? 'bg-iron-950 text-white hover:bg-brand-red' 
                      : 'bg-gray-200 text-iron-950 hover:bg-gray-300 shadow-none'
                  }`}
                >
                  Seleccionar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Banner inferior decorativo del diseño */}
      <div className="mt-12 bg-gray-100 p-8 rounded-sm text-center relative overflow-hidden">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red block mb-2">Level Up</span>
        <h3 className="font-display text-2xl font-bold uppercase leading-tight text-iron-950 mb-4">
          No te conformes <br /> con lo básico
        </h3>
        <p className="text-[11px] text-gray-500 leading-relaxed mb-6 px-4">
          Explora nuestra biblioteca de más de 500 WODs diseñados por atletas de élite.
        </p>
        <div className="inline-flex p-4 bg-white rounded-lg shadow-sm">
          <Zap size={32} className="text-gray-200" />
        </div>
      </div>
    </div>
  );
};

export default GeneratedWodsPage;