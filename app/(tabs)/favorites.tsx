import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HotelCardLarge } from '@/components/home';
import { useFavorites, useToggleFavorite } from '@/hooks/queries';
import { colors } from '@theme';
import { haptics } from '@/utils/haptics';

export default function FavoritesScreen() {
  const { data: favorites, isLoading, error } = useFavorites();
  const toggleFavoriteMutation = useToggleFavorite();

  const handleRemoveFavorite = (hotelId: number) => {
    haptics.medium();
    toggleFavoriteMutation.mutate({ hotelId, isFavorite: true });
  };

  if (isLoading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center bg-white">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="mt-4 text-base text-gray-500">
            Carregando favoritos...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1 justify-center items-center bg-white">
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Erro ao carregar favoritos
          </Text>
          <Text className="text-sm text-gray-500 text-center">
            {error instanceof Error ? error.message : 'Erro desconhecido'}
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const favoritesList = favorites || [];

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <Animatable.View
        animation="fadeInDown"
        duration={500}
        className="bg-white px-6 pt-4 pb-4 border-b border-gray-200"
      >
        <Text className="text-[28px] font-bold text-gray-900 mb-1">
          Favoritos
        </Text>
        <Text className="text-sm text-gray-500">
          {favoritesList.length} hotel{favoritesList.length !== 1 ? 's' : ''}
        </Text>
      </Animatable.View>

      {favoritesList.length === 0 ? (
        <Animatable.View
          animation="fadeIn"
          delay={200}
          className="flex-1 justify-center items-center p-6"
        >
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum hotel favorito ainda
          </Text>
          <Text className="text-sm text-gray-500 text-center">
            Adicione hotéis aos favoritos para vê-los aqui
          </Text>
        </Animatable.View>
      ) : (
        <FlatList
          data={favoritesList}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item, index }) => (
            <Animatable.View
              animation="fadeInUp"
              delay={index * 100}
              duration={500}
            >
              <HotelCardLarge
                id={item.hotel.id}
                image={item.hotel.image}
                name={item.hotel.name}
                location={item.hotel.location}
                rating={item.hotel.rating}
                reviews={item.hotel.reviews}
                price={item.hotel.price}
                isFavorite={true}
                useInternalFavorite={false}
                onFavoritePress={() => handleRemoveFavorite(item.hotel.id)}
              />
            </Animatable.View>
          )}
          contentContainerClassName="p-6 pb-28"
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}
