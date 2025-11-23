# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StayGo is a React-based hotel booking application UI with a mobile-first design. The project is based on a Figma design available at https://www.figma.com/design/HhhgjHUfiMTXW1zE8e7KDH/StayGo-Hotel-Booking-App-UI.

## Development Commands

- **Install dependencies**: `npm i` or `pnpm i`
- **Start development server**: `npm run dev` (runs on port 3000 and auto-opens browser)
- **Build for production**: `npm run build` (outputs to `build/` directory)

## Technology Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5 with SWC plugin for fast compilation
- **PWA**: vite-plugin-pwa with Workbox (installable, offline-capable)
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS (v4.1.3)
- **UI Components**: Radix UI primitives + custom shadcn/ui-style components
- **Icons**: Lucide React
- **State Management**: React Context API (BookingContext)

## Project Structure

```
src/
├── components/          # Custom reusable components
│   ├── ui/             # shadcn/ui-style components (Radix UI based)
│   ├── figma/          # Figma-specific components (ImageWithFallback)
│   ├── BottomNav.tsx   # Bottom navigation bar
│   ├── Button.tsx      # Custom button component
│   ├── HotelCard.tsx   # Hotel display card
│   ├── Input.tsx       # Custom input component
│   └── MobileScreen.tsx # Mobile container wrapper
├── context/            # React Context providers
│   └── BookingContext.tsx # Global booking state management
├── screens/            # Page components (route handlers)
├── data/               # Static data (hotels.ts)
├── styles/             # Global styles
└── guidelines/         # Design guidelines (template only)
```

## Architecture

### State Management via BookingContext

The application uses a centralized `BookingContext` (src/context/BookingContext.tsx) that provides global booking state throughout the app. This context manages:

- Selected hotel and room
- Check-in/check-out dates
- Number of guests
- Search location
- Payment method
- Helper methods: `calculateTotal()`, `getNights()`, `resetBooking()`

**Usage pattern**:
```tsx
import { useBooking } from '../context/BookingContext';

function Component() {
  const { booking, setHotel, setDates, calculateTotal } = useBooking();
  // ...
}
```

### Routing Flow

The application follows a linear booking flow with these main routes:

1. `/` - Onboarding screen
2. `/home` - Main search interface
3. `/search` - Search results
4. `/hotel/:id` - Hotel details
5. `/calendar` - Date selection
6. `/booking-review` - Review booking
7. `/payment` - Payment processing
8. `/confirmation` - Booking confirmation

Additional routes:
- `/profile` - User profile
- `/favorites` - Saved hotels
- `/bookings` - Booking history

Access via bottom navigation (BottomNav component) on: `/home`, `/favorites`, `/bookings`, `/profile`

### Mobile-First Design

All screens are wrapped in the `MobileScreen` component which constrains content to a mobile viewport (`max-w-md`) centered on larger screens. This creates a phone-like experience regardless of screen size.

### UI Component Pattern

The project uses shadcn/ui-style components in `src/components/ui/`. These are Radix UI primitives with Tailwind styling, using utilities like `cn()` from `tailwind-merge` and `class-variance-authority` for variant management.

Custom components (Button, Input, HotelCard) exist alongside these UI primitives for app-specific needs.

### Path Aliases

The project uses multiple path aliases for clean imports:

| Alias | Path | Usage |
|-------|------|-------|
| `@/*` | `./src/*` | Any file in src |
| `@screens` | `./src/screens` | Screen components |
| `@components` | `./src/components` | Custom components |
| `@ui` | `./src/components/ui` | UI components (shadcn/ui) |
| `@context` | `./src/context` | Context providers |
| `@data` | `./src/data` | Static data |
| `@styles` | `./src/styles` | Global styles |

Example usage:
```tsx
import { BookingProvider } from '@context';
import { Home, SearchResults } from '@screens';
import { HotelCard, BottomNav } from '@components';
import { Button } from '@ui/button';
```

**Barrel Exports**: Each major directory (`screens`, `components`, `context`) has an `index.ts` that re-exports all modules, allowing grouped imports.

See [IMPORTS.md](IMPORTS.md) for complete reference.

Note: The config also includes version-specific aliases for dependencies (e.g., `'vaul@1.1.2': 'vaul'`) to handle package resolution.

## Data Management

Hotel data is stored in `src/data/hotels.ts` as a static array. Each hotel object includes:
- Basic info (id, name, location, rating, reviews, price)
- Images (main image + gallery)
- Amenities array
- Rooms array with types, prices, and capacity

When adding features that require hotel data, reference this structure.

## Styling Approach

- Tailwind CSS v4 is used throughout
- Primary brand color: `#0E64D2` (blue)
- Neutral palette with `neutral-50` as background
- Custom CSS is in `src/index.css` (Tailwind output) and `src/styles/globals.css`
- Common patterns:
  - Rounded corners: `rounded-2xl`, `rounded-xl`
  - Shadows: `shadow-sm`, `shadow-xl`
  - Active states: `active:scale-98`

## PWA (Progressive Web App)

This app is configured as a PWA with the following features:

- **Installable**: Can be installed on devices as a standalone app
- **Offline-capable**: Works offline after first visit (Service Worker)
- **Smart caching**: Unsplash images cached for 30 days, static assets pre-cached
- **Update prompts**: Users are notified when updates are available
- **Service Worker**: Located at `src/registerSW.ts`, imported in `main.tsx`

**Configuration**: See `vite.config.ts` for VitePWA plugin settings
**Documentation**: See `PWA.md` for complete PWA implementation details
**Icons**: SVG icon in `public/icon.svg`, use `public/generate-icons.html` to generate PNG versions

## Key Conventions

- TypeScript interfaces defined inline or at top of context files
- Functional components with hooks (no class components)
- Component props use destructuring with TypeScript interfaces
- Lucide icons used throughout (imported individually)
- Date handling via native Date objects (no date library beyond react-day-picker for UI)
