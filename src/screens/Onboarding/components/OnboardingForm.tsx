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
        placeholder="+244 900 000 000"
        value={phone}
        onChange={(e) => onPhoneChange(e.target.value)}
        label="Número de Telefone"
      />

      <Button
        fullWidth
        onClick={onContinue}
        disabled={!phone}
      >
        Continuar
      </Button>

      <p className="text-gray-400 text-center mt-8 text-sm">
        Ao continuar, concorda com os nossos Termos de Serviço e Política de Privacidade
      </p>
    </div>
  );
}
