import { type ReactElement } from 'react';
import { Loader2, Umbrella, Trees, Dumbbell, Home, Mountain, Accessibility, Crosshair, Footprints, Target, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Hooks y Componentes existentes
import { useExplore } from '@/hooks/use-explore';
import { LocationSelector } from '@/components/explore/location-selector';
import { EquipmentSelector } from '@/components/explore/equipment-selector';

// Nuevos componentes de limpieza
import { ExploreHeader } from '@/components/explore/explore-header';
import { TargetSection } from '@/components/explore/target-section';

// Mapas de iconos (Constantes fuera del componente)
const locationIcons = { beach: Umbrella, park: Trees, gym: Dumbbell, home: Home, mountains: Mountain };
const targetIcons = { fullbody: Accessibility, upper: Crosshair, legs: Footprints, core: Target, cardio: Heart };

/**
 * EXPLORE PAGE (Smart Container)
 * Configuración dinámica de entrenamientos basada en entorno y objetivos.
 */
export const ExplorePage = (): ReactElement => {
    // Orquestación de lógica y estado
    const { 
        selections, 
        loading, 
        currentEquipmentOptions, 
        handleLocationSelect, 
        toggleEquipment, 
        handleTargetSelect, 
        generateSession,
        isValid
    } = useExplore();

    return (
        <div className="animate-fade-in pb-20 px-4">
            
            <ExploreHeader />

            {/* SECCIÓN 1: Ubicación */}
            <LocationSelector 
                selectedId={selections.locationId} 
                onSelect={handleLocationSelect} 
                icons={locationIcons} 
            />

            {/* SECCIÓN 2: Equipamiento (Condicional a Ubicación) */}
            {selections.locationId && (
                <EquipmentSelector 
                    options={currentEquipmentOptions}
                    selectedIds={selections.equipmentIds}
                    onToggle={toggleEquipment}
                />
            )}

            {/* SECCIÓN 3: Objetivo Muscular */}
            <TargetSection 
                selectedId={selections.targetId}
                onSelect={handleTargetSelect}
                icons={targetIcons}
            />

            {/* ACCIÓN: Generar Sesión */}
            <footer className="mt-14">
                <Button 
                    onClick={generateSession}
                    disabled={loading || !isValid}
                    className="w-full h-16 bg-zinc-950 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-transform active:scale-95 shadow-xl"
                >
                    {loading ? <Loader2 className="animate-spin mr-2" /> : 'Generar Sesión'}
                </Button>
            </footer>
        </div>
    );
};

export default ExplorePage;