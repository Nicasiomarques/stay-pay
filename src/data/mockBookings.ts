import { Booking } from '@/types';

export const mockUpcomingBookings: Booking[] = [
  {
    id: 1,
    hotel: 'The Grand Plaza',
    location: 'Downtown, New York',
    dates: 'Dec 24 - Dec 28, 2024',
    status: 'Confirmed',
    bookingNumber: 'BK-2024-891234',
    image:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export const mockPastBookings: Booking[] = [
  {
    id: 2,
    hotel: 'Skyline Boutique',
    location: 'Midtown, New York',
    dates: 'Nov 15 - Nov 18, 2024',
    status: 'Completed',
    bookingNumber: 'BK-2024-567890',
    image:
      'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    hotel: 'Ocean View Resort',
    location: 'Beachfront, Miami',
    dates: 'Oct 10 - Oct 15, 2024',
    status: 'Completed',
    bookingNumber: 'BK-2024-234567',
    image:
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMGhvdGVsfGVufDF8fHx8MTc2Mzg0MjkxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 4,
    hotel: 'Mountain Lodge',
    location: 'Alpine Valley, Colorado',
    dates: 'Sep 5 - Sep 10, 2024',
    status: 'Completed',
    bookingNumber: 'BK-2024-123456',
    image:
      'https://images.unsplash.com/photo-1596436889106-be35e843f974?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxvZGdlfGVufDF8fHx8MTc2Mzg0MjkxOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];

export const mockPastReservations: Booking[] = [
  {
    id: 1,
    hotel: 'The Grand Plaza',
    location: 'Downtown, New York',
    dates: 'Nov 15 - Nov 18, 2024',
    status: 'Completed',
    bookingNumber: 'BK-2024-1',
    image:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 2,
    hotel: 'Skyline Boutique',
    location: 'Midtown, New York',
    dates: 'Oct 5 - Oct 8, 2024',
    status: 'Completed',
    bookingNumber: 'BK-2024-2',
    image:
      'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
  {
    id: 3,
    hotel: 'Harbor View Hotel',
    location: 'Waterfront, New York',
    dates: 'Sep 12 - Sep 15, 2024',
    status: 'Completed',
    bookingNumber: 'BK-2024-3',
    image:
      'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  },
];
