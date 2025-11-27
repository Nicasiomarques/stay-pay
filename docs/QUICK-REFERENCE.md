# StayGo - Quick Reference Guide

## Essential Commands

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# TypeScript check
npx tsc --noEmit

# Lint
npm run lint
```

---

## Key File Locations

| Need to... | Go to... |
|------------|----------|
| Add a new screen | `app/` |
| Add a tab screen | `app/(tabs)/` |
| Create UI component | `src/components/ui/` |
| Create feature component | `src/components/[feature]/` |
| Add global state | `src/context/` |
| Create data hook | `src/hooks/queries/` |
| Add API endpoint | `src/repositories/` |
| Define types | `src/types/` |
| Add mock data | `src/mocks/seeds.ts` |
| Add mock route | `src/mocks/routes/` |
| Configure theme | `src/theme/colors.ts` |
| Add utility | `src/utils/` |

---

## Import Aliases

```typescript
import { Button, Card } from '@/components/ui';    // UI components
import { X } from '@/components/home/X';            // Home components
import { X } from '@/components/shared/X';          // Shared components
import { useX } from '@/hooks/X';                   // Hooks
import { useHotels, useHotel } from '@/hooks/queries'; // Query hooks
import { useBooking } from '@context';
import { colors } from '@theme';
import { Hotel, Room } from '@types';                // Types
import { formatCurrency } from '@/utils';            // Utilities
```

---

## Color Palette

### Primary (Blue)

```typescript
primary: {
  DEFAULT: '#0E64D2',  // Main brand color
  light:   '#3B82F6',
  dark:    '#0A4FA3',
}
```

### Gray Scale

```typescript
gray: {
  50:  '#FAFAFA',  // Background
  100: '#F5F5F5',
  200: '#E5E5E5',
  300: '#D4D4D4',
  400: '#A3A3A3',
  500: '#737373',
  600: '#525252',
  700: '#404040',
  800: '#262626',
  900: '#171717',  // Text
}
```

### Semantic Colors

```typescript
success: '#10B981'   // Green
warning: '#F59E0B'   // Amber
error:   '#EF4444'   // Red
```

---

## Common Tailwind Classes

### Layout

```tsx
// Full screen container
className="flex-1 bg-white"

// Centered content
className="flex-1 items-center justify-center"

// Row with space between
className="flex-row items-center justify-between"

// Padding
className="p-4"    // All sides
className="px-4"   // Horizontal
className="py-6"   // Vertical
```

### Cards & Containers

```tsx
// Standard card
className="bg-white rounded-2xl shadow-sm p-4"

// Elevated card
className="bg-white rounded-xl shadow-xl p-4"

// Section container
className="bg-gray-50 rounded-xl p-4 mb-4"
```

### Typography

```tsx
// Headings
className="text-2xl font-bold text-gray-900"
className="text-xl font-semibold text-gray-900"
className="text-lg font-semibold text-gray-900"

// Body text
className="text-base text-gray-700"
className="text-sm text-gray-500"

// Caption
className="text-xs text-gray-400"
```

### Buttons

```tsx
// Primary button
className="bg-primary py-3 px-6 rounded-xl"

// Secondary button
className="bg-gray-100 py-3 px-6 rounded-xl"

// Outline button
className="border border-primary py-3 px-6 rounded-xl"
```

---

## BookingContext API

```typescript
const {
  // State
  booking: {
    hotel,          // Hotel | null
    selectedRoom,   // number (room index)
    checkIn,        // Date | null
    checkOut,       // Date | null
    guests,         // { adults: number, children: number }
    searchLocation, // string
    paymentMethod,  // 'card' | 'mobile' | 'property'
    quickFilter,    // string
  },

  // Setters
  setHotel,          // (hotel: Hotel) => void
  setSelectedRoom,   // (roomIndex: number) => void
  setDates,          // (checkIn: Date | null, checkOut: Date | null) => void
  setGuests,         // (guests: { adults: number, children: number }) => void
  setSearchLocation, // (location: string) => void
  setPaymentMethod,  // (method: PaymentMethod) => void
  setQuickFilter,    // (filter: string) => void

  // Helpers
  calculateTotal,    // () => number
  getNights,         // () => number
  getTotalGuests,    // () => number
  resetBooking,      // () => void
} = useBooking();
```

---

## React Query Hooks

```typescript
// Fetch all hotels with filters
const { data, isLoading, error } = useHotels(params);

// Fetch single hotel
const { data: hotel } = useHotel(id);

// Fetch featured hotels
const { data: featured } = useFeaturedHotels();

// Fetch popular hotels
const { data: popular } = usePopularHotels();

// Search hotels by location
const { data: results } = useSearchHotels(location);

// Fetch user bookings
const { data: bookings } = useBookings();

// Check room availability
const { data } = useRoomAvailability(hotelId, checkIn, checkOut, guests);
```

---

## Navigation Patterns

```typescript
import { useRouter } from 'expo-router';

const router = useRouter();

// Navigate to screen
router.push('/search');

// Navigate with params
router.push(`/hotel/${hotelId}`);

// Go back
router.back();

// Replace current screen
router.replace('/');

// Navigate to tab
router.push('/(tabs)/favorites');
```

---

## Component Templates

### New Screen

```tsx
import { View, Text, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';

export default function MyScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <Animatable.View animation="fadeIn" className="flex-row items-center px-5 py-4">
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#171717" />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900 ml-4">
          Screen Title
        </Text>
      </Animatable.View>

      <ScrollView className="flex-1 px-4">
        {/* Content */}
      </ScrollView>
    </SafeAreaView>
  );
}
```

### New Component

```tsx
import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface MyComponentProps {
  title: string;
  onPress?: () => void;
}

export const MyComponent = memo(function MyComponent({
  title,
  onPress,
}: MyComponentProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white rounded-xl p-4"
      activeOpacity={0.7}
    >
      <Text className="text-lg font-semibold text-gray-900">{title}</Text>
    </TouchableOpacity>
  );
});
```

### New Query Hook

```typescript
import { useQuery } from '@tanstack/react-query';
import { getMyGateway } from '@/config/dependencies';
import { queryKeys } from '@/config/queryClient';

export const useMyData = (params?: Params, options?) => {
  return useQuery({
    queryKey: queryKeys.myData.list(params),
    queryFn: () => getMyGateway().getData(params),
    ...options,
  });
};
```

---

## Debugging

```typescript
// Log current booking state
const { booking, calculateTotal, getNights, getTotalGuests } = useBooking();

console.log('Booking:', {
  hotel: booking.hotel?.name,
  room: booking.hotel?.rooms[booking.selectedRoom]?.type,
  dates: `${booking.checkIn} - ${booking.checkOut}`,
  guests: `${booking.guests.adults} adults, ${booking.guests.children} children`,
  totalGuests: getTotalGuests(),
  nights: getNights(),
  total: calculateTotal(),
});

// Check AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
const favorites = await AsyncStorage.getItem('favorites');
console.log('Favorites:', JSON.parse(favorites || '[]'));
```

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Screens | `kebab-case.tsx` | `booking-review.tsx` |
| UI Components | `lowercase.tsx` | `button.tsx` |
| Feature Components | `PascalCase.tsx` | `HotelCard.tsx` |
| Hooks | `camelCase.ts` | `useDebounce.ts` |
| Utils | `camelCase.ts` | `formatters.ts` |
| Types | `camelCase.ts` | `hotel.ts` |
| Context | `PascalCase.tsx` | `BookingContext.tsx` |
