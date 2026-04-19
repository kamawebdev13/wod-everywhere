/**
 * Interfaz base para opciones de selección (Lugar, Equipo, Objetivo).
 * Sigue la nomenclatura PascalCase para tipos e interfaces.
 */
export interface TrainingOption {
  id: string;
  label: string;
}

/**
 * Tipado del estado centralizado de la ExplorePage.
 * Usamos 'null' para campos obligatorios no seleccionados aún.
 */
export interface WodSelections {
  locationId: string | null;
  equipmentIds: string[]; // Array de strings para selección múltiple
  targetId: string | null;
}

/**
 * Mapeo de equipamiento por ubicación.
 * Usamos un Record donde la clave es un string (ID de localización en mayúsculas).
 */
export type EquipmentMap = Record<string, TrainingOption[]>;

/**
 * Interfaz para la respuesta del generador de WODs.
 * Asegura que los datos que vienen del backend coincidan con lo que espera el frontend.
 */
export interface GenerateWodPayload {
  location: string;
  equipment: string[];
  target: string;
}

