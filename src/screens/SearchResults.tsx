import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, HotelCard } from '@components';
import { ArrowLeft, SlidersHorizontal, MapPin } from 'lucide-react';
import { hotels } from '@data';
import { useBooking } from '@context';

export default function SearchResults() {
  const navigate = useNavigate();
  const { booking } = useBooking();
  const [sortBy, setSortBy] = useState('recommended');

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <div className="bg-white px-6 py-4 shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <button 
            onClick={() => navigate('/home')}
            className="p-2 -ml-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <span className="text-gray-900">{booking.searchLocation || 'New York'}</span>
            </div>
            <p className="text-sm text-gray-500">
              {booking.checkIn && booking.checkOut 
                ? `${booking.checkIn.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${booking.checkOut.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`
                : 'Select dates'} • {booking.guests} {booking.guests === 1 ? 'guest' : 'guests'}
            </p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <SlidersHorizontal className="w-6 h-6 text-gray-900" />
          </button>
        </div>

        {/* Sort Options */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {['Recommended', 'Price: Low to High', 'Rating', 'Distance'].map((option) => (
            <button
              key={option}
              onClick={() => setSortBy(option.toLowerCase())}
              className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
                sortBy === option.toLowerCase()
                  ? 'bg-[#0E64D2] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div className="px-6 py-6">
        <p className="text-gray-500 mb-4">{hotels.length} properties found</p>
        <div className="space-y-4 pb-6">
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} hotelData={hotel} />
          ))}
        </div>
      </div>
    </MobileScreen>
  );
}