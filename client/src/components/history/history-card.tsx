import { type ReactElement } from 'react';
import type { IWorkout } from '@/types';

interface HistoryCardProps {
  workout: IWorkout;
  isFirst: boolean;
}

export const HistoryCard = ({ workout, isFirst }: HistoryCardProps): ReactElement => {
  const isRepsOrRounds = /[a-zA-Z]/.test(workout.score);
  const badgeColor = isRepsOrRounds ? 'bg-red-900' : 'bg-black';

  return (
    <div className={`bg-white rounded-sm p-6 flex items-center justify-between shadow-sm border border-zinc-50 ${isFirst ? 'border-l-[5px] border-l-red-900' : ''}`}>
      <div className="space-y-1.5 text-left">
        <h3 className="text-[18px] font-black text-black uppercase tracking-tight">
          {workout.wodId?.title || 'UNKNOWN WOD'}
        </h3>
        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
          {new Date(workout.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
      <div className={`${badgeColor} text-white px-4 py-3 rounded-md min-w-27.5 text-center`}>
        <span className="text-[15px] font-black italic tracking-tighter">{workout.score}</span>
      </div>
    </div>
  );
};