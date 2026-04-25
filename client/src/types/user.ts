// Define el nivel del atleta para un tipado estricto

export type AthleteLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ELITE';

export interface IUserStats {
  wodsCompleted: number;
  currentStreak: number;
  personalRecords: number;
  prsThisMonth: number;
}

export interface UserSettings {
    id: string;
      email: string;
      name: string;
      role: 'user' | 'admin';
      avatarUrl?: string;       // Foto subida por el usuario
      level: 'BEGINNER' | 'INTERMEDIATE' | 'ELITE';         
      tags: string[];         
      stats: IUserStats;       
  
}