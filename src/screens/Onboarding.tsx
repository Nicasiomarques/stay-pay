import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, Input, Button } from '@components';
import { Hotel } from 'lucide-react';

export default function Onboarding() {
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  const handleContinue = () => {
    if (phone) {
      navigate('/home');
    }
  };

  return (
    <MobileScreen>
      <div className="flex flex-col items-center justify-center min-h-screen px-6 bg-gradient-to-b from-[#0E64D2]/5 to-white">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm">
          <div className="mb-8 flex items-center justify-center w-20 h-20 bg-[#0E64D2] rounded-3xl shadow-lg">
            <Hotel className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-gray-900 mb-3 text-center">Welcome to StayGo</h1>
          <p className="text-gray-500 text-center mb-12">
            Book your perfect stay in seconds
          </p>

          <div className="w-full space-y-4">
            <Input
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              label="Phone Number"
            />
            
            <Button 
              fullWidth 
              onClick={handleContinue}
              disabled={!phone}
            >
              Continue
            </Button>
          </div>

          <p className="text-gray-400 text-center mt-8 text-sm">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </MobileScreen>
  );
}
