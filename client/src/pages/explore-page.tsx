import { useState, useCallback, type ReactElement } from 'react';
import { equipmentMap } from '@/const/equipment';
import { Button } from '@/components/ui/button';
import { useGenerateWod } from '@/hooks/use-generate-wod';
import { 
  type WodSelections, 
  type EquipmentMap 
} from '@/types/training';
import { 
  Loader2, Umbrella, Trees, Dumbbell, Home, Mountain, 
  Accessibility, Crosshair, Footprints, Target, Heart 
} from 'lucide-react';


import { LocationSelector } from '@/components/explore/location-selector';
import { TargetSelector } from '@/components/explore/target-selector';
import { EquipmentSelector } from '@/components/explore/equipment-selector';


const locationIcons = { beach: Umbrella, park: Trees, gym: Dumbbell, home: Home, mountains: Mountain };
const targetIcons = { fullbody: Accessibility, upper: Crosshair, legs: Footprints, core: Target, cardio: Heart };

/**
 * Componente principal de exploración y filtrado para la generación de WODs.
 * Permite al usuario definir el entorno, el equipo disponible y el objetivo.
 */
export const ExplorePage = (): ReactElement => {
// Lógica de comunicación con la API y gestión de estado de carga
  const { getOptions, loading } = useGenerateWod();

  // Estado centralizado para las preferencias del usuario'
  const [selections, setSelections] = useState<WodSelections>({
    locationId: null,
    equipmentIds: [],
    targetId: null
  });
 /**
   * Gestiona la selección de ubicación y resetea el equipo seleccionado
   * para evitar inconsistencias entre entornos (ej: barra olímpica en la playa).
   */
  const handleLocationSelect = useCallback((id: string) => {
    setSelections((prev: WodSelections) => ({ 
      ...prev, 
      locationId: id, 
      equipmentIds: [] 
    }));
  }, []);

  const toggleEquipment = useCallback((id: string) => {
    setSelections((prev: WodSelections) => ({
      ...prev,
      equipmentIds: prev.equipmentIds.includes(id)
        ? prev.equipmentIds.filter(item => item !== id)
        : [...prev.equipmentIds, id]
    }));
  }, []);
/**
   * Actualiza el objetivo muscular seleccionado por el usuario.
   */
  const handleTargetSelect = useCallback((id: string) => {
    setSelections((prev: WodSelections) => ({ ...prev, targetId: id }));
  }, []);

  // Obtenemos las opciones de equipo según la localización
  const currentEquipmentOptions = selections.locationId 
    ? (equipmentMap as EquipmentMap)[selections.locationId.toUpperCase()] || []
    : [];

  return (
    <div className="animate-fade-in pb-20 px-4">
      <header className="mb-8 pt-6">
        <h1 className="text-4xl font-black text-iron-950 uppercase tracking-tighter leading-[0.9]">
          Configura tu <br /> entrenamiento
        </h1>
      </header>
     {/* SECCIÓN LUGARES */}
      {/* Renderizado de rejilla para selección de localizaciones */}
      <LocationSelector 
        selectedId={selections.locationId} 
        onSelect={handleLocationSelect} 
        icons={locationIcons} 
      />
     {/* SECCIÓN EQUIPAMIENTO */}
      {/* Selector de equipamiento condicional a la ubicación seleccionada */}
      {selections.locationId && (
        <EquipmentSelector 
          options={currentEquipmentOptions}
          selectedIds={selections.equipmentIds}
          onToggle={toggleEquipment}
        />
      )}
      {/* SECCIÓN BODY TARGET */}
      {/* Listado de objetivos físicos (Body Target) */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-0.5 w-8 bg-red-600" />
          <h2 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">
            Body Target
          </h2>
        </div>
        <TargetSelector 
          selectedId={selections.targetId} 
          onSelect={handleTargetSelect} 
          icons={targetIcons} 
        />
      </section>
       {/* Botón de acción: dispara la petición al servidor con los filtros aplicados */}
      <footer className="mt-14">
        <Button 
          onClick={() => getOptions({
            location: selections.locationId || '',
            equipment: selections.equipmentIds,
            target: selections.targetId || ''
          })}
          disabled={loading || !selections.locationId || !selections.targetId}
          className="w-full h-16 bg-iron-950 text-white font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-transform active:scale-95"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : 'Generar Sesión'}
        </Button>
      </footer>
    </div>
  );
};

export default ExplorePage;