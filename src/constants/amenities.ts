import { Star, Wifi, Dumbbell, Car, UtensilsCrossed, Wine, Waves, Sparkles } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const AMENITY_ICONS: Record<string, LucideIcon> = {
  wifi: Wifi,
  pool: Waves,
  gym: Dumbbell,
  parking: Car,
  restaurant: UtensilsCrossed,
  bar: Wine,
  spa: Sparkles,
  concierge: Star,
} as const;

export const AMENITY_LABELS: Record<string, string> = {
  wifi: 'WiFi',
  pool: 'Pool',
  gym: 'Gym',
  parking: 'Parking',
  restaurant: 'Restaurant',
  bar: 'Bar',
  spa: 'Spa',
  concierge: 'Concierge',
} as const;
