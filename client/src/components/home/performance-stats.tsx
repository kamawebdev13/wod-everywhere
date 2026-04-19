import { Zap } from 'lucide-react';

interface PerformanceStatsProps {
  title: string;
  dateInfo: string;
  personalRecords: number;
}

export const PerformanceStats = ({ 
  title, 
  dateInfo, 
  personalRecords 
}: PerformanceStatsProps) => (
  <section className="px-6 pb-10">
    <h3 className="text-[10px] font-bold text-black uppercase tracking-[0.3em] mb-6 border-l-2 border-black pl-3 text-left">
      RECENT PERFORMANCE
    </h3>

    <div className="bg-[#EFEFEF] p-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="bg-black p-4">
          <Zap size={24} className="text-white" fill="currentColor" />
        </div>
        <div className="text-left">
          <h4 className="font-black text-sm uppercase leading-tight">
            {title}
          </h4>
          <p className="text-[10px] font-bold text-gray-500 uppercase mt-1">
            {dateInfo}
          </p>
        </div>
      </div>
      <div className="text-right">
        <span className="text-3xl font-black">
          {personalRecords}
        </span>
        <span className="text-[10px] font-bold ml-1 text-gray-500 uppercase">PRs</span>
      </div>
    </div>
  </section>
);