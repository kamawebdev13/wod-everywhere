/**
 * Componente de encabezado para el paso 2 del registro.
 * Mantiene la estética "Phase 01 / Engine" consistente.
 */
export const RegisterTwoHeader = () => (
    <header className="mb-8 text-left">
        <p className="text-[12px] font-bold text-red-800 uppercase tracking-widest mb-1 italic">
            Phase 01
        </p>
        <h1 className="text-[44px] font-black text-black leading-[0.9] uppercase tracking-tighter italic">
            DEFINE YOUR<br /><span className="text-red-900">ENGINE</span>
        </h1>
        <div className="w-12 h-1 bg-black mt-4"></div>
    </header>
);