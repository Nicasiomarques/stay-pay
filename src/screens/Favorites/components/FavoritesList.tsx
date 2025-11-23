import { HotelCard, EmptyState } from '@components';
import { Heart } from 'lucide-react';

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

interface FavoritesListProps {
  favorites: Hotel[];
}

export function FavoritesList({ favorites }: FavoritesListProps) {
  return (
    <div className="px-6 py-6 pb-24">
      {favorites.length > 0 ? (
        <div className="space-y-4">
          {favorites.map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} hotelData={hotel} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          description="Start adding hotels to your favorites"
        />
      )}
    </div>
  );
}
