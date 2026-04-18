import { useState, type ReactElement } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const RegisterOnePage = (): ReactElement => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    agreed: false
  });

  // Manejador de inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Navegación al Step 2 pasando los datos en el state
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.agreed && formData.name && formData.email && formData.password) {
      navigate('/register-step-2', { state: { ...formData } });
    }
  };

  return (
    <div className="relative min-h-screen bg-white flex flex-col px-8 pt-20 pb-10 overflow-hidden">
      
      {/* MARCA DE AGUA "WOD" */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="text-[250px] font-black text-gray-100 opacity-60 leading-none tracking-tighter">
          WOD
        </span>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        {/* HEADER */}
        <header className="mb-12 text-left">
          <h1 className="text-[56px] font-black text-black leading-[0.85] uppercase tracking-tighter mb-6">
            BUILD YOUR<br />IDENTITY.
          </h1>
          <p className="text-gray-500 text-sm font-medium leading-relaxed max-w-70">
            Set up your athlete profile to start tracking workouts across the globe.
          </p>
        </header>

        {/* FORMULARIO */}
        <form onSubmit={handleNext} className="flex flex-col gap-6">
          
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Athlete Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="athlete@wod.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none transition-all"
            />
          </div>

          <div className="space-y-1.5 text-left relative">
            <label className="text-[10px] font-bold text-black uppercase tracking-[0.2em]">Secure Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-50 border-none p-4 text-sm focus:ring-1 focus:ring-black outline-none transition-all pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* CHECKBOX TÉRMINOS */}
          <div className="flex items-start gap-3 mt-4 text-left">
            <input
              type="checkbox"
              name="agreed"
              id="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="mt-1 w-4 h-4 accent-black"
            />
            <label htmlFor="agreed" className="text-[11px] leading-tight text-black font-medium">
              I agree to the <span className="font-bold underline">Terms of Service</span> and <span className="font-bold underline">Privacy Policy</span>.
            </label>
          </div>

          {/* BOTÓN NEXT */}
          <Button
            type="submit"
            disabled={!formData.agreed || !formData.name || !formData.email || !formData.password}
            className="w-full h-16 bg-[#1A1A1A] hover:bg-black text-white rounded-sm font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 mt-4 transition-all disabled:opacity-50"
          >
            NEXT <ArrowRight size={18} />
          </Button>
        </form>

        <footer className="mt-auto pt-8">
          <p className="text-sm text-gray-500 font-medium">
            Already an athlete? <Link to="/login" className="text-red-800 font-bold underline">Log in</Link>
          </p>
        </footer>
      </div>
    </div>
  );
};