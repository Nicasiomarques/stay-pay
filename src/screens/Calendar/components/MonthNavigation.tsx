import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MONTH_NAMES } from '@constants';

interface MonthNavigationProps {
  currentMonth: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function MonthNavigation({ currentMonth, onPrevMonth, onNextMonth }: MonthNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <button
        onClick={onPrevMonth}
        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
      >
        <ChevronLeft className="w-6 h-6 text-gray-900" />
      </button>
      <h2 className="text-gray-900">
        {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
      </h2>
      <button
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
      >
        <ChevronRight className="w-6 h-6 text-gray-900" />
      </button>
    </div>
  );
}
