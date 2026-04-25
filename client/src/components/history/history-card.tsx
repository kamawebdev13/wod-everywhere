import { type ReactElement } from 'react';
import { MessageSquare } from 'lucide-react'; // Importamos el icono para las notas
import type { IWorkout } from '@/types';


interface HistoryCardProps {
  workout: IWorkout;
  isFirst: boolean;
}

export const HistoryCard = ({ workout, isFirst }: HistoryCardProps): ReactElement => {
  const isRepsOrRounds = /[a-zA-Z]/.test(workout.score);
  const badgeColor = isRepsOrRounds ? 'bg-red-900' : 'bg-black';

  return (
  
    <div className={`bg-white rounded-sm p-6 flex flex-col shadow-sm border border-zinc-50 ${isFirst ? 'border-l-[5px] border-l-red-900' : ''}`}>
      
      {/* SECCIÓN SUPERIOR: Título y Score */}
      <div className="flex items-center justify-between w-full">
        <div className="space-y-1.5 text-left">
          <h3 className="text-[18px] font-black text-black uppercase tracking-tight leading-tight">
            {workout.wodId?.title || 'UNKNOWN WOD'}
          </h3>
          <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
            {new Date(workout.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className={`${badgeColor} text-white px-4 py-3 rounded-md min-w-[110px] text-center ml-4`}>
          <span className="text-[15px] font-black italic tracking-tighter uppercase">{workout.score}</span>
        </div>
      </div>

      {/* SECCIÓN INFERIOR: Notas del Atleta (Solo si existen) */}
      {workout.notes && (
        <div className="mt-5 pt-4 border-t border-zinc-100">
          <div className="flex items-center gap-2 mb-2">
            <MessageSquare size={12} className="text-red-900" />
            <span className="text-[9px] font-black uppercase text-zinc-400 tracking-[0.2em]">
              Session Insights
            </span>
          </div>
          <p className="text-[12px] text-zinc-600 italic leading-relaxed text-left font-medium">
            "{workout.notes}"
          </p>
        </div>
      )}
    </div>
  );
};