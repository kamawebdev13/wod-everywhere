import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/const/routes';
import { type BaseSyntheticEvent } from 'react';

interface LoginFormProps {
    email: string;
    setEmail: (value: string) => void;
    password: string;
    setPassword: (value: string) => void;
    isLoading: boolean;
    errorMessage: string | null;
    onSubmit: (e: BaseSyntheticEvent) => void;
}

export const LoginForm = ({ 
    email, setEmail, 
    password, setPassword, 
    isLoading, errorMessage, 
    onSubmit 
}: LoginFormProps) => (
    <form onSubmit={onSubmit} className="flex-1 flex flex-col space-y-12">
        {/* Campo: Email */}
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

        {/* Campo: Password */}
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

        {/* Feedback de Error */}
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
                <Link to={ROUTES.REGISTER_STEP_ONE} className="text-red-900 font-black ml-1 uppercase">
                    REGISTER / ESTABLISH RANK
                </Link>
            </p>
        </div>
    </form>
);