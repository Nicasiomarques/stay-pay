import { WEEK_DAYS_SHORT } from '@constants';
import { getDaysInMonth, isDateInRange, isSameDate } from '@utils';

interface CalendarGridProps {
  currentMonth: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  onDateClick: (day: number) => void;
}

export function CalendarGrid({ currentMonth, checkIn, checkOut, onDateClick }: CalendarGridProps) {
  const isInRange = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return isDateInRange(date, checkIn, checkOut);
  };

  const isCheckIn = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return isSameDate(date, checkIn);
  };

  const isCheckOut = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return isSameDate(date, checkOut);
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  return (
    <>
      {/* Week Days */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {WEEK_DAYS_SHORT.map((day) => (
          <div key={day} className="text-center text-gray-500 text-sm py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: startingDayOfWeek }).map((_, index) => (
          <div key={`empty-${index}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isStart = isCheckIn(day);
          const isEnd = isCheckOut(day);
          const inRange = isInRange(day);

          return (
            <button
              key={day}
              onClick={() => onDateClick(day)}
              className={`
                aspect-square flex items-center justify-center rounded-xl transition-all
                ${isStart || isEnd ? 'bg-[#0E64D2] text-white' : ''}
                ${inRange ? 'bg-[#0E64D2]/10 text-[#0E64D2]' : ''}
                ${!isStart && !isEnd && !inRange ? 'text-gray-900 hover:bg-gray-100' : ''}
              `}
            >
              {day}
            </button>
          );
        })}
      </div>
    </>
  );
}
