import { useState, useEffect, type ReactNode, type ReactElement } from 'react';
import { AuthContext } from '@/context/auth-context'; 
import { authService } from '@/services/api'; 
import type { IUser } from '@/types'; 
import debug from 'debug';

const log = debug('app:auth-provider');

/**
 * Proveedor del Contexto (AuthProvider).
 * Es el componente que envuelve la App y reparte la información.
 */
export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  // Inicialización perezosa para evitar errores de parseo
  const [user, setUser] = useState<IUser | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? (JSON.parse(savedUser) as IUser) : null;
  });

  // Estado para el token: Indica si hay una sesión activa
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState<boolean>(() => {
    return !localStorage.getItem('token'); 
});

  useEffect(() => {
    const initAuth = (): void => {
      const savedUser = localStorage.getItem('user');
      const savedToken = localStorage.getItem('token');

      if (savedUser && savedToken) {
        try {
          setUser(JSON.parse(savedUser) as IUser);
          setToken(savedToken);
        } catch {
          authService.logout();
        }
      }
      
      // CAMBIO DE ESTADO: Aquí usamos la función para que deje de ser "unused"
      setIsLoading(false);
    };

    initAuth();
  }, []);

  /**
   * Login Global: Sincroniza API, localStorage y Estado de React.
   */
  const login = async (email: string, password: string): Promise<void> => {
    const data = await authService.login(email, password);
    
    // Actualizamos estados locales
    setToken(data.token);
    setUser(data.user);
    
    log('Sesión iniciada: %s', data.user.email);
  };

  /**
   * Logout Global: Limpia estado y almacenamiento.
   */
  const logout = (): void => {
    authService.logout();
    setToken(null);
    setUser(null);
    log('Sesión cerrada');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated: !!token,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};