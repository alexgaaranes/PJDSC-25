"use client";

  import { useEffect, useState } from "react";

  interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
  }

  export default function MobilePWA() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== "undefined" ? navigator.onLine : true);
    const [isInstalled, setIsInstalled] = useState<boolean>(false);
    const [fallbackMessage, setFallbackMessage] = useState<string | null>(null);

    useEffect(() => {
      const handler = (e: BeforeInstallPromptEvent) => {
        e.preventDefault();
        setDeferredPrompt(e);
      };
      window.addEventListener("beforeinstallprompt", handler as EventListener);
      return () => window.removeEventListener("beforeinstallprompt", handler as EventListener);
    }, []);

    useEffect(() => {
      const updateOnline = () => setIsOnline(typeof navigator !== "undefined" ? navigator.onLine : true);
      const handleAppInstalled = () => setIsInstalled(true);

      window.addEventListener("online", updateOnline);
      window.addEventListener("offline", updateOnline);
      window.addEventListener("appinstalled", handleAppInstalled);

      // initial checks
      updateOnline();
      if (typeof window !== "undefined") {
        if ((window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || (navigator as any).standalone) {
          setIsInstalled(true);
        }
      }

      return () => {
        window.removeEventListener("online", updateOnline);
        window.removeEventListener("offline", updateOnline);
        window.removeEventListener("appinstalled", handleAppInstalled);
      };
    }, []);

    const onInstallClick = async () => {
      if (!deferredPrompt) {
        // show inline fallback message instead of alert
        setFallbackMessage(
          "Install prompt not available. Try opening in Chrome/Edge on Android or check if app is already installed."
        );
        // optionally clear after a few seconds
        setTimeout(() => setFallbackMessage(null), 6000);
        return;
      }
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      // handle choice.outcome if needed
    };

    return (
      <div className="fixed bottom-4 left-4 right-4 z-50">
        {/* show fallback message (replaces alert) */}
        {fallbackMessage && (
          <div className="bg-gray-800 text-white px-4 py-2 rounded-lg mb-2 text-center">
            {fallbackMessage}
          </div>
        )}

        {/* Offline indicator */}
        {!isOnline && (
          <div className="bg-orange-500 text-white px-4 py-2 rounded-lg mb-2 text-center">
            📡 You're offline - Some features may be limited
          </div>
        )}

        {/* Install prompt */}
        {deferredPrompt && !isInstalled && (
          <div className="bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Install SAGIP</h3>
                <p className="text-sm opacity-90">Get quick access to disaster management tools</p>
              </div>
              <button
                onClick={onInstallClick}
                className="bg-white text-blue-600 px-4 py-2 rounded font-medium hover:bg-gray-100 transition-colors"
              >
                Install
              </button>
            </div>
          </div>
        )}

        {/* Installed confirmation */}
        {isInstalled && (
          <div className="bg-green-600 text-white px-4 py-2 rounded-lg text-center">
            ✅ SAGIP installed successfully!
          </div>
        )}
      </div>
    );
  }
