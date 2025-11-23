import { ArrowLeft } from 'lucide-react';
import { formatShortDate } from '@utils';

interface CalendarHeaderProps {
  checkIn: Date | null;
  checkOut: Date | null;
  onBack: () => void;
}

export function CalendarHeader({ checkIn, checkOut, onBack }: CalendarHeaderProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>
        <h1 className="text-gray-900">Select Dates</h1>
      </div>

      {/* Selected Dates Display */}
      <div className="flex gap-3">
        <div className="flex-1 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Check-in</p>
          <p className="text-gray-900">{formatShortDate(checkIn)}</p>
        </div>
        <div className="flex-1 p-3 bg-gray-50 rounded-xl">
          <p className="text-xs text-gray-500 mb-1">Check-out</p>
          <p className="text-gray-900">{formatShortDate(checkOut)}</p>
        </div>
      </div>
    </div>
  );
}
