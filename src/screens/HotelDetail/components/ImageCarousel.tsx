import { useState } from 'react';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  height?: string;
}

export default function ImageCarousel({ images, alt, height = 'h-80' }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="relative">
      <div className={`relative ${height} overflow-hidden`}>
        <ImageWithFallback
          src={images[currentImage]}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentImage ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
