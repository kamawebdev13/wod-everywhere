import { type ReactElement } from 'react';
import { useHistory } from '@/hooks/use-history';
import { HistoryCard } from '@/components/history/history-card';
import { HistoryEditorial } from '@/components/history/history-editorial';

export const HistoryPage = (): ReactElement => {
  const { history, isLoading, error } = useHistory(); // Lógica delegada al hook

  return (
    <div className="min-h-screen bg-[#FDFDFD] flex flex-col font-sans pb-32">
      <header className="px-7 pt-12 pb-6">
        <h1 className="text-[58px] font-black text-black leading-none tracking-tight">HISTORY</h1>
        <div className="w-16 h-1.5 bg-red-900 mt-3"></div>
      </header>

      <main className="px-7 space-y-4">
        {isLoading && <p className="text-center py-10 animate-pulse font-black text-zinc-300">SYNCING DATA...</p>}
        
        {error && <p className="text-red-900 text-[10px] font-black uppercase text-center bg-red-50 p-4 italic">{error}</p>}

        {!isLoading && history.map((workout, index) => (
          <HistoryCard 
            key={workout._id} 
            workout={workout} 
            isFirst={index === 0} 
          />
        ))}

        {/* Sección Editorial Stateless  */}
        <div className="pt-4">
           {!isLoading && history.length > 0 && <HistoryEditorial />}
        </div>
      </main>
    </div>
  );
};

export default HistoryPage;