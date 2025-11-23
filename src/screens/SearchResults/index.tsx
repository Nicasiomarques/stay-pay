import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { MobileScreen, PageTransition } from "@components";
import { hotels } from "@data";
import { useBooking } from "@context";
import {
  SearchHeader,
  SortOptions,
  ResultsList,
  FilterModal,
  FilterState,
} from "./components";

export default function SearchResults() {
  const navigate = useNavigate();
  const { booking, setQuickFilter } = useBooking();
  const [sortBy, setSortBy] = useState("recomendado");
  const [showFilters, setShowFilters] = useState(false);

  // Initialize filters with quick filter from context if available
  const [filters, setFilters] = useState<FilterState>(() => {
    const categories: string[] = [];

    if (booking.quickFilter) {
      const filterMap: Record<string, string> = {
        destaque: "luxury",
        luxo: "luxury",
        resort: "resort",
        económico: "budget",
      };
      const category = filterMap[booking.quickFilter.toLowerCase()];
      if (category) {
        categories.push(category);
      }
    }

    return {
      priceRange: [0, 600000],
      categories,
      amenities: [],
      minRating: 0,
    };
  });

  // Filter and sort hotels
  const filteredAndSortedHotels = useMemo(() => {
    let result = [...hotels];

    // Filter by location search
    if (booking.searchLocation) {
      const searchTerm = booking.searchLocation.toLowerCase();
      result = result.filter(
        (hotel) =>
          hotel.location.toLowerCase().includes(searchTerm) ||
          hotel.name.toLowerCase().includes(searchTerm)
      );
    }

    // Filter by price range
    result = result.filter(
      (hotel) =>
        hotel.price >= filters.priceRange[0] &&
        hotel.price <= filters.priceRange[1]
    );

    // Filter by rating
    if (filters.minRating > 0) {
      result = result.filter((hotel) => hotel.rating >= filters.minRating);
    }

    // Filter by amenities
    if (filters.amenities.length > 0) {
      result = result.filter((hotel) =>
        filters.amenities.every((amenity) => hotel.amenities.includes(amenity))
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter((hotel) => {
        const matchesCategory = filters.categories.some((category) => {
          switch (category) {
            case "luxury":
              return hotel.price >= 180000 && hotel.rating >= 4.7;
            case "resort":
              return (
                hotel.name.toLowerCase().includes("resort") ||
                (hotel.amenities.includes("pool") &&
                  hotel.amenities.includes("spa"))
              );
            case "hotel":
              return hotel.name.toLowerCase().includes("hotel");
            case "inn":
              return (
                hotel.name.toLowerCase().includes("pousada") ||
                hotel.name.toLowerCase().includes("lodge")
              );
            case "budget":
              return hotel.price < 100000;
            default:
              return false;
          }
        });
        return matchesCategory;
      });
    }

    // Sort hotels
    switch (sortBy) {
      case "preço: baixo a alto":
        result.sort((a, b) => a.price - b.price);
        break;
      case "avaliação":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "distância":
        result.sort((a, b) => {
          const distA = parseFloat(a.distance || "999");
          const distB = parseFloat(b.distance || "999");
          return distA - distB;
        });
        break;
      case "recomendado":
      default:
        // Recommended: balance of rating and reviews
        result.sort((a, b) => {
          const scoreA = a.rating * Math.log(a.reviews + 1);
          const scoreB = b.rating * Math.log(b.reviews + 1);
          return scoreB - scoreA;
        });
        break;
    }

    return result;
  }, [booking.searchLocation, filters, sortBy]);

  const handleApplyFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    // Clear quick filter after applying custom filters
    setQuickFilter("");
  };

  // Calculate active filters count
  const activeFiltersCount = useMemo(() => {
    let count = 0;

    // Check if price range is not default
    if (filters.priceRange[1] < 600000) count++;

    // Count categories
    count += filters.categories.length;

    // Count amenities
    count += filters.amenities.length;

    // Check if rating filter is active
    if (filters.minRating > 0) count++;

    return count;
  }, [filters]);

  return (
    <>
      <PageTransition>
        <MobileScreen className="bg-neutral-50">
          <SearchHeader
            location={booking.searchLocation || "Luanda"}
            checkIn={booking.checkIn}
            checkOut={booking.checkOut}
            guests={booking.guests}
            onBack={() => navigate("/home")}
            onSearchClick={() => navigate("/home")}
            onFilterClick={() => setShowFilters(true)}
            activeFiltersCount={activeFiltersCount}
          />

          <div className="px-6 pt-4">
            <SortOptions sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          <ResultsList hotels={filteredAndSortedHotels} />
        </MobileScreen>
      </PageTransition>

      <FilterModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
    </>
  );
}
