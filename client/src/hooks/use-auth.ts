import { useContext } from 'react';
import { AuthContext } from '@/context/auth-context';

/**
 * Hook para acceder a la autenticación.
 
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }
  
  return context;
};