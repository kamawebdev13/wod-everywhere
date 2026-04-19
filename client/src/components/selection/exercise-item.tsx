import { Play, ChevronUp, CheckCircle2 } from 'lucide-react';
import { type IExercise } from '@/types/index';

/**
 * PROPS: ExerciseItemProps
 * Define la interfaz estricta para las propiedades del componente.
 * Punto 1 (Integridad): Se evita el uso de 'any' al tipar funciones y modelos.
 */
interface ExerciseItemProps {
    exercise: IExercise;
    isDone: boolean;
    isExpanded: boolean;
    onExpand: (name: string) => void;
    onToggle: (name: string) => void;
}

/**
 * COMPONENTE STATELESS: ExerciseItem
 * Renderiza la fila de un ejercicio individual con soporte para expansión de video
 * y gestión de estado de completado.
 */
export const ExerciseItem = ({ 
    exercise, 
    isDone, 
    isExpanded, 
    onExpand, 
    onToggle 
}: ExerciseItemProps) => (
    <div 
        className={`snap-center mb-4 transition-all duration-300 rounded-sm border ${
            isExpanded ? 'bg-zinc-50 border-zinc-200 shadow-sm' : 'bg-white border-transparent'
        }`}
    >
        <div className="flex items-center p-4 gap-4">
            
            {/* ACCIÓN: Toggle Tutorial
                Punto 2 (Robustez): Se usa 'aria-label' y 'title' para accesibilidad (A11y),
                resolviendo alertas de elementos interactivos sin texto discernible. */}
            <button 
                onClick={() => onExpand(exercise.name)}
                aria-label={isExpanded ? "Ocultar tutorial" : "Ver tutorial"}
                title={isExpanded ? "Ocultar tutorial" : "Ver tutorial"}
                className="w-16 h-16 bg-zinc-950 rounded-sm shrink-0 flex items-center justify-center cursor-pointer group focus:ring-2 focus:ring-red-500 outline-none"
            >
                {isExpanded ? (
                    <ChevronUp className="text-white" />
                ) : (
                    <Play className="text-white fill-white group-hover:scale-110 transition-transform" size={18} />
                )}
            </button>

            {/* INFORMACIÓN: Datos del Movimiento
                Se aplica renderizado condicional de estilos (line-through) basado en 'isDone'. */}
            <div className="flex-1 text-left">
                <h4 className={`font-bold uppercase text-lg leading-tight italic transition-colors ${
                    isDone ? 'line-through text-zinc-300' : 'text-zinc-950'
                }`}>
                    {exercise.reps && `${exercise.reps} `}{exercise.name}
                </h4>
                {exercise.weight && (
                    <span className="text-[10px] font-bold text-red-600 uppercase">
                        {exercise.weight}
                    </span>
                )}
            </div>

            {/* ACCIÓN: Toggle Completed
                Permite al atleta marcar el progreso. El icono cambia de color reactivamente. */}
            <button 
                onClick={() => onToggle(exercise.name)} 
                aria-label={isDone ? "Marcar como pendiente" : "Marcar como completado"}
                title={isDone ? "Marcar como pendiente" : "Marcar como completado"}
                className="focus:outline-none hover:scale-110 transition-transform"
            >
                <CheckCircle2 
                    size={28} 
                    className={isDone ? 'text-green-500' : 'text-zinc-200'} 
                />
            </button>
        </div>

        {/* CONTENIDO EXPANDIBLE: Tutorial Visual
            Punto 3 (Arquitectura): Solo se renderiza si 'isExpanded' es true para optimizar el DOM. */}
        {isExpanded && (
            <div className="px-4 pb-4 animate-in slide-in-from-top-2 duration-200">
                <div className="aspect-video bg-black rounded-sm flex items-center justify-center">
                    <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">
                        Video Tutorial
                    </span>
                </div>
            </div>
        )}
    </div>
);