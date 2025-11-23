import { BookingCard } from '@components';

interface Reservation {
  id: number;
  hotel: string;
  location: string;
  dates: string;
  status: string;
  image: string;
}

interface PastReservationsProps {
  reservations: Reservation[];
}

export function PastReservations({ reservations }: PastReservationsProps) {
  return (
    <div>
      <h2 className="text-gray-900 mb-4">Past Reservations</h2>
      <div className="space-y-3">
        {reservations.map((reservation) => (
          <BookingCard
            key={reservation.id}
            hotel={reservation.hotel}
            location={reservation.location}
            dates={reservation.dates}
            status={reservation.status}
            bookingNumber={`BK-2024-${reservation.id}`}
            image={reservation.image}
          />
        ))}
      </div>
    </div>
  );
}
