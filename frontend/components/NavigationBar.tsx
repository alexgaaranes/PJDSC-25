import { NavigationTab } from '@/lib/types';

interface NavigationBarProps {
  tabs: NavigationTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function NavigationBar({ tabs, activeTab, onTabChange }: NavigationBarProps) {
  const getTabIcon = (tabId: string) => {
    switch (tabId) {
      case 'info':
        return (
          <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-sm">i</span>
          </div>
        );
      case 'home':
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
        );
      case 'alerts':
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-300 h-16 flex items-center justify-around px-4">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="flex flex-col items-center space-y-1"
        >
          {getTabIcon(tab.id)}
          {tab.id === 'home' && activeTab === 'home' && (
            <div className="w-8 h-1 bg-black rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
}
