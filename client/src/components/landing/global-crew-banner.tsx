import { Link } from 'react-router-dom';

interface GlobalCrewBannerProps {
  targetRoute: string;
}

export const GlobalCrewBanner = ({ targetRoute }: GlobalCrewBannerProps) => (
  <section className="w-full max-w-md px-6 pb-12">
    <Link to={targetRoute} className="block hover:scale-[1.01] transition-transform active:scale-95">
      <div className="bg-black text-white p-8 rounded-md text-center flex flex-col gap-1 shadow-2xl">
        <h2 className="font-display text-2xl font-bold italic uppercase tracking-tight leading-none">
          JOIN THE <span className="text-brand-red">GLOBAL</span><br />
          CREW
        </h2>
        <p className="font-body text-[10px] text-gray-400 mt-3 tracking-widest font-bold uppercase">
          150+ Workouts • 45 Countries • 1 Community
        </p>
      </div>
    </Link>
  </section>
);