import { ReactNode } from 'react';
import { Button } from '@components';
import { formatCurrency } from '@/utils/formatters';

interface BottomPriceBarProps {
  price: number;
  priceLabel?: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: ReactNode;
}

export default function BottomPriceBar({
  price,
  priceLabel = '/ noite',
  buttonText,
  onButtonClick,
  children
}: BottomPriceBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-gray-500 text-sm">Preço total</p>
          <p className="text-gray-900">
            {formatCurrency(price)} <span className="text-gray-500">{priceLabel}</span>
          </p>
        </div>
        <Button onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
      {children}
    </div>
  );
}
