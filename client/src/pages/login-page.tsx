// Importación capas de arquitectura
import { type ReactElement } from 'react';
import { useLogin } from '@/hooks/use-login';
import { LoginHeader } from '@/components/login/login-header';
import { LoginFooterImage } from '@/components/login/login-footer-image';
import { LoginForm } from '@/components/login/login-form';

export const LoginPage = (): ReactElement => {
    const { 
        email, setEmail, 
        password, setPassword, 
        isLoading, errorMessage, 
        handleLogin 
    } = useLogin();

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col px-8 pt-16 pb-32 font-sans relative">
            <LoginHeader />

            <LoginForm 
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                isLoading={isLoading}
                errorMessage={errorMessage}
                onSubmit={handleLogin}
            />

            <LoginFooterImage />
        </div>
    );
};

export default LoginPage;