/**
 * Ubicaciones disponibles (Sincronizadas con Seed.ts)
 */
export const locations = [
  { 
    id: "park", 
    label: "Parque", 
    description: "Espacios abiertos con barras o bancos." 
  },
  { 
    id: "beach", 
    label: "Playa", 
    description: "Entrenamiento en arena o cerca del mar." 
  },
  { 
    id: "box", 
    label: "CrossFit Box", 
    description: "Equipamiento completo de alta intensidad." 
  },
  { 
    id: "home", 
    label: "Casa", 
    description: "Espacio limitado con material básico." 
  },
  { 
    id: "gym", 
    label: "Gimnasio", 
    description: "Máquinas y pesas tradicionales." 
  },
  { 
    id: "mountains", 
    label: "Montaña", 
    description: "Terreno irregular y elevación." 
  },
  { 
    id: "outdoor", 
    label: "Exterior", 
    description: "Cualquier lugar al aire libre." 
  },
] as const;

// Tipo para usar en TypeScript si se requiere
export type LocationId = typeof locations[number]['id'];