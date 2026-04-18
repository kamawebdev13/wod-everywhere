import { Schema, model, Document } from 'mongoose';

// 1. INTERFAZ: Añadimos la identidad atlética y las estadísticas
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin'; 
  isActive: boolean;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ELITE';
  tags: string[]; // ['FUNCTIONAL', 'ENDURANCE', etc.]
  avatarUrl?: string;
  stats: {
    totalWorkouts: number;
    currentStreak: number;
    personalRecords: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

// 2. SCHEMA: Definimos cómo se guardan estos datos
const userSchema = new Schema<IUser>({
  name: { 
    type: String, 
    required: [true, 'El nombre es obligatorio'] 
  },
  email: { 
    type: String, 
    required: [true, 'El correo es obligatorio'], 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { 
    type: String, 
    required: [true, 'La contraseña es obligatoria'] 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  // --- CAMPOS PARA ONBOARDING Y PROFILE ---
  level: {
    type: String,
    enum: ['BEGINNER', 'INTERMEDIATE', 'ELITE'],
    default: 'BEGINNER'
  },
  tags: {
    type: [String], // Array de strings
    default: []
  },
  avatarUrl: {
    type: String,
    default: ''
  },
  stats: {
    totalWorkouts: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    personalRecords: { type: Number, default: 0 }
  }
}, { 
  timestamps: true 
});

export const User = model<IUser>('User', userSchema);