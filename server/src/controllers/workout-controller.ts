import { User } from "../models/user-model";
import { Workout } from "../models/workout-model";
import type { Request, Response, NextFunction } from "express";

/**
 * INTERFAZ DE SOLICITUD AUTENTICADA
 * Define la estructura de req.user para evitar el uso de 'any'.
 */
interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

// 1. Guarda un WOD generado en el perfil del usuario
export const saveWorkout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { wodId, duration, score, notes } = req.body;
    const userId = req.user?.userId;

    if (!wodId) {
      return res.status(400).json({
        success: false,
        message: "Debes proporcionar el ID del WOD"
      });
    }

    const workout = await Workout.create({
      userId,
      wodId,
      duration: duration || "00:00",
      score: score || "0%",
      notes: notes || ""
    });

    await User.findByIdAndUpdate(userId, {
      $inc: { "stats.wodsCompleted": 1 }
    });

    return res.status(201).json(workout);

  } catch (error) {
    next(error);
  }
};

// 2. Obtener entrenamientos 
export const getSavedWorkout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
  
    const workouts = await Workout.find({ userId: req.user?.userId })
      .populate('wodId')
      .sort({ createdAt: -1 });

    return res.status(200).json(workouts);
  } catch (error) {
    next(error);
  }
};

// 3. Actualizar entrenamiento 
export const updateWorkout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { duration, score, notes } = req.body;
    const updated = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?.userId },
      { duration, score, notes },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Entrenamiento no encontrado o no autorizado"
      });
    }

    return res.status(200).json(updated);
  } catch (error) {
    next(error);
  }
};

// 4. Eliminar entrenamiento 
export const deleteWorkout = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const deleted = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: req.user?.userId,
    });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Entrenamiento no encontrado"
      });
    }

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};