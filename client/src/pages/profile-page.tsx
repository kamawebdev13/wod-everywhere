import { useState, useEffect, type ReactElement } from 'react';
import { Settings, Zap, Dumbbell, History, Trophy, TrendingUp, User } from 'lucide-react';
import FeatureCard from '@/components/common/feature-card';
import { Button } from '@/components/ui/button';
import { workoutService } from '@/services/api';
import type { IWorkout, IUser } from '@/types';

export const ProfilePage = (): ReactElement => {
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [hasError, setHasError] = useState(false);
  
  // Recuperación de usuario con tipado estricto
  const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;

  /**
   * Obtiene el historial de entrenamientos del backend.
   */
  useEffect(() => {
    const handleFetchHistory = async (): Promise<void> => {
      try {
        const res = await workoutService.getAll();
        // Asumiendo que res.data es el array de IWorkout
        setWorkouts(res.data || []);
      } catch {
        setHasError(true);
      }
    };

    handleFetchHistory();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24 font-sans">
      
      {/* --- HERO: IDENTIDAD ATLÉTICA --- */}
      <section className="px-6 pt-12 pb-8">
        <div className="flex justify-between items-start mb-6">
          <div className="relative">
            {/* Sustitución de avatar por icono para evitar dependencias de API externas */}
            <div className="w-24 h-24 bg-iron-950 rounded-2xl flex items-center justify-center border-2 border-white shadow-xl text-white">
              <User size={48} strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-red-800 text-white p-1.5 rounded-lg shadow-lg">
              <Zap size={16} fill="currentColor" />
            </div>
          </div>
          <Button variant="ghost" className="bg-gray-50 rounded-xl text-iron-950 w-10 h-10 p-0 flex items-center justify-center">
            <Settings size={20} />
          </Button>
        </div>

        <div className="text-left">
          <h1 className="text-3xl font-black text-iron-950 uppercase tracking-tighter leading-none italic">
            {user.name}
          </h1>
          <p className="text-[12px] font-bold text-red-800 uppercase tracking-[0.2em] mt-1 italic">
            {user.level} ENGINE
          </p>
        </div>
        
        {/* Renderizado de Tags: Ahora son obligatorios en IUser */}
        <div className="flex flex-wrap gap-2 mt-4">
          {user.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-black bg-gray-100 text-gray-500 px-3 py-1.5 rounded-sm uppercase tracking-[0.15em]">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* GESTIÓN DE ERRORES (UI en lugar de logs) */}
      {hasError && (
        <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-100 rounded-sm">
          <p className="text-[10px] font-bold text-red-800 uppercase tracking-widest text-center italic">
            Unable to sync workout history
          </p>
        </div>
      )}

      {/* --- STATS: MÉTRICAS DE RENDIMIENTO --- */}
      <section className="px-6 grid grid-cols-1 gap-4">
        <FeatureCard title="Wods Completed" showBorder borderColor="border-red-800">
          <div className="text-5xl font-black text-iron-950 leading-none mt-1 italic">
            {user.stats.wodsCompleted}
          </div>
          {/* Barra de progreso visual según el diseño */}
          <div className="w-full bg-gray-100 h-1.5 mt-5 rounded-full overflow-hidden">
            <div className="bg-red-800 h-full w-[65%]" />
          </div>
        </FeatureCard>

        <div className="grid grid-cols-2 gap-4 text-left">
          <FeatureCard title="Current Streak">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-red-800" />
              <span className="text-3xl font-black text-iron-950 italic">
                {user.stats.currentStreak}
              </span>
            </div>
          </FeatureCard>

          <FeatureCard title="Personal Records">
            <div className="flex items-center gap-2 text-left">
              <TrendingUp size={18} className="text-red-800" />
              <span className="text-3xl font-black text-iron-950 italic">
                {user.stats.personalRecords}
              </span>
            </div>
            {user.stats.prsThisMonth > 0 && (
              <p className="text-[9px] font-black text-red-800 uppercase mt-2 tracking-tighter">
                ↗ +{user.stats.prsThisMonth} THIS MONTH
              </p>
            )}
          </FeatureCard>
        </div>
      </section>

      {/* --- HISTORY: TRABAJO GUARDADO --- */}
      <section className="px-6 mt-10 text-left">
        <h2 className="text-[11px] font-black text-iron-950 uppercase tracking-[0.25em] mb-6 flex items-center gap-2 italic">
          <History size={16} /> Activity History
        </h2>
        
        <div className="flex flex-col gap-3">
          {workouts.length > 0 ? (
            workouts.map((workout) => (
              <div 
                key={workout._id} 
                className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-xl border-l-4 border-l-red-800 shadow-sm transition-all active:scale-[0.98]"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gray-50 rounded-xl text-iron-950">
                    <Dumbbell size={20} />
                  </div>
                  <div>
                    <h4 className="font-black text-iron-950 text-sm uppercase italic leading-none">
                      {workout.wodId.title}
                    </h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-2">
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
    </div>
  );
};