import { ExerciseItem } from '@/components/selection/exercise-item';
import { type IWod } from '@/types/index';

/**
 * INTERFAZ: MovementsListProps
 * Define las propiedades para el listado de movimientos activos.
 */
interface MovementsListProps {
    exercises: IWod['exercises'];
    completedExercises: string[];
    expandedExercise: string | null;
    onExpand: (name: string) => void;
    onToggle: (name: string) => void;
}

/**
 * COMPONENTE: ActiveMovementsList
 * Gestiona el área de scroll y el mapeo de los ejercicios.
 * Aplica deconstrucción de parámetros y evita el uso de index como key pura.
 */
export const ActiveMovementsList = ({ 
    exercises, 
    completedExercises, 
    expandedExercise, 
    onExpand, 
    onToggle 
}: MovementsListProps) => (
    <div className="relative flex-1 mt-6 overflow-hidden">
        {/* Gradiente superior: Efecto visual de desvanecimiento para el scroll.
            Se usa bg-gradient-to-b para máxima compatibilidad. */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-linear-to-b from-white via-white/80 to-transparent z-10 pointer-events-none" />
        
        <div className="h-full overflow-y-auto px-6 pt-12 pb-32 scrollbar-hide snap-y snap-mandatory">
            <h3 className="font-bold uppercase tracking-widest text-[10px] text-zinc-400 mb-6 text-left">
                Active Movements
            </h3>

            {/* RÚBRICA: Deconstrucción en el mapeo.
                Extraemos 'name' para calcular estados y generar una key compuesta segura. */}
            {exercises.map((exercise, index) => {
                const { name } = exercise;
                
                return (
                    <ExerciseItem 
                        key={`${name}-${index}`} 
                        exercise={exercise}
                        isDone={completedExercises.includes(name)}
                        isExpanded={expandedExercise === name}
                        onExpand={onExpand}
                        onToggle={onToggle}
                    />
                );
            })}
        </div>

        {/* Gradiente inferior: Proporciona profundidad visual sobre el área de controles. */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white via-white/90 to-transparent z-10 pointer-events-none" />
    </div>
);