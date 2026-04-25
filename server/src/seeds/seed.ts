import { setServers } from "node:dns/promises"
setServers(["1.1.1.1", "8.8.8.8"])

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import debug from 'debug';
import bcrypt from 'bcrypt';
import { connectDB } from '../config/db-connection';
import { Wod } from '../models/wod-model';
import { Workout } from '../models/workout-model';
import { User } from '../models/user-model';

dotenv.config();
// ─── Seed exercises: Aqui sembramos nuestra database con toda la coleccion de ejercicios posibles

// **
//  * Inicialización del logger de debug.
//  * Se asegura que 'log' esté disponible en el scope superior.
//  */
const log: debug.Debugger = debug('app:seed');

const wods = [
    {
        title: "Gym Beast Mode",
        type: "EMOM 15",
        duration: 15,
        location: ["gym", "box"],
        equipment: ["barbell", "pullup_bar"],
        target: ["legs", "upper"],
        exercises: [
            { name: "Back Squat", reps: 10, weight: "60kg" },
            { name: "Pull-ups", reps: 10, weight: "Bodyweight" }
        ],
        videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8"
    },
    {
        title: "Mountain Warrior",
        type: "For Time",
        duration: 30,
        location: ["mountains"],
        equipment: ["none", "bodyweight"],
        target: ["legs", "cardio"],
        exercises: [
            { name: "Hill Sprints", reps: 5, weight: "Bodyweight" },
            { name: "Hiking Lunges", reps: 20, weight: "Bodyweight" },
            { name: "Mountain Climbers", reps: 40, weight: "Bodyweight" }
        ],
        videoUrl: "https://www.youtube.com/embed/D3_tZ_0oD9U"
    },
    {
        title: "Beach Burner",
        type: "Tabata",
        duration: 4,
        location: ["beach"],
        equipment: ["none", "bodyweight"],
        target: ["fullbody", "cardio"],
        exercises: [
            { name: "Sand Run", reps: 1, weight: "60s" },
            { name: "Bear Crawl en Arena", reps: 1, weight: "30s" },
            { name: "Burpees", reps: 15, weight: "Bodyweight" }
        ],
        videoUrl: "https://www.youtube.com/embed/6KLSCi2pGhQ"
    },
    {
        title: "Home Strength",
        type: "AMRAP 20",
        duration: 20,
        location: ["home"],
        equipment: ["dumbbells"],
        target: ["upper", "core"],
        exercises: [
            { name: "Dumbbell Row", reps: 10, weight: "12kg" },
            { name: "Push-up", reps: 15, weight: "Bodyweight" },
            { name: "Sit-up", reps: 20, weight: "Bodyweight" }
        ],
        videoUrl: "https://www.youtube.com/embed/roCP6wCXPqo"
    },
    {
        title: "Park Essentials",
        type: "For Time",
        duration: 20,
        location: ["park"],
        equipment: ["pullup_bar"],
        target: ["fullbody"],
        exercises: [
            { name: "Pull-up", reps: 8, weight: "Bodyweight" },
            { name: "Air Squat", reps: 20, weight: "Bodyweight" },
            { name: "Toes to Bar", reps: 10, weight: "Bodyweight" }
        ],
        videoUrl: "https://www.youtube.com/embed/eGo4IYlbE5g"
    },
    {
        title: "High Altitude HIIT",
        type: "AMRAP 15",
        duration: 15,
        location: ["mountains", "outdoor"],
        equipment: ["none", "bodyweight"],
        target: ["cardio", "fullbody"],
        exercises: [
            { name: "Jumping Jacks", reps: 50, weight: "Bodyweight" },
            { name: "Burpees", reps: 10, weight: "Bodyweight" },
            { name: "High Knees", reps: 40, weight: "Bodyweight" }
        ],
        videoUrl: "https://www.youtube.com/embed/ml6cT4AZdqI"
    },
    {
        title: "Ocean Core",
        type: "3 Rounds",
        duration: 10,
        location: ["beach", "outdoor"],
        equipment: ["none", "bodyweight"],
        target: ["core"],
        exercises: [
            { name: "Plank", reps: 1, weight: "60s" },
            { name: "V-up", reps: 15, weight: "Bodyweight" },
            { name: "Hollow Body Hold", reps: 1, weight: "30s" }
        ],
        videoUrl: "https://www.youtube.com/embed/DHD1-2P94DI"
    },
    {
        title: "Kettlebell Power",
        type: "EMOM 10",
        duration: 10,
        location: ["home", "gym", "box"],
        equipment: ["kettlebell"],
        target: ["fullbody", "strength"],
        exercises: [
            { name: "Kettlebell Swing", reps: 15, weight: "16kg" },
            { name: "Goblet Squat", reps: 12, weight: "16kg" }
        ],
        videoUrl: "https://www.youtube.com/embed/sSESeQAir2M"
    },
    {
        title: "Street Workout Pro",
        type: "5 Rounds",
        duration: 25,
        location: ["park"],
        equipment: ["pullup_bar"],
        target: ["upper"],
        exercises: [
            { name: "Muscle-up", reps: 3, weight: "Bodyweight" },
            { name: "Dip en paralelas", reps: 10, weight: "Bodyweight" },
            { name: "Chin-up", reps: 8, weight: "Bodyweight" }
        ],
        videoUrl: "https://www.youtube.com/embed/19-SScBTMRU"
    },
    {
        title: "Heavy Metal Cross",
        type: "For Time",
        duration: 15,
        location: ["box", "gym"],
        equipment: ["barbell", "box"],
        target: ["fullbody"],
        exercises: [
            { name: "Thruster", reps: 15, weight: "40kg" },
            { name: "Box Jump", reps: 15, weight: "60cm" },
            { name: "Power Clean", reps: 10, weight: "50kg" }
        ],
        videoUrl: "https://www.youtube.com/embed/L219gBDGBCg"
    }
];
const users = [
    { email: 'admin@wodeverywhere.com', password: 'Admin1234!' },
    { email: 'test@wodeverywhere.com', password: 'Test1234!' },
    { email: 'athlete@wodeverywhere.com', password: 'Athlete1234!' }
];
/**
 * PROCESO DE SEMBRADO: seed
 * Limpia y repuebla la base de datos con datos de prueba estructurados.
 */
const seed = async (): Promise<void> => {
    try {
        await connectDB();
        log('Database connected.');

        // 1. Limpieza de colecciones existentes
        await Wod.deleteMany({});
        await Workout.deleteMany({});
        await User.deleteMany({});
        log('Collections cleared.');

        // 2. Inserción de WODs variados
        await Wod.insertMany(wods);
        log('%d WODs inserted.', wods.length);

        // 3. Creación de usuario de prueba con perfil de atleta
        const hashedPassword = await bcrypt.hash('Test1234!', 10);
        await User.create({
            name: 'Athlete One',
            email: 'test@wodeverywhere.com',
            password: hashedPassword,
            level: 'INTERMEDIATE',
            tags: ['STRENGTH', 'ENGINE'],
            stats: { wodsCompleted: 0 }
        });
        log('Test user created.');

        log('SEED COMPLETED SUCCESSFULLY');

        // Cierre de conexión y salida limpia
        await mongoose.connection.close();
        process.exit(0);

    } catch (error: unknown) {
        log('Seed error: %O', error);
        process.exit(1);
    }
};

// Ejecución del script
void seed();