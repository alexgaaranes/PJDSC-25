'use client';

import { useBarangays, useShelters } from '@/hooks/useApi';
import NavigationBar from '@/components/NavigationBar';
import { NavigationTab } from '@/lib/types';

const navigationTabs: NavigationTab[] = [
  { id: 'info', icon: 'i', label: 'Info' },
  { id: 'home', icon: 'home', label: 'Home' },
  { id: 'alerts', icon: 'bell', label: 'Alerts' },
];

export default function InfoPage() {
  const { barangays, loading: barangaysLoading } = useBarangays();
  const { shelters, loading: sheltersLoading } = useShelters();

  const handleTabChange = (tabId: string) => {
    if (tabId === 'home') {
      window.location.href = '/';
    } else if (tabId === 'alerts') {
      window.location.href = '/alerts';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="px-4 py-4 pb-20">
        <h1 className="text-2xl font-bold mb-6">System Information</h1>
        
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">Barangays ({barangays.length})</h2>
            {barangaysLoading ? (
              <p className="text-gray-400">Loading barangays...</p>
            ) : (
              <div className="space-y-2">
                {barangays.map((barangay) => (
                  <div key={barangay.id} className="bg-gray-800 rounded-lg p-3">
                    <h3 className="font-medium">{barangay.name}</h3>
                    <p className="text-sm text-gray-400">
                      {barangay.municipality}, {barangay.province}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Shelters ({shelters.length})</h2>
            {sheltersLoading ? (
              <p className="text-gray-400">Loading shelters...</p>
            ) : (
              <div className="space-y-2">
                {shelters.map((shelter) => (
                  <div key={shelter.id} className="bg-gray-800 rounded-lg p-3">
                    <h3 className="font-medium">{shelter.name}</h3>
                    {shelter.address && (
                      <p className="text-sm text-gray-400">{shelter.address}</p>
                    )}
                    {shelter.capacity && (
                      <p className="text-sm text-gray-400">Capacity: {shelter.capacity}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <NavigationBar 
          tabs={navigationTabs}
          activeTab="info"
          onTabChange={handleTabChange}
        />
      </div>
    </div>
  );
}
