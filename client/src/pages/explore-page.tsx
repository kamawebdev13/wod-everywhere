import { type ReactElement } from 'react';
import {
    Umbrella, Trees, Dumbbell, Home, Mountain,
    Accessibility, Crosshair, Footprints, Target, Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';

// Capa de Lógica (Smart Hook)
import { useExplore } from '@/hooks/use-explore';

// Componentes Stateless (Dumb Components)
import { LocationSelector } from '@/components/explore/location-selector';
import { EquipmentSelector } from '@/components/explore/equipment-selector';
import { ExploreHeader } from '@/components/explore/explore-header';
import { TargetSection } from '@/components/explore/target-section';
import { LoadingOptions } from '@/components/explore/loading-options';

// Mapas de iconos tipados (Constantes inmutables)
const locationIcons = { beach: Umbrella, park: Trees, gym: Dumbbell, home: Home, mountains: Mountain };
const targetIcons = { fullbody: Accessibility, upper: Crosshair, legs: Footprints, core: Target, cardio: Heart };

/**
 * EXPLORE PAGE (Smart Container)
 * Punto 3 (Arquitectura): Actúa como orquestador entre el estado de carga y la configuración.
 */
export const ExplorePage = (): ReactElement => {
    // Desestructuración de la lógica controlada por el hook
    const {
        selections,
        loading,
        error,
        currentEquipmentOptions,
        handleLocationSelect,
        toggleEquipment,
        handleTargetSelect,
        generateSession,
        isValid
    } = useExplore();

    /**
     * Punto 2: Robustez (UX)
     * Early Return: Si el motor está generando opciones, mostramos la pantalla 
     * de transición 'LoadingOptions' para bloquear interacciones erróneas.
     */
    if (loading) {
        return <LoadingOptions />;
    }


    return (
        <div className="animate-fade-in pb-20 px-4">

            {/* Cabecera de la sección */}
            <ExploreHeader />
            {/* MOSTRAR ERROR SI EXISTE */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium text-center">
                        {error}
                    </p>
                </div>
            )}

            {/* SECCIÓN 1: Selección de entorno */}
            <LocationSelector
                selectedId={selections.locationId}
                onSelect={handleLocationSelect}
                icons={locationIcons}
            />

            {/* SECCIÓN 2: Selección de equipamiento disponible
                Punto 1 (Integridad): Solo se renderiza si hay una ubicación válida.
            */}
            {selections.locationId && (
                <EquipmentSelector
                    options={currentEquipmentOptions}
                    selectedIds={selections.equipmentIds}
                    onToggle={toggleEquipment}
                />
            )}

            {/* SECCIÓN 3: Definición del objetivo del entrenamiento */}
            <TargetSection
                selectedId={selections.targetId}
                onSelect={handleTargetSelect}
                icons={targetIcons}
            />

            {/* ACCIÓN: Disparador del motor de generación
                Punto 2 (Robustez): El botón se deshabilita si no se cumplen los requisitos mínimos.
            */}
            <footer className="mt-14">
                <Button
                    onClick={generateSession}
                    disabled={!isValid}
                    className="w-full h-16 bg-zinc-950 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-transform active:scale-95 shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Generar Sesión
                </Button>
            </footer>
        </div>
    );
};

export default ExplorePage;