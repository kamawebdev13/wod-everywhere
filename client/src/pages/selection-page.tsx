import { type ReactElement } from 'react';
import { useSelection } from '@/hooks/use-selection';

// Importación de sub-componentes especializados (Punto 3: Arquitectura Limpia)
import { SelectionHeader } from '@/components/selection/selection-header';
import { ActiveMovementsList } from '@/components/selection/active-movements-list';
import { WorkoutControls } from '@/components/selection/workout-control';

/**
 * PÁGINA: SelectionPage (Smart Container)
 * Orquesta la ejecución en tiempo real del entrenamiento seleccionado.
 */
export const SelectionPage = (): ReactElement | null => {
    // 1. Consumo de lógica desde el Custom Hook (Sin lógica en la vista)
    const {
        selectedWod,
        initialSeconds,
        seconds,
        isActive,
        workoutUI,
        toggleTimer,
        toggleComplete,
        handleExpand,
        handleFinish,
        formatTime
    } = useSelection();

    // 2. Punto 2 (Robustez): Si no hay WOD por refresco de página, evitamos crash
   if (!selectedWod) {
    return (
        <div className="min-h-screen bg-zinc-50 flex justify-center overflow-hidden">
            <p className="text-white animate-pulse">PREPARANDO ENTRENAMIENTO...</p>
        </div>
    );
}

    const { type, title, exercises } = selectedWod;
    const { completedExercises, expandedExercise } = workoutUI;

    return (
        <div className="flex flex-col h-screen w-full max-w-md bg-white animate-fade-in relative shadow-xl">
            
            {/* Sección: Timer y Título */}
            <SelectionHeader 
                type={type}
                title={title}
                isActive={isActive} // Forma corta si pasas variables booleanas
                timeDisplay={formatTime(seconds)}
                progress={(seconds / initialSeconds) * 100}
            />

            {/* Sección: Lista de Ejercicios (Pasamos props deconstruidas) */}
            <ActiveMovementsList 
                exercises={exercises}
                completedExercises={completedExercises}
                expandedExercise={expandedExercise}
                onExpand={handleExpand}
                onToggle={toggleComplete}
            />

            {/* Sección: Botonera de Control */}
            <div className="px-6 pb-10 pt-4 bg-white">
                    <WorkoutControls 
                        isActive={isActive}
                        onToggle={toggleTimer}
                        onFinish={handleFinish}
                    />
                </div>
            
        </div>
    );
};

export default SelectionPage;