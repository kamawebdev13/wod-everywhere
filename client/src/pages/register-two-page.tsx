import { type ReactElement } from 'react';
import { useRegisterTwo } from '@/hooks/use-register-two';
import { RegisterTwoHeader } from '@/components/register/register-two-header';
import { LevelSelector } from '@/components/register/level-selector';
import { InterestSelector } from '@/components/register/interest-selector';
import { RegisterTwoFooter } from '@/components/register/register-two-footer';

const interestTags = ['Endurance', 'Functional', 'Strength', 'HIIT', 'Powerlifting', 'Mobility', 'Gymnastics'];

export const RegisterTwoPage = (): ReactElement => {
    const {
        selectedLevel,
        setSelectedLevel,
        selectedInterests,
        handleToggleInterest,
        isLoading,
        authError,
        handleCreateProfile
    } = useRegisterTwo();

    return (
        <div className="min-h-screen bg-[#F9F9F9] flex flex-col px-6 pt-12 pb-6 font-sans">
            
            <RegisterTwoHeader />

            <section className="mb-10 text-left">
                <div className="flex justify-between items-end mb-4">
                    <h3 className="text-[14px] font-black text-black uppercase tracking-tight italic">Select Level</h3>
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Step 2 of 2</span>
                </div>
                <LevelSelector 
                    selectedLevel={selectedLevel} 
                    onSelect={setSelectedLevel} 
                />
            </section>

            <InterestSelector 
                interests={interestTags}
                selectedInterests={selectedInterests}
                onToggle={handleToggleInterest}
            />

            <RegisterTwoFooter 
                isLoading={isLoading}
                error={authError}
                isButtonDisabled={isLoading || selectedInterests.length === 0}
                onSubmit={handleCreateProfile}
            />
            
        </div>
    );
};

export default RegisterTwoPage;