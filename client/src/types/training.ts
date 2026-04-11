export interface TrainingOption {
  id: string;
  label: string;
}

// Representa la estructura de tu EQUIPMENT_MAP (clave: ubicación, valor: lista de equipos)
export type EquipmentMap = Record<string, TrainingOption[]>;

// Tipado del estado de las selecciones 
export interface WodSelections {
  locationId: string | null;
  equipmentIds: string[];
  targetId: string | null;
}