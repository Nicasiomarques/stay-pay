import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, Button } from '@components';
import { useBooking } from '@context';
import { CalendarHeader, MonthNavigation, CalendarGrid } from './components';

export default function Calendar() {
  const navigate = useNavigate();
  const { booking, setDates } = useBooking();
  const [checkIn, setCheckIn] = useState<Date | null>(booking.checkIn);
  const [checkOut, setCheckOut] = useState<Date | null>(booking.checkOut);
  const [currentMonth, setCurrentMonth] = useState(new Date(2024, 11)); // December 2024

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

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  return (
    <MobileScreen className="bg-white">
      <CalendarHeader
        checkIn={checkIn}
        checkOut={checkOut}
        onBack={() => navigate(-1)}
      />

      {/* Calendar */}
      <div className="px-6 py-6">
        <MonthNavigation
          currentMonth={currentMonth}
          onPrevMonth={prevMonth}
          onNextMonth={nextMonth}
        />

        <CalendarGrid
          currentMonth={currentMonth}
          checkIn={checkIn}
          checkOut={checkOut}
          onDateClick={handleDateClick}
        />
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto">
        <Button
          fullWidth
          onClick={handleContinue}
          disabled={!checkIn || !checkOut}
        >
          Continuar
        </Button>
      </div>
    </MobileScreen>
  );
}
