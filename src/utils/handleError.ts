import { type Response } from "express";
import {NotFoundError,AppError,ValidationError,DatabaseError} from './Errors.js'

export function handleError(res:Response, error:any) {
        console.error('Error en controller:', error);

        // Errores conocidos (operacionales)
        if (error instanceof ValidationError) {
            return res.status(400).json({
                success: false,
                error: error.message,
                type: 'VALIDATION_ERROR'
            });
        }

        if (error instanceof NotFoundError) {
            return res.status(404).json({
                success: false,
                error: error.message,
                type: 'NOT_FOUND'
            });
        }

        if (error instanceof DatabaseError) {
            console.error('Error original de DB:', error.originalError);
            
            return res.status(500).json({
                success: false,
                error: 'Error interno del servidor',
                type: 'DATABASE_ERROR'
            });
        }

        return res.status(500).json({
            success: false,
            error: 'Error interno del servidor',
            type: 'INTERNAL_ERROR'
        });
    }
