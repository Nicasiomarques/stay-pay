import { useState, useCallback, useMemo } from 'react';

interface Room {
  type: string;
  price: number;
  capacity: number;
}

/**
 * Custom hook for managing room selection logic
 * Screen-specific for HotelDetail screen
 */
export function useRoomSelection(rooms: Room[], initialIndex: number = 0) {
  const [selectedRoomIndex, setSelectedRoomIndex] = useState(initialIndex);

  const selectedRoom = useMemo(
    () => rooms[selectedRoomIndex],
    [rooms, selectedRoomIndex]
  );

  const selectRoom = useCallback((index: number) => {
    if (index >= 0 && index < rooms.length) {
      setSelectedRoomIndex(index);
    }
  }, [rooms.length]);

  const selectNextRoom = useCallback(() => {
    setSelectedRoomIndex((prev) => (prev + 1) % rooms.length);
  }, [rooms.length]);

  const selectPreviousRoom = useCallback(() => {
    setSelectedRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length);
  }, [rooms.length]);

  const calculateTotalPrice = useCallback(
    (nights: number) => {
      return selectedRoom.price * nights;
    },
    [selectedRoom]
  );

  return {
    selectedRoomIndex,
    selectedRoom,
    selectRoom,
    selectNextRoom,
    selectPreviousRoom,
    calculateTotalPrice,
  };
}
