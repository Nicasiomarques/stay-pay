# StayGo - Architecture Documentation

## Project Overview

StayGo is a React Native Expo hotel booking application with a clean architecture design.

### Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | React Native | 0.81.5 |
| Platform | Expo SDK | 54 |
| Navigation | Expo Router | ~5.0.7 |
| Styling | NativeWind | ^4.1.23 |
| State (Server) | React Query | ^5.80.2 |
| State (Client) | React Context | - |
| Language | TypeScript | ^5.8.4 |
| Icons | Lucide React Native | ^0.513.0 |
| Animations | Lottie React Native | 7.2.2 |
| Mock API | MirageJS | ^0.1.48 |

---

## Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Screens   │  │  Components │  │   Layouts   │          │
│  │   (app/)    │  │    (src/    │  │   (app/     │          │
│  │             │  │ components/)│  │  _layout)   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│                    APPLICATION LAYER                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │   Context   │  │    Hooks    │  │   Queries   │          │
│  │   (src/     │  │   (src/     │  │   (src/     │          │
│  │  context/)  │  │   hooks/)   │  │hooks/queries)│         │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
├─────────────────────────────────────────────────────────────┤
│                      DOMAIN LAYER                            │
│  ┌─────────────┐  ┌─────────────┐                           │
│  │    Types    │  │   Mappers   │                           │
│  │   (src/     │  │   (src/     │                           │
│  │   types/)   │  │  mappers/)  │                           │
│  └─────────────┘  └─────────────┘                           │
├─────────────────────────────────────────────────────────────┤
│                  INFRASTRUCTURE LAYER                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐          │
│  │  Gateways   │  │    Mocks    │  │   Storage   │          │
│  │   (src/     │  │   (src/     │  │  (Async     │          │
│  │repositories)│  │   mocks/)   │  │  Storage)   │          │
│  └─────────────┘  └─────────────┘  └─────────────┘          │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
StayGo Hotel Booking App UI/
├── app/                          # Expo Router screens
│   ├── _layout.tsx              # Root layout with providers
│   ├── index.tsx                # Entry redirect
│   ├── (tabs)/                  # Tab navigator
│   │   ├── _layout.tsx          # Tab bar configuration
│   │   ├── index.tsx            # Home screen
│   │   ├── favorites.tsx        # Favorites screen
│   │   ├── bookings.tsx         # Bookings screen
│   │   └── profile.tsx          # Profile screen
│   ├── hotel/
│   │   └── [id].tsx             # Hotel detail (dynamic)
│   ├── room/
│   │   └── [id].tsx             # Room detail (dynamic)
│   ├── calendar.tsx             # Date picker
│   ├── search.tsx               # Search results
│   ├── guests.tsx               # Guest selection
│   ├── booking-review.tsx       # Review booking
│   ├── payment.tsx              # Payment screen
│   └── confirmation.tsx         # Booking confirmation
│
├── src/
│   ├── components/
│   │   ├── ui/                  # UI primitives
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Checkbox.tsx
│   │   │   ├── Divider.tsx
│   │   │   └── ...
│   │   ├── home/                # Home screen components
│   │   │   ├── SearchBar.tsx
│   │   │   ├── TrendingSection.tsx
│   │   │   ├── PromotionBanner.tsx
│   │   │   └── ...
│   │   ├── shared/              # Shared components
│   │   │   ├── HotelCard.tsx
│   │   │   ├── RoomCard.tsx
│   │   │   ├── AmenityItem.tsx
│   │   │   └── ...
│   │   ├── search/              # Search components
│   │   ├── filters/             # Filter components
│   │   ├── skeletons/           # Loading skeletons
│   │   └── illustrations/       # SVG illustrations
│   │
│   ├── context/
│   │   └── BookingContext.tsx   # Global booking state
│   │
│   ├── hooks/
│   │   ├── queries/             # React Query hooks
│   │   │   ├── useHotels.ts
│   │   │   ├── useHotelById.ts
│   │   │   └── ...
│   │   ├── useDebounce.ts
│   │   └── ...
│   │
│   ├── repositories/            # API gateways
│   │   └── hotelsGateway.ts
│   │
│   ├── mappers/                 # DTO mappers
│   │   └── hotelMapper.ts
│   │
│   ├── mocks/                   # MirageJS setup
│   │   ├── server.ts
│   │   ├── routes/
│   │   └── data/
│   │
│   ├── theme/
│   │   └── colors.ts            # Color palette
│   │
│   ├── types/                   # TypeScript types
│   │   ├── hotel.ts
│   │   ├── room.ts
│   │   └── ...
│   │
│   ├── utils/                   # Utilities
│   │   ├── formatters.ts
│   │   ├── haptics.ts
│   │   └── ...
│   │
│   └── lib/                     # External config
│
├── assets/
│   ├── fonts/
│   ├── images/
│   └── animations/              # Lottie files
│
├── tailwind.config.js           # Tailwind config
├── metro.config.js              # Metro bundler
├── babel.config.js              # Babel + aliases
├── tsconfig.json                # TypeScript config
├── app.json                     # Expo config
└── package.json
```

---

## State Management

### BookingContext

Central state for the booking flow:

```typescript
interface BookingState {
  // Selection
  selectedHotel: Hotel | null;
  selectedRoom: Room | null;

