interface Tab {
  id: string;
  label: string;
}

interface TabSelectorProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function TabSelector({ tabs, activeTab, onTabChange }: TabSelectorProps) {
  return (
    <div className="flex gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex-1 px-4 py-2.5 rounded-xl transition-colors ${
            activeTab === tab.id
              ? 'bg-[#0E64D2] text-white'
              : 'bg-gray-100 text-gray-700'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
