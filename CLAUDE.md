# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

StayGo is a React Native Expo hotel booking application. The project is based on a Figma design available at https://www.figma.com/design/HhhgjHUfiMTXW1zE8e7KDH/StayGo-Hotel-Booking-App-UI.

## Development Commands

- **Install dependencies**: `npm install` or `pnpm install`
- **Start Expo dev server**: `npm start` or `pnpm start`
- **Run on iOS**: `npm run ios` or `pnpm ios`
- **Run on Android**: `npm run android` or `pnpm android`

## Technology Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API (BookingContext)
- **Data Fetching**: React Query (@tanstack/react-query)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage
- **Gestures**: React Native Gesture Handler
- **Animations**: Lottie React Native

## Project Structure

```
├── app/                    # Expo Router screens (file-based routing)
│   ├── _layout.tsx        # Root layout with providers
│   ├── (tabs)/            # Tab navigator screens
│   └── hotel/[id].tsx     # Hotel detail screen
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI primitives (Button, Input, etc.)
│   │   ├── home/         # Home screen components
│   │   ├── filters/      # Filter components
│   │   └── illustrations/ # SVG illustrations
│   ├── context/          # React Context providers
│   │   └── BookingContext.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── queries/      # React Query hooks
│   ├── screens/          # Screen components
│   ├── theme/            # Theme configuration
│   │   └── colors.ts     # Color palette
│   ├── types/            # TypeScript definitions
│   ├── lib/              # External libraries config
│   ├── mocks/            # MirageJS mock server
│   └── utils/            # Utility functions
├── assets/               # Images, fonts, Lottie animations
├── babel.config.js       # Babel configuration with path aliases
├── tailwind.config.js    # Tailwind/NativeWind configuration
├── metro.config.js       # Metro bundler configuration
├── tsconfig.json         # TypeScript configuration
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## Architecture

### State Management via BookingContext

The application uses a centralized `BookingContext` that provides global booking state throughout the app. This context manages:

- Selected hotel and room
- Check-in/check-out dates
- Number of guests
- Search location
- Payment method
- Helper methods: `calculateTotal()`, `getNights()`, `resetBooking()`

### Routing (Expo Router)

File-based routing with the following structure:

- `app/_layout.tsx` - Root layout with providers
- `app/(tabs)/` - Tab navigator (Home, Favorites, Bookings, Profile)
- `app/hotel/[id].tsx` - Dynamic hotel detail route
- `app/calendar.tsx` - Date selection
- `app/search.tsx` - Search results

### Data Management

The application uses a clean architecture with:

- **Gateways** (`src/repositories/`) - API clients
- **React Query Hooks** (`src/hooks/queries/`) - Data fetching with caching
- **Mappers** (`src/mappers/`) - Transform DTOs to domain models
- **MirageJS** (`src/mocks/`) - Mock API server for development

## Styling Approach

- NativeWind (Tailwind CSS for React Native)
- Primary brand color: `#0E64D2` (blue)
- Neutral palette with `neutral-50` as background
- Common patterns:
  - Rounded corners: `rounded-2xl`, `rounded-xl`
  - Shadows via `shadow-sm`, `shadow-xl`

## Key Conventions

- TypeScript interfaces defined inline or in `src/types/`
- Functional components with hooks
- Lucide icons used throughout
- Date handling via native Date objects
