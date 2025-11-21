import { Users } from 'lucide-react';

interface EvacuationCenterProps {
    name: string;
    status: 'OPEN' | 'STANDBY' | 'FULL' | 'CLOSED';
    currentOccupancy: number;
    maxCapacity: number;
}

export default function EvacuationCenterCard({ name, status, currentOccupancy, maxCapacity }: EvacuationCenterProps) {
    const percentage = Math.min(Math.round((currentOccupancy / maxCapacity) * 100), 100);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'OPEN': return 'bg-emerald-500 text-emerald-950';
            case 'STANDBY': return 'bg-gray-500 text-gray-900';
            case 'FULL': return 'bg-red-500 text-red-950';
            default: return 'bg-gray-500 text-gray-900';
        }
    };

    const getProgressColor = (percentage: number) => {
        if (percentage >= 90) return 'bg-red-500';
        if (percentage >= 70) return 'bg-orange-500';
        return 'bg-emerald-500';
    };

    return (
        <div className="bg-[#131C2D] rounded-xl p-4 border border-white/5">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-white text-sm mb-2">{name}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusColor(status)}`}>
                        {status}
                    </span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                    <Users className="w-4 h-4" />
                    <span className="text-xs font-medium text-white">
                        {currentOccupancy} <span className="text-gray-500">/ {maxCapacity}</span>
                    </span>
                </div>
            </div>

            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                <div
                    className={`absolute top-0 left-0 h-full ${getProgressColor(percentage)} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            <div className="flex justify-between mt-1.5 text-[10px] text-gray-500 font-medium">
                <span>0%</span>
                <span>{percentage}% Full</span>
                <span>100%</span>
            </div>
        </div>
    );
}
