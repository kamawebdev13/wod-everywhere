import { setServers } from "node:dns/promises"
setServers(["1.1.1.1", "8.8.8.8"])

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from '../config/db-connection';
import { Wod } from '../models/wod-model';
import { Workout } from '../models/workout-model';
import { User } from '../models/user-model';

dotenv.config();
// ─── Seed exercises: Aqui sembramos nuestra database con toda la coleccion de ejercicios posibles


const wods = [
    {
        title: "Gym Beast Mode",
        type: "EMOM 15",
        location: ["gym", "box"],
        equipment: ["barbell", "pull-up bar"],
        target: ["legs", "back"],
        exercises: [
            { name: "Back Squat", reps: 10, weight: "60kg" },
            { name: "Pull-ups", reps: 10, weight: "Bodyweight" }
        ],
        videoUrl: "https://www.youtube.com/embed/ultWZbUMPL8"
    },
    {
        title: "Mountain Warrior",
        type: "For Time",
        location: ["mountains"],
        equipment: ["none"],
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
        location: ["beach"],
        equipment: ["none"],
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
        location: ["mountains", "outdoor"],
        equipment: ["none"],
        target: ["cardio", "fullbody"],
        exercises: [
            { name: "Jumping Jacks", reps: 50, weight: "Bodyweight" },
            { name: "Burpees", reps: 10, weight: "Bodyweight" },
            { name: "High Knees", reps: 40, weight: "Bodyweight" }
        ]
    },
    {
        title: "Ocean Core",
        type: "3 Rounds",
        location: ["beach", "outdoor"],
        equipment: ["none"],
        target: ["core"],
        exercises: [
            { name: "Plank", reps: 1, weight: "60s" },
            { name: "V-up", reps: 15, weight: "Bodyweight" },
            { name: "Hollow Body Hold", reps: 1, weight: "30s" }
        ]
    },
    {
        title: "Kettlebell Power",
        type: "EMOM 10",
        location: ["home", "gym", "box"],
        equipment: ["kettlebell"],
        target: ["fullbody", "strength"],
        exercises: [
            { name: "Kettlebell Swing", reps: 15, weight: "16kg" },
            { name: "Goblet Squat", reps: 12, weight: "16kg" }
        ]
    },
    {
        title: "Street Workout Pro",
        type: "5 Rounds",
        location: ["park"],
        equipment: ["pullup_bar"],
        target: ["upper"],
        exercises: [
            { name: "Muscle-up", reps: 3, weight: "Bodyweight" },
            { name: "Dip en paralelas", reps: 10, weight: "Bodyweight" },
            { name: "Chin-up", reps: 8, weight: "Bodyweight" }
        ]
    },
    {
        title: "Heavy Metal Cross",
        type: "For Time",
        location: ["box", "gym"],
        equipment: ["barbell", "box"],
        target: ["fullbody"],
        exercises: [
            { name: "Thruster", reps: 15, weight: "40kg" },
            { name: "Box Jump", reps: 15, weight: "60cm" },
            { name: "Power Clean", reps: 10, weight: "50kg" }
        ]
    }
];

const users = [
    { email: 'admin@wodeverywhere.com', password: 'Admin1234!' },
    { email: 'test@wodeverywhere.com', password: 'Test1234!' },
    { email: 'athlete@wodeverywhere.com', password: 'Athlete1234!' }
];

// ─── Sembrado de la base de datos ─────────────────────────────────────────────────────────────
const seed = async () => {
    try {
        await connectDB();

        console.log('🌱 Seeding database...');

        // 1. Limpiamos la data existente para evitar duplicados
        await Wod.deleteMany({});
        await Workout.deleteMany({});
        await User.deleteMany({});

        // 2. Insertamos los WODs (Usamos el array de datos, no el modelo)
        await Wod.insertMany(wods);
        console.log(`✅ ${wods.length} WODs inserted`);

        // 3. Insertamos los usuarios
        // Usamos User.create para que se ejecute el middleware 'pre-save' de bcrypt
        for (const userData of users) {
            await User.create(userData);
        }
        console.log(`✅ ${users.length} users inserted`);

        console.log('\n📋 Test credentials:');
        console.log('  admin@wodeverywhere.com / Admin1234!');
        console.log('  test@wodeverywhere.com  / Test1234!');
        console.log('  athlete@wodeverywhere.com / Athlete1234!');

        await mongoose.connection.close();
        process.exit(0);
        
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};