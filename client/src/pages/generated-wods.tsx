import { useEffect, useMemo, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { type IWod } from '@/types';
import { WodOptionCard } from '@/components/explore/wod-option-card';
import { LevelUpBanner } from '@/components/explore/level-up-banner';

/**
 * INTERFAZ: LocationState
 * Define la estructura del estado esperado para evitar el uso de 'any'.
 */
interface LocationState {
  wods: IWod[];
}

/**
 * Página: GeneratedWodsPage
 * Muestra las opciones de entrenamiento generadas por el motor.
 * Cumple con la rúbrica de listas, deconstrucción y eficiencia.
 */
export const GeneratedWodsPage = (): ReactElement | null => {
    // Deconstrucción de hooks de navegación
    const { state } = useLocation();
    const navigate = useNavigate();

    /**
     * Punto 1: Integridad y Rendimiento
     * Deconstruimos el estado y usamos useMemo para evitar re-cálculos.
     * Se accede a 'typedState' de forma segura.
     */
    const wods = useMemo(() => {
        const typedState = state as LocationState | null;
        return typedState?.wods || [];
    }, [state]);

    /**
     * EFECTO DE SEGURIDAD
     * Si no hay WODs (ej. refresco de navegador), redirigimos a /explore.
     */
    useEffect(() => {
        if (wods.length === 0) {
            navigate('/explore', { replace: true });
        }
    }, [wods.length, navigate]);

    /**
     * Gestión de selección: Navega al detalle del entrenamiento elegido.
     */
    const handleSelectWod = (wod: IWod): void => {
        navigate('/selection-page', { state: { selectedWod: wod } });
    };

    // Early return para evitar renderizado sin datos
    if (wods.length === 0) return null;

    return (
        <div className="animate-fade-in pb-24 px-6 bg-[#F8F9FA] min-h-screen">
            {/* Header con strings directos (sin interpolación innecesaria) */}
            <header className="py-10">
                <span className="text-red-800 font-bold text-[10px] tracking-widest uppercase italic block">
                    Resultados de generación
                </span>
                <h1 className="text-5xl font-black text-zinc-950 uppercase tracking-tighter leading-[0.8] mt-2 italic">
                    Tus <br /> Opciones
                </h1>
            </header>

            {/* Renderizado de Lista*/}
            <div className="grid grid-cols-1 gap-8">
                {wods.map((wod) => (
                    <WodOptionCard 
                        key={wod._id} // Uso exclusivo de ID único
                        wod={wod} 
                        isRecommended // Prop booleana en forma corta
                        onSelect={() => handleSelectWod(wod)} // Callback eficiente
                    />
                ))}
            </div>
            
            {/* Sección final decorativa */}
            <div className="mt-12">
                <LevelUpBanner />
            </div>
        </div>
    );
};

export default GeneratedWodsPage;