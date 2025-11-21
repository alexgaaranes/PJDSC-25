import { CloudRain } from 'lucide-react';

interface HazardSummaryProps {
    summary: string;
}

export default function HazardSummaryCard({ summary }: HazardSummaryProps) {
    return (
        <div className="bg-[#131C2D] rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
                <CloudRain className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-white text-sm">Hazard Summary</h3>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
                {summary}
            </p>
        </div>
    );
}
