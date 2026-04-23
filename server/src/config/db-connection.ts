import mongoose from 'mongoose';
import debug from 'debug';

const log = debug('app:database');

export const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      log('Error: MONGODB_URI no está definida en el archivo .env');
      return; // En serverless nunca usamos process.exit() porque mataría la función entera
    }

    // Si Mongoose ya tiene conexión activa, no reconectamos
    // Esto es importante en Vercel porque cada petición puede reutilizar la misma instancia
    if (mongoose.connection.readyState === 1) {
      log('MongoDB ya conectado');
      return;
    }

    const conn = await mongoose.connect(mongoUri);
    log(`MongoDB Conectado: ${conn.connection.host}`);

  } catch (error) {
    // Solo logueamos el error pero NO salimos del proceso
    // Si usáramos process.exit(1) aquí, Vercel mataría la función y daría 404 en todas las rutas
    log('Error al conectar a MongoDB: %O', error);
  }
};