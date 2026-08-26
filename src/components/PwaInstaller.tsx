"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Download,
  Share2,
  PlusSquare,
  X,
  CheckCircle2,
  ArrowDown,
  Shield,
  Wifi,
  Bell,
  Zap,
  Lock,
  Eye,
  ChevronRight,
  Smartphone,
} from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type ModalTab = "install" | "security";

const DISMISSED_KEY = "pwa-banner-dismissed-v2";
const INSTALL_DELAY_MS = 3500;

export default function PwaInstaller() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isIos, setIsIos] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [activeTab, setActiveTab] = useState<ModalTab>("install");
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const isInStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone ===
        true;

    setIsStandalone(isInStandalone);
    if (isInStandalone) return;

    const dismissed = sessionStorage.getItem(DISMISSED_KEY);
    if (dismissed) return;

    const ua = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(ua);
    const isSafari = /safari/.test(ua) && !/chrome|fxios|crios/.test(ua);
    setIsIos(isIosDevice);

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {});
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setTimeout(() => setShowBanner(true), INSTALL_DELAY_MS);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // iOS Safari — show banner after a short delay
    if (isIosDevice && isSafari) {
      setTimeout(() => setShowBanner(true), INSTALL_DELAY_MS);
    }

    const handleCustomTrigger = () => openInstallFlow();
    window.addEventListener("trigger-pwa-install", handleCustomTrigger);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("trigger-pwa-install", handleCustomTrigger);
    };
  }, []);

  const openInstallFlow = useCallback(() => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((result) => {
        if (result.outcome === "accepted") {
          setInstalled(true);
          setDeferredPrompt(null);
          setShowBanner(false);
          setTimeout(() => setInstalled(false), 3000);
        }
      });
    } else {
      setShowModal(true);
    }
  }, [deferredPrompt]);

  const dismissBanner = () => {
    setShowBanner(false);
    sessionStorage.setItem(DISMISSED_KEY, "1");
  };

  if (isStandalone) return null;

  const securityItems = [
    {
      icon: <Lock size={16} />,
      color: "text-green-400",
      bg: "bg-green-950/40 border-green-800/40",
      title: "HTTPS Encrypted Connection",
      desc: "All data is encrypted with TLS/SSL — the same security standard used by banks. Your information is never transmitted in plain text.",
    },
    {
      icon: <Eye size={16} />,
      color: "text-blue-400",
      bg: "bg-blue-950/40 border-blue-800/40",
      title: "No App Store Required",
      desc: "PWAs install directly from your browser with zero downloads. No Apple ID, no account, no third-party software — just a shortcut on your home screen.",
    },
    {
      icon: <Shield size={16} />,
      color: "text-purple-400",
      bg: "bg-purple-950/40 border-purple-800/40",
      title: "No Hidden Permissions",
      desc: "Unlike native apps, this PWA cannot silently access your contacts, camera, microphone, or photos. Every permission requires your explicit approval.",
    },
    {
      icon: <Wifi size={16} />,
      color: "text-amber-400",
      bg: "bg-amber-950/40 border-amber-800/40",
      title: "Offline Caching Only",
      desc: "Our service worker only caches public content (pages, icons, fonts) for offline use. No personal data is ever stored locally on your device.",
    },
    {
      icon: <Zap size={16} />,
      color: "text-[#E8A020]",
      bg: "bg-[#E8A020]/10 border-[#E8A020]/25",
      title: "Instant Removal Anytime",
      desc: "Remove it just like any native app — press and hold the icon and select Remove. No residual files, accounts, or system changes are left behind.",
    },
    {
      icon: <Bell size={16} />,
      color: "text-rose-400",
      bg: "bg-rose-950/40 border-rose-800/40",
      title: "Push Notifications Are Opt-in",
      desc: "We only send push notifications if you explicitly grant permission. You can revoke access anytime in iOS Settings → Safari or the app entry.",
    },
  ];

  const iosSteps = [
    {
      num: 1,
      icon: <Share2 size={18} className="text-[#E8A020]" />,
      title: 'Tap the "Share" button',
      desc: "Find the Share icon (square with an arrow pointing up) in Safari's toolbar at the bottom of the screen on iPhone.",
      tip: "Bottom toolbar in Safari",
    },
    {
      num: 2,
      icon: <PlusSquare size={18} className="text-[#E8A020]" />,
      title: '"Add to Home Screen"',
      desc: 'Scroll down the Share sheet and tap "Add to Home Screen". You may need to scroll through the list of options.',
      tip: "Scroll down in the share sheet list",
    },
    {
      num: 3,
      icon: <CheckCircle2 size={18} className="text-[#E8A020]" />,
      title: 'Tap "Add" to confirm',
      desc: 'Tap "Add" in the top-right corner. The MBDC FIX ALL icon will appear on your Home Screen right away.',
      tip: "Done! Launch it just like a native app",
    },
  ];

  const androidSteps = [
    {
      num: 1,
      title: "Tap browser menu (⋮)",
      desc: "Tap the three-dot menu at the top right of your Chrome browser.",
    },
    {
      num: 2,
      title: '"Add to Home Screen"',
      desc: 'Select "Install App" or "Add to Home Screen" from the dropdown menu.',
    },
    {
      num: 3,
      title: "Confirm installation",
      desc: 'Tap "Install" or "Add" in the confirmation dialog. The app icon will appear on your home screen.',
    },
  ];

  return (
    <>
      {/* ── Success Toast ── */}
      {installed && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] bg-green-600 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-2 text-sm font-bold">
          <CheckCircle2 size={16} />
          App installed successfully!
        </div>
      )}

      {/* ── Floating Banner ── */}
      {showBanner && !showModal && (
        <div className="fixed bottom-[76px] lg:bottom-6 left-3 right-3 sm:left-auto sm:right-5 sm:max-w-[340px] z-[9990]">
          <div className="relative bg-[#111111] border border-[#E8A020]/60 rounded-2xl p-4 shadow-[0_20px_60px_rgba(0,0,0,0.85)] overflow-hidden">
            {/* Glow line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8A020] to-transparent" />

            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-xl bg-black border border-[#E8A020]/40 flex items-center justify-center p-1.5">
                  <img
                    src="/mightyb_logo.png"
                    alt="MBDC"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-green-500 border-2 border-[#111111]" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-barlow font-bold text-white text-sm leading-tight">
                  MBDC FIX ALL
                </p>
                <p className="font-dm text-zinc-400 text-xs mt-0.5 truncate">
                  {isIos
                    ? "Tap to add to Home Screen →"
                    : "Install the app — faster & offline"}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  id="pwa-banner-install-btn"
                  onClick={openInstallFlow}
                  className="bg-[#E8A020] hover:bg-[#f5b535] active:scale-95 text-black font-barlow font-bold text-xs uppercase px-3 py-2 rounded-lg flex items-center gap-1 transition-all"
                >
                  {isIos ? <Share2 size={13} /> : <Download size={13} />}
                  {isIos ? "Add" : "Install"}
                </button>
                <button
                  onClick={dismissBanner}
                  className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
                  aria-label="Dismiss"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Feature pills */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-zinc-800/60">
              {[
                { icon: <Wifi size={10} />, label: "Works offline" },
                { icon: <Zap size={10} />, label: "Faster" },
                { icon: <Shield size={10} />, label: "Secure" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-1 text-[10px] text-zinc-500 bg-zinc-900 rounded-full px-2 py-0.5"
                >
                  <span className="text-[#E8A020]">{f.icon}</span>
                  {f.label}
                </div>
              ))}
              <button
                onClick={() => {
                  setShowModal(true);
                  setActiveTab("security");
                }}
                className="ml-auto text-[10px] text-[#E8A020] hover:underline flex items-center gap-0.5"
              >
                Why safe? <ChevronRight size={10} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Full Modal ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-end sm:items-center justify-center p-3 sm:p-4"
          onClick={(e) =>
            e.target === e.currentTarget && setShowModal(false)
          }
        >
          <div
            className="bg-[#131313] border border-zinc-800 rounded-2xl w-full max-w-md relative shadow-2xl overflow-hidden"
            style={{ maxHeight: "90dvh", overflowY: "auto" }}
          >
            {/* Top glow */}
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#E8A020] to-transparent" />

            {/* Header */}
            <div className="flex items-center gap-3 px-5 pt-5 pb-4 border-b border-zinc-800/60 sticky top-0 bg-[#131313] z-10">
              <div className="w-11 h-11 rounded-xl bg-black border border-[#E8A020]/50 p-1.5 flex items-center justify-center shrink-0">
                <img
                  src="/mightyb_logo.png"
                  alt="MBDC Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h3 className="font-barlow font-extrabold text-lg text-white uppercase tracking-wide leading-tight">
                  MBDC FIX ALL
                </h3>
                <p className="font-dm text-xs text-zinc-400">
                  {isIos
                    ? "iPhone & iPad — Add to Home Screen"
                    : "Add to Home Screen"}
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-zinc-800">
              {(["install", "security"] as ModalTab[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-xs font-barlow font-bold uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? "text-[#E8A020] border-b-2 border-[#E8A020] -mb-px bg-[#E8A020]/5"
                      : "text-zinc-500 hover:text-zinc-300"
                  }`}
                >
                  {tab === "install" ? (
                    <span className="flex items-center justify-center gap-1.5">
                      <Smartphone size={13} /> How to Install
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-1.5">
                      <Shield size={13} /> Why It&apos;s Safe
                    </span>
                  )}
                </button>
              ))}
            </div>

            <div className="px-5 pb-6">
              {/* ── INSTALL TAB ── */}
              {activeTab === "install" && (
                <div className="mt-4 space-y-3">
                  {isIos ? (
                    <>
                      <p className="font-dm text-xs text-zinc-400 leading-relaxed">
                        Open this page in{" "}
                        <strong className="text-white">Safari</strong> on your
                        iPhone or iPad, then follow these 3 steps:
                      </p>

                      {iosSteps.map((step) => (
                        <div
                          key={step.num}
                          className="bg-zinc-900/80 border border-zinc-800 hover:border-[#E8A020]/30 rounded-xl p-3 flex gap-3 items-start transition-colors"
                        >
                          <div className="w-9 h-9 rounded-full bg-[#E8A020]/15 border border-[#E8A020]/30 flex items-center justify-center shrink-0 font-barlow font-black text-[#E8A020] text-sm">
                            {step.num}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              {step.icon}
                              <p className="font-barlow font-bold text-white text-sm">
                                {step.title}
                              </p>
                            </div>
                            <p className="font-dm text-xs text-zinc-400 leading-relaxed">
                              {step.desc}
                            </p>
                            <p className="font-dm text-[10px] text-[#E8A020]/70 mt-1.5 flex items-center gap-1">
                              <ArrowDown size={9} className="animate-bounce" />
                              {step.tip}
                            </p>
                          </div>
                        </div>
                      ))}

                      {/* Safari-only notice */}
                      <div className="bg-blue-950/40 border border-blue-800/40 rounded-xl p-3 flex gap-2.5">
                        <div className="text-blue-400 shrink-0 mt-0.5">
                          <svg
                            viewBox="0 0 24 24"
                            width="14"
                            height="14"
                            fill="currentColor"
                          >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                          </svg>
                        </div>
                        <p className="font-dm text-xs text-blue-300 leading-relaxed">
                          <strong className="text-blue-200">
                            Safari required on iOS.
                          </strong>{" "}
                          Chrome, Firefox, and other browsers on iPhone/iPad
                          don&apos;t support the &ldquo;Add to Home Screen&rdquo; PWA
                          feature. Please open this page in{" "}
                          <strong className="text-blue-200">Safari</strong>.
                        </p>
                      </div>

                      <div className="text-center flex items-center justify-center gap-1 text-[11px] text-zinc-500">
                        <ArrowDown
                          size={12}
                          className="animate-bounce text-[#E8A020]"
                        />
                        <span>
                          Look for the Share icon at the bottom of Safari
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-3">
                      <p className="font-dm text-xs text-zinc-400 leading-relaxed">
                        Install MBDC FIX ALL for a faster, app-like experience:
                      </p>
                      {androidSteps.map((step) => (
                        <div
                          key={step.num}
                          className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-3 flex gap-3 items-start"
                        >
                          <div className="w-8 h-8 rounded-full bg-[#E8A020]/15 border border-[#E8A020]/30 flex items-center justify-center shrink-0 font-barlow font-black text-[#E8A020] text-sm">
                            {step.num}
                          </div>
                          <div>
                            <p className="font-barlow font-bold text-white text-sm">
                              {step.title}
                            </p>
                            <p className="font-dm text-xs text-zinc-400 mt-0.5 leading-relaxed">
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => setActiveTab("security")}
                      className="flex-1 py-2.5 rounded-xl border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-dm text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Shield size={12} className="text-[#E8A020]" />
                      Why safe?
                    </button>
                    <button
                      onClick={() => setShowModal(false)}
                      className="flex-[2] bg-[#E8A020] hover:bg-[#f0b030] text-black font-barlow font-bold text-sm uppercase py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                    >
                      <CheckCircle2 size={15} />
                      Got it, I&apos;ll Install
                    </button>
                  </div>
                </div>
              )}

              {/* ── SECURITY TAB ── */}
              {activeTab === "security" && (
                <div className="mt-4 space-y-2.5">
                  <p className="font-dm text-xs text-zinc-400 leading-relaxed mb-3">
                    Adding MBDC FIX ALL to your home screen is{" "}
                    <strong className="text-white">completely safe</strong>.
                    Here&apos;s why:
                  </p>

                  {securityItems.map((item, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 p-3 rounded-xl border ${item.bg}`}
                    >
                      <div className={`shrink-0 mt-0.5 ${item.color}`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-barlow font-bold text-white text-sm leading-tight">
                          {item.title}
                        </p>
                        <p className="font-dm text-xs text-zinc-400 mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}

                  {/* Trust badge */}
                  <div className="flex items-center justify-center gap-2 pt-3 text-[11px] text-zinc-500 font-dm border-t border-zinc-800 mt-2">
                    <Shield size={11} className="text-green-500" />
                    <span>
                      Verified PWA &middot;{" "}
                      <strong className="text-zinc-400">mbdcfixall.com</strong>{" "}
                      &middot; HTTPS Secured
                    </span>
                  </div>

                  <button
                    onClick={() => setActiveTab("install")}
                    className="w-full mt-1 bg-[#E8A020] hover:bg-[#f0b030] text-black font-barlow font-bold text-sm uppercase py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    <Smartphone size={15} />
                    Back to Install Steps
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
