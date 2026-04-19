import { Check, Zap } from 'lucide-react';
import type { IRegisterRequest } from '@/types/index';

// Datos estáticos fuera del componente para evitar re-renderizados innecesarios
const athleteLevels = [
    { id: 'BEGINNER', label: 'BEGINNER', desc: 'Foundation & Basic Mechanics' },
    { id: 'INTERMEDIATE', label: 'INTERMEDIATE', desc: 'Consistent Volume & Loading' },
    { id: 'ELITE', label: 'ELITE', desc: 'Competitive Performance' }
] as const;

interface LevelSelectorProps {
    selectedLevel: string;
    onSelect: (level: IRegisterRequest['level']) => void;
}

export const LevelSelector = ({ selectedLevel, onSelect }: LevelSelectorProps) => (
    <div className="space-y-3">
        {athleteLevels.map((level) => (
            <div 
                key={level.id}
                onClick={() => onSelect(level.id as IRegisterRequest['level'])}
                className={`relative bg-white p-5 cursor-pointer transition-all flex justify-between items-center shadow-sm ${
                    selectedLevel === level.id ? 'border-l-4px border-red-800' : 'border-l-4px border-transparent'
                }`}
            >
                <div>
                    <p className={`font-black text-lg italic uppercase leading-none ${selectedLevel === level.id ? 'text-red-900' : 'text-black'}`}>
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
);