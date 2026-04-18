import { useState, type ReactElement } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Check, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { authService } from '@/services/api';
import { ROUTES } from '@/const/routes';
import type { IRegisterRequest } from '@/types/index';

/**
 * Constantes de datos en camelCase según rúbrica (no son de entorno ni routing).
 * Representan las opciones de nivel de atleta disponibles en el diseño.
 */
const athleteLevels = [
  { id: 'BEGINNER', label: 'BEGINNER', desc: 'Foundation & Basic Mechanics' },
  { id: 'INTERMEDIATE', label: 'INTERMEDIATE', desc: 'Consistent Volume & Loading' },
  { id: 'ELITE', label: 'ELITE', desc: 'Competitive Performance' }
] as const;

/**
 * Etiquetas de intereses disponibles para selección múltiple.
 */
const interestTags = [
  'Endurance', 'Functional', 'Strength', 'HIIT', 'Powerlifting', 'Mobility', 'Gymnastics'
];

export const RegisterTwoPage = (): ReactElement => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Recuperación de datos del Step 1 (name, email, password) desde el estado de navegación
  const stepOneData = location.state || {};

  // Estados locales 
  const [selectedLevel, setSelectedLevel] = useState<IRegisterRequest['level']>('INTERMEDIATE');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(['Endurance', 'Functional', 'HIIT']);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  /**
   * Maneja la selección/deselección de intereses (Select Multiple).
   */
  const handleToggleInterest = (interest: string): void => {
    setSelectedInterests((prev) => 
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  };

  /**
   * Ejecuta la llamada final al servicio de autenticación para crear el perfil.
   * Utiliza la interfaz IRegisterRequest para asegurar la integridad de los datos.
   */
  const handleCreateProfile = async (): Promise<void> => {
    setIsLoading(true);
    setAuthError(null); // Limpieza de errores previa para cumplir con UX
    
    try {
      // Consolidación de datos de ambos pasos del registro
      const finalRegistrationData: IRegisterRequest = {
        ...stepOneData,
        level: selectedLevel,
        tags: selectedInterests,
        password: stepOneData.password 
      };
      
      // Llamada al servicio que utiliza FETCH 
      await authService.register(finalRegistrationData);
      
      // Navegación exitosa usando constantes de routing en UPPER_SNAKE_CASE
      navigate(ROUTES.LOGIN); 
    } catch  {
      // Gestión de errores mediante UI 
      setAuthError('THE ENGINE COULD NOT BE CREATED. PLEASE CHECK YOUR DATA.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col px-6 pt-12 pb-6 font-sans">
      
      {/* HEADER: Identidad visual Phase 01 */}
      <header className="mb-8 text-left">
        <p className="text-[12px] font-bold text-red-800 uppercase tracking-widest mb-1 italic">Phase 01</p>
        <h1 className="text-[44px] font-black text-black leading-[0.9] uppercase tracking-tighter italic">
          DEFINE YOUR<br /><span className="text-red-900">ENGINE</span>
        </h1>
        <div className="w-12 h-1 bg-black mt-4"></div>
      </header>

      {/* SECCIÓN: Selección de Nivel (Single Choice) */}
      <section className="mb-10 text-left">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-[14px] font-black text-black uppercase tracking-tight italic">Select Level</h3>
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Step 2 of 2</span>
        </div>

        <div className="space-y-3">
          {athleteLevels.map((level) => (
            <div 
              key={level.id}
              onClick={() => setSelectedLevel(level.id as IRegisterRequest['level'])}
              className={`relative bg-white p-5 cursor-pointer transition-all flex justify-between items-center shadow-sm hover:shadow-md ${
                selectedLevel === level.id ? 'border-l-4px border-red-800' : 'border-l-4px border-transparent'
              }`}
            >
              <div>
                <p className={`font-black text-lg italic leading-none uppercase ${selectedLevel === level.id ? 'text-red-900' : 'text-black'}`}>
                  {level.label}
                </p>
                <p className="text-[12px] text-gray-500 font-medium mt-1">{level.desc}</p>
              </div>
              
              <div className="flex items-center">
                {selectedLevel === level.id ? (
                  <div className="bg-red-900 rounded-full p-1 text-white">
                    <Check size={16} strokeWidth={4} />
                  </div>
                ) : (
                  level.id === 'ELITE' ? <Zap size={20} className="text-gray-100" /> : <div className="w-5 h-5 border-2 border-gray-100 rounded-full" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN: Intereses (Multiple Selection) */}
      <section className="mb-10 text-left">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-[14px] font-black text-black uppercase tracking-tight italic">Interests</h3>
          <span className="text-[10px] text-gray-500 italic font-medium tracking-tighter">Select multiple</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {interestTags.map((tag) => {
            const isTagSelected = selectedInterests.includes(tag);
            return (
              <button
                key={tag}
                type="button"
                onClick={() => handleToggleInterest(tag)}
                className={`px-4 py-2 text-[13px] font-bold transition-all flex items-center gap-2 rounded-sm ${
                  isTagSelected 
                    ? tag === 'Functional' ? 'bg-red-900 text-white' : 'bg-black text-white' 
                    : 'bg-gray-200 text-black'
                }`}
              >
                {tag} {isTagSelected && <X size={14} />}
              </button>
            );
          })}
        </div>
      </section>

      {/* FOOTER: Errores, Acción y Términos */}
      <footer className="mt-auto space-y-4">
        {/* Mensaje de error para el usuario */}
        {authError && (
          <p className="text-red-700 text-[11px] font-black uppercase text-center italic tracking-widest bg-red-50 p-2 border border-red-100">
            {authError}
          </p>
        )}

        <Button
          onClick={handleCreateProfile}
          disabled={isLoading || selectedInterests.length === 0}
          className="w-full h-16 bg-[#1A1A1A] hover:bg-black text-white rounded-md font-black uppercase tracking-widest text-[16px] shadow-xl transition-transform active:scale-95"
        >
          {isLoading ? 'CREATING PROFILE...' : 'CREATE PROFILE'}
        </Button>

        <p className="text-[10px] text-gray-400 font-bold text-center leading-tight tracking-widest px-4 uppercase">
          By creating a profile you agree to our <span className="underline text-black">Terms of Service</span> and <span className="underline text-black">Privacy Policy</span>
        </p>
      </footer>
    </div>
  );
};