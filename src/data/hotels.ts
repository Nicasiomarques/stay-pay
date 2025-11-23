export const hotels = [
  {
    id: 1,
    name: 'Epic Sana Luanda Hotel',
    location: 'Marginal de Luanda',
    rating: 4.8,
    reviews: 342,
    price: 180000,
    distance: '1.2 km',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hotel 5 estrelas situado na Marginal de Luanda com vista privilegiada para o Atlântico. Oferece quartos luxuosos, piscina infinita e spa completo.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'spa', 'concierge'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1682221568203-16f33b35e57d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnl8ZW58MXx8fHwxNzYzODIxMjI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      'https://images.unsplash.com/photo-1729717949948-56b52db111dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHBvb2wlMjByZXNvcnR8ZW58MXx8fHwxNzYzODM3MzU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '1-1', type: 'Quarto Standard Vista Mar', price: 180000, capacity: 2 },
      { id: '1-2', type: 'Suíte Executive', price: 280000, capacity: 4 },
      { id: '1-3', type: 'Suíte Presidencial', price: 450000, capacity: 6 },
    ]
  },
  {
    id: 2,
    name: 'Hotel Trópico',
    location: 'Baixa de Luanda',
    rating: 4.3,
    reviews: 198,
    price: 95000,
    distance: '0.8 km',
    image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hotel histórico no coração da Baixa de Luanda. Arquitetura colonial com todas as comodidades modernas. Próximo aos principais pontos turísticos.',
    amenities: ['wifi', 'gym', 'parking', 'restaurant', 'concierge'],
    images: [
      'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '2-1', type: 'Quarto Standard', price: 95000, capacity: 2 },
      { id: '2-2', type: 'Quarto Superior', price: 135000, capacity: 3 },
    ]
  },
  {
    id: 3,
    name: 'Ilha Resort & Spa',
    location: 'Ilha de Luanda',
    rating: 4.9,
    reviews: 456,
    price: 220000,
    distance: '4.5 km',
    image: 'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Resort exclusivo na paradisíaca Ilha de Luanda. Praias privadas, restaurantes à beira-mar e um dos melhores spas de Angola.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'spa', 'beach'],
    images: [
      'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '3-1', type: 'Quarto Vista Praia', price: 220000, capacity: 2 },
      { id: '3-2', type: 'Bungalow Premium', price: 350000, capacity: 4 },
    ]
  },
  {
    id: 4,
    name: 'Mussulo Resort',
    location: 'Mussulo, Luanda',
    rating: 4.7,
    reviews: 287,
    price: 260000,
    distance: '12 km',
    image: 'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Resort tropical na península do Mussulo. Águas cristalinas, praias de areia branca e infraestrutura completa para férias inesquecíveis.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'beach', 'spa'],
    images: [
      'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '4-1', type: 'Quarto Vista Oceano', price: 260000, capacity: 2 },
      { id: '4-2', type: 'Vila Deluxe na Praia', price: 420000, capacity: 4 },
    ]
  },
  {
    id: 5,
    name: 'Talatona Convention Hotel',
    location: 'Talatona, Luanda',
    rating: 4.5,
    reviews: 223,
    price: 145000,
    distance: '8 km',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hotel moderno em Talatona, ideal para negócios e lazer. Centro de convenções, restaurantes gourmet e fácil acesso ao aeroporto.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'concierge'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '5-1', type: 'Quarto Business', price: 145000, capacity: 2 },
      { id: '5-2', type: 'Suíte Executive', price: 210000, capacity: 3 },
    ]
  },
  {
    id: 6,
    name: 'Pousada Sangano',
    location: 'Sangano, Benguela',
    rating: 4.6,
    reviews: 165,
    price: 85000,
    distance: '450 km',
    image: 'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Pousada à beira-mar em Sangano, conhecida por suas ondas perfeitas para surf. Ambiente descontraído e vista espetacular do pôr-do-sol.',
    amenities: ['wifi', 'pool', 'parking', 'restaurant', 'bar', 'beach'],
    images: [
      'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '6-1', type: 'Quarto Standard', price: 85000, capacity: 2 },
      { id: '6-2', type: 'Quarto Vista Mar', price: 115000, capacity: 3 },
    ]
  },
  {
    id: 7,
    name: 'Hotel Restinga',
    location: 'Lobito, Benguela',
    rating: 4.2,
    reviews: 142,
    price: 78000,
    distance: '430 km',
    image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hotel tradicional no Lobito com vista para a famosa Restinga. Localização central com acesso à praia e ao porto.',
    amenities: ['wifi', 'parking', 'restaurant', 'bar'],
    images: [
      'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '7-1', type: 'Quarto Standard', price: 78000, capacity: 2 },
      { id: '7-2', type: 'Quarto Duplo', price: 95000, capacity: 2 },
    ]
  },
  {
    id: 8,
    name: 'Flamingo Lodge',
    location: 'Namibe',
    rating: 4.4,
    reviews: 98,
    price: 105000,
    distance: '780 km',
    image: 'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Lodge exclusivo no deserto do Namibe. Experiência única entre o deserto e o mar, perfeito para aventureiros e amantes da natureza.',
    amenities: ['wifi', 'pool', 'parking', 'restaurant', 'bar'],
    images: [
      'https://images.unsplash.com/photo-1729717949712-1c51422693d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlc29ydCUyMGhvdGVsfGVufDF8fHx8MTc2Mzc3NjI0Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '8-1', type: 'Quarto Safari', price: 105000, capacity: 2 },
      { id: '8-2', type: 'Suite Deserto', price: 165000, capacity: 3 },
    ]
  },
  {
    id: 9,
    name: 'Hotel Baia Farta',
    location: 'Baía Farta, Benguela',
    rating: 4.1,
    reviews: 87,
    price: 68000,
    distance: '470 km',
    image: 'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hotel acolhedor na tranquila Baía Farta. Ideal para quem procura descanso e contato com a natureza.',
    amenities: ['wifi', 'parking', 'restaurant', 'beach'],
    images: [
      'https://images.unsplash.com/photo-1716084380738-ea83a1c17716?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwaG90ZWwlMjBuaWdodHxlbnwxfHx8fDE3NjM4NDI5MTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '9-1', type: 'Quarto Standard', price: 68000, capacity: 2 },
      { id: '9-2', type: 'Quarto Familiar', price: 98000, capacity: 4 },
    ]
  },
  {
    id: 10,
    name: 'Pousada Kalandula',
    location: 'Quedas de Kalandula, Malanje',
    rating: 4.0,
    reviews: 72,
    price: 72000,
    distance: '420 km',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Pousada próxima às espetaculares Quedas de Kalandula. Vistas impressionantes das segundas maiores quedas de água de África.',
    amenities: ['wifi', 'parking', 'restaurant'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '10-1', type: 'Quarto Standard', price: 72000, capacity: 2 },
      { id: '10-2', type: 'Quarto Vista Cataratas', price: 95000, capacity: 2 },
    ]
  },
  {
    id: 11,
    name: 'Intercontinental Luanda',
    location: 'Miramar, Luanda',
    rating: 4.7,
    reviews: 389,
    price: 195000,
    distance: '2.5 km',
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hotel internacional de luxo no Miramar. Padrão internacional de serviço com restaurantes premiados e spa de classe mundial.',
    amenities: ['wifi', 'pool', 'gym', 'parking', 'restaurant', 'bar', 'spa', 'concierge'],
    images: [
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYzODMxMjY0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '11-1', type: 'Quarto Deluxe', price: 195000, capacity: 2 },
      { id: '11-2', type: 'Suíte Executive', price: 310000, capacity: 3 },
      { id: '11-3', type: 'Suíte Presidencial', price: 520000, capacity: 4 },
    ]
  },
  {
    id: 12,
    name: 'Hotel Bela Vista',
    location: 'Huambo',
    rating: 4.0,
    reviews: 115,
    price: 82000,
    distance: '550 km',
    image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    description: 'Hotel no coração do Huambo, cidade das Jacarandás. Conforto e hospitalidade no planalto central de Angola.',
    amenities: ['wifi', 'parking', 'restaurant', 'bar'],
    images: [
      'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3RlbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MzgxMTE1N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ],
    rooms: [
      { id: '12-1', type: 'Quarto Standard', price: 82000, capacity: 2 },
      { id: '12-2', type: 'Quarto Superior', price: 110000, capacity: 3 },
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
