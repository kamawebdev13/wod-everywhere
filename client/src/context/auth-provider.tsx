import { useState, type ReactNode, type ReactElement } from 'react';
import { AuthContext } from '@/context/auth-context'; 
import { authService } from '@/services/api'; 
import type { IUser } from '@/types'; 
import debug from 'debug';

const log = debug('app:auth-provider');

/**
 * PROVEEDOR DE AUTENTICACIÓN (AuthProvider)
 * Punto 1: Arquitectura - Sincronización inmediata con localStorage para evitar expulsiones.
 */
export const AuthProvider = ({ children }: { children: ReactNode }): ReactElement => {
  
  /**
   * 1. Inicialización síncrona del Usuario.
   * Se ejecuta una sola vez al instanciar el estado.
   */
  const [user, setUser] = useState<IUser | null>(() => {
    const savedUser = localStorage.getItem('user');
    if (!savedUser) return null;
    try {
      return JSON.parse(savedUser) as IUser;
    } catch (error) {
      log('Error al parsear el usuario del almacenamiento local:', error);
      return null;
    }
  });

  /**
   * 2. Inicialización síncrona del Token.
   */
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));

  /**
   * 3. Gestión de Carga inteligente.
   * Si ya detectamos un token en el paso anterior, isLoading nace en false.
   * Esto evita que el ProtectedRoute bloquee el acceso durante el primer render.
   */
  const [isLoading] = useState<boolean>(() => {
    return !localStorage.getItem('token');
  });

  /**
   * ACCIÓN: Login
   * Sincroniza la API con el estado de React y la persistencia local.
   */
  const login = async (email: string, password: string): Promise<void> => {
    const data = await authService.login(email, password);
    
    // Guardado en almacenamiento físico
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));

    // Actualización del estado reactivo
    setToken(data.token);
    setUser(data.user);
    
    log('Sesión iniciada con éxito para: %s', data.user.email);
  };

  /**
   * ACCIÓN: Logout
   * Limpia tanto el estado de la aplicación como el almacenamiento local.
   */
  const logout = (): void => {
    authService.logout();
    setToken(null);
    setUser(null);
    log('Sesión cerrada y limpieza de datos completada');
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        // El estado de autenticación depende directamente de la existencia del token
        isAuthenticated: !!token,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};