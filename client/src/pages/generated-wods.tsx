import { useMemo, type ReactElement } from 'react';
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
 * Muestra las opciones de entrenamiento generadas.
 */
export const GeneratedWodsPage = (): ReactElement => {
    // 1. Obtención de hooks de navegación
    const location = useLocation();
    const navigate = useNavigate();

    /**
     * 2. Obtención segura de datos
     * Extraemos los WODs del estado de navegación.
     * Si no existen (ej. acceso directo por URL), devolvemos un array vacío.
     */
    const wods = useMemo((): IWod[] => {
        const typedState = location.state as LocationState | null;
        return typedState?.wods || [];
    }, [location.state]);

    /**
     * 3. Gestión de selección
     * Navega a la página de detalle con el WOD elegido.
     * Importante: Pasamos el objeto completo en el estado.
     */
    const handleSelectWod = (wod: IWod): void => {
        navigate('/selection-page', { 
            state: { selectedWod: wod },
            replace: false 
        });
    };

    /**
     * 4. Renderizado Condicional Pasivo
     * En lugar de un useEffect que redirige y bota al usuario,
     * renderizamos una vista de error/vacía si no hay datos.
     */
    if (wods.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F8F9FA] px-6 text-center">
                <h2 className="text-2xl font-black text-zinc-950 uppercase italic">
                    No hay opciones disponibles
                </h2>
                <p className="text-zinc-600 mt-2 mb-8">
                    Parece que se perdió la conexión con tus resultados.
                </p>
                <button 
                    onClick={() => navigate('/explore')}
                    className="bg-zinc-950 text-white px-8 py-4 font-bold uppercase italic tracking-tighter"
                >
                    Volver a generar
                </button>
            </div>
        );
    }
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