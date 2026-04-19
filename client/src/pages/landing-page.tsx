import { Link } from 'react-router-dom';
import { Dumbbell, Compass, BarChart2 } from 'lucide-react';
import { ROUTES } from '@/const/routes';
import { Button } from '@/components/ui/button';
import FeatureCard from '@/components/common/feature-card';
import { hero_kettlebell_url } from '@/const/images';

// Importación de componentes Stateless
import { HeroSection } from '@/components/landing/hero-section';
import { GlobalCrewBanner } from '@/components/landing/global-crew-banner';

const Landing = () => {
  return (
    <main className="min-h-screen bg-ivory-50 flex flex-col items-center">

      {/* 1. SECCIÓN HERO: Imagen y Títulos (Refactorizado a Stateless) */}
      <HeroSection image={hero_kettlebell_url} />

      {/* 2. ACCIONES PRINCIPALES: Gestión de Navegación */}
      <section className="w-full max-w-md px-6 flex flex-col gap-4 mb-14">
        <Link to={ROUTES.REGISTER_STEP_ONE} className="w-full">
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

      {/* 3. GRID DE FEATURES: Reutilización de componentes comunes */}
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

      {/* 4. BANNER GLOBAL CREW: Call to Action final (Refactorizado a Stateless) */}
      {/* Ajustamos la ruta a STEP_ONE para asegurar la integridad del flujo de registro */}
      <GlobalCrewBanner targetRoute={ROUTES.REGISTER_STEP_ONE} />

    </main>
  );
};

export default Landing;