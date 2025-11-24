import { MobileScreen, BottomNav } from '@components';
import { useFavorites } from '@/hooks/queries';
import { FavoritesHeader, FavoritesList } from './components';

export default function Favorites() {
  // Fetch favorites from API
  const { data: favoritesData, isLoading } = useFavorites();

  // Map FavoriteWithHotel to the format expected by FavoritesList
  const favorites = favoritesData?.map(fav => fav.hotel) ?? [];

  return (
    <MobileScreen className="bg-neutral-50">
      <FavoritesHeader />
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E64D2]"></div>
        </div>
      ) : (
        <FavoritesList favorites={favorites} />
      )}
      <BottomNav />
    </MobileScreen>
  );
}
