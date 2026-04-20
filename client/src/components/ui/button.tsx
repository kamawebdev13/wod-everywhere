// 1. Tipado completo
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  variant?: 'primary' | 'ghost' | 'outline'; // 'outline' ya está declarado aquí correctamente
}

export const Button = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}: ButtonProps) => {
  
  // 3. Clases base comunes con CURSOR-POINTER incluido
  const baseClasses = "cursor-pointer font-body text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-iron-800 disabled:cursor-not-allowed disabled:opacity-50";
  
  // 4. Clases específicas por variante
 
  const variantClasses: Record<'primary' | 'ghost' | 'outline', string> = {
    primary: "bg-iron-900 text-white py-4 rounded-sm font-semibold hover:bg-iron-800 active:scale-[0.98]",
    ghost: "text-iron-900 py-2 text-sm font-medium hover:underline",
    outline: "border-2 border-iron-900 text-iron-900 py-4 rounded-sm font-semibold hover:bg-iron-50 active:scale-[0.98]", 
  };

  return (
    <button 
      // 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};