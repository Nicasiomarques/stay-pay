import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileScreen from '../components/MobileScreen';
import BottomNav from '../components/BottomNav';
import { Calendar, MapPin, ChevronRight, Clock } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function Bookings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcomingBookings = [
    {
      id: 1,
      hotel: 'The Grand Plaza',
      location: 'Downtown, New York',
      dates: 'Dec 24 - Dec 28, 2024',
      status: 'Confirmed',
      bookingNumber: 'BK-2024-891234',
      image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const pastBookings = [
    {
      id: 2,
      hotel: 'Skyline Boutique',
      location: 'Midtown, New York',
      dates: 'Nov 15 - Nov 18, 2024',
      status: 'Completed',
      bookingNumber: 'BK-2024-782156',
      image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
    {
      id: 3,
      hotel: 'Harbor View Hotel',
      location: 'Waterfront, New York',
      dates: 'Oct 5 - Oct 8, 2024',
      status: 'Completed',
      bookingNumber: 'BK-2024-673829',
      image: 'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    },
  ];

  const bookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-8 h-8 text-[#0E64D2]" />
          <h1 className="text-gray-900">My Bookings</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`flex-1 px-4 py-2.5 rounded-xl transition-colors ${
              activeTab === 'upcoming'
                ? 'bg-[#0E64D2] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setActiveTab('past')}
            className={`flex-1 px-4 py-2.5 rounded-xl transition-colors ${
              activeTab === 'past'
                ? 'bg-[#0E64D2] text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Past
          </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="px-6 py-6 pb-24">
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 mb-4">
                  <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={booking.image}
                      alt={booking.hotel}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900">{booking.hotel}</h3>
                      <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm mb-2">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="truncate">{booking.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-500 text-sm">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{booking.dates}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <span className="text-sm text-gray-500">Booking #{booking.bookingNumber}</span>
                  <span className={`px-3 py-1 rounded-lg text-sm ${
                    booking.status === 'Confirmed'
                      ? 'bg-blue-50 text-blue-700'
                      : 'bg-green-50 text-green-700'
                  }`}>
                    {booking.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h2 className="text-gray-900 mb-2">No bookings yet</h2>
            <p className="text-gray-500 text-center mb-6">
              Start planning your next trip
            </p>
          </div>
        )}
      </div>

      <BottomNav />
    </MobileScreen>
  );
}
