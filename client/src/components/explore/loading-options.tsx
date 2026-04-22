import { type ReactElement, useState, useEffect } from 'react';
import { Loader2, Dumbbell } from 'lucide-react';

export const LoadingOptions = (): ReactElement => {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    "Buscando los mejores ejercicios...",
    "Analizando tu equipamiento...",
    "Optimizando rondas e intensidades...",
    "Casi listo para sudar..."
  ];

  // Efecto para rotar mensajes cada 800ms
  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] animate-fade-in text-center px-8">
      {/* Icono animado */}
      <div className="relative mb-10">
        <div className="z-10 relative">
          <Dumbbell size={52} className="text-iron-950 animate-bounce" />
        </div>
        <Loader2
          size={84}
          className="text-brand-red animate-spin absolute -top-4 -left-4 opacity-30"
          strokeWidth={1}
        />
      </div>

      <h2 className="font-display text-3xl font-black uppercase tracking-tighter text-iron-950 mb-3 leading-none">
        Diseñando <br /> tu WOD
      </h2>

      {/* Mensaje dinámico que cambia */}
      <div className="h-4"> {/* Altura fija para evitar saltos de layout */}
        <p className="text-xs text-iron-500 font-bold uppercase tracking-widest animate-pulse">
          {messages[messageIndex]}
        </p>
      </div>

      {/* Barra de progreso decorativa */}
      <div className="w-56 h-1 bg-iron-100 mt-12 rounded-full overflow-hidden relative">
        <div className="h-full bg-brand-red w-full animate-[pulse_2s_infinite] opacity-70" />

        <div className="absolute inset-0 bg-linear-to-r from-transparent via-brand-red/20 to-transparent animate-pulse" />
      </div>
    </div>
  );
};