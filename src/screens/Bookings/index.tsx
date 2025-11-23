import { useState } from 'react';
import { MobileScreen, BottomNav, BookingCard, EmptyState } from '@components';
import TabSelector from './components/TabSelector';
import { Calendar } from 'lucide-react';
import { mockUpcomingBookings, mockPastBookings } from '@data/mockBookings';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const bookings = activeTab === 'upcoming' ? mockUpcomingBookings : mockPastBookings;

  return (
    <MobileScreen className="bg-neutral-50">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-8 h-8 text-[#0E64D2]" />
          <h1 className="text-gray-900">Minhas Reservas</h1>
        </div>

        {/* Tabs */}
        <TabSelector
          tabs={[
            { id: 'upcoming', label: 'Próximas' },
            { id: 'past', label: 'Anteriores' }
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
            title="Ainda sem reservas"
            description="Comece a planear a sua próxima viagem"
          />
        )}
      </div>

      <BottomNav />
    </MobileScreen>
  );
}
