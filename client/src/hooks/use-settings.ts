import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services/api'; 
import { type IUser } from '@/types';

/**
 * HOOK: useSettings
 * Gestiona la identidad del atleta y las acciones de sesión.
 */
export const useSettings = () => {
    // Hook de navegación para redirecciones
    const navigate = useNavigate();
    
    const [user, setUser] = useState<IUser | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    /**
     * handleLogout
     * Centraliza la limpieza de credenciales y la salida segura.
     */
    const handleLogout = useCallback((): void => {
        authService.logout();
        navigate('/login', { replace: true });
    }, [navigate]);

    /**
     * Efecto de inicialización: Recupera los datos del perfil al cargar.
     */
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                // Petición real al backend
                const profileData = await authService.getProfile();
                setUser(profileData);
            } catch {
                /**
                 * Si la petición falla (token expirado o error de red),
                 * ejecutamos logout para proteger la integridad de la app.
                 */
                handleLogout();
            } finally {
                // Finalizamos el estado de carga independientemente del resultado
                setLoading(false);
            }
        };

        fetchProfile();
        // ESLint podría pedir handleLogout aquí, pero al ser una función 
        // interna estable, el comportamiento es correcto.
    }, [handleLogout]);

    return {
        user,
        loading,
        handleLogout
    };
};