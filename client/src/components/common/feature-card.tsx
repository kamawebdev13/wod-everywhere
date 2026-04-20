/**
 * Se utiliza 'import type' para cumplir con la regla 'verbatimModuleSyntax' del tsconfig.
 * Esto asegura que las importaciones de tipos se eliminen por completo durante la 
 * transpilación, optimizando el bundle final.
 */
import type { ComponentType } from 'react';
import type { LucideProps } from 'lucide-react';
  /**
   * Se define 'icon' como ComponentType para permitir el paso de componentes 
   * de iconos (como los de Lucide) como referencia, manteniendo la flexibilidad.
   */
interface FeatureCardProps {
  title: string;
  description?: string;
  icon?: ComponentType<LucideProps>;
  iconColor?: string; // Para controlar el rojo/negro
  showBorder?: boolean; //para controlar el borde lateral
  borderColor?: string; // Para controlar si es rojo o negro
  children?: React.ReactNode;
}

/**
 * Componente Stateless: FeatureCard
 * Se renombra 'icon' a 'Icon' (mayúscula) para que React lo reconozca como componente.
 */

const FeatureCard = ({ 
  title, 
  description, 
  icon: Icon, 
  iconColor = "text-iron-950",
  showBorder = false,
  borderColor = "border-red-800",
  children 
}: FeatureCardProps) => {
  return (
    <article className={`
      relative bg-white p-6 rounded-xl shadow-sm flex flex-col
      ${showBorder ? `border-l-4 ${borderColor}` : 'border-l-0'} 
    `}>
      {Icon && <Icon className={`w-7 h-7 mb-4 ${iconColor}`} />}
      <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</h3>
      
      {/* Si hay children lo muestra. Si no, muestra la descripción */}
      {children ? children : (
        <p className="text-sm text-iron-600 mt-2 font-medium">{description}</p>
      )}
    </article> 
  );
};
export default FeatureCard;