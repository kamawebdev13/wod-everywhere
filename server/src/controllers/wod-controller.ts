import { Wod } from "../models/wod-model";
import type { Request, Response, NextFunction } from "express";

/**
 * CONTROLADOR: getWods
 * Punto 1: Robustez - Maneja filtros dinámicos y evita errores de tipos en MongoDB.
 */
export const getWods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        /**
         * Punto 2: Flexibilidad 
         * Extraemos los filtros tanto de query (GET) como de body (POST) 
         * para asegurar compatibilidad con el frontend.
         */
        const { location, equipment, target } = { ...req.query, ...req.body };

        // Definimos un objeto de filtro con tipado seguro
        const queryFilter: Record<string, unknown> = {};

        /**
         * Lógica de Filtrado Dinámico:
         * Solo agregamos el filtro si el valor existe y no es 'all'.
         * Usamos comparaciones directas en lugar de $in para mayor eficiencia.
         */
        if (location && location !== 'all') {
            queryFilter.location = location;
        }

        if (equipment && equipment !== 'all') {
            queryFilter.equipment = equipment;
        }

        if (target && target !== 'all') {
            queryFilter.target = target;
        }

        // Ejecución de la consulta con el filtro construido
        const results = await Wod.find(queryFilter);

        /**
         * Manejo de Resultados Vacíos:
         * Si no hay coincidencias, devolvemos 404 con un mensaje claro.
         */
        if (!results || results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron WODs con esos criterios de búsqueda"
            });
        }

        /**
         * Punto 3: Experiencia de Usuario
         * Mezclamos los resultados de forma aleatoria y tomamos los 3 mejores.
         */
        const shuffled = [...results]
            .sort(() => 0.5 - Math.random())
            .slice(0, 3);

        return res.status(200).json(shuffled);

    } catch (error: unknown) {
        // Delegamos el error al middleware global de la aplicación
        next(error);
    }
};