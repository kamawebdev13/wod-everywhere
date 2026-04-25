import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Proveedores, Seguridad y Layout
import { AuthProvider } from '@/context/auth-provider';
import { ProtectedRoute } from '@/components/protected-route';
import { MainLayout } from '@/components/layout/main-layout'; // Asegura la ruta correcta
import { ROUTES } from '@/const/routes';

console.log('API URL:', import.meta.env.VITE_API_URL);

/**
 * CARGA DIFERIDA (Lazy Loading)
 * Punto 3: Arquitectura - Mapeo de páginas.
 */
const LandingPage = lazy(() => import('@/pages/landing-page'));
const LoginPage = lazy(() => import('@/pages/login-page'));
const RegisterOnePage = lazy(() => import('@/pages/register-one-page'));
const RegisterTwoPage = lazy(() => import('@/pages/register-two-page'));
const HomePage = lazy(() => import('@/pages/home-page'));
const ProfilePage = lazy(() => import('@/pages/profile-page'));
const SettingsPage = lazy(() => import('@/pages/settings-page'));
const HistoryPage = lazy(() => import('@/pages/history-page'));
const ExplorePage = lazy(() => import('@/pages/explore-page'));
const GeneratedWodsPage = lazy(() => import('@/pages/generated-wods'));
const ResumeWodPage = lazy(() => import('@/pages/resume-wod-page'));
const SelectionPage = lazy(() => import('@/pages/selection-page'));

function App() {
    return (
        <AuthProvider>
            <Router>
                <Suspense fallback={
                    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-6">
                        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse italic">
                            Sincronizando Motor...
                        </p>
                    </div>
                }>
                    <Routes>
                        {/* --- RUTAS PÚBLICAS --- */}
                        <Route path={ROUTES.LANDING} element={<LandingPage />} />
                        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
                        <Route path={ROUTES.REGISTER_STEP_ONE} element={<RegisterOnePage />} />
                        <Route path={ROUTES.REGISTER_STEP_TWO} element={<RegisterTwoPage />} />

                        {/* --- RUTAS PRIVADAS --- */}
                        <Route element={<ProtectedRoute />}>

                            {/* LAYOUT PRINCIPAL: Navbar + Tabbar 
                                Aplicado a las pestañas del dashboard.
                            */}
                            <Route element={<MainLayout />}>
                                <Route path={ROUTES.HOME} element={<HomePage />} />
                                <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
                                <Route path={ROUTES.HISTORY} element={<HistoryPage />} />
                                <Route path={ROUTES.EXPLORE} element={<ExplorePage />} />
                                <Route path={ROUTES.GENERATED_WODS} element={<GeneratedWodsPage />} />
                                <Route path={ROUTES.SUMMARY} element={<ResumeWodPage />} />
                                <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
                                
                            </Route>

                            {/* PANTALLA COMPLETA (Sin Navbar/Tabbar)
                                Se mantiene fuera de MainLayout para enfoque total en el WOD.
                            */}
                            <Route path={ROUTES.SELECTION} element={<SelectionPage />} />
                            <Route path="/stats" element={<Navigate to={ROUTES.HOME} replace />} />

                        </Route>

                        {/* Fallback de seguridad */}
                        <Route path="*" element={<Navigate to={ROUTES.LANDING} replace />} />
                    </Routes>
                </Suspense>
            </Router>
        </AuthProvider>
    );
}

export default App;