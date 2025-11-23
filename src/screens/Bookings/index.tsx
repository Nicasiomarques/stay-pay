import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileScreen, BottomNav, BookingCard, EmptyState } from '@components';
import TabSelector from './components/TabSelector';
import { Calendar } from 'lucide-react';

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
        <TabSelector
          tabs={[
            { id: 'upcoming', label: 'Upcoming' },
            { id: 'past', label: 'Past' }
          ]}
          activeTab={activeTab}
          onTabChange={(tabId) => setActiveTab(tabId as 'upcoming' | 'past')}
        />
      </div>

      {/* Bookings List */}
      <div className="px-6 py-6 pb-24">
        {bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                hotel={booking.hotel}
                location={booking.location}
                dates={booking.dates}
                status={booking.status}
                bookingNumber={booking.bookingNumber}
                image={booking.image}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title="No bookings yet"
            description="Start planning your next trip"
          />
        )}
      </div>

      <BottomNav />
    </MobileScreen>
  );
}
