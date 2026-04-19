import { History, Dumbbell } from 'lucide-react';
import type { IWorkout } from '@/types';

/**
 * Lista detallada del historial de actividad sincronizado.
 */
export const ActivityHistory = ({ workouts }: { workouts: IWorkout[] }) => (
    <section className="px-6 mt-10 text-left">
        <h2 className="text-[11px] font-black text-zinc-950 uppercase tracking-[0.25em] mb-6 flex items-center gap-2 italic">
            <History size={16} /> Activity History
        </h2>
        
        <div className="flex flex-col gap-3">
            {workouts.length > 0 ? (
                workouts.map((workout) => (
                    <div key={workout._id} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl border-l-4 border-l-red-800 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <Dumbbell size={20} />
                            </div>
                            <div>
                                <h4 className="font-black text-zinc-950 text-sm uppercase italic">
                                    {workout.wodId?.title || 'Unknown WOD'}
                                </h4>
                                <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">
                                    {workout.duration} • {workout.score}
                                </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-[10px] font-bold text-gray-400 uppercase text-center py-8 tracking-widest">
                    No workouts recorded yet
                </p>
            )}
        </div>
    </section>
);