# StayGo - Components Reference

## UI Primitives (`src/components/ui/`)

Core reusable UI components that form the design system.

| Component | File | Description |
|-----------|------|-------------|
| **Button** | `button.tsx` | Primary action button with variants |
| **Card** | `card.tsx` | Container with shadow and rounded corners |
| **Input** | `input.tsx` | Text input with label support |
| **PhoneInput** | `PhoneInput.tsx` | Phone number input with country code |
| **StarRating** | `StarRating.tsx` | Star rating display |
| **FavoriteButton** | `FavoriteButton.tsx` | Heart button for favorites |
| **PriceDisplay** | `PriceDisplay.tsx` | Price formatting component |

### Button Usage

```tsx
import { Button } from '@/components/ui';

<Button
  variant="primary" // primary | secondary | outline | ghost
  size="lg"         // sm | md | lg
  onPress={handlePress}
  disabled={false}
  loading={false}
  fullWidth={false}
>
  Book Now
</Button>
```

### Card Usage

```tsx
import { Card } from '@/components/ui';

<Card className="p-4">
  <Text>Card content</Text>
</Card>
```

---

## Home Components (`src/components/home/`)

Components specific to the home screen.

| Component | File | Description |
|-----------|------|-------------|
| **SearchHeader** | `SearchHeader.tsx` | Search bar header |
| **CategoryCard** | `CategoryCard.tsx` | Category selection card |
| **DealCard** | `DealCard.tsx` | Special deal card |
| **HotelCardLarge** | `HotelCardLarge.tsx` | Large hotel card |
| **HotelCardCompact** | `HotelCardCompact.tsx` | Compact hotel card |
| **LastMinuteCard** | `LastMinuteCard.tsx` | Last minute deals |
| **RecentlyViewedCard** | `RecentlyViewedCard.tsx` | Recently viewed hotels |
| **DestinationCard** | `DestinationCard.tsx` | Destination card |

---

## Shared Components (`src/components/shared/`)

Reusable components used across multiple screens.

| Component | File | Description |
|-----------|------|-------------|
| **HotelCard** | `HotelCard.tsx` | Hotel listing card |
| **StickySearchBar** | `StickySearchBar.tsx` | Fixed search bar |
| **CollectionCard** | `CollectionCard.tsx` | Hotel collection card |
| **PersonalizedHeroCard** | `PersonalizedHeroCard.tsx` | Personalized recommendation |
| **TrustSignalItem** | `TrustSignalItem.tsx` | Trust indicators |
| **ImageCarousel** | `ImageCarousel.tsx` | Image gallery carousel |

### HotelCard Usage

```tsx
import { HotelCard } from '@/components/shared/HotelCard';

<HotelCard
  hotel={hotelData}
  onPress={() => router.push(`/hotel/${hotel.id}`)}
  onFavorite={() => toggleFavorite(hotel.id)}
  isFavorite={favorites.includes(hotel.id)}
/>
```

---

## Search Components (`src/components/search/`)

Components for search functionality.

| Component | File | Description |
|-----------|------|-------------|
| **SearchModal** | `SearchModal.tsx` | Search modal |
| **LocationAutocomplete** | `LocationAutocomplete.tsx` | Location suggestions |
| **LocationSuggestionItem** | `LocationSuggestionItem.tsx` | Single suggestion item |
| **PopularDestinations** | `PopularDestinations.tsx` | Popular destinations list |
| **RecentSearches** | `RecentSearches.tsx` | Search history |

---

## Filter Components (`src/components/filters/`)

Filter UI components.

| Component | File | Description |
|-----------|------|-------------|
| **FilterBottomSheet** | `FilterBottomSheet.tsx` | Filter bottom sheet |
| **PriceRangeSlider** | `PriceRangeSlider.tsx` | Price range selector |
| **AmenitiesCheckboxes** | `AmenitiesCheckboxes.tsx` | Amenities filter |
| **PropertyTypeGrid** | `PropertyTypeGrid.tsx` | Property type selection |
| **QuickFilterChips** | `QuickFilterChips.tsx` | Quick filter chips |
| **AnimatedFilterChip** | `AnimatedFilterChip.tsx` | Animated filter chip |

### FilterBottomSheet Usage

```tsx
import { FilterBottomSheet } from '@/components/filters/FilterBottomSheet';

<FilterBottomSheet
  visible={showFilters}
  onClose={() => setShowFilters(false)}
  filters={currentFilters}
  onApply={handleApplyFilters}
/>
```

---

## Skeleton Components (`src/components/skeletons/`)

Loading placeholder components.

| Component | File | Description |
|-----------|------|-------------|
| **SkeletonHotelCard** | `SkeletonHotelCard.tsx` | Hotel card loader |
| **SkeletonHeroCard** | `SkeletonHeroCard.tsx` | Hero card loader |
| **SkeletonHotelDetail** | `SkeletonHotelDetail.tsx` | Hotel detail loader |

### Skeleton Usage

```tsx
import { SkeletonHotelCard } from '@/components/skeletons/SkeletonHotelCard';

{isLoading ? (
  <SkeletonHotelCard />
) : (
  <HotelCard hotel={data} />
)}
```

---

## Illustrations (`src/components/illustrations/`)

SVG illustrations for empty states and decorations.

| Component | File | Description |
|-----------|------|-------------|
| **IsometricHotel** | `IsometricHotel.tsx` | Isometric hotel illustration |

---

## Component Hierarchy

```
App
├── RootLayout (_layout.tsx)
│   ├── QueryClientProvider
│   ├── BookingProvider
│   └── SafeAreaProvider
│
├── TabNavigator ((tabs)/_layout.tsx)
│   ├── HomeScreen (index.tsx)
│   │   ├── SearchHeader
│   │   ├── CategoryCard[]
│   │   ├── DealCard[]
│   │   ├── HotelCardLarge[]
│   │   └── HotelCardCompact[]
│   │
│   ├── FavoritesScreen
│   │   └── HotelCard[]
│   │
│   ├── BookingsScreen
│   │   └── BookingCard[]
│   │
│   └── ProfileScreen
│
├── HotelDetailScreen (hotel/[id].tsx)
│   ├── ImageCarousel
│   ├── HotelInfo
│   └── Room selection (inline)
│
├── CalendarScreen (calendar.tsx)
│   ├── DatePicker
│   └── GuestCounter (Adults/Children)
│
├── BookingReviewScreen (booking-review.tsx)
│   └── PriceBreakdown
│
├── PaymentScreen (payment.tsx)
│   └── PaymentMethodSelection
│
└── ConfirmationScreen (confirmation.tsx)
    └── BookingSummary
```

---

## Styling Conventions

### Common Class Patterns

```tsx
// Card container
className="bg-white rounded-2xl shadow-sm p-4"

// Section spacing
className="py-6 px-4"

// Flex row with center alignment
className="flex-row items-center justify-between"

// Text styles
className="text-lg font-semibold text-gray-900"
className="text-sm text-gray-500"

// Primary button
className="bg-primary py-3 px-6 rounded-xl"
```

### Shadow Classes

```tsx
// Light shadow
className="shadow-sm"

// Medium shadow
className="shadow-md"

// Card shadow
className="shadow-xl"
```

### Glassmorphism Effect

```tsx
// Glass effect for overlays
<BlurView intensity={80} tint="light">
  <View className="bg-white/80 backdrop-blur-lg">
    {content}
  </View>
</BlurView>
```
