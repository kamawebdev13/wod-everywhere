import { type ReactElement, type ComponentType } from 'react';
import { Accessibility } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import FeatureCard from '@/components/common/feature-card';
import { targets } from '@/const/targets';

interface TargetSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  icons: Record<string, ComponentType<LucideProps>>;
}

export const TargetSelector = ({ selectedId, onSelect, icons }: TargetSelectorProps): ReactElement => {
  return (
    <div className="grid grid-cols-2 gap-4">
      {targets.map((target) => {
        const Icon = icons[target.id] || Accessibility;
        const isSelected = selectedId === target.id;
        
        return (
          <button 
            key={target.id} 
            onClick={() => onSelect(target.id)} 
            className={`transition-all ${target.id === 'cardio' ? 'col-span-2' : ''}`}
          >
            <FeatureCard
              title="Objetivo"
              icon={Icon}
              showBorder={isSelected}
              borderColor="border-red-600"
              iconColor={isSelected ? "text-iron-950" : "text-gray-300"}
            >
              <span className={`font-bold uppercase text-xs tracking-widest italic ${isSelected ? 'text-iron-950' : 'text-gray-400'}`}>
                {target.label}
              </span>
            </FeatureCard>
          </button>
        );
      })}
    </div>
  );
};