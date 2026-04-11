import { Link } from 'react-router-dom';
import { ROUTES } from '@/const/routes';
// 1. Probamos tu ALIAS @/
import { Button } from '@/components/ui/button';

const Landing = () => {
  return (
    <main className="min-h-screen bg-ivory-50 flex flex-col items-center justify-center gap-10 p-6">
      {/* 2. Probamos tu fuente Display (Space Grotesk) y color Brand Red */}
      <h1 className="font-display text-5xl font-bold uppercase tracking-tight text-brand-red">
        PROBANDO CSS
      </h1>
      
      <p className="font-body text-iron-900 max-w-sm text-center">
        Si ves el título en rojo oscuro y Space Grotesk, y este texto en Lexend, tu CSS está perfecto.
      </p>

      {/* 3. Probamos tu componente Button con la variante 'primary' (Negro Iron) */}
      <Link to={ROUTES.REGISTER} className="w-full max-w-md">
        <Button variant="primary" className="w-full">
          REGISTRARSE (Boton Primary)
        </Button>
      </Link>
      
      {/* 4. Probamos tu componente Button con la variante 'ghost' (Solo Texto) */}
      <Link to={ROUTES.LOGIN}>
        <Button variant="ghost">
          Ya tengo una cuenta
        </Button>
      </Link>
    </main>
  );
};

export default Landing;