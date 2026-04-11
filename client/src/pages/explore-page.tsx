import { useState, useCallback, type ReactElement } from 'react';
// IMPORTANTE: He cambiado el nombre de las constantes a camelCase para cumplir tu rúbrica
import { locations } from '@/const/locations';
import { equipmentMap } from '@/const/equipment';
import { targets } from '@/const/targets'; 
import { Button } from '@/components/ui/button';
import { useGenerateWod } from '@/hooks/use-generate-wod';
import { 
  type WodSelections, 
  type TrainingOption, 
  type EquipmentMap 
} from '@/types/training';
import { 
  Umbrella, Trees, Dumbbell, Home, Mountain, 
  Accessibility, Crosshair, Footprints, Target, Heart, 
  Loader2 
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Mapeo estático de iconos para las localizaciones de entrenamiento.
 */
const locationIcons: Record<string, LucideIcon> = {
  beach: Umbrella,
  park: Trees,
  gym: Dumbbell,
  home: Home,
  mountains: Mountain,
};
/**
 * Mapeo estático de iconos para los grupos musculares u objetivos.
 */
const targetIcons: Record<string, LucideIcon> = {
  fullbody: Accessibility,
  upper: Crosshair,
  legs: Footprints,
  core: Target,
  cardio: Heart,
};

/**
 * Componente principal de exploración y filtrado para la generación de WODs.
 * Permite al usuario definir el entorno, el equipo disponible y el objetivo.
 */
export const ExplorePage = (): ReactElement => {
  // Lógica de comunicación con la API y gestión de estado de carga
  const { getOptions, loading } = useGenerateWod();

// Estado centralizado para las preferencias del usuario// Variables y estado en camelCase
  const [selections, setSelections] = useState<WodSelections>({
    locationId: null,
    equipmentIds: [],
    targetId: null
  });

  /**
   * Gestiona la selección de ubicación y resetea el equipo seleccionado
   * para evitar inconsistencias entre entornos (ej: barra olímpica en la playa).
   */
  const handleLocationSelect = useCallback((id: string): void => {
    setSelections(prev => ({
      ...prev,
      locationId: id,
      equipmentIds: [] 
    }));
  }, []);

  /**
   * Añade o elimina un ítem de equipamiento de la lista de selección múltiple
   * mediante una actualización inmutable del estado.
   */
  const toggleEquipment = useCallback((id: string): void => {
    setSelections(prev => ({
      ...prev,
      equipmentIds: prev.equipmentIds.includes(id)
        ? prev.equipmentIds.filter(item => item !== id)
        : [...prev.equipmentIds, id]
    }));
  }, []);
/**
   * Actualiza el objetivo muscular seleccionado por el usuario.
   */
  const handleTargetSelect = useCallback((id: string): void => {
    setSelections(prev => ({ ...prev, targetId: id }));
  }, []);

  return (
    <div className="animate-fade-in pb-20">
      <h1 className="font-display text-4xl font-bold text-iron-950 uppercase tracking-tighter mb-8 leading-[0.9]">
        Selecciona <br /> tu lugar
      </h1>

      {/* SECCIÓN LUGARES */}
      {/* Renderizado de rejilla para selección de localizaciones */}
      <div className="grid grid-cols-2 gap-4 mb-10">
        {locations.map((loc) => {
          const Icon = locationIcons[loc.id] || Dumbbell;
          const isActive = selections.locationId === loc.id;
          return (
            <button
              key={loc.id}
              onClick={() => handleLocationSelect(loc.id)}
              className={`flex flex-col items-start p-6 rounded-sm border-l-4 transition-all h-40 justify-between shadow-sm ${
                isActive ? 'bg-white border-brand-red' : 'bg-white border-transparent grayscale opacity-60'
              }`}
            >
              <Icon size={32} className={isActive ? 'text-iron-950' : 'text-gray-400'} />
              <span className="font-display font-bold uppercase text-xs tracking-widest text-iron-950">
                {loc.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* SECCIÓN EQUIPAMIENTO */}
      {/* Selector de equipamiento condicional a la ubicación seleccionada */}
      {selections.locationId && (
        <section className="mt-12 animate-in slide-in-from-bottom-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-8 bg-brand-red" />
            <h2 className="font-display font-bold uppercase tracking-widest text-sm text-iron-950">
              Equipamiento
            </h2>
          </div>
          <div className="bg-gray-100 p-6 rounded-sm grid grid-cols-3 gap-6">
            {(equipmentMap as EquipmentMap)[selections.locationId.toUpperCase()]?.map((item: TrainingOption) => (
              <button 
                key={item.id} 
                onClick={() => toggleEquipment(item.id)} 
                className="flex flex-col items-center gap-2"
              >
                <div className={`w-14 h-14 rounded-lg flex items-center justify-center transition-all ${
                  selections.equipmentIds.includes(item.id) 
                    ? 'bg-brand-red text-white shadow-lg scale-110' 
                    : 'bg-white text-iron-950 shadow-sm'
                }`}>
                  <Dumbbell size={20} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-tight text-center leading-tight">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* SECCIÓN BODY TARGET */}
      {/* Listado de objetivos físicos (Body Target) */}
      <section className="mt-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-0.5 w-8 bg-brand-red" />
          <h2 className="font-display font-bold uppercase tracking-widest text-sm text-iron-950">
            Body Target
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {targets.map((target) => {
            const Icon = targetIcons[target.id] || Accessibility;
            const isSelected = selections.targetId === target.id;
            return (
              <button
                key={target.id}
                onClick={() => handleTargetSelect(target.id)}
                className={`flex items-center gap-4 p-5 rounded-sm border-l-4 transition-all shadow-sm ${
                  isSelected ? 'bg-white border-brand-red' : 'bg-white border-transparent opacity-60'
                } ${target.id === 'cardio' ? 'col-span-2' : ''}`}
              >
                <Icon size={24} className={isSelected ? 'text-iron-950' : 'text-gray-400'} />
                <span className="font-display font-bold uppercase text-xs tracking-widest text-iron-950 leading-tight text-left italic">
                  {target.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>
     {/* Botón de acción: dispara la petición al servidor con los filtros aplicados */}
      <div className="mt-14 px-2">
        <Button 
          onClick={() => getOptions({
            location: selections.locationId || '',
            equipment: selections.equipmentIds,
            target: selections.targetId || ''
          })}
          disabled={loading || !selections.locationId || !selections.targetId}
          className="w-full h-16 text-lg uppercase tracking-widest shadow-xl font-bold bg-iron-950 text-white"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <Loader2 className="animate-spin" /> GENERANDO...
            </div>
          ) : 'Generar Wod'}
        </Button>
      </div>
    </div>
  );
};

export default ExplorePage;