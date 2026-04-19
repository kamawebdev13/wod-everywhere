import { type ReactElement } from 'react';
import { type IExercise } from '@/types';

interface ExercisePreviewListProps {
  exercises: IExercise[];
}

export const ExercisePreviewList = ({ exercises }: ExercisePreviewListProps): ReactElement => {
  return (
    <ul className="space-y-3 mb-8">
      {exercises.map((exercise, idx) => (
        <li key={idx} className="flex items-baseline gap-3">
          <span className="font-bold text-gray-300 tabular-nums text-xs">
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
  );
};