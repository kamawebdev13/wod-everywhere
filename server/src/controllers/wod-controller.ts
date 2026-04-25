import { Wod } from "../models/wod-model"; 
import type { Request, Response, NextFunction } from "express";

/**
 * INTERFAZ: WodFilters
 * Criterios que llegan desde el frontend.
 */
interface WodFilters {
    location?: string;
    equipment?: string;
    target?: string;
}

/**
 * CONTROLADOR: getWods
 * Selección aleatoria con filtros dinámicos compatibles con Arrays en DB.
 */
export const getWods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { location, equipment, target }: WodFilters = { ...req.query, ...req.body };

        /**
         * SOLUCIÓN AL TIPO:
         * Usamos 'Record<string, unknown>' para permitir que los valores sean
         * tanto strings simples como objetos complejos de MongoDB ($in).
         */
        const queryFilter: Record<string, unknown> = {};

        // Filtro de Ubicación: Usamos $in porque en el seed 'location' es un Array
        if (location && location !== 'all') {
            queryFilter.location = { $in: [location] };
        }

        // Filtro de Equipamiento
        if (equipment && equipment !== 'all') {
            queryFilter.equipment = { $in: [equipment] };
        }

        // Filtro de Target
        if (target && target !== 'all') {
            queryFilter.target = { $in: [target] };
        }

        /**
         * EJECUCIÓN:
         * El $match acepta el Record<string, unknown> sin problemas.
         */
        const results = await Wod.aggregate([
            { $match: queryFilter },
            { $sample: { size: 3 } }
        ]);

        if (!results || results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron WODs con esos criterios de búsqueda"
            });
        }

        return res.status(200).json(results);

    } catch (error: unknown) {
        next(error);
    }
};