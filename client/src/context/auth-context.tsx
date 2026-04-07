import { createContext} from 'react';
import type { IUser } from '@/types'; 
/**
 * Definición de la interfaz del Contexto.
 * Describe qué datos y funciones estarán disponibles globalmente.
 */
interface AuthContextType {
  user: IUser | null; // Tipado estricto en lugar de any
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

// Crear el Contexto: Es el "almacén" de datos vacío. Solo exportamos el objeto del contexto
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

