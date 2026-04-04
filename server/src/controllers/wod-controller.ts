import { Wod } from "../models/wod-model";
import type { Request, Response, NextFunction } from "express";


export const getWods = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { location, equipment, target } = req.query;

        // 1. Construimos el filtro dinámico
        const filter: any = {};
        
        // Usamos $in para buscar dentro de los arrays del modelo
        if (location) {
            filter.location = { $in: [location] };
        }
        
        if (equipment) {
            filter.equipment = { $in: [equipment] };
        }
        
        if (target) {
            filter.target = { $in: [target] };
        }

        // 2. Ejecutamos la búsqueda
        const results = await Wod.find(filter);

        if (results.length === 0) {
            return res.status(404).json({ 
                success: false, 
                message: "No se encontraron WODs con esos criterios" 
            });
        }

        // 3. Mezcla aleatoria y límite de 3
        const shuffled = results.sort(() => 0.5 - Math.random()).slice(0, 3);

        res.json({
            success: true,
            results: shuffled.length,
            data: shuffled
        });

    } catch (error) {
        next(error);
    }
};