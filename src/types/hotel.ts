export interface Room {
  id: string;
  type: string;
  price: number;
  capacity: number;
}

export interface Hotel {
  id: number;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  distance?: string;
  image: string;
  description: string;
  amenities: string[];
  images: string[];
  rooms: Room[];
}
