export const hotels = [
  {
    id: 1,
    name: 'The Grand Plaza',
    location: 'Downtown, New York',
    rating: 4.8,
    reviews: 234,
    price: 189,
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Experience luxury in the heart of downtown. This elegant hotel offers world-class amenities and stunning city views.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'spa', 'concierge'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1682221568203-16f33b35e57d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnl8ZW58MXx8fHwxNzYzODIxMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1729717949948-56b52db111dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBvb2wlMjByZXNvcnR8ZW58MXx8fHwxNzYzODM3MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '1-1', type: 'Standard Room', price: 189, capacity: 2 },
      { id: '1-2', type: 'Deluxe Suite', price: 289, capacity: 4 },
      { id: '1-3', type: 'Presidential Suite', price: 489, capacity: 6 },
    ]
  },
  {
    id: 2,
    name: 'Skyline Boutique',
    location: 'Midtown, New York',
    rating: 4.6,
    reviews: 189,
    price: 149,
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Modern boutique hotel with contemporary design and personalized service.',
    amenities: ['wifi', 'gym', 'parking', 'restaurant', 'concierge'],
    images: [
      'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '2-1', type: 'Standard Room', price: 149, capacity: 2 },
      { id: '2-2', type: 'Deluxe Room', price: 209, capacity: 3 },
    ]
  },
  {
    id: 3,
    name: 'Harbor View Hotel',
    location: 'Waterfront, New York',
    rating: 4.9,
    reviews: 412,
    price: 229,
    distance: '3.1 km',
    image: 'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Waterfront luxury with breathtaking harbor views and premium amenities.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'spa'],
    images: [
      'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '3-1', type: 'Harbor View Room', price: 229, capacity: 2 },
      { id: '3-2', type: 'Premium Suite', price: 349, capacity: 4 },
    ]
  },
  {
    id: 4,
    name: 'Beach Paradise Resort',
    location: 'Malibu, California',
    rating: 4.7,
    reviews: 321,
    price: 279,
    distance: '5.2 km',
    image: 'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Beachfront resort with private beach access and tropical atmosphere.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'beach'],
    images: [
      'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '4-1', type: 'Ocean View Room', price: 279, capacity: 2 },
      { id: '4-2', type: 'Beach Villa', price: 449, capacity: 4 },
    ]
  },
];

export const reviews = [
  {
    id: 1,
    author: 'Sarah Johnson',
    rating: 5,
    date: 'November 2024',
    comment: 'Absolutely amazing stay! The staff was incredibly helpful and the room was spotless. The location is perfect for exploring the city.',
  },
  {
    id: 2,
    author: 'Michael Chen',
    rating: 4,
    date: 'October 2024',
    comment: 'Great hotel with excellent amenities. The pool area was beautiful. Only minor issue was the breakfast could have had more variety.',
  },
  {
    id: 3,
    author: 'Emma Wilson',
    rating: 5,
    date: 'October 2024',
    comment: 'Perfect for a romantic getaway. The views were stunning and the service was top-notch. Will definitely return!',
  },
];
