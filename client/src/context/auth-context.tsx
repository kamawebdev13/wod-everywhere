import { createContext} from 'react';
import type { IUser } from '@/types'; 
/**
 * Definición de la interfaz del Contexto.
 * Describe qué datos y funciones estarán disponibles globalmente.
 */
interface AuthContextType {
  user: IUser | null; 
  isAuthenticated: boolean;
  isLoading: boolean; // Necesario para evitar parpadeos en rutas protegidas
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear el Contexto: Es el "almacén" de datos vacío. Solo exportamos el objeto del contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

