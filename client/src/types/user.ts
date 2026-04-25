// 1. Tipado estricto para los niveles 
export type AthleteLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ELITE';

// 2. Interfaz para las estadísticas (Muy útil para las gráficas del Profile)
export interface IUserStats {
  wodsCompleted: number;
  currentStreak: number;
  personalRecords: number;
  prsThisMonth: number;
}

/**
 * INTERFAZ: IUser
 * Representa al usuario autenticado en el Frontend.
 */
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatarUrl?: string; // URL de Supabase Storage
  level: AthleteLevel; // REUTILIZAMOS el tipo definido arriba
  tags: string[];      
  stats: IUserStats;   
}