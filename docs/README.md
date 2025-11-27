# StayGo Documentation

Welcome to the StayGo Hotel Booking App documentation. This folder contains comprehensive guides to help you understand and work with the codebase.

## Documentation Files

| Document | Description |
|----------|-------------|
| [ARCHITECTURE.md](./ARCHITECTURE.md) | Project structure, layers, state management, and navigation |
| [COMPONENTS.md](./COMPONENTS.md) | Complete component inventory with usage examples |
| [SCREENS.md](./SCREENS.md) | All screens with routes, features, and navigation flow |
| [DATA-LAYER.md](./DATA-LAYER.md) | Types, gateways, mappers, React Query hooks, and MirageJS |
| [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) | Essential commands, imports, colors, and templates |

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development
npm start

# Run iOS
npm run ios

# Run Android
npm run android
```

---

## Project Summary

**StayGo** is a React Native Expo hotel booking application featuring:

- **14 screens** covering complete booking flow
- **36+ reusable components** organized by feature
- **Clean architecture** with separated layers
- **React Query** for server state management
- **BookingContext** for client state
- **MirageJS** mock server for development
- **NativeWind** (Tailwind CSS) for styling
- **TypeScript** throughout

---

## Architecture at a Glance

```
┌────────────────────────────────────────────┐
│  Screens (app/)                            │
│    └── Components (src/components/)        │
├────────────────────────────────────────────┤
│  Context (src/context/)                    │
│  Hooks (src/hooks/)                        │
├────────────────────────────────────────────┤
│  Types (src/types/)                        │
│  Mappers (src/mappers/)                    │
├────────────────────────────────────────────┤
│  Gateways (src/repositories/)              │
│  Mocks (src/mocks/)                        │
└────────────────────────────────────────────┘
```

---

## Key Technologies

| Category | Technology |
|----------|------------|
| Framework | React Native 0.81.5 + Expo 54 |
| Navigation | Expo Router |
| Styling | NativeWind (Tailwind) |
| Server State | React Query |
| Client State | React Context |
| Mock API | MirageJS |
| Icons | Lucide React Native |
| Animations | Lottie |

---

## Booking Flow

```
Home → Search → Hotel Detail → Room Detail → Calendar → Guests → Review → Payment → Confirmation
```

---

## Design Reference

The UI is based on the Figma design:
https://www.figma.com/design/HhhgjHUfiMTXW1zE8e7KDH/StayGo-Hotel-Booking-App-UI

---

## Need Help?

1. Check [QUICK-REFERENCE.md](./QUICK-REFERENCE.md) for common patterns
2. See [COMPONENTS.md](./COMPONENTS.md) for component usage
3. Read [ARCHITECTURE.md](./ARCHITECTURE.md) for system understanding
4. Refer to [DATA-LAYER.md](./DATA-LAYER.md) for API/data questions
