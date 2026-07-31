"use client";

import { useEffect, useState } from "react";

export default function AppSplashScreen() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 15;
      });
    }, 100);

    // Hide splash screen after 1.3s
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setLoading(false);
      }, 400); // match transition duration
    }, 1300);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[99999] bg-[#0A0A0A] hidden sm:flex flex-col items-center justify-between p-8 transition-opacity duration-400 ease-out select-none ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-[#E8A020]/15 rounded-full blur-[90px] pointer-events-none" />

      {/* Top spacer */}
      <div className="w-full flex justify-between items-center text-xs font-barlow tracking-widest text-zinc-600 uppercase">
        <span>EST. 1999</span>
        <span>CEBU, PH</span>
      </div>

      {/* Main Center Branding */}
      <div className="flex flex-col items-center justify-center text-center relative z-10 my-auto">
        <div className="relative mb-6 group hidden sm:block">
          {/* Pulsing ring around logo */}
          <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#E8A020] via-yellow-500 to-[#E8A020] opacity-40 blur-md animate-pulse" />
          
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 bg-[#111111] border-2 border-[#E8A020] rounded-2xl p-3 shadow-[0_0_40px_rgba(232,160,32,0.3)] flex items-center justify-center">
            <img
              src="/mightyb_logo.png"
              alt="MBDC FIX ALL Logo"
              className="w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-pulse"
            />
          </div>
        </div>

        <h1 className="font-barlow font-extrabold text-3xl sm:text-4xl text-white tracking-[0.06em] leading-none mb-2">
          MBDC <span className="text-[#E8A020]">FIX ALL</span>
        </h1>
        <p className="font-dm text-xs sm:text-sm text-zinc-400 tracking-[0.2em] uppercase max-w-xs font-medium">
          Home Repairs & Construction
        </p>
      </div>

      {/* Bottom Progress & Footer */}
      <div className="w-full max-w-xs flex flex-col items-center gap-4 relative z-10 mb-4">
        {/* Progress Bar Container */}
        <div className="w-full h-[3px] bg-zinc-800 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#E8A020] via-amber-400 to-[#E8A020] transition-all duration-150 ease-out shadow-[0_0_10px_#E8A020]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center justify-between w-full text-[11px] font-dm text-zinc-500">
          <span>Loading app...</span>
          <span className="text-[#E8A020] font-mono font-semibold">{progress}%</span>
        </div>
      </div>
    </div>
  );
}
