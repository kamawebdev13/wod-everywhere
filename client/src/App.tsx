import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importaciones de lógica y seguridad
import { AuthProvider } from '@/context/auth-provider';
import { ProtectedRoute } from '@/components/protected-route';
import { ROUTES } from '@/const/routes';

// 1. Carga Perezosa (Lazy Loading): Solo descargan el JS cuando entras a la ruta
// Importante: El componente debe ser el 'default export' en su archivo
const LandingPage = lazy(() => import('@/pages/landing'));
// const LoginPage = lazy(() => import('@/pages/login-page'));
// const HomePage = lazy(() => import('@/pages/home-page'));
// const HistoryPage = lazy(() => import('@/pages/history-page'));

/**
 * Componente Principal de la Aplicación.
 * Gestiona el enrutado, la persistencia de sesión y la carga diferida.
 */
function App() {
  return (
    <AuthProvider>
      <Router>
        {/* 2. Suspense: Muestra algo mientras el navegador descarga la página */}
        <Suspense fallback={
          <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
            <p className="animate-pulse">Cargando...</p>
          </div>
        }>
          <Routes>
            {/* RUTA PÚBLICA: Acceso libre */}
            <Route path={ROUTES.LANDING} element={<LandingPage />} />
            {/* <Route path={ROUTES.LOGIN} element={<LoginPage />} /> */}

            {/* RUTAS PRIVADAS: Protegidas por el componente ProtectedRoute */}
            <Route element={<ProtectedRoute />}>
              {/* <Route path={ROUTES.HOME} element={<HomePage />} />
              <Route path={ROUTES.HISTORY} element={<HistoryPage />} /> */}
            </Route>

            {/* 3. Manejo de Rutas Inexistentes: Redirige al Home (o al Login si no hay sesión) */}
            <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;