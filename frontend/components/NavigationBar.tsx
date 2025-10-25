import { NavigationTab } from '@/lib/types';

interface NavigationBarProps {
  tabs: NavigationTab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function NavigationBar({ tabs, activeTab, onTabChange }: NavigationBarProps) {
  const getTabIcon = (tabId: string, isActive: boolean) => {
    const iconColor = isActive ? 'text-blue-400' : 'text-gray-400';
    const infoBg = isActive ? 'bg-blue-400' : 'bg-gray-500';

    switch (tabId) {
      case 'info':
        return (
          <div
            className={`w-6 h-6 ${infoBg} rounded-full flex items-center justify-center transition-all duration-200`}
          >
            <span className="text-white font-semibold text-sm">i</span>
          </div>
        );
      case 'home':
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              className={`w-6 h-6 ${iconColor} transition-colors duration-200`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
        );
      case 'alerts':
        return (
          <div className="w-6 h-6 flex items-center justify-center">
            <svg
              className={`w-6 h-6 ${iconColor} transition-colors duration-200`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-800 h-16 flex items-center justify-around px-4 shadow-inner">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex flex-col items-center space-y-1 focus:outline-none ${
              isActive ? 'scale-105' : 'opacity-80'
            } transition-transform duration-200`}
          >
            {getTabIcon(tab.id, isActive)}
            {isActive && (
              <div className="w-8 h-1 bg-blue-400 rounded-full transition-all duration-200"></div>
            )}
          </button>
        );
      })}
    </div>
  );
}
