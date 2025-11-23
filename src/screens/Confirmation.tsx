import { useNavigate } from 'react-router-dom';
import { MobileScreen, Button } from '@components';
import { CheckCircle, Download, Share2, Calendar, MapPin, Users } from 'lucide-react';
import { useBooking } from '@context';
import { useEffect } from 'react';

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
    <MobileScreen className="bg-neutral-50">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* Success Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        <h1 className="text-gray-900 mb-2 text-center">Booking Confirmed!</h1>
        <p className="text-gray-500 text-center mb-8">
          Your reservation has been successfully confirmed
        </p>

        {/* QR Code Voucher */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 w-full max-w-sm">
          <div className="flex justify-center mb-4">
            <div className="w-48 h-48 bg-gray-100 rounded-xl flex items-center justify-center">
              {/* QR Code Placeholder */}
              <svg viewBox="0 0 200 200" className="w-full h-full p-4">
                <rect x="0" y="0" width="200" height="200" fill="white" />
                <rect x="10" y="10" width="30" height="30" fill="black" />
                <rect x="50" y="10" width="10" height="10" fill="black" />
                <rect x="70" y="10" width="10" height="10" fill="black" />
                <rect x="90" y="10" width="30" height="30" fill="black" />
                <rect x="130" y="10" width="10" height="10" fill="black" />
                <rect x="160" y="10" width="30" height="30" fill="black" />
                
                <rect x="10" y="50" width="10" height="10" fill="black" />
                <rect x="30" y="50" width="10" height="10" fill="black" />
                <rect x="50" y="50" width="30" height="30" fill="black" />
                <rect x="90" y="50" width="10" height="10" fill="black" />
                <rect x="110" y="50" width="10" height="10" fill="black" />
                <rect x="160" y="50" width="10" height="10" fill="black" />
                <rect x="180" y="50" width="10" height="10" fill="black" />
                
                <rect x="10" y="90" width="30" height="30" fill="black" />
                <rect x="50" y="90" width="10" height="10" fill="black" />
                <rect x="70" y="90" width="30" height="30" fill="black" />
                <rect x="110" y="90" width="10" height="10" fill="black" />
                <rect x="130" y="90" width="30" height="30" fill="black" />
                <rect x="170" y="90" width="10" height="10" fill="black" />
                
                <rect x="10" y="130" width="10" height="10" fill="black" />
                <rect x="50" y="130" width="10" height="10" fill="black" />
                <rect x="70" y="130" width="10" height="10" fill="black" />
                <rect x="110" y="130" width="30" height="30" fill="black" />
                <rect x="160" y="130" width="10" height="10" fill="black" />
                <rect x="180" y="130" width="10" height="10" fill="black" />
                
                <rect x="10" y="160" width="30" height="30" fill="black" />
                <rect x="50" y="160" width="10" height="10" fill="black" />
                <rect x="70" y="160" width="30" height="30" fill="black" />
                <rect x="130" y="160" width="10" height="10" fill="black" />
                <rect x="160" y="160" width="30" height="30" fill="black" />
              </svg>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm">
            Show this QR code at check-in
          </p>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 w-full max-w-sm">
          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-sm text-gray-500 mb-1">Booking Number</p>
            <p className="text-gray-900">{bookingNumber}</p>
          </div>

          <h2 className="text-gray-900 mb-4">{booking.hotel.name}</h2>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-gray-900">{booking.hotel.location}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Check-in / Check-out</p>
                <p className="text-gray-900">
                  {booking.checkIn?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {booking.checkOut?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Guests</p>
                <p className="text-gray-900">{booking.guests} guests</p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
            <span className="text-gray-600">Total Paid</span>
            <span className="text-gray-900">${total}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 w-full max-w-sm mb-6">
          <Button fullWidth variant="secondary">
            <Download className="w-5 h-5 mr-2 inline-block" />
            Download Voucher
          </Button>
          <Button fullWidth variant="secondary">
            <Share2 className="w-5 h-5 mr-2 inline-block" />
            Share Booking
          </Button>
        </div>

        <Button fullWidth className="max-w-sm" onClick={handleBackToHome}>
          Back to Home
        </Button>
      </div>
    </MobileScreen>
  );
}
