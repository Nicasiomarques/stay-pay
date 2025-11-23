import { Heart } from 'lucide-react';

export function FavoritesHeader() {
  return (
    <div className="bg-white px-6 pt-12 pb-6 shadow-sm">
      <div className="flex items-center gap-3 mb-2">
        <Heart className="w-8 h-8 text-[#0E64D2]" />
        <h1 className="text-gray-900">Favoritos</h1>
      </div>
      <p className="text-gray-500">As suas propriedades guardadas</p>
    </div>
  );
}
