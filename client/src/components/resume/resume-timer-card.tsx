import { type ReactElement } from 'react';
import { Clock, Trophy } from 'lucide-react';

export const ResumeTimerCard = ({ time }: { time: string }): ReactElement => (
  <section className="px-6 mt-8">
    <div className="bg-white rounded-xl p-8 shadow-sm relative overflow-hidden border border-gray-100">
      <div className="relative z-10">
        <span className="text-gray-400 font-bold text-[10px] tracking-widest uppercase">
          Tiempo Total
        </span>
        <div className="text-7xl font-black text-zinc-950 mt-2 tracking-tighter">
          {time}
        </div>
        <div className="flex items-center mt-4 text-red-600 font-bold text-[10px] tracking-widest uppercase italic">
          <Trophy size={14} className="mr-1 fill-red-600" />
          Nuevo Récord Personal
        </div>
      </div>
      <Clock className="absolute -right-5 -top-2.5 w-40 h-40 text-red-600/5 -rotate-12" />
    </div>
  </section>
);