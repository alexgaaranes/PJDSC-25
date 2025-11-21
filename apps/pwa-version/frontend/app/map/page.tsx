'use client';

import dynamic from 'next/dynamic';
import NavigationBar from "@/components/NavigationBar";
import { TriangleAlert, Search, Layers, Info } from 'lucide-react';
import { useState } from 'react';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
    ssr: false,
    loading: () => <div className="h-full w-full flex items-center justify-center bg-[#050B14] text-gray-500">Loading Map...</div>
});

export default function MapPage() {
    const [showLegend, setShowLegend] = useState(true);

    const handleTabChange = (tabId: string) => {
        const routes: Record<string, string> = {
            alerts: "/",
            map: "/map",
            guide: "/info",
        };
        const target = routes[tabId] ?? "/";
        if (typeof window !== "undefined" && window.location.pathname !== target) {
            window.location.href = target;
        }
    };

    return (
        <div className="h-screen bg-[#050B14] text-white relative flex flex-col overflow-hidden">
            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-[1000] p-6 pointer-events-none">
                <div className="flex justify-between items-start mb-4 pointer-events-auto">
                    <div>
                        <h1 className="text-2xl font-black text-[#FF7A00] tracking-tight shadow-black drop-shadow-md">SAGIP</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] font-bold tracking-widest text-gray-300 uppercase shadow-black drop-shadow-md">SYSTEM ONLINE</span>
                        </div>
                    </div>
                    <button className="relative p-2 rounded-full bg-[#131C2D]/90 backdrop-blur-md border border-white/10 shadow-lg">
                        <TriangleAlert className="w-5 h-5 text-gray-400" />
                        <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#131C2D]"></div>
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative pointer-events-auto">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                        <Search className="w-4 h-4 text-[#FF7A00]" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search location..."
                        className="w-full bg-[#131C2D]/90 backdrop-blur-md border border-white/10 text-white text-sm rounded-xl py-3 pl-10 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF7A00]/50 placeholder-gray-400"
                        defaultValue="Brgy. Batong Malake"
                    />
                </div>

                {/* Legend Toggle */}
                <div className="mt-4 flex justify-end pointer-events-auto">
                    {showLegend ? (
                        <div className="bg-[#131C2D]/95 backdrop-blur-md border border-white/10 rounded-xl p-3 shadow-lg w-full max-w-[200px] animate-in fade-in slide-in-from-top-2">
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="text-xs font-bold text-white">Legend</h3>
                                <button onClick={() => setShowLegend(false)}>
                                    <Info className="w-3 h-3 text-gray-400" />
                                </button>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
                                    <span className="text-[10px] text-gray-300">High Risk</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500 opacity-80"></div>
                                    <span className="text-[10px] text-gray-300">Medium Risk</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
                                    <span className="text-[10px] text-gray-300">Low Risk</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-emerald-500 border border-white"></div>
                                    <span className="text-[10px] text-gray-300">Evacuation Center</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowLegend(true)}
                            className="p-2 rounded-full bg-[#131C2D]/90 backdrop-blur-md border border-white/10 shadow-lg"
                        >
                            <Layers className="w-5 h-5 text-gray-400" />
                        </button>
                    )}
                </div>
            </div>

            {/* Map Container */}
            <div className="flex-1 relative z-0">
                <MapComponent />
            </div>

            {/* Navigation Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-[1000]">
                <NavigationBar
                    activeTab="map"
                    onTabChange={handleTabChange}
                />
            </div>
        </div>
    );
}
