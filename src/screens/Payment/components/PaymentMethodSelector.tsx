import { LucideIcon } from 'lucide-react';
import { Check } from 'lucide-react';

interface PaymentMethod {
  id: string;
  label: string;
  icon: LucideIcon;
}

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethod: string;
  onMethodChange: (methodId: string) => void;
}

export default function PaymentMethodSelector({
  methods,
  selectedMethod,
  onMethodChange
}: PaymentMethodSelectorProps) {
  return (
    <div className="space-y-3">
      {methods.map((method) => {
        const Icon = method.icon;
        const isSelected = selectedMethod === method.id;

        return (
          <button
            key={method.id}
            onClick={() => onMethodChange(method.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
              isSelected
                ? 'border-[#0E64D2] bg-[#0E64D2]/5'
                : 'border-gray-200 bg-white'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isSelected ? 'bg-[#0E64D2]' : 'bg-gray-100'
              }`}
            >
              <Icon
                className={`w-5 h-5 ${
                  isSelected ? 'text-white' : 'text-gray-600'
                }`}
              />
            </div>
            <span className="text-gray-900 flex-1 text-left">{method.label}</span>
            {isSelected && <Check className="w-5 h-5 text-[#0E64D2]" />}
          </button>
        );
      })}
    </div>
  );
}
