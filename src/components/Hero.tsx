"use client";
import { ChevronDown, Hammer, Settings, Shield } from "lucide-react";

const serviceHighlights = [
  { icon: Hammer, label: "PROPERTY REPAIR" },
  { icon: Settings, label: "MAINTENANCE" },
  { icon: Shield, label: "FACILITY SERVICES" },
];

export function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-svh min-h-[560px] pt-[80px] lg:pt-[100px] pb-10 flex items-center overflow-hidden bg-[#1a1a1a]">
      {/* Background image - local file for reliability on all devices */}
      <img
        src="/hero-bg.jpg"
        alt="Professional home repair and construction work in Cebu"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ objectPosition: 'right center' }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.70)_55%,rgba(0,0,0,0.35)_100%)]" />

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

      {/* Content */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-5 w-full">
        <div className="max-w-[800px]">
          {/* Label */}
          <div
            className="inline-flex items-center gap-[10px] mb-5"
            style={{ animation: "fadeInUp 0.8s ease-out both", animationDelay: "0.1s" }}
          >
            <div className="w-10 h-[2px] bg-[#E8A020]" />
            <span className="font-dm text-[clamp(10px,2.5vw,13px)] tracking-[0.18em] text-[#E8A020] font-medium">
              CEBU&apos;S TRUSTED HOME REPAIR SPECIALISTS
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-barlow font-black text-[clamp(52px,10vw,100px)] leading-[0.92] text-white mb-5 tracking-[-0.01em] uppercase"
            style={{ animation: "fadeInUp 0.8s ease-out both", animationDelay: "0.25s" }}
          >
            MBDC
            <br />
            <span className="text-[#E8A020]">FIX ALL</span>
          </h1>

          {/* Service Highlight Badges */}
          <div
            className="flex flex-wrap gap-3 mb-6"
            style={{ animation: "fadeInUp 0.8s ease-out both", animationDelay: "0.38s" }}
          >
            {serviceHighlights.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 bg-[#E8A020]/10 border border-[#E8A020]/40 backdrop-blur-sm px-4 py-2"
              >
                <Icon size={14} className="text-[#E8A020] shrink-0" />
                <span className="font-barlow font-bold text-[13px] tracking-[0.14em] text-[#E8A020]">
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* Subtext */}
          <p
            className="hero-subtext font-dm text-[clamp(15px,3vw,18px)] leading-[1.65] text-white/80 max-w-[520px] mb-8 font-light"
            style={{ animation: "fadeInUp 0.8s ease-out both", animationDelay: "0.5s" }}
          >
            Your trusted partner for all types of home and property repairs in Cebu —
            fast response, quality workmanship, and transparent pricing.
          </p>

          {/* CTAs */}
          <div
            className="hero-cta-row flex gap-4 flex-wrap"
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
              GET A FREE QUOTE
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-transparent border-0 text-white/60 cursor-pointer flex flex-col items-center gap-[6px] z-10"
        style={{ animation: "bounce2 2s ease-in-out infinite" }}
      >
        <style>{`@keyframes bounce2 { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }`}</style>
        <span className="font-dm text-[11px] tracking-[0.15em] text-white/50">SCROLL</span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
