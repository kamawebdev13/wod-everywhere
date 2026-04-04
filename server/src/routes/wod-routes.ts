import { Router } from 'express'
import {
    getWods,
} from '../controllers/wod-controller'
import {
    saveWorkout,
    getSavedWorkout,
    updateWorkout,
    deleteWorkout,
} from '../controllers/workout-controller'
import { authMiddleware } from '../middlewares/auth-middleware'

// ─── WOD router  ───────────────────────────

const wodRouter = Router()

wodRouter.use(authMiddleware)

/** GET  — Generar 3 opciones de WOD */
wodRouter.get('/generate', getWods)

/** POST  — guardar un WOD generado*/
wodRouter.post('/save', saveWorkout)

/** GET  — obtener los entrenamientos guardados del usuario */
wodRouter.get('/saved', getSavedWorkout)

/** PATCH Actualizar resultados (Una sola ruta para todo)
 * Permite actualizar duration, score y notes en una sola llamada
 */
wodRouter.patch('/:id', updateWorkout)

/** DELETE — eliminar un WOD guardado */
wodRouter.delete('/:id', deleteWorkout)

export default wodRouter