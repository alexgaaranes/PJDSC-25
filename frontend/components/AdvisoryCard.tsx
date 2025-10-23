import { Advisory } from '@/lib/types';

interface AdvisoryCardProps {
  advisory: Advisory;
}

const getAdvisoryIcon = (type: Advisory['type']) => {
  switch (type) {
    case 'thunderstorm':
      return (
        <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
          </svg>
        </div>
      );
    case 'landslide':
      return (
        <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        </div>
      );
    case 'flood':
      return (
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
          </svg>
        </div>
      );
    default:
      return (
        <div className="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" />
          </svg>
        </div>
      );
  }
};

const getAdvisoryColor = (type: Advisory['type']) => {
  switch (type) {
    case 'thunderstorm':
      return 'text-orange-500';
    case 'landslide':
      return 'text-gray-500';
    case 'flood':
      return 'text-blue-500';
    default:
      return 'text-gray-500';
  }
};

export default function AdvisoryCard({ advisory }: AdvisoryCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex items-center space-x-3">
      {getAdvisoryIcon(advisory.type)}
      <div className="flex-1">
        <h3 className={`font-medium ${getAdvisoryColor(advisory.type)}`}>
          {advisory.title}
        </h3>
        <p className="text-white text-sm">
          Affected areas: {advisory.affectedAreas.join(', ')}
        </p>
      </div>
    </div>
  );
}
