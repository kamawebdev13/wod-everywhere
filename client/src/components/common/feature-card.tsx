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
  iconColor?: string; // Para controlar el rojo/negro
  showBorder?: boolean; //para controlar el borde lateral
}

/**
 * Componente Stateless: FeatureCard
 * Sigue la convención PascalCase y utiliza deconstrucción de parámetros.
 * Se renombra 'icon' a 'Icon' (mayúscula) para que React lo reconozca como componente.
 */

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = "text-iron-950",
  showBorder = false // Por defecto no tiene borde
}: FeatureCardProps) => {
  return (
    <article className={`
      relative bg-white p-6 rounded-xl shadow-sm flex flex-col
      ${showBorder ? 'border-l-4 border-red-800' : 'border-l-0'} 
    `}>
      <Icon className={`w-7 h-7 mb-4 ${iconColor}`} />
      <h3 className="text-xl font-black text-iron-950 uppercase leading-tight">{title}</h3>
      <p className="text-sm text-iron-600 mt-2 font-medium">{description}</p>
    </article> 
  );
};

export default FeatureCard;