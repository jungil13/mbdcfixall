"use client";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const [isStandalone, setIsStandalone] = useState(true);

  useEffect(() => {
    const checkStandalone = () => {
      const match = window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true;
      setIsStandalone(match);
    };
    checkStandalone();
  }, []);

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="hero-section relative h-svh min-h-[560px] pt-[80px] lg:pt-[100px] pb-10 flex items-start lg:items-center overflow-hidden bg-[#1a1a1a]">
      {/* Background image — portrait on mobile, landscape on desktop */}
      <picture className="absolute inset-0 w-full h-full">
        <source media="(max-width: 767px)" srcSet="/hero-bg-portrait.png" />
        <img
          src="/hero-bg.png"
          alt="Professional home repair and construction work in Cebu"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center", transform: "scale(1.08)", transformOrigin: "center center" }}
        />
      </picture>

      {/* Desktop gradient — left-to-right */}
      <div className="absolute inset-0 hidden md:block bg-[linear-gradient(to_right,rgba(0,0,0,0.93)_0%,rgba(0,0,0,0.82)_35%,rgba(0,0,0,0.45)_62%,rgba(0,0,0,0.08)_100%)]" />
      {/* Mobile gradient — dark top band for text, clear middle for workers, dark bottom strip for CTAs */}
      <div className="absolute inset-0 block md:hidden bg-[linear-gradient(to_bottom,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.60)_22%,rgba(0,0,0,0.10)_50%,rgba(0,0,0,0.10)_72%,rgba(0,0,0,0.78)_100%)]" />

      {/* Floating Bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[
          { l: "10%", s: 40, bg: "rgba(255,255,255,0.05)", d: "12s, 4s", delay: "0s, 0s" },
          { l: "20%", s: 80, bg: "rgba(255,255,255,0.02)", d: "18s, 5s", delay: "2s, 1s" },
          { l: "40%", s: 30, bg: "rgba(255,255,255,0.08)", d: "10s, 3s", delay: "4s, 2s" },
          { l: "70%", s: 60, bg: "rgba(255,255,255,0.03)", d: "15s, 4s", delay: "1s, 0s" },
          { l: "85%", s: 50, bg: "rgba(255,255,255,0.04)", d: "14s, 3.5s", delay: "5s, 1s" },
          { l: "15%", s: 35, bg: "rgba(232,160,32,0.10)", d: "11s, 3.5s", delay: "1s, 0s" },
          { l: "35%", s: 55, bg: "rgba(232,160,32,0.05)", d: "16s, 4.5s", delay: "3s, 1s" },
          { l: "55%", s: 25, bg: "rgba(232,160,32,0.15)", d: "9s, 2.5s", delay: "0s, 2s" },
          { l: "75%", s: 45, bg: "rgba(232,160,32,0.08)", d: "13s, 4s", delay: "4s, 0s" },
        ].map((b, i) => (
          <div
            key={i}
            className="bubble"
            style={{ left: b.l, width: b.s, height: b.s, background: b.bg, animationDuration: b.d, animationDelay: b.delay }}
          />
        ))}
      </div>

      {/* Accent line left */}
      <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-[#E8A020]" />

      {/* ── TOP TEXT BLOCK (mobile: top-anchored, desktop: centered) ── */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 w-full pt-5 lg:pt-0">
        <div className="max-w-[520px] lg:max-w-[44%]">
          {/* Label */}
          <div
            className="inline-flex items-center gap-[10px] mb-3 lg:mb-5"
            style={{ animation: "fadeInUp 0.8s ease-out both", animationDelay: "0.1s" }}
          >
            <div className="w-10 h-[2px] bg-[#E8A020]" />
            <span className="font-dm text-[clamp(10px,2.5vw,13px)] tracking-[0.18em] text-[#E8A020] font-medium">
              CEBU&apos;S TRUSTED HOME REPAIR SPECIALISTS
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-barlow font-black text-[clamp(44px,10vw,100px)] leading-[0.92] text-white mb-3 lg:mb-5 tracking-[-0.01em] uppercase"
            style={{ animation: "fadeInUp 0.8s ease-out both", animationDelay: "0.25s" }}
          >
            MBDC
            <br />
            <span className="text-[#E8A020]">FIX ALL</span>
          </h1>

          {/* Subtext */}
          <p
            className="hero-subtext font-dm text-[clamp(13px,2.5vw,17px)] leading-[1.6] text-white/75 mb-0 lg:mb-8 font-light"
            style={{ animation: "fadeInUp 0.8s ease-out both", animationDelay: "0.38s" }}
          >
            Fast response. Quality workmanship. Transparent pricing — right here in Cebu.
          </p>

          {/* CTAs — visible only on desktop inline */}
          <div
            className="hero-cta-row hidden lg:flex gap-4 flex-wrap mt-8"
            style={{ animation: "fadeInUp 0.8s ease-out both", animationDelay: "0.62s" }}
          >
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-barlow font-bold text-[clamp(13px,3vw,15px)] tracking-[0.12em] bg-[#E8A020] text-[#111111] px-7 py-4 no-underline inline-block transition-all duration-200 hover:bg-[#F0B030] hover:-translate-y-[1px]"
            >
              OUR SERVICES
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="font-barlow font-bold text-[clamp(13px,3vw,15px)] tracking-[0.12em] bg-transparent text-white px-7 py-4 no-underline inline-block border-2 border-white/50 transition-all duration-200 hover:border-[#E8A020] hover:text-[#E8A020]"
            >
              START YOUR PROJECT
            </a>
          </div>
        </div>
      </div>

      {/* ── MOBILE-ONLY: CTAs pinned above the bottom navbar ── */}
      <div className="absolute bottom-[84px] left-0 right-0 px-5 flex gap-3 lg:hidden z-10">
        <a
          href="#services"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex-1 text-center font-barlow font-bold text-[13px] tracking-[0.10em] bg-[#E8A020] text-[#111111] px-4 py-[14px] no-underline transition-all duration-200 active:opacity-80 shadow-lg"
        >
          OUR SERVICES
        </a>
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="flex-1 text-center font-barlow font-bold text-[13px] tracking-[0.10em] bg-black/40 backdrop-blur-sm text-white px-4 py-[14px] no-underline border-2 border-white/60 transition-all duration-200 active:opacity-80 shadow-lg"
        >
          START PROJECT
        </a>
      </div>

      {/* Scroll indicator — desktop only */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-transparent border-0 text-white/60 cursor-pointer flex-col items-center gap-[6px] z-10 hidden lg:flex"
        style={{ animation: "bounce2 2s ease-in-out infinite" }}
      >
        <style>{`@keyframes bounce2 { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }`}</style>
        <span className="font-dm text-[11px] tracking-[0.15em] text-white/50">SCROLL</span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
