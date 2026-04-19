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
    <footer className="fixed bottom-0 left-0 right-0 p-6 bg-white/90 backdrop-blur-md flex gap-4 z-30 border-t border-zinc-100">
        <Button 
            onClick={onToggle}
            className="flex-1 h-14 bg-zinc-100 text-zinc-950 font-bold uppercase tracking-widest text-[10px] rounded-xl"
            aria-label={isActive ? "Pausar entrenamiento" : "Reanudar entrenamiento"}
        >
            {isActive ? (
                <><Pause className="mr-2" size={16} /> Pause</>
            ) : (
                <><Play className="mr-2" size={16} /> Resume</>
            )}
        </Button>
        <Button 
            onClick={onFinish}
            className="flex-1 h-14 bg-zinc-950 text-white font-bold uppercase tracking-widest text-[10px] rounded-xl shadow-lg active:scale-95 transition-transform"
        >
            <Flag className="mr-2" size={16} /> Finish
        </Button>
    </footer>
);