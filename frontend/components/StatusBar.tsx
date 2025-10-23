interface StatusBarProps {
  lastUpdated: string;
  time: string;
}

export default function StatusBar({ lastUpdated, time }: StatusBarProps) {
  return (
    <div className="bg-gray-200 rounded-lg p-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-black text-sm">Last updated</p>
          <p className="text-green-600 text-sm font-medium">{lastUpdated}</p>
        </div>
      </div>
      <p className="text-green-600 text-sm font-medium">{time}</p>
    </div>
  );
}
