import { Pause, Play, Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * PROPS: WorkoutControlsProps
 */
interface WorkoutControlsProps {
    isActive: boolean;
    onToggle: () => void;
    onFinish: () => void;
}

/**
 * COMPONENTE STATELESS: WorkoutControls
 * Botones persistente con desenfoque de fondo para control de sesión.
 */
export const WorkoutControls = ({ isActive, onToggle, onFinish }: WorkoutControlsProps) => (
    /* CAMBIO CLAVE sugerido por GEMINI: 
       1. Quitamos fixed, left-0, right-0. 
       2. Usamos w-full para que ocupe el ancho del contenedor max-w-md.
       3. Quitamos bg-white/90 para que no se vea doble fondo si ya hay uno en el padre.
    */
    <footer className="w-full p-4 flex gap-4 z-30 bg-white">
        <Button 
            onClick={onToggle}
            
            className="flex-1 h-16 bg-zinc-100 hover:bg-zinc-200 text-zinc-950 font-bold uppercase tracking-widest text-[11px] rounded-2xl flex items-center justify-center transition-colors"
            aria-label={isActive ? "Pausar entrenamiento" : "Reanudar entrenamiento"}
        >
            {isActive ? (
                <><Pause size={18} className="mr-2" /> PAUSE</>
            ) : (
                <><Play size={18} className="mr-2" /> RESUME</>
            )}
        </Button>

        <Button 
            onClick={onFinish}
            
            className="flex-1 h-16 bg-zinc-950 hover:bg-zinc-900 text-white font-bold uppercase tracking-widest text-[11px] rounded-2xl shadow-xl active:scale-95 transition-transform flex items-center justify-center"
        >
            <Flag size={18} className="mr-2" /> FINISH
        </Button>
    </footer>
);