  // Dates
  checkInDate: Date | null;
  checkOutDate: Date | null;

  // Guests
  guests: {
    adults: number;
    children: number;
  };

  // Search
  searchLocation: string;

  // Payment
  paymentMethod: PaymentMethod | null;
}

// Helper methods
calculateTotal(): number;
getNights(): number;
resetBooking(): void;
```

### React Query

Used for server state (API data):

```typescript
// Fetching hotels
const { data, isLoading } = useHotels(filters);

// Fetching single hotel
const { data: hotel } = useHotelById(id);
```

---

## Navigation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Tab Navigator                         │
├─────────────┬─────────────┬─────────────┬─────────────────────┤
│    Home     │  Favorites  │  Bookings   │      Profile       │
│   (tabs/)   │  (tabs/     │  (tabs/     │     (tabs/         │
│   index     │ favorites)  │ bookings)   │    profile)        │
└──────┬──────┴─────────────┴─────────────┴─────────────────────┘
       │
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Search    │────▶│   Hotel     │────▶│    Room     │
│  /search    │     │  /hotel/[id]│     │  /room/[id] │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
       ┌───────────────────────────────────────┘
       ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Calendar   │────▶│   Guests    │────▶│   Booking   │
│  /calendar  │     │  /guests    │     │   Review    │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
                    ┌─────────────┐     ┌─────────────┐
                    │   Payment   │────▶│Confirmation │
                    │  /payment   │     │/confirmation│
                    └─────────────┘     └─────────────┘
```

---

## Data Flow

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Screen    │────▶│  useQuery   │────▶│   Gateway   │
│             │     │   Hook      │     │             │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                                               ▼
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│  Component  │◀────│   Mapper    │◀────│  MirageJS   │
│             │     │             │     │  (Mock API) │
└─────────────┘     └─────────────┘     └─────────────┘
```

---

## Import Aliases

Configured in `babel.config.js` and `tsconfig.json`:

```typescript
// Usage examples
import { Button } from '@/components/ui/Button';
import { useBooking } from '@/context/BookingContext';
import { colors } from '@/theme/colors';
import { Hotel } from '@/types/hotel';
```

| Alias | Path |
|-------|------|
| `@/*` | `./src/*` |
| `@components/*` | `./src/components/*` |
| `@hooks/*` | `./src/hooks/*` |
| `@utils/*` | `./src/utils/*` |
| `@theme/*` | `./src/theme/*` |
| `@types/*` | `./src/types/*` |
| `@context/*` | `./src/context/*` |

---

## Key Patterns

### Component Pattern

```typescript
// Functional component with memo for performance
import { memo } from 'react';
import { View, Text } from 'react-native';

interface Props {
  title: string;
  onPress?: () => void;
}

export const MyComponent = memo(function MyComponent({
  title,
  onPress
}: Props) {
  return (
    <View className="p-4 bg-white rounded-xl">
      <Text className="text-lg font-semibold">{title}</Text>
    </View>
  );
});
```

### Query Hook Pattern

```typescript
import { useQuery } from '@tanstack/react-query';
import { hotelsGateway } from '@/repositories/hotelsGateway';

export function useHotels(filters?: HotelFilters) {
  return useQuery({
    queryKey: ['hotels', filters],
    queryFn: () => hotelsGateway.getHotels(filters),
  });
}
```

### Context Usage Pattern

```typescript
import { useBooking } from '@/context/BookingContext';

function MyScreen() {
  const {
    selectedHotel,
    setSelectedHotel,
    calculateTotal
  } = useBooking();

  // Use context values
}
```
