# StayGo - Screens Reference

## Screen Inventory

| Screen | Route | File | Description |
|--------|-------|------|-------------|
| Home | `/` | `app/(tabs)/index.tsx` | Main landing with search & hotels |
| Favorites | `/favorites` | `app/(tabs)/favorites.tsx` | Saved hotels list |
| Bookings | `/bookings` | `app/(tabs)/bookings.tsx` | User's bookings |
| Profile | `/profile` | `app/(tabs)/profile.tsx` | User settings |
| Search | `/search` | `app/search.tsx` | Search results |
| Hotel Detail | `/hotel/[id]` | `app/hotel/[id].tsx` | Hotel information |
| Booking Detail | `/booking/[id]` | `app/booking/[id].tsx` | Booking details |
| Calendar | `/calendar` | `app/calendar.tsx` | Date & guest selection |
| Booking Review | `/booking-review` | `app/booking-review.tsx` | Review before payment |
| Payment | `/payment` | `app/payment.tsx` | Payment method |
| Confirmation | `/confirmation` | `app/confirmation.tsx` | Booking confirmed |

---

## Tab Screens

### Home Screen (`app/(tabs)/index.tsx`)

**Purpose:** Main landing page with search and hotel discovery.

**Features:**
- Location search bar
- Category cards
- Deal cards
- Featured hotels
- Popular hotels section

**State Used:**
- `useHotels()` - Fetch hotel listings
- `useBooking()` - Access search location

**Navigation:**
- Search bar -> `/search`
- Hotel card -> `/hotel/[id]`

---

### Favorites Screen (`app/(tabs)/favorites.tsx`)

**Purpose:** Display user's saved/favorite hotels.

**Features:**
- List of favorited hotels
- Remove from favorites
- Empty state illustration

**State Used:**
- AsyncStorage for favorites
- `useFavorites()` hook

**Navigation:**
- Hotel card -> `/hotel/[id]`

---

### Bookings Screen (`app/(tabs)/bookings.tsx`)

**Purpose:** Show user's booking history.

**Features:**
- Upcoming bookings tab
- Past bookings tab
- Booking status indicators
- Empty state

**State Used:**
- `useBookings()` - Fetch user bookings

**Navigation:**
- Booking card -> `/booking/[id]`

---

### Profile Screen (`app/(tabs)/profile.tsx`)

**Purpose:** User profile and settings.

**Features:**
- User avatar and info
- Settings options
- Logout functionality
- App version info

---

## Flow Screens

### Search Screen (`app/search.tsx`)

**Purpose:** Search for hotels with filters.

**Features:**
- Text search input
- Filter bottom sheet (price, rating, amenities)
- Sort options
- Results list
- Recent searches

**State Used:**
- `useHotels(filters)` - Filtered results
- `useDebounce()` - Search debouncing
- Local filter state

**Navigation:**
- Hotel result -> `/hotel/[id]`
- Back -> Previous screen

---

### Hotel Detail Screen (`app/hotel/[id].tsx`)

**Purpose:** Display full hotel information.

**Features:**
- Image carousel/gallery
- Hotel name, rating, location
- Description
- Amenities grid
- Room selection (inline)
- Book now button

**State Used:**
- `useHotel(id)` - Hotel data
- `useBooking()` - Set selected hotel
- Route params: `id`

**Navigation:**
- Book now -> `/calendar`
- Back -> Previous screen

```tsx
// Key structure
<ScrollView>
  <ImageCarousel images={hotel.images} />
  <HotelInfo hotel={hotel} />
  <AmenitiesGrid amenities={hotel.amenities} />
  <RoomSelection rooms={hotel.rooms} onSelect={handleRoomSelect} />
</ScrollView>
<StickyFooter>
  <Button onPress={() => router.push('/calendar')}>
    Book Now
  </Button>
</StickyFooter>
```

---

### Calendar Screen (`app/calendar.tsx`)

**Purpose:** Select check-in/check-out dates AND number of guests.

**Features:**
- Calendar date picker
- Date range selection
- Blocked dates handling
- Night count display
- **Guest counter (Adults/Children)** - Integrated in this screen
- Continue button

**State Used:**
- `useBooking()` - Set dates and guests

**Navigation:**
- Continue -> `/booking-review`
- Back -> Hotel detail

```tsx
// Key structure
<View>
  <ScreenHeader title="Select Dates" />
  <Calendar
    minDate={today}
    markedDates={markedDates}
    onDayPress={handleDateSelect}
  />
  <DateRangeDisplay
    checkIn={checkInDate}
    checkOut={checkOutDate}
    nights={getNights()}
  />
  <GuestSection>
    <GuestCounter label="Adults" value={adults} onChange={setAdults} min={1} max={10} />
    <GuestCounter label="Children" value={children} onChange={setChildren} min={0} max={6} />
  </GuestSection>
  <StickyFooter>
    <Button onPress={() => router.push('/booking-review')}>
      Continue
    </Button>
  </StickyFooter>
</View>
```

---

### Booking Review Screen (`app/booking-review.tsx`)

**Purpose:** Review booking details before payment.

**Features:**
- Hotel summary card
- Room details
- Date range display
- Guest count breakdown (Adults, Children)
- Price breakdown
- Proceed to payment

**State Used:**
- `useBooking()` - All booking details

**Navigation:**
- Proceed to payment -> `/payment`
- Back -> Calendar

---

### Payment Screen (`app/payment.tsx`)

**Purpose:** Select payment method and confirm.

**Features:**
- Payment method selection (Card, Mobile Money, Pay at Property)
- Price summary
- Confirm & Pay button

**State Used:**
- `useBooking()` - Payment method, total

**Navigation:**
- Confirm & Pay -> `/confirmation`
- Back -> Booking review

---

### Confirmation Screen (`app/confirmation.tsx`)

**Purpose:** Show booking confirmation.

**Features:**
- Success animation
- Booking reference number
- Booking summary
- View booking button
- Back to home button

**State Used:**
- `useBooking()` - Booking summary
- Reset booking after display

**Navigation:**
- View booking -> `/bookings`
- Back to home -> `/`

---

## Screen Navigation Map

```
                                    ┌─────────────┐
                                    │    Home     │
                                    │   (tabs/)   │
                                    └──────┬──────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
           ┌─────────────┐        ┌─────────────┐        ┌─────────────┐
           │   Search    │        │   Hotel     │        │  Favorites  │
           │   /search   │───────▶│ /hotel/[id] │◀───────│ /favorites  │
           └─────────────┘        └──────┬──────┘        └─────────────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │  Calendar   │
                                  │  /calendar  │
                                  │ + Guests    │
                                  └──────┬──────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │  Booking    │
                                  │   Review    │
                                  └──────┬──────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │   Payment   │
                                  │  /payment   │
                                  └──────┬──────┘
                                         │
                                         ▼
                                  ┌─────────────┐
                                  │Confirmation │
                                  │/confirmation│
                                  └──────┬──────┘
                                         │
                    ┌────────────────────┴────────────────────┐
                    │                                         │
                    ▼                                         ▼
           ┌─────────────┐                           ┌─────────────┐
           │  Bookings   │                           │    Home     │
           │  /bookings  │                           │   (tabs/)   │
           └─────────────┘                           └─────────────┘
```
