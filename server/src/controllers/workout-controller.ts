import { Workout } from "../models/workout-model";
import type { Request, Response, NextFunction } from "express";


// 1. Guarda un WOD generado en el perfil del usuario (Selección del usuario)
export const saveWorkout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Recibimos el ID del WOD que el usuario eligió de los 3 mostrados
    const { wodId } = req.body;
    const userId = (req as any).user?.userId;

    if (!wodId) {
      return res.status(400).json({
        success: false,
        message: "Debes proporcionar el ID del WOD que quieres guardar"
      });
    }

    // Creamos el registro en la colección Workout
    const workout = await Workout.create({
      userId,
      wodId,
      // Al principio puede estar vacío, el usuario lo actualizará al terminar
      duration: req.body.duration || "00:00",
      score: req.body.score || "Pendiente",
      notes: req.body.notes || ""
    });

    res.status(201).json({
      success: true,
      message: "WOD guardado en tu perfil con éxito",
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