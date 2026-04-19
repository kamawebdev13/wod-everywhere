import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { authService } from '@/services/api';
import { ROUTES } from '@/const/routes';
import type { IRegisterRequest } from '@/types/index';

/**
 * Hook personalizado para gestionar la lógica del segundo paso del registro.
 * Maneja la selección de nivel, intereses y la persistencia final.
 */
export const useRegisterTwo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Recuperación segura de datos del Step 1 desde el router state
    const stepOneData = location.state || {};

    // Estados locales tipados estrictamente según IRegisterRequest
    const [selectedLevel, setSelectedLevel] = useState<IRegisterRequest['level']>('INTERMEDIATE');
    const [selectedInterests, setSelectedInterests] = useState<string[]>(['Endurance', 'Functional', 'HIIT']);
    const [isLoading, setIsLoading] = useState(false);
    const [authError, setAuthError] = useState<string | null>(null);

    /**
     * Gestiona la selección múltiple de etiquetas de interés.
     */
    const handleToggleInterest = (interest: string): void => {
        setSelectedInterests((prev) => 
            prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
        );
    };

    /**
     * Consolida los datos de ambos pasos y ejecuta la llamada al backend.
     */
    const handleCreateProfile = async (): Promise<void> => {
        setIsLoading(true);
        setAuthError(null); 
        
        try {
            // Unificamos datos del paso 1 y paso 2 (Punto 1: Integridad)
            const finalRegistrationData: IRegisterRequest = {
                ...stepOneData,
                level: selectedLevel,
                tags: selectedInterests,
                password: stepOneData.password 
            };
            
            await authService.register(finalRegistrationData);
            
            // Navegación limpia al login tras éxito
            navigate(ROUTES.LOGIN); 
        } catch {
            // Gestión de errores robusta (Punto 2: Robustez)
            setAuthError('THE ENGINE COULD NOT BE CREATED. PLEASE CHECK YOUR DATA.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        selectedLevel,
        setSelectedLevel,
        selectedInterests,
        handleToggleInterest,
        isLoading,
        authError,
        handleCreateProfile
    };
};