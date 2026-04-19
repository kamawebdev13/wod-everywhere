interface StatCardProps {
  label: string;
  value: string | number;
  variant?: 'dark' | 'accent';
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard = ({ label, value, variant = 'accent', icon, className = '' }: StatCardProps) => {
  const styles = variant === 'dark' 
    ? 'bg-zinc-950 text-white' 
    : 'bg-white border-l-4 border-red-600 text-zinc-950 shadow-sm';

  return (
    <div className={`rounded-xl p-6 flex flex-col justify-center relative overflow-hidden ${styles} ${className}`}>
      <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${variant === 'dark' ? 'opacity-50' : 'text-zinc-400'}`}>{label}</span>
      <div className={`${variant === 'dark' ? 'text-4xl' : 'text-xl'} font-black uppercase italic leading-tight`}>{value}</div>
      {icon && <div className="absolute bottom-2 right-2 opacity-20 text-red-600">{icon}</div>}
    </div>
  );
};