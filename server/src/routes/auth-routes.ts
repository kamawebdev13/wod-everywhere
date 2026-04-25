import { Router } from 'express'; 
import { register, login, getProfile, updateProfile } from '../controllers/auth-controller';
import { authMiddleware } from '../middlewares/auth-middleware'

const authRouter = Router();

/** * POST /api/auth/register
 * Recibe IRegisterRequest (Datos de Step 1 + Step 2)
 */
authRouter.post('/register', register)

/** POST login con email o username */
authRouter.post('/login', login)

/** GET  obtener perfil de usuario autenticado */
authRouter.get('/profile', authMiddleware, getProfile)

/** * PATCH /api/auth/profile - ACTUALIZAR datos (Nivel, Nombre, etc.)
 
 */
authRouter.patch('/profile', authMiddleware, updateProfile);

export default authRouter