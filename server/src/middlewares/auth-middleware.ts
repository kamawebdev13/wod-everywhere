import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // 1. Busca el token en la cabecera y extrae el token (quita el "Bearer ")
  const token = req.headers.authorization?.split(' ')[1]; // Formato: Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: 'No hay token, autorización denegada' });
  }

  try {
    // 2. Lo verifica con la clave secreta
   const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as any).user = decoded; // 2. Guardamos los datos del usuario en la petición 
    // y lo pega en la request para que el controlador lo use
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: 'Token no válido' });
  }
};