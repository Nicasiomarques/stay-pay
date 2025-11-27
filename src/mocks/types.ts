// TypeScript interfaces for MirageJS models

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  avatar: string | null;
  createdAt: string;
  preferences: {
    language: string;
    currency: string;
    notifications: boolean;
  };
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  distance: string;
  image: string;
  description: string;
  amenities: string[];
  images: string[];
  rooms: Room[];
  category: string;
}

export interface Room {
  id: string;
  type: string;
  price: number;
  capacity: number;
  available?: boolean;
  remainingRooms?: number;
}

export interface Booking {
  id: string;
  userId: string;
  hotelId: number;
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestDetails: {
    name: string;
    email: string;
    phone: string;
  };
  paymentMethod: 'card' | 'mobile-money';
  paymentDetails?: {
    cardNumber?: string;
    cardHolder?: string;
  };
  pricing: {
    subtotal: number;
    serviceFee: number;
    tax: number;
    total: number;
  };
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  confirmationCode: string;
  qrCode: string;
  createdAt: string;
}

export interface Review {
  id: number;
  hotelId: number;
  userId: string;
  bookingId: string;
  author: {
    name: string;
    avatar: string;
  };
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  images: string[];
}

export interface Favorite {
  id: number;
  userId: string;
  hotelId: number;
  addedAt: string;
}

export interface Notification {
  id: number;
  userId: string;
  type: 'booking_confirmed' | 'booking_cancelled' | 'payment_success' | 'review_reminder';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  data?: Record<string, any>;
}

export interface Payment {
  id: string;
  bookingId: string;
  userId: string;
  amount: number;
  currency: string;
  method: 'card' | 'mobile-money';
  status: 'success' | 'pending' | 'failed';
  transactionId: string;
  createdAt: string;
}

export interface AuthToken {
  token: string;
  refreshToken: string;
  userId: string;
  expiresAt: string;
}

export interface Destination {
  name: string;
  hotelCount: number;
  image: string;
}

export interface Deal {
  id: string;
  title: string;
  subtitle: string;
  discount: number;
  image: string;
  backgroundColor: string;
  validUntil?: string;
}

export interface TrendingDestination {
  id: string;
  name: string;
  province: string;
  image: string;
  hotelsCount: number;
  trending: boolean;
}

export interface LastMinuteDeal {
  id: number;
  hotelId: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  originalPrice: number;
  discountedPrice: number;
  expiresAt: string;
}
