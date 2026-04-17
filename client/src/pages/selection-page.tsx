import { useState, useEffect, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Play, Pause, Flag, CheckCircle2, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWorkoutTimer } from '@/hooks/use-workout-timer';
import { type IWod, type IExercise } from '@/types/index';


export const SelectionPage = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

  // Recuperamos el WOD del state de navegación
  const { selectedWod } = (location.state as { selectedWod: IWod }) || { selectedWod: null };

  // Redirección de seguridad si no hay datos
  useEffect(() => {
    if (!selectedWod) navigate('/explore');
  }, [selectedWod, navigate]);

  // Hook Personalizado para el tiempo 
  const initialSeconds = (selectedWod?.duration || 20) * 60;
  const { seconds, isActive, toggleTimer } = useWorkoutTimer(initialSeconds);

  // Estados agrupados 
  const [workoutUI, setWorkoutUI] = useState({
    completedExercises: [] as string[],
    expandedExercise: null as string | null,
  });

 /**
   * Gestiona el estado de completado de un ejercicio de forma inmutable.
   * Utiliza el operador spread (...) para mantener el estado previo de la UI
   * y argumentos de función en el setter para garantizar la integridad de los datos.
   */
  const toggleComplete = (name: string): void => {
    setWorkoutUI((prev) => ({
      ...prev,// Mantenemos el resto de propiedades del objeto (como expandedExercise)
      completedExercises: prev.completedExercises.includes(name)
        ? prev.completedExercises.filter((item) => item !== name)
        : [...prev.completedExercises, name],
    }));
  };
  /**
   * Controla qué ejercicio muestra su contenido expandido (video/detalles).
   * Implementa una lógica de "toggle": si se pulsa el mismo, se cierra (null).
   */
  const handleExpand = (name: string): void => {
    setWorkoutUI((prev) => ({
      ...prev,
      expandedExercise: prev.expandedExercise === name ? null : name,
    }));
  };
