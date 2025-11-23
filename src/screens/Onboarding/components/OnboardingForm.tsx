import { Input, Button } from '@components';

interface OnboardingFormProps {
  phone: string;
  onPhoneChange: (phone: string) => void;
  onContinue: () => void;
}

export function OnboardingForm({ phone, onPhoneChange, onContinue }: OnboardingFormProps) {
  return (
    <div className="w-full space-y-4">
      <Input
        type="tel"
        placeholder="+1 (555) 000-0000"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        label="Phone Number"
      />

      <Button
        fullWidth
        onClick={onContinue}
        disabled={!phone}
      >
        Continue
      </Button>

      <p className="text-gray-400 text-center mt-8 text-sm">
        By continuing, you agree to our Terms of Service and Privacy Policy
      </p>
    </div>
  );
}
