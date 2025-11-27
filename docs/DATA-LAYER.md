# StayGo - Data Layer Documentation

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                     COMPONENT LAYER                          │
│         (Screens & Components consume data via hooks)        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     HOOKS LAYER                              │
│    React Query hooks (useHotels, useHotel, etc.)            │
│    - Caching                                                 │
│    - Loading/Error states                                    │
│    - Refetching                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    GATEWAY LAYER                             │
│    API clients (HotelGateway, BookingGateway, etc.)         │
│    - HTTP requests                                           │
│    - Error handling                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MAPPER LAYER                              │
│    Transform DTOs to domain models                          │
│    - Data normalization                                      │
│    - Type safety                                             │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MOCK SERVER                               │
│    MirageJS (development only)                              │
│    - Mock endpoints                                          │
│    - Fake data                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## Types (`src/types/`)

### Hotel Types

```typescript
// src/types/hotel.ts

interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  distance?: string;
  image: string;
  description: string;
  amenities: string[];
  images: string[];
  rooms: Room[];
}

interface Room {
  id: string;
  type: string;
  price: number;
  capacity: number;
}
```

### Booking Types

```typescript
// src/types/booking.ts

type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';

interface Booking {
  id: number;
  hotel: string;
  location: string;
  dates: string;
  status: BookingStatus;
  bookingNumber: string;
  image: string;
}
```

### BookingContext State

```typescript
// src/context/BookingContext.tsx

interface GuestsCount {
  adults: number;
  children: number;
}

interface BookingState {
  hotel: Hotel | null;
  selectedRoom: number;
  checkIn: Date | null;
  checkOut: Date | null;
  guests: GuestsCount;
  searchLocation: string;
  paymentMethod: 'card' | 'mobile' | 'property';
  quickFilter: string;
}
```

### Filter Types

```typescript
// src/types/filters.ts

interface HotelFilters {
  location?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  rating?: number;
  amenities?: string[];
  propertyTypes?: string[];
}
```

---

## Gateways (`src/repositories/`)

### Hotels Gateway

```typescript
// src/repositories/HotelGateway.ts

const createHotelGateway = (httpClient: IHttpClient) => ({
  // Get all hotels with optional filters
  getHotels(params?: HotelsSearchParamsDTO): Promise<{ hotels: Hotel[]; meta?: PaginationMeta }>,

  // Get single hotel by ID
  getHotelById(id: number): Promise<Hotel>,

  // Get featured hotels
  getFeaturedHotels(): Promise<Hotel[]>,

  // Get popular hotels
  getPopularHotels(): Promise<Hotel[]>,

  // Get destinations
  getDestinations(): Promise<Destination[]>,

  // Check room availability
  checkRoomAvailability(params: RoomAvailabilityParamsDTO): Promise<{ available: boolean; rooms: Room[] }>,

  // Search hotels by location
  searchHotels(location: string, otherParams?: HotelsSearchParamsDTO): Promise<Hotel[]>,
});
```

### Bookings Gateway

```typescript
// src/repositories/BookingGateway.ts

const createBookingGateway = (httpClient: IHttpClient) => ({
  // Get user bookings
  getBookings(): Promise<Booking[]>,

  // Get single booking
  getBookingById(id: number): Promise<Booking>,

  // Create new booking
  createBooking(params: CreateBookingParams): Promise<Booking>,

  // Cancel booking
  cancelBooking(id: number): Promise<void>,
});
```

---

## Mappers (`src/mappers/`)

### Hotel Mapper

```typescript
// src/mappers/hotelMapper.ts

// Maps RoomDTO to Room
export const mapRoomDTOToRoom = (roomDTO: RoomDTO): Room => ({
  id: roomDTO.id,
  type: roomDTO.type,
  price: roomDTO.price,
  capacity: roomDTO.capacity,
});

// Maps HotelDTO to Hotel
export const mapHotelDTOToHotel = (hotelDTO: HotelDTO): Hotel => ({
  id: hotelDTO.id,
  name: hotelDTO.name,
  location: hotelDTO.location,
  rating: hotelDTO.rating,
  reviews: hotelDTO.reviews,
  price: hotelDTO.price,
  distance: hotelDTO.distance,
  image: hotelDTO.image,
  description: hotelDTO.description,
  amenities: hotelDTO.amenities,
  images: hotelDTO.images,
  rooms: hotelDTO.rooms.map(mapRoomDTOToRoom),
});

// Maps array of HotelDTOs
export const mapHotelDTOsToHotels = (hotelDTOs: HotelDTO[]): Hotel[] =>
  hotelDTOs.map(mapHotelDTOToHotel);
```

---

## React Query Hooks (`src/hooks/queries/`)

### useHotels

```typescript
// src/hooks/queries/useHotels.ts

// Fetch hotels list with optional filters
export const useHotels = (params?: HotelsSearchParamsDTO, options?) =>
  useQuery({
    queryKey: queryKeys.hotels.list(params),
    queryFn: () => getHotelGateway().getHotels(params),
    ...options,
  });
```

