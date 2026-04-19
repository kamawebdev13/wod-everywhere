import { TargetSelector } from '@/components/explore/target-selector';
import { type IconMap } from '@/types/icon';

interface TargetSectionProps {
    selectedId: string | null;
    onSelect: (id: string) => void;
    icons: IconMap; 
}

/**
 * Componente Stateless: TargetSection
 * Renderiza la sección de objetivos musculares con tipado de iconos de Lucide.
 */
export const TargetSection = ({ selectedId, onSelect, icons }: TargetSectionProps) => (
    <section className="mt-12 text-left">
        <div className="flex items-center gap-3 mb-6">
            <div className="h-0.5 w-8 bg-red-600" />
            <h2 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">
                Body Target
            </h2>
        </div>
        <TargetSelector 
            selectedId={selectedId} 
            onSelect={onSelect} 
            icons={icons} 
        />
    </section>
);