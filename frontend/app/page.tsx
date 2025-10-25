'use client';

import { useState, useEffect } from 'react';
import { AdvisoryGroup, NavigationTab } from '@/lib/types';
import StatusBar from '@/components/StatusBar';
import AdvisorySection from '@/components/AdvisorySection';
import NavigationBar from '@/components/NavigationBar';

// Mock data that matches the design
const mockAdvisoryData: AdvisoryGroup[] = [
  {
    date: 'Today',
    advisories: [
      {
        id: '1',
        type: 'thunderstorm',
        title: 'Thunderstorm Advisory',
        affectedAreas: ['Laguna', 'Rizal'],
        severity: 'high',
        date: '2025-01-01',
        time: '8:05 PM',
      },
      {
        id: '2',
        type: 'landslide',
        title: 'Landslide',
        affectedAreas: ['Laguna', 'Rizal'],
        severity: 'medium',
        date: '2025-01-01',
        time: '8:05 PM',
      },
    ],
  },
  {
    date: 'September 3, Wednesday',
    advisories: [
      {
        id: '3',
        type: 'thunderstorm',
        title: 'Thunderstorm Advisory',
        affectedAreas: ['Laguna', 'Rizal'],
        severity: 'high',
        date: '2025-09-03',
        time: '8:05 PM',
      },
      {
        id: '4',
        type: 'landslide',
        title: 'Landslide',
        affectedAreas: ['Laguna', 'Rizal'],
        severity: 'medium',
        date: '2025-09-03',
        time: '8:05 PM',
      },
    ],
  },
  {
    date: 'September 2, Tuesday',
    advisories: [
      {
        id: '5',
        type: 'thunderstorm',
        title: 'Thunderstorm Advisory',
        affectedAreas: ['Laguna', 'Rizal'],
        severity: 'high',
        date: '2025-09-02',
        time: '8:05 PM',
      },
    ],
  },
];

const navigationTabs: NavigationTab[] = [
  { id: 'info', icon: 'i', label: 'Info' },
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'alerts', icon: 'bell', label: 'Alerts' },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: false 
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'info') {
      window.location.href = '/info';
    } else if (tabId === 'alerts') {
      window.location.href = '/alerts';
    }
  };

  return (
    <div className="min-h-screen bg-[#071122] text-white">
      {/* Status Bar */}
      <div className="bg-[#071122] px-4 py-2">
        <div className="flex justify-between items-center">
          <span className="text-white text-sm">{currentTime}</span>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
            <div className="w-4 h-4 bg-white rounded-sm"></div>
            <div className="w-6 h-3 border border-white rounded-sm">
              <div className="w-4 h-2 bg-white rounded-sm m-0.5"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Status */}
      <div className="px-4 py-2">
        <StatusBar 
          lastUpdated="January 1, 2025" 
          time="8:05 PM" 
        />
      </div>

      {/* Main Content */}
      <div className="px-4 py-4 pb-20">
        {mockAdvisoryData.map((group, index) => (
          <AdvisorySection key={index} group={group} />
        ))}
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0">
        <NavigationBar 
          tabs={navigationTabs}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}
