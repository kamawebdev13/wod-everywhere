import { type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { type IWod } from '@/types';
import { WodOptionCard } from '@/components/explore/wod-option-card';
import { LevelUpBanner } from '@/components/explore/level-up-banner';

/**
 * Página que muestra las 3 opciones de WOD generadas por el backend.
 * Utiliza la interfaz IWod para asegurar la compatibilidad con el seed.ts.
 */
export const GeneratedWodsPage = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();

// Recuperamos los WODs del estado de navegación
  const { wods } = (location.state as { wods: IWod[] }) || { wods: [] };


  const handleSelectWod = (wod: IWod): void => {
    // Navegamos a la página de ejecución del entrenamiento
    navigate('/selection-page', { state: { selectedWod: wod } });
  };

  return (
    <div className="animate-fade-in pb-20 px-6 bg-[#F8F9FA] min-h-screen">
      <header className="py-10">
        <span className="text-red-600 font-bold text-[10px] tracking-widest uppercase">
          Resultados
        </span>
        <h1 className="text-5xl font-black text-iron-950 uppercase tracking-tighter leading-[0.8] mt-2">
          Tus <br /> Opciones
        </h1>
      </header>

      <div className="space-y-10">
        {wods.map((wod, index) => (
          <WodOptionCard 
            key={wod._id} 
            wod={wod} 
            isRecommended={index === 0} 
            onSelect={handleSelectWod}
          />
        ))}
      </div>
      
     <LevelUpBanner />
    </div>
  );
};

export default GeneratedWodsPage;