/**
 * useCollections Hook
 * Returns mock hotel collections data
 * In production, this would fetch curated collections from API
 */

import { useMemo } from 'react';

export interface Collection {
  id: string;
  title: string;
  description: string;
  hotelCount: number;
  image: string;
  emoji: string;
}

export function useCollections(): Collection[] {
  return useMemo(() => [
    {
      id: 'romantic',
      title: 'Escapadas Românticas',
      description: 'Hotéis perfeitos para casais que buscam momentos inesquecíveis',
      hotelCount: 45,
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
      emoji: '💕',
    },
    {
      id: 'beach',
      title: 'Resorts à Beira-Mar',
      description: 'Relaxe em praias paradisíacas com todo conforto',
      hotelCount: 68,
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop',
      emoji: '🏖️',
    },
    {
      id: 'luxury',
      title: 'Luxo Premium',
      description: 'Experiências exclusivas nos melhores hotéis 5 estrelas',
      hotelCount: 32,
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&h=600&fit=crop',
      emoji: '👑',
    },
    {
      id: 'adventure',
      title: 'Aventura e Natureza',
      description: 'Hotéis em locais incríveis para exploradores',
      hotelCount: 54,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      emoji: '⛰️',
    },
    {
      id: 'business',
      title: 'Negócios e Conferências',
      description: 'Infraestrutura completa para viagens corporativas',
      hotelCount: 89,
      image: 'https://images.unsplash.com/photo-1568495248636-6432b97bd949?w=800&h=600&fit=crop',
      emoji: '💼',
    },
  ], []);
}
