'use client';

import React, { useState } from "react";
import NavigationBar from "@/components/NavigationBar";
import { NavigationTab } from "@/lib/types";
import { AlertTriangle, CloudRain, Shield } from "lucide-react";

const navigationTabs: NavigationTab[] = [
  { id: "info", icon: "i", label: "Info" },
  { id: "home", icon: "home", label: "Home" },
  { id: "alerts", icon: "bell", label: "Alerts" },
];

export default function AlertsPage() {
  const [alerts] = useState([
    {
      id: "1",
      type: "emergency",
      title: "Emergency Evacuation Alert",
      message: "Immediate evacuation required for areas in Laguna and Rizal.",
      timestamp: "2025-01-01 20:30",
      severity: "critical",
    },
    {
      id: "2",
      type: "weather",
      title: "Severe Weather Warning",
      message: "Heavy rainfall expected in the next 2 hours.",
      timestamp: "2025-01-01 19:45",
      severity: "high",
    },
    {
      id: "3",
      type: "safety",
      title: "Safety Reminder",
      message: "Please stay indoors and avoid unnecessary travel.",
      timestamp: "2025-01-01 18:20",
      severity: "medium",
    },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-[#EF4444]";
      case "high":
        return "text-[#F97316]";
      case "medium":
        return "text-[#EAB308]";
      default:
        return "text-gray-400";
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "emergency":
        return AlertTriangle;
      case "weather":
        return CloudRain;
      default:
        return Shield;
    }
  };

  const handleTabChange = (tabId: string) => {
    const routes: Record<string, string> = {
      home: "/",
      info: "/info",
      alerts: "/alerts",
    };
    const target = routes[tabId] ?? "/";
    if (typeof window !== "undefined" && window.location.pathname !== target) {
      window.location.href = target;
    }
  };

  return (
    <main className="min-h-screen px-5 pb-20 pt-6 bg-[#071122] text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-white">Emergency Alerts</h1>
          <p className="text-sm text-gray-400">
            Stay updated on important warnings and safety notifications.
          </p>
        </header>

        {/* Alert Cards */}
        <section className="space-y-4">
          {alerts.map((alert) => {
            const Icon = getIcon(alert.type);
            return (
              <div
                key={alert.id}
                className="p-4 bg-[#0E1A33] border border-[#1B2A4A] rounded-lg shadow-md hover:bg-[#13254A] transition-all"
              >
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 rounded-md bg-[#13254A] mt-0.5">
                    <Icon
                      className={`${getSeverityColor(alert.severity)}`}
                      size={18}
                      strokeWidth={2.2}
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm text-white">
                      {alert.title}
                    </h3>
                    <p className="text-gray-300 text-sm leading-snug mt-1">
                      {alert.message}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0">
        <NavigationBar
          tabs={navigationTabs}
          activeTab="alerts"
          onTabChange={handleTabChange}
        />
      </div>
    </main>
  );
}