/**
   * Convierte un valor numérico de segundos a un formato de cadena MM:SS.
   * Utiliza padStart para asegurar que siempre haya dos dígitos por segmento.
   */
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
// Renderizado condicional de seguridad: evita errores si el WOD no se ha cargado correctamente
  if (!selectedWod) return <></>;

  // Función para finalizar y enviar datos 
  const handleFinish = () => {
    // Calculamos cuánto tiempo pasó realmente (Tiempo inicial  - lo que queda)
    const secondsElapsed = initialSeconds - seconds; 
    
    // Lo formateamos a MM:SS usando tu función existente
    const finalTime = formatTime(secondsElapsed);

    // Navegamos pasando la "maleta" con los nombres exactos que espera ResumePage
    navigate('/summary', {
      state: {
        selectedWod,
        timeSpent: finalTime,
        completedCount: workoutUI.completedExercises.length
      }
    });
  };

  return (
    <div className="flex flex-col h-screen bg-white animate-fade-in overflow-hidden">
      
      {/* CABECERA: Timer dinámico */}
      <header className="px-6 pt-6 shrink-0 bg-white z-20">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-400 uppercase">
            {selectedWod.type} • SESSION
          </span>
          <span className="text-[10px] font-bold text-brand-red uppercase italic">
            {isActive ? 'Live' : 'Paused'}
          </span>
        </div>
        
        <h1 className="text-8xl font-display font-black tracking-tighter leading-none my-2 text-iron-950">
          {formatTime(seconds)}
        </h1>
        
        <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="progress-bar h-full bg-brand-red transition-all duration-1000 ease-linear"
            style={{ width: `${(seconds / initialSeconds) * 100}%` }}
          />
        </div>

        <div className="mt-8 border-l-4 border-brand-red pl-4 text-left">
          <h2 className="font-display text-4xl font-bold uppercase italic leading-[0.8] text-iron-950">
            {selectedWod.title}
          </h2>
        </div>
      </header>

      {/* ÁREA DE SCROLL CON GRADIENTES */}
      <div className="relative flex-1 mt-6 overflow-hidden">
        {/* GRADIENTE SUPERIOR: Crea un efecto visual de desvanecimiento para los elementos que suben al hacer scroll */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
        {/* LISTADO DINÁMICO: Contenedor con scroll vertical, oculta la barra de scroll y utiliza snap-y para alineación magnética */}
        <div className="h-full overflow-y-auto px-6 pt-12 pb-32 scrollbar-hide snap-y snap-mandatory">
          <h3 className="font-display font-bold uppercase tracking-widest text-xs text-gray-400 mb-6 text-left">
            Active Movements
          </h3>
        {/* RENDERIZADO DE LISTA: Mapeo de ejercicios obtenidos del estado global/backend */}
          {selectedWod.exercises.map((ex: IExercise, index: number) => {
            const isDone = workoutUI.completedExercises.includes(ex.name);
            const isExpanded = workoutUI.expandedExercise === ex.name;

            return (
              <div 
                key={index} 
                className={`snap-center mb-4 transition-all duration-300 rounded-sm border ${
                  isExpanded ? 'bg-gray-50 border-gray-200 shadow-sm' : 'bg-white border-transparent'
                }`}
              >
                <div className="flex items-center p-4 gap-4">
                  {/* BOTÓN DE INTERACCIÓN: Controla la expansión de detalles/video */}
                  <div 
                    onClick={() => handleExpand(ex.name)}
                    className="w-16 h-16 bg-iron-950 rounded-sm shrink-0 flex items-center justify-center cursor-pointer group"
                  >
                    {isExpanded ? <ChevronUp className="text-white" /> : <Play className="text-white fill-white group-hover:scale-110 transition-transform" size={18} />}
                  </div>
                {/* INFORMACIÓN DEL EJERCICIO: Aplicación de estilos condicionales (line-through) si el ejercicio está completado */}
                  <div className="flex-1 text-left">
                    <h4 className={`font-display font-bold uppercase text-lg leading-tight italic ${isDone ? 'line-through text-gray-300' : 'text-iron-950'}`}>
                      {ex.reps && `${ex.reps} `}{ex.name}
                    </h4>
                    {ex.weight && <span className="text-[10px] font-bold text-brand-red uppercase">{ex.weight}</span>}
                  </div>
                {/* CHECKBOX DE ESTADO: Acción para marcar/desmarcar mediante lógica inmutable */}
                  <button onClick={() => toggleComplete(ex.name)} title={isDone ? 'Mark as incomplete' : 'Mark as complete'}>
                    <CheckCircle2 size={28} className={isDone ? 'text-green-500' : 'text-gray-200'} />
                  </button>
                </div>
                {/* CONTENIDO DESPLEGABLE: Renderizado condicional basado en el estado expandedExercise */}
                {isExpanded && (
                  <div className="px-4 pb-4 animate-in slide-in-from-top-2">
                    <div className="aspect-video bg-black rounded-sm mb-2 flex items-center justify-center">
                       <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Video Tutorial</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
          {/* GRADIENTE INFERIOR: Suaviza la aparición de nuevos elementos desde la parte baja del dispositivo */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/90 to-transparent z-10 pointer-events-none" />
      </div>

      {/* CONTROLES DE SESIÓN: Footer fijado con efecto backdrop-blur para mejorar la legibilidad sobre el scroll */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md flex gap-4 z-30">
        <Button 
          onClick={toggleTimer}
          className="flex-1 h-14 bg-gray-100 text-iron-950 font-bold uppercase tracking-widest text-xs"
        >
          {isActive ? <><Pause className="mr-2" size={16} /> Pause</> : <><Play className="mr-2" size={16} /> Resume</>}
        </Button>
       <Button 
          className="flex-1 h-14 bg-iron-950 text-white font-bold uppercase tracking-widest text-xs"
          onClick={handleFinish} 
        >
          <Flag className="mr-2" size={16} /> Finish
        </Button>
      </footer>
    </div>
  );
};

export default SelectionPage;