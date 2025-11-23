import { useState } from 'react';
import { MobileScreen, BottomNav } from '@components';
import { hotels } from '@data';
import { FavoritesHeader, FavoritesList } from './components';

export default function Favorites() {
  const [favorites] = useState(hotels.slice(0, 2)); // Mock favorites

  return (
    <MobileScreen className="bg-neutral-50">
      <FavoritesHeader />
      <FavoritesList favorites={favorites} />
      <BottomNav />
    </MobileScreen>
  );
}
