import { useState, type ReactNode } from 'react';
import { AuthContext } from '@/context/auth-context'; // Importación absoluta
import { authService } from '@/services/api'; 
import type { IUser } from '@/types'; 
import debug from 'debug';

const log = debug('app:auth-provider');

/**
 * Proveedor del Contexto (AuthProvider).
 * Es el componente que envuelve la App y reparte la información.
 */

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
   // Estado para el token: Indica si hay una sesión activa
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

   /**
   * Función de Login Global.
   * Llama al servicio de API y actualiza el estado de React.
   */
  const login = async (email: string, password: string) => {
    const data = await authService.login(email, password);
       // Actualizamos los estados de React para que la UI reaccione al cambio
    setToken(data.token);
    setUser(data.user);
    log('Sesión iniciada: %s', data.user.email);
  };
 /**
   * Función de Logout Global.
   * Limpia tanto el localStorage (vía servicio) como el estado de React.
   */
  const logout = () => {
    authService.logout();
    setToken(null);
    setUser(null);
    log('Sesión cerrada');
  };

  return (
    // 'isAuthenticated' se calcula dinámicamente: si hay token, es true.
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};