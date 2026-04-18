import { useState, useEffect, type ReactElement } from 'react';
import { Settings, Zap, Dumbbell, History, Trophy, TrendingUp } from 'lucide-react';
import FeatureCard from '@/components/common/feature-card'
import { Button } from '@/components/ui/button';
import { workoutService } from '@/services/api';

// Importación estricta desde tu nuevo index.ts
import type { IWorkout, IUser } from '@/types';

export const ProfilePage = (): ReactElement => {
  // Usamos IWorkout para el historial (que incluye el objeto IWod poblado)
  const [workouts, setWorkouts] = useState<IWorkout[]>([]);
  const [hasError, setHasError] = useState(false);
  
  // Tipado IUser para acceder a tags, level y stats
  const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await workoutService.getAll();
        setWorkouts(res.data || []);
      } catch {
        setHasError(true);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white pb-24">
      
      {/* --- HERO: IDENTIDAD DINÁMICA --- */}
      <section className="px-6 pt-12 pb-8">
        <div className="flex justify-between items-start mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gray-100 rounded-2xl overflow-hidden border-2 border-white shadow-xl">
              <img 
                src={user.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name || 'Athlete'}`} 
                alt="Profile avatar" 
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-red-800 text-white p-1.5 rounded-lg shadow-lg">
              <Zap size={16} fill="currentColor" />
            </div>
          </div>
          <Button variant="ghost" className="bg-gray-50 rounded-xl text-iron-950 w-10 h-10 p-0 flex items-center justify-center">
            <Settings size={20} />
          </Button>
        </div>

        <h1 className="text-3xl font-black text-iron-950 uppercase tracking-tighter leading-none">
          {user.name || 'Unknown Athlete'}
        </h1>
        
        {/* Renderizado dinámico de los tags del IUser */}
        <div className="flex flex-wrap gap-2 mt-3">
          {user.tags && user.tags.length > 0 ? (
            user.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-bold bg-gray-50 text-gray-400 px-3 py-1 rounded-full uppercase tracking-widest">
                {tag}
              </span>
            ))
          ) : (
            <span className="text-[10px] font-bold bg-gray-50 text-gray-400 px-3 py-1 rounded-full uppercase tracking-widest">
              Standard Athlete
            </span>
          )}
        </div>
      </section>
      {hasError && (
      <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-100 rounded-2xl">
        <p className="text-[10px] font-bold text-red-800 uppercase tracking-widest text-center">
          Unable to load workout history
        </p>
      </div>
    )}

      {/* --- ESTADÍSTICAS: USANDO IUserStats SI EXISTEN --- */}
      <section className="px-6 grid grid-cols-1 gap-4">
        <FeatureCard title="Wods Completed" showBorder borderColor="border-red-800">
          <div className="text-5xl font-black text-iron-950 leading-none mt-1">
            {user.stats?.wodsCompleted || workouts.length}
          </div>
          <div className="w-full bg-gray-100 h-1.5 mt-4 rounded-full overflow-hidden">
            <div className="bg-red-800 h-full w-[70%]" />
          </div>
        </FeatureCard>

        <div className="grid grid-cols-2 gap-4">
          <FeatureCard title="Current Streak">
            <div className="flex items-center gap-2">
              <Trophy size={18} className="text-red-800" />
              <span className="text-3xl font-black text-iron-950">
                {user.stats?.currentStreak || 0}
              </span>
            </div>
          </FeatureCard>

          <FeatureCard title="Personal Records">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} className="text-red-800" />
              <span className="text-3xl font-black text-iron-950">
                {user.stats?.personalRecords || 0}
              </span>
            </div>
            {user.stats?.prsThisMonth && (
              <p className="text-[10px] font-bold text-red-800 uppercase mt-1">
                ↗ +{user.stats.prsThisMonth} this month
              </p>
            )}
          </FeatureCard>
        </div>
      </section>

      {/* --- HISTORIAL: USANDO IWorkout --- */}
      <section className="px-6 mt-10">
        <h2 className="text-xs font-black text-iron-950 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
          <History size={16} /> Saved Workouts
        </h2>
        
        <div className="flex flex-col gap-3">
          {workouts.map((workout) => (
            <div 
              key={workout._id} 
              className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl border-l-4 border-l-iron-950 shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-iron-950">
                  <Dumbbell size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-iron-950 text-sm uppercase leading-tight">
                    {workout.wodId.title}
                  </h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-1">
                    {workout.duration} • {workout.score}
                  </p>
                </div>
              </div>
              <Button variant="outline" className="h-auto text-[10px] font-black text-red-800 uppercase px-4 py-2">
                Select
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProfilePage;