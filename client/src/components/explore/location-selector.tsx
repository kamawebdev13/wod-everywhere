import { type ReactElement, type ComponentType } from 'react';
import { Dumbbell } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import FeatureCard from '@/components/common/feature-card';
import { locations } from '@/const/locations';

interface LocationSelectorProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
  icons: Record<string, ComponentType<LucideProps>>;
}

export const LocationSelector = ({ selectedId, onSelect, icons }: LocationSelectorProps): ReactElement => {
  return (
    <div className="grid grid-cols-2 gap-4 mb-10">
      {locations.map((loc) => {
        const Icon = icons[loc.id] || Dumbbell;
        const isActive = selectedId === loc.id;
        
        return (
          <button key={loc.id} onClick={() => onSelect(loc.id)} className="text-left transition-transform active:scale-95">
            <FeatureCard
              title="Lugar"
              icon={Icon}
              showBorder={isActive}
              borderColor="border-red-600"
              iconColor={isActive ? "text-iron-950" : "text-gray-300"}
            >
              <span className={`font-bold uppercase text-xs tracking-widest ${isActive ? 'text-iron-950' : 'text-gray-400'}`}>
                {loc.label}
              </span>
            </FeatureCard>
          </button>
        );
      })}
    </div>
  );
};