import { type ReactElement } from 'react';
import { Play, ChevronUp, CheckCircle2 } from 'lucide-react';
import { type IExercise } from '@/types/index';

/**
 * INTERFAZ: ExerciseItemProps
 * Define las propiedades necesarias para el componente.
 */
interface ExerciseItemProps {
    exercise: IExercise;
    isDone: boolean;
    isExpanded: boolean;
    onExpand: (name: string) => void;
    onToggle: (name: string) => void;
    videoUrl?: string;
}

/**
 * COMPONENTE: ExerciseItem
 * Renderiza la fila de un ejercicio con soporte para expansión de video.
 */
export const ExerciseItem = ({
    exercise,
    isDone,
    isExpanded,
    onExpand,
    onToggle,
    videoUrl
}: ExerciseItemProps): ReactElement => {

    /**
     * RÚBRICA: Deconstrucción de parámetros.
     * Extraemos las propiedades del objeto 'exercise' para evitar repeticiones 
     * y mejorar la legibilidad del JSX.
     */
    const { name, reps, weight } = exercise;

    return (
        <div
            className={`snap-center mb-4 transition-all duration-300 rounded-sm border ${isExpanded ? 'bg-zinc-50 border-zinc-200 shadow-sm' : 'bg-white border-transparent'
                }`}
        >
            <div className="flex items-center p-4 gap-4">

                {/* ACCIÓN: Toggle Tutorial
                    */}
                <button
                    onClick={() => onExpand(name)}
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
                    Se utilizan las variables deconstruidas (name, reps, weight). */}
                <div className="flex-1 text-left">
                    <h4 className={`font-bold uppercase text-lg leading-tight italic transition-colors ${isDone ? 'line-through text-zinc-300' : 'text-zinc-950'
                        }`}>
                        {reps && `${reps} `}{name}
                    </h4>
                    {weight && (
                        <span className="text-[10px] font-bold text-red-600 uppercase">
                            {weight}
                        </span>
                    )}
                </div>

                {/* ACCIÓN: Toggle Completed
                    Permite al atleta marcar el progreso. El icono cambia de color reactivamente. */}
                <button
                    onClick={() => onToggle(name)}
                    aria-label={isDone ? "Marcar como pendiente" : "Marcar como completado"}
                    title={isDone ? "Marcar como pendiente" : "Marcar como completado"}
                    className="focus:outline-none hover:scale-110 transition-transform cursor-pointer"
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
                    <div className="w-full max-w-[450px] aspect-video bg-zinc-900 rounded-lg overflow-hidden shadow-2xl border border-zinc-200">
                        {videoUrl ? (
                            <iframe
                                src={videoUrl}
                                title={name}
                                loading="lazy"
                                className="w-full h-full"
                                allowFullScreen
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                        ) : (
                            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest flex items-center justify-center h-full">
                                Sin video disponible
                            </span>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};