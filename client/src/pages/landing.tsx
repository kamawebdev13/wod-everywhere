import { Link } from 'react-router-dom';
import { Dumbbell, Compass, BarChart2 } from 'lucide-react';
import { ROUTES } from '@/const/routes';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/common/feature-card';
import { HERO_KETTLEBELL_URL } from '@/const/images';

const Landing = () => {
  return (
    <main className="min-h-screen bg-ivory-50 flex flex-col items-center">

      {/* 1. SECCIÓN HERO: Imagen y Títulos */}
      <section className="w-full max-w-md px-6 pt-12 pb-8 flex flex-col items-center text-center">
        <div className="w-full aspect-square rounded-lg overflow-hidden shadow-xl mb-10 bg-iron-800">
          <img
            src={HERO_KETTLEBELL_URL}
            alt="Kettlebell on the sand"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        <h1 className="font-display text-5xl font-bold text-iron-900 leading-tight uppercase tracking-tighter">
          TRAIN <br />
          <span className="text-brand-red">ANYWHERE</span>
        </h1>

        <p className="font-body text-gray-600 mt-5 max-w-70 leading-relaxed text-sm">
          The elite fitness engine for athletes who move. No gym required, just grit.
        </p>
      </section>

      {/* 2. ACCIONES PRINCIPALES */}
      <section className="w-full max-w-md px-6 flex flex-col gap-4 mb-14">
        <Link to={ROUTES.REGISTER} className="w-full">
          <Button variant="primary" className="w-full">
            Registrarse
          </Button>
        </Link>
        <Link to={ROUTES.LOGIN} className="w-full text-center">
          <Button variant="ghost">
            Ya tengo una cuenta
          </Button>
        </Link>
      </section>

      {/* 3. GRID DE FEATURES */}
      <section className="w-full max-w-md px-6 grid gap-4 mb-8">
        <FeatureCard
          icon={Dumbbell}
          iconColor="text-red-800"
          showBorder={true}
          title="Daily Wods"
          description="Professional programming delivered daily to your pocket."
        />
        <div className="grid grid-cols-2 gap-4">
          <FeatureCard
            icon={Compass}
            title="Local Events"
            description="Find boxes near you."
          />
          <FeatureCard
            icon={BarChart2}
            title="PR Tracking"
            description="Log your best lifts."
          />
        </div>
      </section>

      {/* 4. BANNER GLOBAL CREW (Call to Action final) */}
      <section className="w-full max-w-md px-6 pb-12">
        <Link to={ROUTES.REGISTER} className="block hover:scale-[1.01] transition-transform active:scale-95">
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

    </main>
  );
};

export default Landing;