import { memo } from 'react';
import { Room } from '@types';

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoomIndex: number;
  onSelectRoom: (index: number) => void;
}

function RoomSelector({ rooms, selectedRoomIndex, onSelectRoom }: RoomSelectorProps) {
  return (
    <div className="space-y-3">
      {rooms.map((room, index) => (
        <button
          key={room.id}
          onClick={() => onSelectRoom(index)}
          type="button"
          className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
            selectedRoomIndex === index
              ? 'border-[#0E64D2] bg-[#0E64D2]/5'
              : 'border-gray-200 bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-900 mb-1">{room.type}</h3>
              <p className="text-sm text-gray-500">Up to {room.capacity} guests</p>
            </div>
            <div className="text-right">
              <p className="text-gray-900">${room.price}</p>
              <p className="text-sm text-gray-500">per night</p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default memo(RoomSelector);
