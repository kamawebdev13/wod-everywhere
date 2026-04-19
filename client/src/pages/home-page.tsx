import { type ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart} from 'lucide-react';
import FeatureCard from '@/components/common/feature-card';

// Capas de arquitectura
import { useHomeData } from '@/hooks/use-home-data';
import { HomeHeader } from '@/components/home/home-header';
import { FeaturedWodSection } from '@/components/home/feature-wod-section';
import { PerformanceStats } from '@/components/home/performance-stats';


export const HomePage = (): ReactElement => {
    const navigate = useNavigate();
    
    // 1. EXTRAEMOS LA LÓGICA 
    const { latestWorkout, loading, user } = useHomeData();

    // 2. FORMATEO DE DATOS 
    const userName = user.name?.split(' ')[0] || 'Athlete';
    const today = new Date();
    const dayName = today.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase();
    const dateString = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase();

    const handleStartWorkout = () => {
        if (latestWorkout?.wodId) {
            navigate('/selection', { state: { selectedWod: latestWorkout.wodId } });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#F8F9FA] pb-24">
            {/* --- HEADER DINÁMICO --- */}
            <HomeHeader name={userName} dayName={dayName} dateString={dateString} />

            {/* --- FEATURED WORKOUT (DINÁMICO) --- */}
            <FeaturedWodSection 
                workout={latestWorkout} 
                loading={loading} 
                onStart={handleStartWorkout} 
            />

             {/* --- BANNER SAVED WODS (DINÁMICO) --- */}
            <section className="px-6 mb-10">
                <div onClick={() => navigate('/profile')} className="cursor-pointer">
                    <FeatureCard
                        title="SAVED WODS"
                        description="Your personal collection of high-intensity benchmarks."
                        icon={Heart}
                    />
                </div>
            </section>

            {/* --- RECENT PERFORMANCE (DINÁMICO) --- */}
           <PerformanceStats 
            title={latestWorkout?.wodId?.title || "NO SESSIONS YET"}
            dateInfo={latestWorkout?.createdAt ? 'COMPLETED RECENTLY' : 'START TRAINING TODAY'}
            personalRecords={user.stats?.personalRecords || 0}
        />
        </div>
    );
};

export default HomePage;
