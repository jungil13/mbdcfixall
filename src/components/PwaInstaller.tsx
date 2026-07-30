"use client";

import { useEffect, useState } from "react";
import { Download, Share, PlusSquare, X, CheckCircle2, Smartphone, ArrowDown } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if already running in standalone mode (PWA installed)
    const isInStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;

    setIsStandalone(isInStandalone);

    if (isInStandalone) return;

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Service Worker registration
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registered successfully:", reg.scope);
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }

    // Capture Chrome/Android beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Show banner on iOS if not installed
    if (isIosDevice) {
      setShowBanner(true);
    }

    // Global listener for custom install triggers from buttons across the app
    const handleCustomTrigger = () => {
      openInstallFlow();
    };

    window.addEventListener("trigger-pwa-install", handleCustomTrigger);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("trigger-pwa-install", handleCustomTrigger);
    };
  }, []);

  const openInstallFlow = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted PWA installation");
          setDeferredPrompt(null);
          setShowBanner(false);
        }
      });
    } else {
      // Show modal (especially for iOS or fallback)
      setShowModal(true);
    }
  };

  if (isStandalone) return null;

  return (
    <>
      {/* Floating Bottom Action Banner (if not installed) */}
      {showBanner && !showModal && (
        <div className="fixed bottom-[76px] lg:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[9990] bg-[#141414] border-2 border-[#E8A020] rounded-xl p-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-between gap-3 animate-bounce-once">
          <div className="flex items-center gap-3">
            <img
              src="/mightyb_logo.png"
              alt="MBDC FIX ALL Logo"
              className="w-10 h-10 object-contain rounded-lg bg-black p-1 border border-zinc-700"
            />
            <div>
              <h4 className="font-barlow font-bold text-white text-base leading-tight">
                MBDC FIX ALL App
              </h4>
              <p className="font-dm text-zinc-400 text-xs mt-0.5">
                Install on your home screen
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={openInstallFlow}
              className="bg-[#E8A020] hover:bg-[#f0b030] text-black font-barlow font-bold text-xs uppercase px-3 py-2 rounded-md flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download size={14} />
              Install
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="text-zinc-400 hover:text-white p-1 rounded-md"
              aria-label="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      )}

      {/* iOS & Fallback Installation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-[#181818] border border-zinc-800 rounded-2xl w-full max-w-md p-6 text-white relative shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-full bg-zinc-800/50"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-black border border-[#E8A020] p-1.5 flex items-center justify-center">
                <img src="/mightyb_logo.png" alt="MBDC Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-barlow font-extrabold text-xl text-white uppercase tracking-wider">
                  Install MBDC FIX ALL
                </h3>
                <p className="font-dm text-xs text-[#E8A020]">
                  {isIos ? "iPhone & iPad Instructions" : "Mobile App Setup"}
                </p>
              </div>
            </div>

            {isIos ? (
              <div className="space-y-4 my-4 font-dm text-sm text-zinc-300">
                <p className="text-zinc-300 text-xs">
                  Follow these simple steps in Safari to add MBDC FIX ALL directly to your iPhone home screen:
                </p>
                <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E8A020]/20 text-[#E8A020] flex items-center justify-center font-bold text-sm shrink-0">
                    1
                  </div>
                  <div className="text-xs">
                    Tap the <strong className="text-white">Share</strong> button in Safari's menu bar below.
                  </div>
                  <Share size={18} className="text-[#E8A020] ml-auto shrink-0" />
                </div>

                <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E8A020]/20 text-[#E8A020] flex items-center justify-center font-bold text-sm shrink-0">
                    2
                  </div>
                  <div className="text-xs">
                    Scroll down and select <strong className="text-white">"Add to Home Screen"</strong>.
                  </div>
                  <PlusSquare size={18} className="text-[#E8A020] ml-auto shrink-0" />
                </div>

                <div className="bg-zinc-900/80 p-3 rounded-lg border border-zinc-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#E8A020]/20 text-[#E8A020] flex items-center justify-center font-bold text-sm shrink-0">
                    3
                  </div>
                  <div className="text-xs">
                    Tap <strong className="text-white">"Add"</strong> at the top right to complete setup.
                  </div>
                  <CheckCircle2 size={18} className="text-[#E8A020] ml-auto shrink-0" />
                </div>

                <div className="text-center pt-2 flex items-center justify-center gap-1 text-[11px] text-zinc-400">
                  <ArrowDown size={14} className="animate-bounce text-[#E8A020]" />
                  <span>Look for the Share icon at the bottom of your screen</span>
                </div>
              </div>
            ) : (
              <div className="my-4 font-dm text-xs text-zinc-300 space-y-3">
                <p>
                  To install MBDC FIX ALL on your Android or Mobile device:
                </p>
                <div className="bg-zinc-900 p-3 rounded-lg border border-zinc-800 text-xs text-zinc-300">
                  Tap your browser menu (<strong>⋮</strong>) at top-right and select <strong className="text-[#E8A020]">"Install App"</strong> or <strong className="text-[#E8A020]">"Add to Home Screen"</strong>.
                </div>
              </div>
            )}

            <button
              onClick={() => setShowModal(false)}
              className="w-full mt-2 bg-[#E8A020] hover:bg-[#f0b030] text-black font-barlow font-bold text-sm uppercase py-2.5 rounded-lg transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
