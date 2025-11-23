import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from '@/components/figma/ImageWithFallback';
import { springs } from '@/config/animations';

interface ImageCarouselProps {
  images: string[];
  alt: string;
  height?: string;
}

export default function ImageCarousel({ images, alt, height = 'h-80' }: ImageCarouselProps) {
  const [currentImage, setCurrentImage] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const handleImageChange = (newIndex: number) => {
    setDirection(newIndex > currentImage ? 1 : -1);
    setCurrentImage(newIndex);
  };

  return (
    <div className="relative">
      <div className={`relative ${height} overflow-hidden`}>
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentImage}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={springs.smooth}
            className="absolute inset-0"
          >
            <ImageWithFallback
              src={images[currentImage]}
              alt={alt}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5">
          {images.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentImage ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
              }`}
              aria-label={`View image ${index + 1}`}
              whileTap={{ scale: 0.9 }}
              animate={index === currentImage ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
