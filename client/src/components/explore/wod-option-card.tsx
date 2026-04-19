import { type ReactElement } from 'react';
import { Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/common/feature-card';
import { type IWod } from '@/types';
import { ExercisePreviewList } from './exercise-preview-list';

interface WodOptionCardProps {
  wod: IWod;
  isRecommended?: boolean;
  onSelect: (wod: IWod) => void;
}

export const WodOptionCard = ({ wod, isRecommended, onSelect }: WodOptionCardProps): ReactElement => {
  return (
    <div className="relative">
      {isRecommended && (
        <div className="absolute -top-3 right-4 z-10 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
          Recomendado
        </div>
      )}

      <FeatureCard
        title={wod.type}
        icon={Zap}
        showBorder={isRecommended}
        borderColor="border-red-600"
      >
        <div className="flex items-center gap-3 mt-1 mb-4 text-[10px] font-bold text-gray-400 uppercase">
          <Clock size={12} className="text-red-600" />
          <span>20 MIN (EST.)</span>
        </div>

        <h2 className="text-2xl font-black uppercase italic text-iron-950 mb-6 leading-none">
          {wod.title}
        </h2>

        <ExercisePreviewList exercises={wod.exercises} />

        <Button 
          onClick={() => onSelect(wod)}
          className={`w-full h-12 uppercase font-bold tracking-widest text-[10px] ${
            isRecommended ? 'bg-iron-950 text-white' : 'bg-gray-100 text-iron-950'
          }`}
        >
          Seleccionar
        </Button>
      </FeatureCard>
    </div>
  );
};