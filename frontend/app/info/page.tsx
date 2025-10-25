"use client";

import React from "react";
import { Lightbulb, Shield, AlertTriangle } from "lucide-react";
import NavigationBar from "@/components/NavigationBar";
import { NavigationTab } from "@/lib/types";

const navigationTabs: NavigationTab[] = [
  { id: "info", icon: "i", label: "Info" },
  { id: "home", icon: "home", label: "Home" },
  { id: "alerts", icon: "bell", label: "Alerts" },
];

export default function InfoPage() {
  const activeDevices = "1,248";

  const hotlines = [
    { title: "Emergency (Police/Fire/Ambulance)", number: "911" },
    { title: "Philippine Red Cross", number: "+63 2 8791 2300" },
    { title: "NDRRMC Hotline", number: "+63 2 8724 6030" },
    { title: "Local Emergency Hotline (Municipal)", number: "0966-000-0000" },
  ];

  const tips = [
    "Move to a safe location before calling for help.",
    "Follow evacuation orders and go to safe centers.",
    "Keep essentials ready — water, phone, flashlight, first aid.",
  ];

  const icons = [AlertTriangle, Shield, Lightbulb];

  function handleTabChange(tabId: string): void {
    const routes: Record<string, string> = {
      home: "/",
      alerts: "/alerts",
      info: "/info",
    };

    const target = routes[tabId] ?? "/";
    if (typeof window !== "undefined" && window.location.pathname !== target) {
      window.location.href = target;
    }
  }

  return (
    <main className="min-h-screen px-5 pb-20 pt-6 bg-[#071122] text-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-2xl font-semibold text-white">SAGIP Info</h1>
          <p className="text-sm text-gray-400">
            Quick access to device stats and emergency hotlines.
          </p>
        </header>

        {/* Active Devices */}
        <section className="bg-[#0E1A33] border border-[#1B2A4A] rounded-xl p-4 mb-6 shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Active Devices (24h)</span>
            <span className="text-xl font-semibold text-[#22C55E]">
              {activeDevices}
            </span>
          </div>
        </section>

        {/* Hotlines */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-3 text-white">Hotlines</h2>
          <div className="space-y-3">
            {hotlines.map((h) => (
              <div
                key={h.number}
                className="flex items-center justify-between p-4 bg-[#0E1A33] border border-[#1B2A4A] rounded-lg shadow-sm hover:bg-[#13254A] transition-all"
              >
                <span className="text-sm text-gray-200">{h.title}</span>
                <a
                  href={`tel:${h.number.replace(/\s+/g, "")}`}
                  className="text-[#FF7A00] text-sm font-medium hover:underline"
                >
                  {h.number}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Safety Tips */}
        <section className="mb-10">
          <h3 className="text-lg font-semibold mb-3 text-white">
            Quick Safety Tips
          </h3>
          <div className="space-y-5">
            {tips.map((t, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={i} className="relative flex items-start space-x-3">
                  <div className="p-1.5 rounded-md bg-[#13254A]">
                    <Icon
                      className="text-[#FF7A00] mt-0.5"
                      size={18}
                      strokeWidth={2.2}
                    />
                  </div>
                  <p className="text-sm text-gray-300 leading-snug">
                    {t}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0">
        <NavigationBar
          tabs={navigationTabs}
          activeTab="info"
          onTabChange={handleTabChange}
        />
      </div>
    </main>
  );
}
