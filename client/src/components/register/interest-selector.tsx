import { X } from 'lucide-react';

interface InterestSelectorProps {
    interests: string[];
    selectedInterests: string[];
    onToggle: (tag: string) => void;
}

/**
 * Selector múltiple de intereses.
 * Renderiza etiquetas interactivas basadas en el estado del Hook.
 */
export const InterestSelector = ({ 
    interests, 
    selectedInterests, 
    onToggle 
}: InterestSelectorProps) => (
    <section className="mb-10 text-left">
        <div className="flex justify-between items-end mb-4">
            <h3 className="text-[14px] font-black text-black uppercase tracking-tight italic">
                Interests
            </h3>
            <span className="text-[10px] text-gray-500 italic font-medium tracking-tighter">
                Select multiple
            </span>
        </div>
        
        <div className="flex flex-wrap gap-2">
            {interests.map((tag) => {
                const isTagSelected = selectedInterests.includes(tag);
                return (
                    <button
                        key={tag}
                        type="button"
                        onClick={() => onToggle(tag)}
                        className={`px-4 py-2 text-[13px] font-bold transition-all flex items-center gap-2 rounded-sm ${
                            isTagSelected ? 'bg-black text-white' : 'bg-gray-200 text-black'
                        }`}
                    >
                        {tag} {isTagSelected && <X size={14} />}
                    </button>
                );
            })}
        </div>
    </section>
);