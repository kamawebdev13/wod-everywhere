import { type ReactElement } from 'react';
import { Loader2, Dumbbell } from 'lucide-react';

/**
 * Pantalla de transición que se muestra mientras se generan los WODs.
 */
export const LoadingOptions = (): ReactElement => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in text-center px-6">
      {/* Icono animado con color de marca */}
      <div className="relative mb-8">
        <Dumbbell size={48} className="text-iron-950 animate-bounce" />
        <Loader2 
          size={80} 
          className="text-brand-red animate-spin absolute -top-4 -left-4 opacity-20" 
        />
      </div>

      <h2 className="font-display text-2xl font-bold uppercase tracking-tighter text-iron-950 mb-2">
        Preparando <br /> tus opciones
      </h2>
      
      <p className="text-sm text-iron-600 font-medium italic">
        Buscando los mejores ejercicios para tu objetivo...
      </p>

      {/* Barra de progreso decorativa */}
      <div className="w-48 h-1 bg-gray-200 mt-8 rounded-full overflow-hidden">
        <div className="h-full bg-brand-red animate-progress-loading" />
      </div>
    </div>
  );
};