import { useState, type BaseSyntheticEvent, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/const/routes';

/**
 * Hook: useRegisterOne
 * Gestiona el estado y la lógica de validación para la primera fase del registro.
 */
export const useRegisterOne = () => {
    const navigate = useNavigate();
    
    // Control de visibilidad del input de contraseña (UI state)
    const [showPassword, setShowPassword] = useState(false);
    
    // Estado único para agrupar los datos del formulario (Integridad de datos)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        agreed: false
    });

    /**
     * Sincroniza los cambios de los inputs con el estado local.
     * Detecta automáticamente si es un checkbox o un input de texto.
     */
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Alternador para mostrar/ocultar caracteres de contraseña
    const togglePassword = () => setShowPassword(!showPassword);

    /**
     * Valida los campos y redirige al paso 2.
     * Pasa el objeto formData a través del estado de la ruta (Navigation State).
     */
    const handleNext = (e: BaseSyntheticEvent) => {
        e.preventDefault();
        
        // Validación de robustez: evita navegar si falta información crítica
        const isFormValid = formData.agreed && formData.name && formData.email && formData.password;
        
        if (isFormValid) {
            navigate(ROUTES.REGISTER_STEP_TWO, { state: { ...formData } });
        }
    };

    // Retorna las funciones y estados necesarios para el componente visual
    return {
        formData,
        showPassword,
        handleChange,
        togglePassword,
        handleNext,
        // Propiedad calculada para habilitar/deshabilitar el botón de envío
        isSubmitDisabled: !formData.agreed || !formData.name || !formData.email || !formData.password
    };
};