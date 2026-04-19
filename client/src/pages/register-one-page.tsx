import { type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/const/routes';

// importación de capas de arquitectura
import { useRegisterOne } from '@/hooks/use-register-one';
import { RegisterWatermark } from '@/components/register/register-watermark';
import { RegisterHeader } from '@/components/register/register-header';
import { RegisterForm } from '@/components/register/register-form';

export const RegisterOnePage = (): ReactElement => {
    const { 
        formData, 
        showPassword, 
        handleChange, 
        togglePassword, 
        handleNext,
        isSubmitDisabled 
    } = useRegisterOne();

    return (
        <div className="relative min-h-screen bg-white flex flex-col px-8 pt-20 pb-10 overflow-hidden">
            <RegisterWatermark />

            <div className="relative z-10 flex flex-col h-full">
                <RegisterHeader />

                <RegisterForm 
                    formData={formData}
                    showPassword={showPassword}
                    isSubmitDisabled={isSubmitDisabled}
                    onChange={handleChange}
                    onTogglePassword={togglePassword}
                    onSubmit={handleNext}
                />

                <footer className="mt-auto pt-8 text-left">
                    <p className="text-sm text-gray-500 font-medium">
                        Already an athlete? <Link to={ROUTES.LOGIN} className="text-red-800 font-bold underline">Log in</Link>
                    </p>
                </footer>
            </div>
        </div>
    );
};