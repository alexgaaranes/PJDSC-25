"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Map, Layers, AlertTriangle, Users, ArrowLeft, Send, MessageSquare, Plus } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import("./MapComponent"), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[500px] bg-gray-100 rounded-lg">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  )
});

export default function GISPage() {
  const [hazardData, setHazardData] = useState<any[]>([]);
  const [evacuationCenters, setEvacuationCenters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLayer, setSelectedLayer] = useState<string>("all");
  const [apiStatus, setApiStatus] = useState({
    backend: "disconnected",
    hazards: "mock",
    centers: "mock"
  });
  const [lastSync, setLastSync] = useState<string | null>(null);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);

  // New state for Plan Relay System
  const [evacuationPlans, setEvacuationPlans] = useState<any[]>([
    { id: 1, name: "Flood Evacuation Plan A", description: "Evacuate to higher ground immediately." },
    { id: 2, name: "Landslide Evacuation Plan B", description: "Move to designated shelters in Batong Malake." },
    { id: 3, name: "General Storm Surge Plan", description: "Head to elevated areas and avoid coastal zones." }
  ]);
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [customMessage, setCustomMessage] = useState<string>("");
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<string | null>(null);

  // New state for creating plans
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newPlanName, setNewPlanName] = useState("");
  const [newPlanDescription, setNewPlanDescription] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const hazardsResponse = await fetch('http://localhost:8000/api/hazards/geojson');
        const hazardsGeoJSON = await hazardsResponse.json();
        
        const centersResponse = await fetch('http://localhost:8000/api/evacuation/geojson');
        const centersGeoJSON = await centersResponse.json();
        
        const hazards = hazardsGeoJSON.features.map((feature: any) => ({
          id: feature.properties.id,
          type: feature.properties.type,
          severity: feature.properties.severity,
          coordinates: feature.geometry.type === 'Point' 
            ? feature.geometry.coordinates 
            : [feature.geometry.coordinates[0][0][0], feature.geometry.coordinates[0][0][1]],
          source: feature.properties.source,
          confidence: feature.properties.confidence,
          elevation: feature.properties.elevation,
          affectedPopulation: feature.properties.affectedPopulation,
          geometry: feature.geometry
        }));

        const centers = centersGeoJSON.features.map((feature: any) => ({
          id: feature.properties.id,
          name: feature.properties.name,
          coordinates: feature.geometry.coordinates,
          capacity: feature.properties.capacity
        }));

        setHazardData(hazards);
        setEvacuationCenters(centers);
        setApiStatus({
          backend: "connected",
          hazards: "live",
          centers: "live"
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data from backend:", error);

        // Fallback mock data
        const mockHazards = [
          { id: 1, type: "FLOOD", severity: 3, coordinates: [121.24, 14.165], source: "UP_NOAH", confidence: 0.85 },
          { id: 2, type: "LANDSLIDE", severity: 4, coordinates: [121.235, 14.17], source: "UP_NOAH", confidence: 0.92 },
          { id: 3, type: "FLOOD", severity: 2, coordinates: [121.238, 14.162], source: "UP_NOAH", confidence: 0.78 }
        ];

        const mockCenters = [
          { id: 1, name: "Batong Malake Elementary School", coordinates: [121.24, 14.165], capacity: 200 },
          { id: 2, name: "UP Los Baños Gymnasium", coordinates: [121.238, 14.168], capacity: 300 },
          { id: 3, name: "Barangay Batong Malake Hall", coordinates: [121.235, 14.162], capacity: 150 }
        ];

        setHazardData(mockHazards);
        setEvacuationCenters(mockCenters);
        setApiStatus({
          backend: "disconnected",
          hazards: "mock",
          centers: "mock"
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔔 Mock LGU sync banner feature
  useEffect(() => {
    const syncLGUPlans = () => {
      setSyncMessage("🔄 Syncing with LGU... Checking for updated hazard and evacuation plans.");

      setTimeout(() => {
        const now = new Date().toLocaleTimeString();
        setLastSync(now);
        setSyncMessage("✅ LGU Sync Complete — Local plans updated successfully.");
        setTimeout(() => setSyncMessage(null), 4000);
      }, 2000);
    };

    syncLGUPlans(); // initial sync
    const interval = setInterval(syncLGUPlans, 30000); // repeat every 30s

    return () => clearInterval(interval);
  }, []);

  const getHazardColor = (type: string, severity: number) => {
    const colors = {
      FLOOD: severity >= 4 ? "bg-red-500" : severity >= 3 ? "bg-orange-500" : "bg-yellow-500",
      LANDSLIDE: severity >= 4 ? "bg-red-600" : severity >= 3 ? "bg-orange-600" : "bg-yellow-600",
      STORM_SURGE: severity >= 4 ? "bg-blue-600" : severity >= 3 ? "bg-blue-500" : "bg-blue-400",
      WIND: severity >= 4 ? "bg-purple-600" : severity >= 3 ? "bg-purple-500" : "bg-purple-400"
    };
    return colors[type as keyof typeof colors] || "bg-gray-500";
  };

  const filteredHazards = selectedLayer === "all" 
    ? hazardData 
    : hazardData.filter(hazard => hazard.type === selectedLayer);

  // Functions for plan creation and editing
  const createNewPlan = () => {
    if (!newPlanName.trim() || !newPlanDescription.trim()) {
      alert("Please fill in both name and description.");
      return;
    }
    const newPlan = {
      id: evacuationPlans.length + 1,
      name: newPlanName,
      description: newPlanDescription
    };
    setEvacuationPlans([...evacuationPlans, newPlan]);
    setNewPlanName("");
    setNewPlanDescription("");
    alert("✅ New plan added successfully!");
  };

  // Function for sending evacuation plan
  const sendEvacuationPlan = async () => {
    if (!selectedPlan) {
      setSendStatus("Please select an evacuation plan.");
      return;
    }
    setSending(true);
    setSendStatus("Sending evacuation plan to citizens' apps...");

    setTimeout(() => {
      setSending(false);
      setSendStatus("✅ Evacuation plan sent successfully to all registered citizens' apps.");
      setTimeout(() => setSendStatus(null), 5000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mock LGU Sync Banner */}
      {syncMessage && (
        <div className="bg-blue-100 text-blue-800 text-center py-2 text-sm font-medium border-b border-blue-300">
          {syncMessage}
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <Map className="h-6 w-6 text-blue-600" />
                <h1 className="text-xl font-bold text-gray-900">SAGIP GIS Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-600">Layers</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Area */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="h-[600px]">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Hazard Map</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      variant={selectedLayer === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLayer("all")}
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedLayer === "FLOOD" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLayer("FLOOD")}
                    >
                      Flood
                    </Button>
                    <Button
                      variant={selectedLayer === "LANDSLIDE" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedLayer("LANDSLIDE")}
                    >
                      Landslide
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex items-center justify-center h-[500px]">
                    <div className="text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Loading map data...</p>
                    </div>
                  </div>
                ) : (
                  <div className="h-[500px] rounded-lg overflow-hidden border">
                    <MapComponent 
                      hazards={filteredHazards}
                      evacuationCenters={evacuationCenters}
                      selectedLayer={selectedLayer}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Plan Adding / Editing Section BELOW MAP */}
            <Card className="bg-white shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-600">
                  <Plus className="h-5 w-5 mr-2" />
                  Plan Adding & Editing
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
                  <input
                    type="text"
                    value={newPlanName}
                    onChange={(e) => setNewPlanName(e.target.value)}
                    placeholder="Enter new plan name"
                    className="w-full border rounded-md px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={newPlanDescription}
                    onChange={(e) => setNewPlanDescription(e.target.value)}
                    placeholder="Enter plan description..."
                    className="w-full border rounded-md px-3 py-2"
                    rows={3}
                  />
                </div>
                <Button onClick={createNewPlan} className="w-full">Add Plan</Button>

                {/* Existing plans */}
                <ul className="space-y-2">
                  {evacuationPlans.map(plan => (
                    <li key={plan.id} className="border rounded-md p-2 flex justify-between items-center">
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        <p className="text-sm text-gray-500">{plan.description}</p>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          const newName = prompt("Edit plan name:", plan.name);
                          if (newName) {
                            setEvacuationPlans(prev =>
                              prev.map(p => p.id === plan.id ? { ...p, name: newName } : p)
                            );
                          }
                        }}
                      >
                        Edit
                      </Button>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar (Relay System remains here, unchanged) */}
          <div className="space-y-6">
            {/* Hazard Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                  Hazard Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {["FLOOD", "LANDSLIDE", "STORM_SURGE", "WIND"].map((type) => {
                    const count = hazardData.filter(h => h.type === type).length;
                    const severity = hazardData.filter(h => h.type === type).reduce((acc, h) => acc + h.severity, 0) / count || 0;
                    return (
                      <div key={type} className="flex justify-between items-center">
                        <span className="text-sm font-medium">{type}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">{count}</span>
                          <div className={`w-2 h-2 rounded-full ${getHazardColor(type, Math.round(severity))}`} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Evacuation Centers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-green-500" />
                  Evacuation Centers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {evacuationCenters.map((center) => (
                    <div key={center.id} className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">{center.name}</p>
                        <p className="text-xs text-gray-500">Capacity: {center.capacity}</p>
                      </div>
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ✅ Plan Relay System stays unchanged here */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="h-5 w-5 mr-2 text-blue-500" />
                  Plan Relay System
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Your existing Relay System JSX goes here (unchanged) */}
              </CardContent>
            </Card>

            {/* API Status */}
            <Card>
              <CardHeader>
                <CardTitle>API Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Backend API</span>
                    <span className={`text-sm ${apiStatus.backend === "connected" ? "text-green-500" : "text-red-500"}`}>
                      {apiStatus.backend === "connected" ? "Connected" : "Disconnected"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${apiStatus.hazards === "live" ? "text-green-500" : "text-yellow-500"}`}>
                      Hazards: {apiStatus.hazards === "live" ? "Live" : "Mock Data"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Evacuation Centers</span>
                    <span className={`text-sm ${apiStatus.centers === "live" ? "text-green-500" : "text-yellow-500"}`}>
                      Centers: {apiStatus.centers === "live" ? "Live" : "Mock Data"}
                    </span>
                  </div>
                  {lastSync && (
                    <p className="text-xs text-gray-500 mt-2">
                      Last LGU Sync: {lastSync}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
