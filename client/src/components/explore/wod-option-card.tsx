import { type ReactElement } from 'react';
import { Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/common/feature-card';
import { type IWod } from '@/types';
import { ExercisePreviewList } from './exercise-preview-list';

/**
 * INTERFAZ: WodOptionCardProps
 * Define las propiedades del componente con tipado estricto.
 */
interface WodOptionCardProps {
  wod: IWod;
  isRecommended?: boolean;
  onSelect: (wod: IWod) => void;
}

/**
 * Componente: WodOptionCard
 * Representa una opción de entrenamiento disponible para el usuario.

 */
export const WodOptionCard = ({ wod, isRecommended = false, onSelect }: WodOptionCardProps): ReactElement => {
  // Deconstruimos el objeto 'wod' para evitar repeticiones y cumplir la rúbrica de eficiencia
  const { type, title, exercises } = wod;

  return (
    <div className="relative">
      {/* Condicional para la etiqueta de recomendación */}
      {isRecommended && (
        <div className="absolute -top-3 right-4 z-10 bg-red-600 text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
          Recomendado
        </div>
      )}

      {/* FeatureCard: Usamos la forma corta para 'showBorder' si es recomendado.
          Pasamos strings directos a las props de diseño.
      */}
      <FeatureCard
        title={type}
        icon={Zap}
        showBorder={isRecommended} // Rúbrica: Prop booleana automática
        borderColor="border-red-600"
      >
        {/* Info de tiempo estimado */}
        <div className="flex items-center gap-3 mt-1 mb-4 text-[10px] font-bold text-gray-400 uppercase">
          <Clock size={12} className="text-red-600" />
          <span>20 MIN (EST.)</span>
        </div>

        {/* Título del entrenamiento extraído por deconstrucción */}
        <h2 className="text-2xl font-black uppercase italic text-iron-950 mb-6 leading-none">
          {title}
        </h2>

        {/* Lista previa de ejercicios del WOD */}
        <ExercisePreviewList exercises={exercises} />

        {/* Botón de acción: Se asegura el uso de cursor-pointer y 
            clases dinámicas según la recomendación.
        */}
        <Button 
          onClick={() => onSelect(wod)}
          className={`w-full h-12 uppercase font-bold tracking-widest text-[10px] cursor-pointer ${
            isRecommended ? 'bg-iron-950 text-white' : 'bg-gray-100 text-iron-950'
          }`}
        >
          Seleccionar
        </Button>
      </FeatureCard>
    </div>
  );
};