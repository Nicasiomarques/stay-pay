/**
 * Data Transfer Objects (DTOs) for Booking API responses
 * These types represent the raw data structure from the API
 */

export interface BookingDTO {
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

/**
 * Enriched booking DTO for list views (includes hotel data)
 */
export interface BookingListDTO {
  id: string;
  hotel: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'Confirmed' | 'Cancelled' | 'Completed';
  total: number;
  createdAt: string;
}

// API Response types
export interface BookingDetailResponseDTO {
  booking: BookingDTO;
}

export interface UserBookingsResponseDTO {
  bookings: BookingListDTO[];
  meta?: {
    total: number;
    upcoming: number;
    completed: number;
    cancelled: number;
  };
}

export interface CreateBookingResponseDTO {
  booking: BookingDTO;
  message: string;
}

export interface CancelBookingResponseDTO {
  booking: BookingDTO;
  message: string;
}

// API Request types
export interface CreateBookingRequestDTO {
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
}

export interface UserBookingsParamsDTO {
  status?: 'upcoming' | 'completed' | 'cancelled';
  page?: number;
  perPage?: number;
}
