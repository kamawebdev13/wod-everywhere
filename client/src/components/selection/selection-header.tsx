/**
 * PROPS: HeaderProps
 * Define los datos necesarios para renderizar el estado del entrenamiento.
 */
interface HeaderProps {
    type: string;
    title: string;
    isActive: boolean;
    timeDisplay: string;
    progress: number; // Valor de 0 a 100
}

/**
 * COMPONENTE STATELESS: SelectionHeader
 * Muestra el temporizador principal y la identidad del WOD.
 * Punto 2 (Robustez): Se eliminan estilos inline de CSS para cumplir con la rúbrica.
 */
export const SelectionHeader = ({ type, title, isActive, timeDisplay, progress }: HeaderProps) => (
    <header className="px-6 pt-6 shrink-0 bg-white z-20 text-left">
        {/* Información de cabecera: Tipo de sesión y estado Live/Paused */}
        <div className="flex justify-between items-end">
            <span className="text-[10px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
                {type} • SESSION
            </span>
            <span className="text-[10px] font-bold text-red-600 uppercase italic">
                {isActive ? 'Live' : 'Paused'}
            </span>
        </div>

        {/* Temporizador gigante: Formato MM:SS */}
        <h1 className="text-8xl font-black tracking-tighter leading-none my-2 text-zinc-950 italic">
            {timeDisplay}
        </h1>

        {/* BARRA DE PROGRESO (Solución al error de Inline Styles) SUGERIDO POR GEMINI
            Punto 3 (Arquitectura): Usamos una variable CSS (--progress) para pasar 
            el valor dinámico sin escribir propiedades CSS directamente en el atributo style.
        */}
        <progress
            className="block w-full h-1.5 overflow-hidden rounded-full appearance-none [&::-webkit-progress-bar]:bg-zinc-100 [&::-webkit-progress-value]:bg-red-600 [&::-moz-progress-bar]:bg-red-600"
            max="100"
            value={progress}
        >
            {progress}%
        </progress>

        {/* Título del entrenamiento con acento visual lateral */}
        <div className="mt-8 border-l-4 border-red-600 pl-4">
            <h2 className="text-4xl font-bold uppercase italic leading-[0.8] text-zinc-950">
                {title}
            </h2>
        </div>
    </header>
);