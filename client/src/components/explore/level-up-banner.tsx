import { type ReactElement } from 'react';
import { Zap } from 'lucide-react';

export const LevelUpBanner = (): ReactElement => (
  <div className="mt-12 bg-gray-100 p-8 rounded-sm text-center relative overflow-hidden">
    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-red block mb-2">
      Level Up
    </span>
    <h3 className="font-display text-2xl font-bold uppercase leading-tight text-iron-950 mb-4">
      No te conformes <br /> con lo básico
    </h3>
    <p className="text-[11px] text-gray-500 leading-relaxed mb-6 px-4">
      Explora nuestra biblioteca de más de 500 WODs diseñados por atletas de élite.
    </p>
    <div className="inline-flex p-4 bg-white rounded-lg shadow-sm">
      <Zap size={32} className="text-gray-200" />
    </div>
  </div>
);