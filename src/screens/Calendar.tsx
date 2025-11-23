import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, Button } from '@components';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useBooking } from '@context';

export default function Calendar() {
  const navigate = useNavigate();
  const { booking, setDates } = useBooking();
  const [checkIn, setCheckIn] = useState<Date | null>(booking.checkIn);
  const [checkOut, setCheckOut] = useState<Date | null>(booking.checkOut);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11)); // December 2024

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const handleDateClick = (day: number) => {
    const selectedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    
    if (!checkIn || (checkIn && checkOut)) {
      setCheckIn(selectedDate);
      setCheckOut(null);
    } else if (checkIn && selectedDate > checkIn) {
      setCheckOut(selectedDate);
    } else {
      setCheckIn(selectedDate);
      setCheckOut(null);
    }
  };

  const handleContinue = () => {
    if (checkIn && checkOut) {
      setDates(checkIn, checkOut);
      navigate('/booking-review');
    }
  };

  const isInRange = (day: number) => {
    if (!checkIn || !checkOut) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date > checkIn && date < checkOut;
  };

  const isCheckIn = (day: number) => {
    if (!checkIn) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === checkIn.toDateString();
  };

  const isCheckOut = (day: number) => {
    if (!checkOut) return false;
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return date.toDateString() === checkOut.toDateString();
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

  const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <MobileScreen className="bg-white">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate(-1)}
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
            <p className="text-gray-900">
              {checkIn ? checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select date'}
            </p>
          </div>
          <div className="flex-1 p-3 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-1">Check-out</p>
            <p className="text-gray-900">
              {checkOut ? checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'Select date'}
            </p>
          </div>
        </div>
      </div>

      {/* Calendar */}
      <div className="px-6 py-6">
        {/* Month Navigation */}
        <div className="flex items-center justify-between mb-6">
          <button 
            onClick={prevMonth}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h2 className="text-gray-900">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h2>
          <button 
            onClick={nextMonth}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Week Days */}
        <div className="grid grid-cols-7 gap-2 mb-3">
          {weekDays.map((day) => (
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
                onClick={() => handleDateClick(day)}
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
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto">
        <Button 
          fullWidth 
          onClick={handleContinue}
          disabled={!checkIn || !checkOut}
        >
          Continue
        </Button>
      </div>
    </MobileScreen>
  );
}