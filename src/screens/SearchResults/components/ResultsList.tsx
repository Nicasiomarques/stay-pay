import { HotelCard } from "@components";
import { Hotel } from '@types';
import { motion, AnimatePresence } from 'framer-motion';

interface ResultsListProps {
  hotels: Hotel[];
}

export function ResultsList({ hotels }: ResultsListProps) {
  return (
    <div className="px-6 py-6">
      <motion.p
        className="text-gray-500 mb-4"
        key={hotels.length}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {hotels.length} {hotels.length === 1 ? 'propriedade encontrada' : 'propriedades encontradas'}
      </motion.p>
      <div className="space-y-4 pb-6">
        <AnimatePresence mode="popLayout">
          {hotels.map((hotel, index) => (
            <motion.div
              key={hotel.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{
                duration: 0.3,
                delay: index * 0.05,
                layout: { duration: 0.3 }
              }}
            >
              <HotelCard {...hotel} hotelData={hotel} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
