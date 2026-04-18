import { useState, useContext, type ReactElement, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/const/routes';

export const LoginPage = (): ReactElement => {
    const navigate = useNavigate();

    // 2. CORRECCIÓN SUGERIDA POR GEMINI: Accedemos al contexto correctamente. 
    // Si usas useContext(AuthContext), TS sabrá que login existe.
    const auth = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();

        // Verificación de seguridad para TS
        if (!auth) return;

        setIsLoading(true);
        setErrorMessage(null);

        try {
            // 3. LLAMADA AL LOGIN: Pasamos email y password
            await auth.login(email, password);

            // 4. LLAMADA AL HOME PAGE
            navigate(ROUTES.HOME);
        } catch {
            setErrorMessage('ACCESS DENIED. CHECK YOUR ENGINE CODE.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col px-8 pt-16 pb-32 font-sans relative">

            <header className="mb-14 text-left">
                <h1 className="text-[54px] font-black italic leading-[0.85] text-zinc-950 uppercase tracking-tighter">
                    ACCESS<br />YOUR<br />ENGINE
                </h1>
                <div className="w-14 h-1.5 bg-red-900 mt-6"></div>
            </header>

            <form onSubmit={handleSubmit} className="flex-1 flex flex-col space-y-12">

                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-800">
                        IDENTIFICATION / EMAIL
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="NAME@ATHLETE.COM"
                        className="w-full bg-transparent border-b border-zinc-300 py-3 text-[16px] font-bold uppercase placeholder:text-zinc-300 focus:border-black outline-none transition-colors"
                        required
                    />
                </div>

                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-800">
                            ACCESS CODE / PASSWORD
                        </label>
                        <button type="button" className="text-[10px] font-black text-red-900 uppercase tracking-widest italic border-b border-red-900">
                            FORGOT?
                        </button>
                    </div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full bg-transparent border-b border-zinc-300 py-3 text-[16px] font-bold placeholder:text-zinc-300 focus:border-black outline-none transition-colors"
                        required
                    />
                </div>

                {errorMessage && (
                    <p className="text-red-900 text-[10px] font-black italic uppercase tracking-wider text-center bg-red-50 p-3">
                        {errorMessage}
                    </p>
                )}

                <div className="pt-6">
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-16 bg-[#1A1A1A] hover:bg-black text-white text-[16px] font-black uppercase tracking-[0.15em] shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center"
                    >
                        {isLoading ? 'SYNCING...' : 'LOGIN'}
                    </Button>
                </div>

                <div className="text-center pt-4">
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                        NEW TO THE PLATFORM?{' '}
                        {/* 5. RUTA CORREGIDA: REGISTER_STEP_ONE */}
                        <Link to={ROUTES.REGISTER_STEP_ONE} className="text-red-900 font-black ml-1 uppercase">
                            REGISTER / ESTABLISH RANK
                        </Link>
                    </p>
                </div>

                {/* IMAGEN DE FONDO/DECORATIVA INFERIOR CON LAZY LOADING */}
                <div className="mt-auto pt-6">
                    <div className="w-full h-44 rounded-xl overflow-hidden grayscale shadow-2xl bg-zinc-200">
                        <img
                            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
                            alt="Athlete"
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover opacity-0 transition-opacity duration-500"
                            onLoad={(e) => {
                                e.currentTarget.classList.remove('opacity-0');
                                e.currentTarget.classList.add('opacity-100');
                            }}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};