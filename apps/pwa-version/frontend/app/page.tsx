'use client';

import { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import ActiveAdvisoryCard from '@/components/ActiveAdvisoryCard';
import HazardSummaryCard from '@/components/HazardSummaryCard';
import EvacuationCenterCard from '@/components/EvacuationCenterCard';
import QuickActionCard from '@/components/QuickActionCard';
import ChecklistModal from '@/components/ChecklistModal';
import { Building2, Phone, ListTodo, TriangleAlert } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('alerts');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const handleTabChange = (tabId: string) => {
    if (tabId === 'map') {
      window.location.href = '/map';
    } else if (tabId === 'guide') {
      window.location.href = '/info';
    } else {
      setActiveTab(tabId);
    }
  };

  return (
    <div className="min-h-screen bg-[#050B14] text-white pb-32 relative font-sans">
      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />

      {/* Header */}
      <div className="pt-8 pb-4 px-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-[#FF7A00] tracking-tight">SAGIP</h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-bold tracking-widest text-gray-500 uppercase">SYSTEM ONLINE</span>
            </div>
          </div>
          <button className="relative p-2 rounded-full bg-[#131C2D] border border-white/5">
            <TriangleAlert className="w-5 h-5 text-gray-400" />
            <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#131C2D]"></div>
          </button>
        </div>
      </div>

      <div className="px-5 space-y-6">
        {/* Main Alert */}
        <ActiveAdvisoryCard
          title="Typhoon Signal #2"
          issuedAt="Oct 24, 2025 - 08:00 AM"
          level={2}
        />

        {/* Hazard Summary */}
        <HazardSummaryCard
          summary="Heavy rainfall and severe winds expected over the next 24 hours. Low-lying and coastal areas in Brgy. Batong Malake are at high risk of flooding and storm surges."
        />

        {/* Evacuation Status */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Building2 className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-white text-sm">Evacuation Status</h3>
          </div>

          <div className="space-y-3">
            <EvacuationCenterCard
              name="Batong Malake Elem. School"
              status="OPEN"
              currentOccupancy={150}
              maxCapacity={200}
            />
            <EvacuationCenterCard
              name="UP Los Baños Gymnasium"
              status="OPEN"
              currentOccupancy={45}
              maxCapacity={500}
            />
            <EvacuationCenterCard
              name="City Hall Evac Center"
              status="STANDBY"
              currentOccupancy={0}
              maxCapacity={150}
            />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <QuickActionCard
            icon={ListTodo}
            label="Checklist"
            onClick={() => setIsChecklistOpen(true)}
          />
          <QuickActionCard
            icon={Phone}
            label="Hotlines"
            onClick={() => window.location.href = '/info'}
          />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50">
        <NavigationBar
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}
