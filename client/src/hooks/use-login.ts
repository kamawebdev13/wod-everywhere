import { useState, useContext, type BaseSyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/auth-context';
import { ROUTES } from '@/const/routes';

/**
 * HOOK DE LÓGICA DE AUTENTICACIÓN (STATEFUL LOGIC)
 * Separa la gestión de estados y llamadas a API de la capa de presentación.
 */
export const useLogin = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    // Estados locales para la gestión de formulariosconst [email, setEmail] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // Estados de control de flujo y Feedback (Punto 2: Robustez)
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    /**
     * Manejador del envío del formulario.
     * Evento sintético base para evitar recarga de página y asegurar compatibilidad.
     */
    const handleLogin = async (e: BaseSyntheticEvent) => {
        // 1. Prevención del comportamiento nativo del navegador
        e.preventDefault();
        // 2. Validación de integridad del contexto de autenticación
        if (!auth) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            // 3. Ejecución de la lógica de negocio (Sincronizada con el Backend)
            await auth.login(email, password);
            // 4. Redirección basada en el mapa de rutas centralizado
            setTimeout(() => {
                navigate(ROUTES.HOME);
            }, 100);
        } catch (err) {
            // 5. Gestión robusta de errores: Extrae el mensaje real del servidor si existe
            const msg = err instanceof Error ? err.message : 'ACCESS DENIED. CHECK YOUR ENGINE CODE.';
            setErrorMessage(msg.toUpperCase());
        } finally {
            // 6. Limpieza de estado de carga
            setIsLoading(false);
        }
    };

    return {
        email, setEmail,
        password, setPassword,
        isLoading, errorMessage,
        handleLogin
    };
};