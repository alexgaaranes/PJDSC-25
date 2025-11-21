"use client";

import React from "react";
import NavigationBar from "@/components/NavigationBar";
import ContactCard from "@/components/ContactCard";
import { TriangleAlert } from "lucide-react";

export default function InfoPage() {
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

  const contacts = [
    { name: "Brgy. Batong Malake", number: "0945-544-2954" },
    { name: "LDRRMO Rescue", number: "0912-345-6789" },
    { name: "Red Cross Laguna", number: "049-501-1111" },
  ];

  return (
    <main className="min-h-screen bg-[#050B14] text-white pb-32 relative font-sans">
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

      <div className="px-6 pt-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Emergency Contacts</h2>
          <p className="text-sm text-gray-400">Available offline.</p>
        </div>

        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <ContactCard
              key={index}
              name={contact.name}
              number={contact.number}
            />
          ))}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        <NavigationBar
          activeTab="guide"
          onTabChange={handleTabChange}
        />
      </div>
    </main>
  );
}
