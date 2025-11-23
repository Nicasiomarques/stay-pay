import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, PageTransition } from '@components';
import { WelcomeHeader, OnboardingForm } from './components';

export default function Onboarding() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (phone) {
      navigate('/home');
    }
  };

  return (
    <PageTransition>
      <MobileScreen>
        <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-[#0E64D2]/5 to-white">
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
            <WelcomeHeader />
            <OnboardingForm
              phone={phone}
              onPhoneChange={setPhone}
              onContinue={handleContinue}
            />
          </div>
        </div>
      </MobileScreen>
    </PageTransition>
  );
}
