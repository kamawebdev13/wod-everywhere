import { ExerciseItem } from '@/components/selection/exercise-item';
import { type IWod } from '@/types/index';

/**
 * PROPS: MovementsListProps
 * Interfaz para el listado de movimientos activos.
 */
interface MovementsListProps {
    exercises: IWod['exercises'];
    completedExercises: string[];
    expandedExercise: string | null;
    onExpand: (name: string) => void;
    onToggle: (name: string) => void;
}

/**
 * COMPONENTE STATELESS: ActiveMovementsList
 * Gestiona el área de scroll y el mapeo de los ejercicios.
 * Punto 3: Arquitectura - Mantiene el scroll independiente del resto de la UI.
 */
export const ActiveMovementsList = ({ 
    exercises, 
    completedExercises, 
    expandedExercise, 
    onExpand, 
    onToggle 
}: MovementsListProps) => (
    <div className="relative flex-1 mt-6 overflow-hidden">
        {/* Efecto de desvanecimiento superior para el scroll */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        <div className="h-full overflow-y-auto px-6 pt-12 pb-32 scrollbar-hide snap-y snap-mandatory">
            <h3 className="font-bold uppercase tracking-widest text-[10px] text-zinc-400 mb-6 text-left">
                Active Movements
            </h3>

            {exercises.map((ex, index) => (
                <ExerciseItem 
                    key={`${ex.name}-${index}`}
                    exercise={ex}
                    isDone={completedExercises.includes(ex.name)}
                    isExpanded={expandedExercise === ex.name}
                    onExpand={onExpand}
                    onToggle={onToggle}
                />
            ))}
        </div>

        {/* Efecto de desvanecimiento inferior */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/90 to-transparent z-10 pointer-events-none" />
    </div>
);