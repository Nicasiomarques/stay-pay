import { useState } from 'react';
import { View, ScrollView, Image, Dimensions, Text } from 'react-native';

const { width } = Dimensions.get('window');

interface ImageCarouselProps {
  images: string[];
  height?: number;
}

export function ImageCarousel({ images, height = 300 }: ImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / width);
    setActiveIndex(index);
  };

  return (
    <View className="relative" style={{ height }}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {images.map((image, index) => (
          <Image
            key={index}
            source={{ uri: image }}
            className="bg-gray-200"
            style={{ width, height }}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      <View className="absolute bottom-4 left-0 right-0 flex-row justify-center items-center gap-2">
        {images.map((_, index) => (
          <View
            key={index}
            className={`h-2 rounded-full ${
              index === activeIndex
                ? 'w-6 bg-white'
                : 'w-2 bg-white/50'
            }`}
          />
        ))}
      </View>

      {/* Counter */}
      <View className="absolute top-4 right-4 bg-black/60 px-3 py-1.5 rounded-2xl">
        <Text className="text-white text-xs font-semibold">
          {activeIndex + 1} / {images.length}
        </Text>
      </View>
    </View>
  );
}
