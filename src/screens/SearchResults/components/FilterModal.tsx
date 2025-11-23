import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Wifi,
  Waves,
  Dumbbell,
  Car,
  Utensils,
  Wine,
  Sparkles,
  Hotel as HotelIcon,
  Home,
  Building2,
  Star,
} from "lucide-react";
import { Button } from "@components";
import { backdropVariants, modalVariants, springs, durations } from "@/config/animations";

export interface FilterState {
  priceRange: [number, number];
  categories: string[];
  amenities: string[];
  minRating: number;
}

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onApplyFilters: (filters: FilterState) => void;
}

const CATEGORIES = [
  { id: "luxury", label: "Luxo", icon: Sparkles },
  { id: "resort", label: "Resort", icon: Waves },
  { id: "hotel", label: "Hotéis", icon: Building2 },
  { id: "inn", label: "Hospedarias", icon: Home },
  { id: "budget", label: "Económico", icon: HotelIcon },
];

const AMENITIES = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "pool", label: "Piscina", icon: Waves },
  { id: "gym", label: "Ginásio", icon: Dumbbell },
  { id: "parking", label: "Estacionamento", icon: Car },
  { id: "restaurant", label: "Restaurante", icon: Utensils },
  { id: "bar", label: "Bar", icon: Wine },
  { id: "spa", label: "Spa", icon: Sparkles },
];

const MAX_RATING = 5;

export function FilterModal({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleCategoryToggle = (categoryId: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleAmenityToggle = (amenityId: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((a) => a !== amenityId)
        : [...prev.amenities, amenityId],
    }));
  };

  const handleReset = () => {
    const resetFilters: FilterState = {
      priceRange: [0, 600000],
      categories: [],
      amenities: [],
      minRating: 0,
    };
    setLocalFilters(resetFilters);
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-AO", {
      style: "currency",
      currency: "AOA",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate active filters count
  const activeFiltersCount = (() => {
    let count = 0;
    if (localFilters.priceRange[1] < 600000) count++;
    count += localFilters.categories.length;
    count += localFilters.amenities.length;
    if (localFilters.minRating > 0) count++;
    return count;
  })();

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 99999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: durations.fast }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white"
            style={{
              borderRadius: "1.5rem",
              width: "90vw",
              maxWidth: "36rem",
              maxHeight: "90vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={springs.smooth}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-gray-900">Filtros</h2>
                {activeFiltersCount > 0 && (
                  <motion.span
                    className="bg-[#0E64D2] text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={springs.bouncy}
                    key={activeFiltersCount}
                  >
                    {activeFiltersCount}
                  </motion.span>
                )}
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-4 h-4 text-gray-900" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 py-2.5">
              {/* Price Range */}
              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-900 mb-1.5">
                  Faixa de Preço
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Preço Mínimo
                    </label>
                    <input
                      type="text"
                      value={formatPrice(localFilters.priceRange[0])}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, "");
                        const numValue = value ? parseInt(value) : 0;
                        if (numValue <= localFilters.priceRange[1]) {
                          setLocalFilters((prev) => ({
                            ...prev,
                            priceRange: [numValue, prev.priceRange[1]],
                          }));
                        }
                      }}
                      placeholder="Kz 0"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E64D2] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Preço Máximo
                    </label>
                    <input
                      type="text"
                      value={formatPrice(localFilters.priceRange[1])}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d]/g, "");
                        const numValue = value ? parseInt(value) : 0;
                        if (numValue >= localFilters.priceRange[0]) {
                          setLocalFilters((prev) => ({
                            ...prev,
                            priceRange: [prev.priceRange[0], numValue],
                          }));
                        }
                      }}
                      placeholder="Kz 600.000"
                      className="w-full px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0E64D2] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Categories */}
              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-900 mb-1.5">
                  Categorias
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((category, index) => {
                    const Icon = category.icon;
                    const isSelected = localFilters.categories.includes(
                      category.id
                    );
                    return (
                      <motion.button
                        key={category.id}
                        onClick={() => handleCategoryToggle(category.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-[#0E64D2] text-white border-[#0E64D2]"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: durations.fast }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon
                          className={`w-5 h-5 flex-shrink-0 ${
                            isSelected ? "text-white" : "text-[#0E64D2]"
                          }`}
                        />
                        <span className="text-sm font-medium">
                          {category.label}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Amenities */}
              <div className="mb-3">
                <h3 className="text-xs font-medium text-gray-900 mb-1.5">
                  Comodidades
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {AMENITIES.map((amenity, index) => {
                    const Icon = amenity.icon;
                    const isSelected = localFilters.amenities.includes(amenity.id);
                    return (
                      <motion.button
                        key={amenity.id}
                        onClick={() => handleAmenityToggle(amenity.id)}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          isSelected
                            ? "bg-[#0E64D2] text-white border-[#0E64D2]"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: durations.fast }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon
                          className={`w-4 h-4 flex-shrink-0 ${
                            isSelected ? "text-white" : "text-[#0E64D2]"
                          }`}
                        />
                        <span className="text-sm font-medium">{amenity.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Rating */}
              <div className="mb-1">
                <h3 className="text-xs font-medium text-gray-900 mb-1.5">
                  Avaliação Mínima
                </h3>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center justify-center gap-2 p-4 bg-gray-50 rounded-xl">
                    {Array.from({ length: MAX_RATING }).map((_, index) => {
                      const starNumber = index + 1;
                      const isFilled = starNumber <= localFilters.minRating;

                      return (
                        <motion.button
                          key={index}
                          onClick={() => {
                            setLocalFilters((prev) => ({
                              ...prev,
                              minRating: prev.minRating === starNumber ? 0 : starNumber,
                            }));
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          transition={springs.bouncy}
                        >
                          <motion.div
                            animate={
                              isFilled
                                ? { scale: [1, 1.2, 1], rotate: [0, 5, 0] }
                                : {}
                            }
                            transition={{ duration: 0.3 }}
                          >
                            <Star
                              className={`w-8 h-8 transition-colors ${
                                isFilled
                                  ? "text-[#FFB800] fill-[#FFB800]"
                                  : "text-gray-300 fill-gray-300"
                              }`}
                            />
                          </motion.div>
                        </motion.button>
                      );
                    })}
                  </div>
                  <div className="text-center">
                    {localFilters.minRating === 0 ? (
                      <p className="text-sm text-gray-600">
                        Clique nas estrelas para definir a avaliação mínima
                      </p>
                    ) : (
                      <p className="text-sm font-medium text-gray-900">
                        {localFilters.minRating}.0 ou superior
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-4 py-2 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-sm"
                >
                  Limpar
                </button>
                <Button onClick={handleApply} className="flex-1 py-2 text-sm">
                  Aplicar Filtros
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
