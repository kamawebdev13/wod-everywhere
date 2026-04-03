import { Router } from 'express'; 
import { register, login, getProfile } from '../controllers/auth-controller';
import { authMiddleware } from '../middlewares/auth-middleware'

const authRouter = Router();

/** POST crea nuevo usuario*/
authRouter.post('/register', register)

/** POST login con email o username */
authRouter.post('/login', login)

/** GET  obtener perfil de usuario autenticado */
authRouter.get('/profile', authMiddleware, getProfile)

export default authRouter