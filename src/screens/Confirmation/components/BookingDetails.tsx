import { Calendar, MapPin, Users } from 'lucide-react';

interface Hotel {
  name: string;
  location: string;
}

interface BookingDetailsProps {
  bookingNumber: string;
  hotel: Hotel;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: number;
  total: number;
}

export function BookingDetails({
  bookingNumber,
  hotel,
  checkIn,
  checkOut,
  guests,
  total,
}: BookingDetailsProps) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-6 w-full max-w-sm">
      <div className="mb-4 pb-4 border-b border-gray-100">
        <p className="text-sm text-gray-500 mb-1">Booking Number</p>
        <p className="text-gray-900">{bookingNumber}</p>
      </div>

      <h2 className="text-gray-900 mb-4">{hotel.name}</h2>

      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Location</p>
            <p className="text-gray-900">{hotel.location}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Check-in / Check-out</p>
            <p className="text-gray-900">
              {checkIn?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} -{' '}
              {checkOut?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Users className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Guests</p>
            <p className="text-gray-900">{guests} guests</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
        <span className="text-gray-600">Total Paid</span>
        <span className="text-gray-900">${total}</span>
      </div>
    </div>
  );
}
