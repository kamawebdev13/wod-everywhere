import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user-model";
import type { Request, Response, NextFunction } from "express"; 


//1. Registra un nuevo usuario en la base de datos
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password, level, tags} = req.body;
//2. Comprobamos si el usuario ya existe
    const existing = await User.findOne({ email });
    if (existing) {
  return res.status(400).json({ message: "El email ya está registrado" }); 
}
//3. Encripta la contraseña
    const hashed = await bcrypt.hash(password, 10);
//4. Crea el usuario
    const user = await User.create({ 
    name, 
      email, 
      password: hashed, 
      role: 'user', // Forzamos 'user' por seguridad
      level: level || 'BEGINNER', // Valor por defecto si falla el Step 2
      tags: tags || [],           // Array de intereses (Functional, HIIT, etc.)
      isActive: true,
      // Inicializamos stats para que el Profile no salga con 'undefined'
      stats: {
        wodsCompleted: 0,
        currentStreak: 0,
        personalRecords: 0,
        prsThisMonth: 0
      } 
    });

    return res.status(201).json({ userId: user._id });
  } catch (error) {
    next(error); // 5. Enviamos el error al middleware global de index.ts
  }
};
/**
 * 
 * Auntentificamos un usuario ya logeado con email + password 
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
 //6. Busca el usuario
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
// 7. Compara la contraseña
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }

    //8. Genera el token JWT y añadimos el role al token para facilitar la autorización posterior
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

return res.status(200).json({ 
      token, 
      user: { 
        id: user._id,
        name: user.name, 
        email: user.email, 
        role: user.role,
        level: user.level,
        tags: user.tags,
        stats: user.stats
      }
    });
  } catch (error) {
    next(error); // 9.Uso de middleware de error 
  }
};
/**
 * Retorna el perfil del usuario autenticado.
 * Requiere que el authMiddleware se haya ejecutado antes.
 */
export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // 1. Extraemos el id del token (inyectado por el middleware)
    // Usamos 'as any' para evitar problemas de tipos con req.user /*sugerido por Gemini*/
    const userId = req.user?.userId;

    if (!userId) {
     return res.status(401).json({ message: 'No autenticado' });
    }

    // 2. Buscamos al usuario y excluimos la contraseña por seguridad
    const user = await User.findById(userId).select('-password');

    if (!user) {
  return res.status(404).json({ message: 'Usuario no encontrado' });
}

    // 3. Respuesta exitosa
    return res.status(200).json(user);

  } catch (error) {
    next(error); 
  }
};