// 1. Tipado completo para un botón HTML en TypeScript
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode; // contenido inyectado via {props.children} *sugerido por Gemini más eficiente*
  variant?: 'primary' | 'ghost'; // Definimos las variantes visuales
}

// 2. Exportamos el Componente Button
export const Button = ({ 
  children, 
  variant = 'primary', // 'primary' por defecto (Iron 900)
  className = '', 
  ...props // Pasamos el resto de props (onClick, type, disabled...)
}: ButtonProps) => {
  
 // 3. Clases base comunes 
// Añadimos 'cursor-pointer' para el cambio de puntero
const baseClasses = "cursor-pointer font-body text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iron-800 disabled:cursor-not-allowed disabled:opacity-50";
  
  // 4. Clases específicas por variante (Sistema Iron & Ivory)
  const variantClasses = {
    primary: "bg-iron-900 text-white py-4 rounded-sm font-semibold hover:bg-iron-800 active:scale-[0.98]",
    ghost: "text-iron-900 py-2 text-sm font-medium hover:underline",
  };

  return (
    <button 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};