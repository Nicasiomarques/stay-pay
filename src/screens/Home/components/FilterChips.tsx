import { LucideIcon } from 'lucide-react';

interface FilterOption {
  icon: LucideIcon;
  label: string;
}

interface FilterChipsProps {
  options: FilterOption[];
  selectedOption?: string;
  onSelect?: (option: string) => void;
}

export default function FilterChips({ options, selectedOption, onSelect }: FilterChipsProps) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
      {options.map((option, index) => {
        const Icon = option.icon;
        const isSelected = selectedOption === option.label.toLowerCase();

        return (
          <button
            key={index}
            onClick={() => onSelect?.(option.label.toLowerCase())}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border whitespace-nowrap transition-colors ${
              isSelected
                ? 'bg-[#0E64D2] text-white border-[#0E64D2]'
                : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-[#0E64D2]'}`} />
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
