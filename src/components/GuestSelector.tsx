import { useState, useEffect, useRef } from 'react';
import { Minus, Plus } from 'lucide-react';

interface GuestSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  initialGuests: number;
  onConfirm: (guests: number) => void;
}

export function GuestSelector({ isOpen, onClose, initialGuests, onConfirm }: GuestSelectorProps) {
  const [guests, setGuests] = useState(initialGuests);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setGuests(initialGuests);
  }, [initialGuests]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onConfirm(guests);
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, guests, onClose, onConfirm]);

  if (!isOpen) return null;

  const handleIncrement = () => {
    setGuests(Math.min(10, guests + 1));
  };

  const handleDecrement = () => {
    setGuests(Math.max(1, guests - 1));
  };

  return (
    <div
      ref={dropdownRef}
      className="absolute top-full mt-2 left-0 right-0 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 animate-fade-in"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-base font-medium text-gray-900">Hóspedes</p>
          <p className="text-sm text-gray-500">Selecione quantas pessoas</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDecrement}
            disabled={guests <= 1}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#0E64D2] hover:text-[#0E64D2] transition-colors"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-lg font-semibold text-gray-900 w-8 text-center">
            {guests}
          </span>
          <button
            onClick={handleIncrement}
            disabled={guests >= 10}
            className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-[#0E64D2] hover:text-[#0E64D2] transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
