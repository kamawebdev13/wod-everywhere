import { type ReactElement } from 'react';
import { type IExercise } from '@/types';

/**
 * INTERFAZ: ExercisePreviewListProps
 * Tipado estricto para la lista de ejercicios.
 */
interface ExercisePreviewListProps {
  exercises: IExercise[];
}

/**
 * Componente: ExercisePreviewList
 * Muestra un desglose visual de los ejercicios de un WOD.
 */
export const ExercisePreviewList = ({ exercises }: ExercisePreviewListProps): ReactElement => {
  return (
    <ul className="space-y-3 mb-8">
      {exercises.map(({ name, reps, weight }, idx) => (
        <li key={`${name}-${idx}`} className="flex items-baseline gap-3">
          <span className="font-bold text-gray-300 tabular-nums text-xs">
            {String(idx + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-medium text-iron-800">
            {reps && `${reps} `}
            {name}
            {weight && ` (${weight})`}
          </span>
        </li>
      ))}
    </ul>
  );
};