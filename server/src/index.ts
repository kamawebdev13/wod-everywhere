// import { setServers } from "node:dns/promises"; 
// // Forzamos DNS para evitar problemas de resolución con MongoDB Atlas en ciertos entornos
// setServers(["1.1.1.1", "8.8.8.8"]); 

import express, { type Application, type Request, type Response } from 'express';
import cors from 'cors';
import helmet from 'helmet'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db-connection';
import authRouter from './routes/auth-routes';
import wodRouter from './routes/wod-routes';
import { notFound, errorHandler } from './middlewares/error-middleware';
import debug from 'debug';

// Carga de variables de entorno desde el archivo .env
dotenv.config();
const log: debug.Debugger = debug('app:server');

// Inicializamos la instancia de Express
const app: Application = express();

/**
 * CONFIGURACIÓN DE MIDDLEWARES
 */

// Helmet añade cabeceras de seguridad para proteger la API
app.use(helmet()); 

/**
 * CONFIGURACIÓN DE CORS:
 * Definimos qué dominios tienen permiso para consultar esta API.
 * Esto soluciona el problema de conexión con tu Frontend en Local.
 */
app.use(cors({
    origin: [
        'http://localhost:5173', // Entorno local de Vite
        'https://wod-everywhere.vercel.app' // Futuro dominio de producción
    ],
    credentials: true
}));

// Permite que el servidor entienda archivos JSON en el cuerpo de las peticiones
app.use(express.json());

/**
 * CONEXIÓN A LA BASE DE DATOS
 */
app.use(async (_req, _res, next) => {
    await connectDB();
    next();
});

/**
 * DEFINICIÓN DE RUTAS
 */

// RUTA RAÍZ: Evita el error "Ruta no encontrada" al abrir la URL en el navegador
app.get('/', (_req: Request, res: Response): void => {
    res.json({
        status: 'online',
        message: 'WOD Everywhere API está funcionando correctamente',
        version: '1.0.0'
    });
});

// RUTA TEST
app.get('/test', (_req: Request, res: Response): void => {
    res.json({ message: 'test ok' });
});
// Rutas funcionales de la aplicación
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/wods', wodRouter);

/**
 * MANEJO DE ERRORES
 */

// Middleware para capturar rutas inexistentes (404)
app.use(notFound);

// Middleware global para capturar errores internos (500)
app.use(errorHandler);

/**
 * LEVANTAMIENTO DEL SERVIDOR
 * Para Vercel, es importante exportar la app.
 */
const PORT: string | number = process.env.PORT || 3000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        log(`Servidor ejecutándose localmente en el puerto ${PORT}`);
    });
}

// Exportamos la app para que Vercel pueda manejar las Serverless Functions
export default app;