### useHotel

```typescript
// Fetch single hotel by ID
export const useHotel = (id: number, options?) =>
  useQuery({
    queryKey: queryKeys.hotels.detail(id),
    queryFn: () => getHotelGateway().getHotelById(id),
    enabled: !!id,
    ...options,
  });
```

### useFeaturedHotels

```typescript
// Fetch featured hotels
export const useFeaturedHotels = (options?) =>
  useQuery({
    queryKey: queryKeys.hotels.featured(),
    queryFn: () => getHotelGateway().getFeaturedHotels(),
    ...options,
  });
```

### usePopularHotels

```typescript
// Fetch popular hotels
export const usePopularHotels = (options?) =>
  useQuery({
    queryKey: queryKeys.hotels.popular(),
    queryFn: () => getHotelGateway().getPopularHotels(),
    ...options,
  });
```

### useSearchHotels

```typescript
// Search hotels by location
export const useSearchHotels = (location: string, otherParams?, options?) =>
  useQuery({
    queryKey: queryKeys.hotels.search(location, otherParams),
    queryFn: () => getHotelGateway().searchHotels(location, otherParams),
    enabled: !!location,
    ...options,
  });
```

### useBookings

```typescript
// src/hooks/queries/useBookings.ts

export const useBookings = (options?) =>
  useQuery({
    queryKey: queryKeys.bookings.list(),
    queryFn: () => getBookingGateway().getBookings(),
    ...options,
  });

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => getBookingGateway().createBooking(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.bookings.list() });
    },
  });
};
```

---

## MirageJS Mock Server (`src/mocks/`)

### Server Setup

```typescript
// src/mocks/server.ts

import { createServer } from 'miragejs';
import { models } from './models';
import { factories } from './factories';
import { seeds } from './seeds';
import { routes } from './routes';

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,
    models,
    factories,
    seeds(server) {
      seeds(server);
    },
    routes() {
      this.namespace = 'api';
      this.timing = 500;
      routes(this);
    },
  });
}
```

### Available Mock Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/hotels` | List hotels with filters |
| GET | `/api/hotels/:id` | Get hotel details |
| GET | `/api/hotels/featured` | Featured hotels |
| GET | `/api/hotels/popular` | Popular hotels |
| GET | `/api/hotels/:id/rooms/availability` | Check room availability |
| GET | `/api/bookings` | User's bookings |
| POST | `/api/bookings` | Create booking |
| GET | `/api/bookings/:id` | Booking details |
| DELETE | `/api/bookings/:id` | Cancel booking |
| GET | `/api/destinations` | Popular destinations |
| GET | `/api/favorites` | User's favorites |
| POST | `/api/favorites` | Add to favorites |
| DELETE | `/api/favorites/:id` | Remove from favorites |

---

## Usage Examples

### Fetching Hotels in a Component

```tsx
import { useHotels } from '@/hooks/queries/useHotels';
import { HotelCard } from '@/components/shared/HotelCard';

function HotelList() {
  const { data, isLoading, error } = useHotels({
    location: 'Luanda',
  });

  if (isLoading) return <SkeletonHotelCard />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <FlatList
      data={data?.hotels}
      renderItem={({ item }) => <HotelCard hotel={item} />}
      keyExtractor={item => item.id.toString()}
    />
  );
}
```

### Using BookingContext

```tsx
import { useBooking } from '@/context/BookingContext';

function BookingReview() {
  const {
    booking,
    calculateTotal,
    getNights,
    getTotalGuests,
  } = useBooking();

  return (
    <View>
      <Text>{booking.hotel?.name}</Text>
      <Text>{getNights()} nights</Text>
      <Text>{getTotalGuests()} guests</Text>
      <Text>
        {booking.guests.adults} adults, {booking.guests.children} children
      </Text>
      <Text>Total: {formatCurrency(calculateTotal())}</Text>
    </View>
  );
}
```

### Creating a Booking

```tsx
import { useCreateBooking } from '@/hooks/queries/useBookings';
import { useBooking } from '@/context/BookingContext';

function PaymentScreen() {
  const { booking, calculateTotal, getNights } = useBooking();
  const createBooking = useCreateBooking();

  const handlePayment = async () => {
    await createBooking.mutateAsync({
      hotelId: booking.hotel!.id,
      roomId: booking.hotel!.rooms[booking.selectedRoom].id,
      checkIn: booking.checkIn!.toISOString(),
      checkOut: booking.checkOut!.toISOString(),
      guests: booking.guests,
      totalPrice: calculateTotal(),
      paymentMethod: booking.paymentMethod,
    });
    router.push('/confirmation');
  };

  return (
    <Button
      onPress={handlePayment}
      loading={createBooking.isPending}
    >
      Confirm & Pay
    </Button>
  );
}
```
