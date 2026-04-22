import { useState, useCallback } from 'react';
import { equipmentMap } from '@/const/equipment';
import { useGenerateWod } from '@/hooks/use-generate-wod';
import {
    type WodSelections,
} from '@/types/training';

/**
 * HOOK: useExplore
 * Centraliza la configuración del entrenamiento y las reglas de negocio
 * de filtrado de equipamiento por entorno.
 */
export const useExplore = () => {
    // Servicio de generación de WOD (Capa de API)
    const { getOptions, loading, error } = useGenerateWod();

    // Estado centralizado (Punto 1: Integridad)
    const [selections, setSelections] = useState<WodSelections>({
        locationId: null,
        equipmentIds: [],
        targetId: null
    });

    /**
     * Selecciona ubicación y limpia equipo previo para evitar conflictos
     * (Ej: No permitir mancuernas si el entorno es 'Beach' y no están en el mapa).
     */
    const handleLocationSelect = useCallback((id: string) => {
        setSelections((prev) => ({
            ...prev,
            locationId: id,
            equipmentIds: []
        }));
    }, []);

    /**
     * Toggle de selección múltiple de equipo.
     */
    const toggleEquipment = useCallback((id: string) => {
        setSelections((prev) => ({
            ...prev,
            equipmentIds: prev.equipmentIds.includes(id)
                ? prev.equipmentIds.filter(item => item !== id)
                : [...prev.equipmentIds, id]
        }));
    }, []);

    /**
     * Selección de objetivo muscular.
     */
    const handleTargetSelect = useCallback((id: string) => {
        setSelections((prev) => ({ ...prev, targetId: id }));
    }, []);

    /**
     * LÓGICA DERIVADA: Filtra las opciones de equipo disponibles según la ubicación.
     * Mantenemos la robustez al verificar que el ID exista en el mapa.
     */
    const currentEquipmentOptions = selections.locationId
        ? equipmentMap[selections.locationId.toLowerCase()] || []
        : []
    /**
     * Acción de disparo: Valida y envía los datos al motor.
     */
    const generateSession = () => {
        getOptions({
            location: selections.locationId || '',
            equipment: selections.equipmentIds,
            target: selections.targetId || ''
        });
    };

    return {
        selections,
        loading,
        error,
        currentEquipmentOptions,
        handleLocationSelect,
        toggleEquipment,
        handleTargetSelect,
        generateSession,
        // Validación de negocio para el botón
        isValid: Boolean(selections.locationId && selections.targetId)
    };
};