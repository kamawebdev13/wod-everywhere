import { setServers } from "node:dns/promises"; 
setServers(["1.1.1.1", "8.8.8.8"]); // Forzar DNS para evitar bloqueos de MongoDB Atlas

import express from 'express';
import cors from 'cors';
import helmet from 'helmet'; 
import dotenv from 'dotenv';
import { connectDB } from './config/db-connection';
import authRouter from './routes/auth-routes'
import { notFound, errorHandler } from './middlewares/error-middleware';
import debug from 'debug';

// Configuración de entorno y logs
dotenv.config();
const log = debug('app:server');

const startServer = async () => {
  try {
    // 1. Conexión a Base de Datos (Requisito: MongoDB)
    await connectDB();

    const app = express();

    // 2. Middlewares de Seguridad y Configuración (Requisito: API General)
    app.use(helmet()); 
    app.use(cors());
    app.use(express.json()); // Requisito: Enviar datos en .json

    // ─── Routes ───────────────────────────────────────────────────────────────────
    app.use('/api/v1/auth', authRouter);
    // ----------------------------------

    // 3. Manejo de Error 404 - Ruta no encontrada (Requisito: Middlewares)
    // Se coloca después de las rutas para capturar lo que no coincida
    app.use(notFound);

    // 4. Manejo de Error 500 - Error de Servidor (Requisito: Middlewares)
    app.use(errorHandler);

    // 5. Encendido del Servidor (Requisito: Express y Entorno)
    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
      log(`Servidor listo en el puerto ${PORT}`);
    });

  } catch (error) {
    log('Error crítico al iniciar el servidor: %O', error);
    process.exit(1); // Detener el proceso si la conexión inicial falla
  }
};

startServer();