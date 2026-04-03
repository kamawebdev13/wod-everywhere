import mongoose from 'mongoose';
import debug from 'debug';

const log = debug('app:database');

export const connectDB = async (): Promise<void> => {
  try {
    // 1. Uso de variable de entorno (Requisito: Express y Entorno)
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
      log('Error: MONGODB_URI no está definida en el archivo .env');
      process.exit(1);
    }

    // 2. Conexión con Mongoose
    const conn = await mongoose.connect(mongoUri);

    log(`MongoDB Conectado: ${conn.connection.host}`);
  } catch (error) {
    // 3. Uso de %O para imprimir el objeto de error completo (Requisito de Debug)
    log('Error al conectar a MongoDB: %O', error);
    process.exit(1); // Detener la app si no hay base de datos
  }
};