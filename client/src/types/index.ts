export interface Exercise {
  name: string;
  reps?: number;
  weight?: string;
}

export interface Wod {
  _id: string;
  title: string;
  type: string;
  location: string[];
  equipment: string[];
  exercises: Exercise[];
  videoUrl?: string;
}

export interface Workout {
  _id: string;
  wodId: Wod; 
  duration: string;
  score: string;
  notes?: string;
  createdAt: string;
}