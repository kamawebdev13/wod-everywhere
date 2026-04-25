// Usamos el prefijo 'I' para identificar interfaces rápidamente según estándares
export interface IExercise {
  name: string;
  reps?: number;
  weight?: string;
  videoUrl?: string;
}

export interface IWod {
  _id: string;
  title: string;
  type: string;
  duration: number;
  location: string[];
  equipment: string[];
  target: string[];
  exercises: IExercise[]; 
  videoUrl?: string;
}

export interface IWorkout {
  _id: string;
  wodId: IWod; // El WOD completo (tras el populate del backend)
  duration: string;
  score: string;
  notes?: string;
  createdAt: string;
}


// interfaz para agrupar los entrenamientos guardados por el usuario.
export interface IWorkoutRecord {
  _id: string;
  duration: string;
  score: string;
  wodId?: {
  title: string;
  };
}

// interfaz para agrupar las estadísticas del dashboard
export interface IUserStats {
  wodsCompleted: number;
  currentStreak: number;
  personalRecords: number;
  prsThisMonth: number;
}

//  AuthContext y el login
export interface IUser {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatarUrl?: string;       // Foto subida por el usuario
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ELITE';         
  tags: string[];          // Ej: ["Functional Fitness", "Endurance Focus"]S
  stats: IUserStats;       // Objeto con las estadísticas dinámicas
}

// Única interfaz  para el fetch de registro (necesaria para el password)
export interface IRegisterRequest extends Omit<IUser, 'id' | 'role' | 'stats'> {
  password: string;
}

// Tipo para la respuesta del Login
export interface IAuthResponse {
  success: boolean;
  token: string;
  user: IUser;
}