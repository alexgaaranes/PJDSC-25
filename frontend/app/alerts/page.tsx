'use client';

import { useState } from 'react';
import NavigationBar from '@/components/NavigationBar';
import { NavigationTab } from '@/lib/types';

const navigationTabs: NavigationTab[] = [
  { id: 'info', icon: 'i', label: 'Info' },
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'alerts', icon: 'bell', label: 'Alerts' },
];

export default function AlertsPage() {
  const [alerts] = useState([
    {
      id: '1',
      type: 'emergency',
      title: 'Emergency Evacuation Alert',
      message: 'Immediate evacuation required for areas in Laguna and Rizal',
      timestamp: '2025-01-01 20:30',
      severity: 'critical'
    },
    {
      id: '2',
      type: 'weather',
      title: 'Severe Weather Warning',
      message: 'Heavy rainfall expected in the next 2 hours',
      timestamp: '2025-01-01 19:45',
      severity: 'high'
    },
    {
      id: '3',
      type: 'safety',
      title: 'Safety Reminder',
      message: 'Please stay indoors and avoid unnecessary travel',
      timestamp: '2025-01-01 18:20',
      severity: 'medium'
    }
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-600';
      case 'high':
        return 'bg-orange-500';
      case 'medium':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const handleTabChange = (tabId: string) => {
    if (tabId === 'home') {
      window.location.href = '/';
    } else if (tabId === 'info') {
      window.location.href = '/info';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="px-4 py-4 pb-20">
        <h1 className="text-2xl font-bold mb-6">Emergency Alerts</h1>
        
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div key={alert.id} className="bg-gray-800 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className={`w-3 h-3 rounded-full mt-1 ${getSeverityColor(alert.severity)}`}></div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{alert.title}</h3>
                  <p className="text-gray-300 mt-1">{alert.message}</p>
                  <p className="text-sm text-gray-400 mt-2">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <NavigationBar 
          tabs={navigationTabs}
          activeTab="alerts"
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}
