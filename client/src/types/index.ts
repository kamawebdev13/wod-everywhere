// Usamos el prefijo 'I' para identificar interfaces rápidamente según estándares
export interface IExercise {
  name: string;
  reps?: number;
  weight?: string;
}

export interface IWod {
  _id: string;
  title: string;
  type: string;
  location: string[];
  equipment: string[];
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

//  AuthContext y el login
export interface IUser {
  id: string;
  email: string;
  name?: string;
  role: 'user' | 'admin';
}

// Tipo para la respuesta del Login
export interface IAuthResponse {
  token: string;
  user: IUser;
}