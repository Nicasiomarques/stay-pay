import { HotelCard } from '@components';

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  amenities: string[];
  rooms: Array<{
    id: string;
    type: string;
    price: number;
    capacity: number;
  }>;
}

interface ResultsListProps {
  hotels: Hotel[];
}

export function ResultsList({ hotels }: ResultsListProps) {
  return (
    <div className="px-6 py-6">
      <p className="text-gray-500 mb-4">{hotels.length} properties found</p>
      <div className="space-y-4 pb-6">
        {hotels.map((hotel) => (
          <HotelCard key={hotel.id} {...hotel} hotelData={hotel} />
        ))}
      </div>
    </div>
  );
}
