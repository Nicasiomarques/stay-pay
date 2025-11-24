# StayGo - React Native Migration Documentation

## 📱 Project Overview

This is the React Native Expo version of the StayGo Hotel Booking App, migrated from the original React web application.

## 🏗️ Architecture

### Technology Stack

- **Framework**: React Native with Expo SDK 54
- **Navigation**: Expo Router (file-based routing)
- **State Management**: React Context API (BookingContext)
- **Data Fetching**: React Query (@tanstack/react-query)
- **Animations**: React Native Reanimated 3
- **Icons**: Lucide React Native
- **Storage**: AsyncStorage
- **Gestures**: React Native Gesture Handler

### Project Structure

```
mobile/
├── app/                    # Expo Router screens (file-based routing)
│   ├── _layout.tsx        # Root layout with providers
│   └── index.tsx          # Onboarding screen
├── src/
│   ├── components/        # Reusable components
│   │   ├── ui/           # UI primitives
│   │   └── shared/       # Shared components
│   ├── context/          # React Context providers
│   │   └── BookingContext.tsx
│   ├── hooks/            # Custom React hooks
│   │   └── queries/      # React Query hooks
│   ├── screens/          # Screen components
│   │   └── Onboarding/   # Onboarding screen
│   ├── theme/            # Theme configuration
│   │   └── colors.ts     # Color palette
│   ├── types/            # TypeScript definitions
│   ├── lib/              # External libraries config
│   └── utils/            # Utility functions
├── babel.config.js       # Babel configuration with path aliases
├── tsconfig.json         # TypeScript configuration
├── app.json              # Expo configuration
└── package.json          # Dependencies
```

## 🎨 Design System

### Colors

The app uses the same color palette as the web version:

- **Primary**: `#0E64D2` (Brand blue)
- **Grays**: From `gray50` to `gray900`
- **Semantic**: Success, Warning, Error, Info
- **Status**: Confirmed (green), Completed (blue), Cancelled (red)

See [src/theme/colors.ts](src/theme/colors.ts) for the complete palette.

### Typography

- System fonts (San Francisco on iOS, Roboto on Android)
- Font sizes: 12px to 32px
- Font weights: regular (400), semibold (600), bold (700)

## 🔄 Migration Status

### ✅ Completed

1. **Project Setup**
   - Expo project initialized with TypeScript
   - Expo Router configured for navigation
   - Path aliases configured in babel and tsconfig

2. **Core Logic (100% Compatible)**
   - Types migrated from web version
   - BookingContext migrated (no changes needed)
   - Pricing utilities migrated

3. **Theme**
   - Color palette defined
   - Theme structure created

4. **Screens**
   - ✅ Onboarding screen fully migrated with React Native components

### 🚧 Pending Migration

#### High Priority Screens
- Home (search interface)
- SearchResults (hotel listing)
- HotelDetail (hotel details with carousel)
- Calendar (date picker)
- BookingReview (review booking details)
- Payment (payment processing)
- Confirmation (booking confirmation)

#### Secondary Screens
- Profile
- Favorites
- Bookings (booking history)

#### Components to Build
- **UI Primitives**: Button, Input, Card, Modal, etc.
- **HotelCard**: Display hotel information
- **BottomNav**: Bottom tab navigation
- **ImageCarousel**: Image slider for hotel photos

#### Infrastructure
- HTTP Client adapter for React Native
- React Query hooks for API calls
- Image caching strategy
- AsyncStorage for persistence

## 🛠️ Development

### Prerequisites

```bash
# Install dependencies
pnpm install

# Install Expo CLI (if not installed)
npm install -g @expo/cli
```

### Running the App

```bash
# Start Expo dev server
pnpm start

# Run on iOS simulator
pnpm ios

# Run on Android emulator
pnpm android
```

### Testing on Device

1. Install **Expo Go** app on your phone
2. Scan the QR code from the terminal
3. App will load on your device

## 🔑 Key Differences from Web

### 1. **Navigation**
- **Web**: React Router DOM with `<BrowserRouter>`
- **Mobile**: Expo Router with file-based routing

### 2. **Styling**
- **Web**: Tailwind CSS classes
- **Mobile**: StyleSheet API with inline styles

### 3. **Components**
- **Web**: HTML elements (`<div>`, `<button>`)
- **Mobile**: React Native components (`<View>`, `<TouchableOpacity>`)

### 4. **Interactions**
- **Web**: Hover states, cursor events
- **Mobile**: Touch events, gestures

### 5. **Storage**
- **Web**: localStorage (synchronous)
- **Mobile**: AsyncStorage (asynchronous)

## 📋 Migration Checklist

Use this checklist to track migration progress:

### Core Features
- [x] Project setup and configuration
- [x] Path aliases
- [x] Type definitions
- [x] BookingContext
- [x] Theme/Colors
- [x] Onboarding screen
- [ ] Home screen
- [ ] Search functionality
- [ ] Hotel listing
- [ ] Hotel details
- [ ] Calendar/Date picker
- [ ] Booking flow
- [ ] Payment integration
- [ ] User profile
- [ ] Favorites
- [ ] Booking history

### UI Components
- [ ] Button component
- [ ] Input component
- [ ] Card component
- [ ] Modal/Dialog
- [ ] Bottom Sheet
- [ ] Image Carousel
- [ ] HotelCard
- [ ] BottomNav
- [ ] Loading states
- [ ] Error states

### Infrastructure
- [ ] HTTP client
- [ ] React Query setup
- [ ] API endpoints
- [ ] Error handling
- [ ] Image caching
- [ ] AsyncStorage utilities
- [ ] Form validation

### Polish
- [ ] Animations (Reanimated)
- [ ] Splash screen
- [ ] App icon
- [ ] Loading indicators
- [ ] Empty states
- [ ] Error boundaries
- [ ] Performance optimization

## 🚀 Next Steps

1. **Create UI Component Library**
   - Build Button, Input, Card primitives
   - Create HotelCard component
   - Implement BottomNav

2. **Build Home Screen**
   - Search input
   - Quick filters
   - Destination suggestions

3. **Implement Navigation**
   - Set up tab navigator
   - Configure stack navigation
   - Add transitions

4. **API Integration**
   - Adapt HTTP client
   - Migrate React Query hooks
   - Connect to backend

## 📝 Notes

- All business logic from the web version is reusable
- Context API works identically in React Native
- React Query requires no changes
- Focus on rebuilding UI components with React Native primitives

## 🤝 Contributing

When migrating screens:
1. Read the original web component
2. Identify web-specific dependencies (HTML, CSS classes, Radix UI)
3. Replace with React Native equivalents
4. Test on both iOS and Android
5. Commit with descriptive message

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)
- [Expo Router](https://expo.github.io/router/docs/)
- [React Query](https://tanstack.com/query/latest)
- [Lucide React Native](https://lucide.dev/guide/packages/lucide-react-native)
