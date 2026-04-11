/**
 * IDs Únicos de Equipamiento (Sincronizados con Seed.ts)

 */
export const equipmentIds = {
  bodyweight: "bodyweight",
  pullupBar: "pullup_bar",
  kettlebell: "kettlebell",
  dumbbells: "dumbbells",
  barbell: "barbell",
  box: "box",
  jumpRope: "jump_rope",
  resistanceBand: "resistance_band",
  weightedVest: "weighted_vest",
  medicineBall: "medicine_ball",
  bench: "bench",
} as const;

/**
 * Mapa contextual por ubicación
 
 */
export const equipmentMap: Record<string, { id: string; label: string }[]> = {
  park: [
    { id: equipmentIds.bodyweight, label: "Solo peso corporal" },
    { id: equipmentIds.pullupBar, label: "Barra de dominadas" },
    { id: equipmentIds.bench, label: "Banco de parque" },
  ],
  beach: [
    { id: equipmentIds.bodyweight, label: "Solo peso corporal" },
    { id: equipmentIds.resistanceBand, label: "Gomas elásticas" },
  ],
  box: [
    { id: equipmentIds.barbell, label: "Barra olímpica" },
    { id: equipmentIds.kettlebell, label: "Kettlebell" },
    { id: equipmentIds.pullupBar, label: "Rig / Jaula" },
    { id: equipmentIds.box, label: "Cajón de salto" },
    { id: equipmentIds.jumpRope, label: "Comba" },
  ],
  home: [
    { id: equipmentIds.bodyweight, label: "Solo peso corporal" },
    { id: equipmentIds.dumbbells, label: "Mancuernas" },
    { id: equipmentIds.resistanceBand, label: "Gomas elásticas" },
    { id: equipmentIds.kettlebell, label: "Kettlebell" },
  ],
  gym: [
    { id: equipmentIds.barbell, label: "Barra olímpica" },
    { id: equipmentIds.dumbbells, label: "Mancuernas" },
    { id: equipmentIds.pullupBar, label: "Barra de dominadas" },
    { id: equipmentIds.box, label: "Cajón de salto" },
  ],
  mountains: [
    { id: equipmentIds.bodyweight, label: "Solo peso corporal" },
    { id: equipmentIds.weightedVest, label: "Mochila / Chaleco lastrado" },
  ],
};