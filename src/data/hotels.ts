export const hotels = [
  {
    id: 1,
    name: 'The Grand Plaza',
    location: 'Centro, Luanda',
    rating: 4.8,
    reviews: 234,
    price: 160000,
    distance: '2.3 km',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Experimente o luxo no coração do centro. Este elegante hotel oferece comodidades de classe mundial e vistas deslumbrantes da cidade.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'spa', 'concierge'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1682221568203-16f33b35e57d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnl8ZW58MXx8fHwxNzYzODIxMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1729717949948-56b52db111dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBvb2wlMjByZXNvcnR8ZW58MXx8fHwxNzYzODM3MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '1-1', type: 'Quarto Standard', price: 160000, capacity: 2 },
      { id: '1-2', type: 'Suíte Deluxe', price: 245000, capacity: 4 },
      { id: '1-3', type: 'Suíte Presidencial', price: 415000, capacity: 6 },
    ]
  },
  {
    id: 2,
    name: 'Skyline Boutique',
    location: 'Talatona, Luanda',
    rating: 4.6,
    reviews: 189,
    price: 126000,
    distance: '1.8 km',
    image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hotel boutique moderno com design contemporâneo e serviço personalizado.',
    amenities: ['wifi', 'gym', 'parking', 'restaurant', 'concierge'],
    images: [
      'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '2-1', type: 'Quarto Standard', price: 126000, capacity: 2 },
      { id: '2-2', type: 'Quarto Deluxe', price: 177000, capacity: 3 },
    ]
  },
  {
    id: 3,
    name: 'Harbor View Hotel',
    location: 'Ilha de Luanda',
    rating: 4.9,
    reviews: 412,
    price: 194000,
    distance: '3.1 km',
    image: 'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Luxo à beira-mar com vistas deslumbrantes do porto e comodidades premium.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'spa'],
    images: [
      'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '3-1', type: 'Quarto Vista Porto', price: 194000, capacity: 2 },
      { id: '3-2', type: 'Suíte Premium', price: 296000, capacity: 4 },
    ]
  },
  {
    id: 4,
    name: 'Beach Paradise Resort',
    location: 'Mussulo, Luanda',
    rating: 4.7,
    reviews: 321,
    price: 237000,
    distance: '5.2 km',
    image: 'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Resort à beira-mar com acesso privado à praia e atmosfera tropical.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'beach'],
    images: [
      'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '4-1', type: 'Quarto Vista Oceano', price: 237000, capacity: 2 },
      { id: '4-2', type: 'Vila na Praia', price: 381000, capacity: 4 },
    ]
  },
];

export const reviews = [
  {
    id: 1,
    author: 'Ana Silva',
    rating: 5,
    date: 'Novembro 2024',
    comment: 'Estadia absolutamente incrível! A equipe foi extremamente prestativa e o quarto estava impecável. A localização é perfeita para explorar a cidade.',
  },
  {
    id: 2,
    author: 'Carlos Mendes',
    rating: 4,
    date: 'Outubro 2024',
    comment: 'Ótimo hotel com excelentes comodidades. A área da piscina estava linda. A única questão foi que o pequeno-almoço poderia ter mais variedade.',
  },
  {
    id: 3,
    author: 'Maria Santos',
    rating: 5,
    date: 'Outubro 2024',
    comment: 'Perfeito para uma escapadela romântica. As vistas eram deslumbrantes e o serviço foi impecável. Voltaremos com certeza!',
  },
];
