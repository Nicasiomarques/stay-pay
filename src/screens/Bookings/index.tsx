import { useState } from 'react';
import { MobileScreen, BottomNav, BookingCard, EmptyState } from '@components';
import TabSelector from './components/TabSelector';
import { Calendar } from 'lucide-react';
import { useUpcomingBookings, useCompletedBookings } from '@/hooks/queries';

export default function Bookings() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  // Fetch bookings from API
  const { data: upcomingData, isLoading: isUpcomingLoading } = useUpcomingBookings();
  const { data: completedData, isLoading: isCompletedLoading } = useCompletedBookings();

  const upcomingBookings = upcomingData?.bookings ?? [];
  const completedBookings = completedData?.bookings ?? [];

  const bookings = activeTab === 'upcoming' ? upcomingBookings : completedBookings;
  const isLoading = activeTab === 'upcoming' ? isUpcomingLoading : isCompletedLoading;

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
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E64D2]"></div>
          </div>
        ) : bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking.id}
                hotel={booking.hotelName}
                location={booking.hotelLocation || ''}
                dates={`${booking.checkIn} - ${booking.checkOut}`}
                status={booking.status}
                bookingNumber={booking.bookingNumber}
                image={booking.hotelImage || ''}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={Calendar}
            title={activeTab === 'upcoming' ? 'Sem reservas próximas' : 'Sem reservas anteriores'}
            description={
              activeTab === 'upcoming'
                ? 'Quando fizer uma reserva, ela aparecerá aqui.'
                : 'As suas reservas passadas aparecerão aqui.'
            }
          />
        )}
      </div>

      <BottomNav />
    </MobileScreen>
  );
}
