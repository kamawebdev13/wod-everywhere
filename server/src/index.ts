import { setServers } from "node:dns/promises"; 
setServers(["1.1.1.1", "8.8.8.8"]); // Forzar DNS para evitar bloqueos de MongoDB Atlas

import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db-connection';
import authRouter from './routes/auth-routes'
import wodRouter from './routes/wod-routes'
import { notFound, errorHandler } from './middlewares/error-middleware';
import debug from 'debug';

// Configuración de entorno y logs
dotenv.config();
const log = debug('app:server');

const app = express();

// 2. Middlewares de Seguridad y Configuración (Requisito: API General)
app.use(helmet()); 
app.use(cors());
app.use(express.json()); // Requisito: Enviar datos en .json

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/wods', wodRouter);
// ----------------------------------

// 3. Manejo de Error 404 - Ruta no encontrada (Requisito: Middlewares)
// Se coloca después de las rutas para capturar lo que no coincida
app.use(notFound);

// 4. Manejo de Error 500 - Error de Servidor (Requisito: Middlewares)
app.use(errorHandler);

// Conexión a DB (Requisito: MongoDB)
connectDB()
  .then(() => log('Base de datos conectada correctamente'))
  .catch(err => log('Error crítico al conectar DB: %O', err));

export default app;