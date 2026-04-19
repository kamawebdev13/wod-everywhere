import { type ReactElement } from 'react';
import { Dumbbell } from 'lucide-react';
import { type TrainingOption } from '@/types/training';

interface EquipmentSelectorProps {
  options: TrainingOption[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const EquipmentSelector = ({ 
  options, 
  selectedIds, 
  onToggle 
}: EquipmentSelectorProps): ReactElement => {
  return (
    <section className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-0.5 w-8 bg-red-600" />
        <h2 className="font-bold uppercase tracking-widest text-[10px] text-gray-400">
          Equipamiento Disponible
        </h2>
      </div>
      
      <div className="bg-zinc-100 p-6 rounded-xl grid grid-cols-3 gap-6">
        {options.map((item) => {
          const isSelected = selectedIds.includes(item.id);
          
          return (
            <button 
              key={item.id} 
              onClick={() => onToggle(item.id)} 
              className="flex flex-col items-center gap-2 group"
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                isSelected 
                  ? 'bg-red-600 text-white shadow-lg scale-110' 
                  : 'bg-white text-iron-950 shadow-sm group-active:scale-90'
              }`}>
                <Dumbbell size={20} />
              </div>
              <span className={`text-[9px] font-bold uppercase tracking-tight text-center leading-tight ${
                isSelected ? 'text-iron-950' : 'text-gray-400'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};