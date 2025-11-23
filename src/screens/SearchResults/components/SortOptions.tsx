interface SortOptionsProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

const sortOptions = ['Recommended', 'Price: Low to High', 'Rating', 'Distance'];

export function SortOptions({ sortBy, onSortChange }: SortOptionsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {sortOptions.map((option) => (
        <button
          key={option}
          onClick={() => onSortChange(option.toLowerCase())}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
            sortBy === option.toLowerCase()
              ? 'bg-[#0E64D2] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
