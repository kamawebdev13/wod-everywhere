import { Schema, model, Document, Types } from 'mongoose';

// 1. Definimos la Interfaz (Requisito: Integridad y Tipado)
export interface IWorkout extends Document {
  userId: Types.ObjectId; // Quién lo hizo
  wodId: Types.ObjectId;  // Qué Wod hizo (Relación)
  duration: string;       // Tiempo total (ej: "15:40")
  score: string;          // Ej: "15 rounds" o "RX"
  notes: string;          // "Me costaron las flexiones"
  date: Date;
}
// 2. Definimos el Schema 
const workoutSchema = new Schema<IWorkout>({
  userId:   { type: Schema.Types.ObjectId, ref: 'User', required: true },
  wodId:    { type: Schema.Types.ObjectId, ref: 'Wod', required: true },
  duration: { type: String, required: true},
  score:    { type: String, required: true },
  notes:    { type: String },
  date:     { type: Date, default: Date.now }
}, { timestamps: true });

export const Workout = model<IWorkout>('Workout', workoutSchema);