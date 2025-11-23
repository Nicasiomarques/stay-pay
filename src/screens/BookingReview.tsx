import { useNavigate } from 'react-router-dom';
import MobileScreen from '../components/MobileScreen';
import Button from '../components/Button';
import { ArrowLeft, MapPin, Calendar, Users, Info } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useBooking } from '../context/BookingContext';

export default function BookingReview() {
  const navigate = useNavigate();
  const { booking, setGuests, getNights, calculateTotal } = useBooking();

  if (!booking.hotel) {
    navigate('/home');
    return null;
  }

  const nights = getNights();
  const roomPrice = booking.hotel.rooms[booking.selectedRoom]?.price || 0;
  const subtotal = nights * roomPrice;
  const serviceFee = 15;
  const tax = Math.round(subtotal * 0.08);
  const total = calculateTotal();

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <h1 className="text-gray-900">Review Booking</h1>
        </div>
      </div>

      <div className="p-6 space-y-4 pb-32">
        {/* Hotel Info Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex gap-4">
            <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src={booking.hotel.image}
                alt={booking.hotel.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-gray-900 mb-2">{booking.hotel.name}</h2>
              <div className="flex items-center gap-1 text-gray-500 text-sm mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>{booking.hotel.location}</span>
              </div>
              <p className="text-sm text-gray-600">{booking.hotel.rooms[booking.selectedRoom].type}</p>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-gray-900 mb-4">Booking Details</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0E64D2]/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#0E64D2]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-in</p>
                  <p className="text-gray-900">
                    {booking.checkIn?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0E64D2]/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#0E64D2]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Check-out</p>
                  <p className="text-gray-900">
                    {booking.checkOut?.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#0E64D2]/10 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#0E64D2]" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Guests</p>
                  <p className="text-gray-900">{booking.guests} guests</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setGuests(Math.max(1, booking.guests - 1))}
                  className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  -
                </button>
                <button 
                  onClick={() => setGuests(booking.guests + 1)}
                  className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-gray-900 mb-4">Price Breakdown</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">${roomPrice} × {nights} nights</span>
              <span className="text-gray-900">${subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service fee</span>
              <span className="text-gray-900">${serviceFee}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Taxes</span>
              <span className="text-gray-900">${tax}</span>
            </div>
            <div className="pt-3 border-t border-gray-200 flex justify-between">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">${total}</span>
            </div>
          </div>
        </div>

        {/* Cancellation Policy */}
        <div className="bg-[#0E64D2]/5 rounded-2xl p-5 border border-[#0E64D2]/10">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-[#0E64D2] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-gray-900 mb-2">Cancellation Policy</h3>
              <p className="text-sm text-gray-600">
                Free cancellation until {booking.checkIn && new Date(booking.checkIn.getTime() - 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}. Cancel before check-in for a partial refund.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 max-w-md mx-auto shadow-lg">
        <Button fullWidth onClick={() => navigate('/payment')}>
          Continue to Payment
        </Button>
      </div>
    </MobileScreen>
  );
}
