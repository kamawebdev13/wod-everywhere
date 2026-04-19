import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { type BaseSyntheticEvent, type ChangeEvent } from 'react';

/**
 * PROPS: Definición de la estructura de datos y funciones.
 * Se define la estructura de formData aquí mismo para evitar el uso de 'any' 
 * y cumplir con la Integridad de Datos sin crear archivos externos.
 */
interface RegisterFormProps {
    formData: {
        name: string;
        email: string;
        password: string;
        agreed: boolean;
    };
    showPassword: boolean;
    isSubmitDisabled: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onTogglePassword: () => void;
    onSubmit: (e: BaseSyntheticEvent) => void;
}

/**
 * COMPONENTE STATELESS: Encargado únicamente de la representación visual del formulario.
 * Recibe toda la lógica desde el Smart Hook (useRegisterOne).
 */
export const RegisterOneForm = ({
    formData,
    showPassword,
    isSubmitDisabled,
    onChange,
    onTogglePassword,
    onSubmit
}: RegisterFormProps) => (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
        
        {/* SECCIÓN: Nombre Completo */}
        <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">
                Full Name
            </label>
            <input
                type="text"
                name="name"
                required
                placeholder="Athlete Name"
                value={formData.name}
                onChange={onChange}
                className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none transition-all"
            />
        </div>

        {/* SECCIÓN: Correo Electrónico */}
        <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">
                Email Address
            </label>
            <input
                type="email"
                name="email"
                required
                placeholder="athlete@wod.com"
                value={formData.email}
                onChange={onChange}
                className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none transition-all"
            />
        </div>

        {/* SECCIÓN: Contraseña con Toggle de Visibilidad */}
        <div className="space-y-1.5 text-left relative">
            <label className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">
                Secure Password
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={onChange}
                    className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none transition-all pr-12"
                />
                {/* Botón para alternar visibilidad - Iconos dinámicos de Lucide */}
                <button
                    type="button"
                    onClick={onTogglePassword}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
        </div>

        {/* SECCIÓN: Aceptación de Términos (Checkbox) */}
        <div className="flex items-start gap-3 mt-4 text-left">
            <input
                type="checkbox"
                name="agreed"
                id="agreed"
                checked={formData.agreed}
                onChange={onChange}
                className="mt-1 w-4 h-4 accent-black cursor-pointer"
            />
            <label htmlFor="agreed" className="text-[11px] leading-tight text-black font-medium cursor-pointer">
                I agree to the <span className="font-bold underline">Terms of Service</span> and <span className="font-bold underline">Privacy Policy</span>.
            </label>
        </div>

        {/* ACCIÓN: Botón de envío - Estado deshabilitado calculado en el Hook */}
        <Button
            type="submit"
            disabled={isSubmitDisabled}
            className="w-full h-16 bg-[#1A1A1A] hover:bg-black text-white rounded-sm font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 mt-4 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
            NEXT <ArrowRight size={18} />
        </Button>
    </form>
);