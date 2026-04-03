import { Schema, model, Document } from 'mongoose';

// 1. Definimos la Interfaz (Requisito: Integridad y Tipado)
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin'; 
  isActive: boolean;     
  age?: number;           
  createdAt: Date;
  updatedAt: Date;
}

// 2. Definimos el Schema
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
    // IMPORTANTE: Se encriptará en el controlador con bcrypt
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { 
  timestamps: true // Requisito: Gestión de fechas automática
});

// 3. Exportamos el modelo
export const User = model<IUser>('User', userSchema);