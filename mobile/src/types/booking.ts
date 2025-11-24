export type BookingStatus = 'Confirmed' | 'Completed' | 'Cancelled';

export interface Booking {
  id: number;
  hotel: string;
  location: string;
  dates: string;
  status: BookingStatus;
  bookingNumber: string;
  image: string;
}
