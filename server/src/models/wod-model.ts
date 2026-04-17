import { Schema, model, Document } from 'mongoose';

// 1. Definimos la Interfaz (Requisito: Integridad y Tipado)
interface IExercise {
  name: string;
  reps?: number;
  weight?: string; // Ej: "20kg" o "Bodyweight"
}

export interface IWod extends Document {
  title: string;
  type: string; 
  duration: number;
  location: string[];
  equipment: string[];
  target: string[];
  exercises: IExercise[];
  videoUrl?: string;
}
// 2. Definimos el Schema
const exerciseSchema = new Schema<IExercise>({
  name: { type: String, required: true },
  reps: { type: Number },
  weight: { type: String }
}, { _id: false });

const wodSchema = new Schema<IWod>({
  title:     { type: String, required: true },
  type:      { type: String }, 
  duration:  { type: Number, required: true, default: 20 },
  location:  { type: [String] },
  equipment: { type: [String] },
  target:    { type: [String] },
  exercises: [exerciseSchema],
  videoUrl:  { type: String }
}, { timestamps: true });

export const Wod = model<IWod>('Wod', wodSchema);