/**
 * Se utiliza 'import type' para cumplir con la regla 'verbatimModuleSyntax' del tsconfig.
 * Esto asegura que las importaciones de tipos se eliminen por completo durante la 
 * transpilación, optimizando el bundle final.
 */
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  /**
   * Se define 'icon' como ComponentType para permitir el paso de componentes 
   * de iconos (como los de Lucide) como referencia, manteniendo la flexibilidad.
   */
  icon: ComponentType<LucideProps>;
}

/**
 * Componente Stateless: FeatureCard
 * Sigue la convención PascalCase y utiliza deconstrucción de parámetros.
 * Se renombra 'icon' a 'Icon' (mayúscula) para que React lo reconozca como componente.
 */

const FeatureCard = ({ title, description, icon: Icon }: FeatureCardProps) => {
  return (
    <article className="p-4 border rounded-lg shadow-sm">
      <Icon className="w-10 h-10" />

      <h3 className="text-xl font-bold mt-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </article>
  );
};

export default FeatureCard;