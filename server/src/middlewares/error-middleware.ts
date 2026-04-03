import type { Request, Response, NextFunction } from 'express'
import debug from 'debug';

const log = debug('app:error');

// Captura errores de rutas que no existen
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ error: `Ruta ${req.originalUrl} no encontrada` });
};
// Captura cualquier error que llegue hasta aquí
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  log('Error detectado: %O', err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    // Solo mostramos el stack de error si no estamos en producción/*SUGERIDO POR GEMINI*/
    stack: process.env.NODE_ENV === 'production' ? null : err.stack 
  });
};