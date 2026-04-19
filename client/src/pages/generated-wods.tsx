import { useEffect, useMemo, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { type IWod } from '@/types';
import { WodOptionCard } from '@/components/explore/wod-option-card';
import { LevelUpBanner } from '@/components/explore/level-up-banner';

/**
 * Página: GeneratedWodsPage
 * Muestra las opciones de entrenamiento generadas.
 * Punto 2: Robustez - Gestiona la ausencia de datos mediante redirección automática.
 */
export const GeneratedWodsPage = (): ReactElement | null => {
    const location = useLocation();
    const navigate = useNavigate();

    /**
     * Punto 1: Integridad y Rendimiento
     * Usamos useMemo para que la referencia de 'wods' solo cambie
     * si 'location.state' realmente cambia.
     */
    const wods = useMemo(() => {
        const state = location.state as { wods: IWod[] } | null;
        return state?.wods || [];
    }, [location.state]); // Solo se recalcula si cambia el estado de navegación

    /**
     * EFECTO DE SEGURIDAD (Blindaje contra alerts)
     * Si el usuario llega aquí sin WODs (ej. refresco de página),
     * lo devolvemos a la fase de configuración sin interrumpir con alertas.
     */
    useEffect(() => {
        if (wods.length === 0) {
            navigate('/explore', { replace: true });
        }
    }, [wods, navigate]);

    /**
     * Gestión de selección de entrenamiento.
     */
    const handleSelectWod = (wod: IWod): void => {
        navigate('/selection-page', { state: { selectedWod: wod } });
    };

    // Si no hay WODs, no renderizamos nada mientras se ejecuta el useEffect
    if (wods.length === 0) return null;

    return (
        <div className="animate-fade-in pb-20 px-6 bg-[#F8F9FA] min-h-screen">
            <header className="py-10">
                <span className="text-red-600 font-bold text-[10px] tracking-widest uppercase italic">
                    Resultados
                </span>
                <h1 className="text-5xl font-black text-zinc-950 uppercase tracking-tighter leading-[0.8] mt-2 italic">
                    Tus <br /> Opciones
                </h1>
            </header>

            <div className="space-y-10">
                {wods.map((wod, index) => (
                    <WodOptionCard 
                        key={wod._id} 
                        wod={wod} 
                        // El primer WOD se marca como la recomendación del motor
                        isRecommended={index === 0} 
                        onSelect={handleSelectWod}
                    />
                ))}
            </div>
            
            <LevelUpBanner />
        </div>
    );
};

export default GeneratedWodsPage;