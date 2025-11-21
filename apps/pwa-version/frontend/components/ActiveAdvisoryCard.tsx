import { TriangleAlert } from 'lucide-react';

interface ActiveAdvisoryProps {
    title: string;
    issuedAt: string;
    level: number;
}

export default function ActiveAdvisoryCard({ title, issuedAt }: ActiveAdvisoryProps) {
    return (
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-[#FF5F1F] to-[#D9381E] p-6 text-white shadow-lg shadow-orange-900/20">
            {/* Background Icon */}
            <TriangleAlert className="absolute -right-4 -top-4 w-40 h-40 text-white/10 rotate-12" />

            <div className="relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold tracking-wider mb-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    ACTIVE ADVISORY
                </div>

                <h2 className="text-3xl font-black leading-tight mb-2 tracking-tight">
                    {title}
                </h2>

                <p className="text-white/90 text-xs font-medium font-mono opacity-80">
                    Issued: {issuedAt}
                </p>
            </div>
        </div>
    );
}
