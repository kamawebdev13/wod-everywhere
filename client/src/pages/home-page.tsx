import { useState, useEffect, type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Play, Zap } from 'lucide-react';
import FeatureCard from '@/components/common/feature-card';
import { Button } from '@/components/ui/button';
import { workoutService } from '@/services/api';
import type { IUser, IWorkout } from '@/types';

export const HomePage = (): ReactElement => {
    const navigate = useNavigate();
    const [latestWorkout, setLatestWorkout] = useState<IWorkout | null>(null);
    const [loading, setLoading] = useState(true);

    const user = JSON.parse(localStorage.getItem('user') || '{}') as IUser;

    // Lógica de Fecha Dinámica para el Header
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase();

    /**
       * pide al backend todos los entrenamientos guardados.
       */
    useEffect(() => {
        const fetchLatest = async () => {
            try {
                // 1. LLAMADA AL BACKEND:
                // Usamos el servicio 'getAll' que configuramos en api.ts.
                // Esta función hace el fetch a "/api/v1/wods/saved".
                const res = await workoutService.getAll();

                // 2. VALIDACIÓN DE DATOS:
                // Comprobamos que 'res' exista y que tenga al menos un entrenamiento.
                // Recordamos que el backend devuelve un array de objetos IWorkout.
                if (res && res.length > 0) {
                // 3. SELECCIÓN DEL "FEATURED":
                // Guardamos en el estado local el primer elemento (índice 0).
                // Como el backend suele devolverlos ordenados por fecha (desc),
                // res[0] será el último entrenamiento que el usuario guardó.
                    setLatestWorkout(res[0]);
                }
            } catch {
                // 4. GESTIÓN DE SILENCIO :
                // Si el servidor está caído o el token expiró, entramos aquí.
               // No ponemos logs para evitar ensuciar la consola en producción.
            } finally {
                // 5. CIERRE DEL ESTADO DE CARGA:
                // Tanto si la petición fue un éxito como si falló, 
                // quitamos el indicador de "Loading..." para renderizar la UI final
                setLoading(false);
            }
        };
        // Ejecutamos la función que acabamos de definir arriba.
        fetchLatest();
        // El array vacío [] indica que esto solo se ejecuta UNA VEZ: 
        // justo cuando el usuario entra en la HomePage.
    }, []);

    /**
     * Navega a la SelectionPage pasando exactamente el objeto 'selectedWod'
     * para que coincida con la desestructuración del componente.
     */
    const handleStartWorkout = () => {
        if (latestWorkout?.wodId) {
            navigate('/selection', {
                state: { selectedWod: latestWorkout.wodId }
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-24">

            {/* --- HEADER DINÁMICO --- */}
            <section className="px-8 pt-12 pb-10 bg-white">
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                    {dayName}S ARE FOR INTENSITY • {dateString}
                </p>
                <h1 className="text-4xl font-black text-black leading-tight">
                    Welcome back, {user.name?.split(' ')[0] || 'Athlete'}
                </h1>
                <p className="text-lg text-gray-600 font-medium tracking-tight">Ready for today's challenge?</p>
            </section>

            {/* --- FEATURED WORKOUT (DINÁMICO) --- */}
            <section className="px-6 -mt-4 mb-8">
                <div className="relative bg-white border-2 border-red-700 p-8 shadow-2xl overflow-hidden">
                    {/* Detalle estético de fondo */}
                    <div className="absolute top-0 right-0 text-[180px] font-black text-gray-50 opacity-10 select-none leading-none -mr-10">X</div>

                    <div className="relative z-10 text-left">
                        <span className="inline-block bg-red-100 text-red-800 text-[10px] font-black px-3 py-1 uppercase tracking-tighter mb-6">
                            FEATURED WORKOUT
                        </span>

                        <h2 className="text-6xl font-black text-black italic uppercase leading-[0.8] mb-10 tracking-tighter break-words">
                            {loading ? "..." : (latestWorkout?.wodId.title || "THE GHOST")}
                        </h2>

                        <div className="grid grid-cols-2 gap-8 mb-10">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">TYPE</p>
                                <p className="text-lg font-black uppercase">
                                    {latestWorkout?.wodId.type || "AMRAP 20"}
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">EQUIPMENT</p>
                                <p className="text-lg font-black uppercase">
                                    {latestWorkout?.wodId.equipment?.[0] || "BODYWEIGHT"}
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={handleStartWorkout}
                            disabled={loading || !latestWorkout}
                            className="w-full bg-[#1A1A1A] hover:bg-black text-white font-bold py-8 rounded-none flex items-center justify-center gap-3 tracking-widest transition-all uppercase"
                        >
                            START WORKOUT <Play size={16} fill="white" />
                        </Button>
                    </div>
                </div>
            </section>

            {/* --- BANNER SAVED WODS (DINÁMICO) --- */}
            <section className="px-6 mb-10">
                <div
                    onClick={() => navigate('/profile')}
                    className="cursor-pointer"
                >
                    <FeatureCard
                        title="SAVED WODS"
                        description="Your personal collection of high-intensity benchmarks."
                        icon={Heart}
                    />
                </div>
            </section>

            {/* --- RECENT PERFORMANCE (DINÁMICO) --- */}
            <section className="px-6 pb-10">
                <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.3em] mb-6 border-l-2 border-black pl-3 text-left">
                    RECENT PERFORMANCE
                </h3>

                <div className="bg-[#EFEFEF] p-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-black p-4">
                            <Zap size={24} className="text-white" fill="currentColor" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-black text-sm uppercase leading-tight">
                                {latestWorkout?.wodId.title || "STRENGTH SESSION"}
                            </h4>
                            <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">
                                COMPLETED {latestWorkout?.createdAt ? 'RECENTLY' : 'TODAY'}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-3xl font-black">
                            {user.stats?.personalRecords || 0}
                        </span>
                        <span className="text-[10px] font-bold ml-1 text-gray-500 uppercase">PRs</span>
                    </div>
                </div>
            </section>
        </div>
    );
};