import { Button } from '@/components/ui/button';

interface RegisterTwoFooterProps {
    isLoading: boolean;
    error: string | null;
    isButtonDisabled: boolean;
    onSubmit: () => void;
}

/**
 * Footer del registro. Gestiona el feedback de errores y la acción principal.
 */
export const RegisterTwoFooter = ({
    isLoading,
    error,
    isButtonDisabled,
    onSubmit
}: RegisterTwoFooterProps) => (
    <footer className="mt-auto space-y-4">
        {error && (
            <p className="text-red-700 text-[11px] font-black uppercase text-center italic tracking-widest bg-red-50 p-2 border border-red-100">
                {error}
            </p>
        )}
       <div className="pt-6 flex justify-center w-full">
            <Button
                onClick={onSubmit}
                disabled={isButtonDisabled}
              
                className="h-16 w-full md:w-auto px-16 bg-[#1A1A1A] hover:bg-black text-white text-[16px] font-black uppercase tracking-[0.15em] shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all flex items-center justify-center"
            >
                {isLoading ? 'CREATING PROFILE...' : 'CREATE PROFILE'}
            </Button>
        </div>


        <p className="text-[10px] text-gray-400 font-bold text-center leading-tight tracking-widest px-4 uppercase">
            By creating a profile you agree to our <span className="underline text-black">Terms of Service</span>
        </p>
    </footer>
);