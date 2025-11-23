import { useNavigate } from 'react-router-dom';
import { MobileScreen, PageTransition } from '@components';
import { useBooking } from '@context';
import { useEffect } from 'react';
import { SuccessHeader, QRCodeVoucher, BookingDetails, ActionButtons } from './components';

export default function Confirmation() {
  const navigate = useNavigate();
  const { booking, resetBooking, calculateTotal } = useBooking();

  useEffect(() => {
    if (!booking.hotel) {
      navigate('/home');
    }
  }, [booking.hotel, navigate]);

  if (!booking.hotel) {
    return null;
  }

  const bookingNumber = `BK-2024-${Math.floor(100000 + Math.random() * 900000)}`;
  const total = calculateTotal();

  const handleBackToHome = () => {
    resetBooking();
    navigate('/home');
  };

  return (
    <PageTransition>
      <MobileScreen className="bg-neutral-50">
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
          <SuccessHeader />
          <QRCodeVoucher />
          <BookingDetails
            bookingNumber={bookingNumber}
            hotel={booking.hotel}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            guests={booking.guests}
            total={total}
          />
          <ActionButtons onBackToHome={handleBackToHome} />
        </div>
      </MobileScreen>
    </PageTransition>
  );
}
