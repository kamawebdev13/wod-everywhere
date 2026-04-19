import { User } from "../models/user-model";
import { Workout } from "../models/workout-model";
import type { Request, Response, NextFunction } from "express";


// 1. Guarda un WOD generado en el perfil del usuario (Selección del usuario)
export const saveWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Extraemos TODO lo que mandamos desde el frontend
    const { wodId, duration, score, notes } = req.body;
    const userId = (req as any).user?.userId;

    if (!wodId) {
      return res.status(400).json({
        success: false,
        message: "Debes proporcionar el ID del WOD"
      });
    }

    // 2. Creamos el registro con los datos REALES del entrenamiento
    const workout = await Workout.create({
      userId,
      wodId,
      duration: duration || "00:00", // Si llega de la ResumePage, usará el tiempo real
      score: score || "0%",          // Si llega de la ResumePage, usará el % real
      notes: notes || ""             // Si llega de la ResumePage, usará las notas
    });

    // ACTUALIZACIÓN DE ESTADÍSTICAS DEL ATLETA
    await User.findByIdAndUpdate(userId, {
      $inc: { "stats.wodsCompleted": 1 } // Incrementa en 1 el contador
    });

    res.status(201).json({
      success: true,
      message: "¡Entrenamiento guardado con éxito!",
      data: workout
    });

  } catch (error) {
    next(error);
  }
};

// 2. Obtener entrenamiento guardado del usuario logueado
export const getSavedWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const workouts = await Workout.find({ userId: (req as any).user?.userId })
      .populate('wodId') // Crucial para ver los detalles del ejercicio
      .sort({ createdAt: -1 }); // Los más recientes primero

    res.json({
      success: true,
      data: workouts
    });
  } catch (error) {
    next(error);
  }
};

// 3. Actualizar un entrenamiento (Solo si es el dueño)
export const updateWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { duration, score, notes } = req.body;
    const updated = await Workout.findOneAndUpdate(
      { _id: req.params.id, userId: (req as any).user?.userId },
      { duration, score, notes }, // Solo permitimos cambiar estos 3 campos
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Entrenamiento no encontrado o no autorizado" });
    }

    res.json({ success: true, data: updated });
  } catch (error) {
    next(error);
  }
};

// 4. Eliminar un entrenamiento (Solo si es el dueño)
export const deleteWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleted = await Workout.findOneAndDelete({
      _id: req.params.id,
      userId: (req as any).user?.userId,
    });

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Entrenamiento no encontrado" });
    }

    res.json({ success: true, message: "Eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};