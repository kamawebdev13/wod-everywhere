import { type ReactElement } from 'react';
import { history_photo_url } from '@/const/images';

export const HistoryEditorial = (): ReactElement => {
  return (
    <div className="pt-4 pb-12">
      <div className="relative w-full h-64 rounded-2xl overflow-hidden shadow-2xl bg-zinc-900 group">
        <img 
          src={ history_photo_url}
          alt="Athletic Performance"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110"
          onLoad={(e) => {
            // Manejo de la transición una vez descargado el asset de Supabase
            e.currentTarget.classList.remove('opacity-0');
            e.currentTarget.classList.add('opacity-60');
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-center px-8 select-none">
          <h2 className="text-white text-[34px] font-black leading-[0.9] italic tracking-tighter uppercase">
            NO EXCUSES.<br />
            <span className="text-white/90">JUST</span><br />
            PERFORMANCE.
          </h2>
          <div className="mt-6 pt-3 border-t border-red-900/40 w-fit">
            <p className="text-red-600 text-[10px] font-black uppercase tracking-[0.4em] italic">
              ATHLETIC EDITORIAL / VOL 04
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};