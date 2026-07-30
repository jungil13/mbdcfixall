"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  Phone,
  MapPin,
  Mail,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { AnimatedSection } from "./AnimatedSection";

// Each link has: label, href (anchor or route), and optional external flag
const footerLinks: Record<string, { label: string; href: string; external?: boolean }[]> = {
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Projects", href: "#projects" },
    { label: "Services", href: "#services" },
    { label: "Blog & Updates", href: "/blog" },
  ],
  Services: [
    { label: "Property Repair", href: "#services" },
    { label: "Maintenance", href: "#services" },
    { label: "Facility Services", href: "#services" },
  ],
  Projects: [
    { label: "Arcadia Heights", href: "#projects" },
    { label: "BPO Tower Cebu", href: "#projects" },
    { label: "Casa Miel Villas", href: "#projects" },
    { label: "Pacific Mall Expansion", href: "#projects" },
  ],
  Support: [
    { label: "Get a Quote", href: "#contact" },
    { label: "Team", href: "/team" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      if (href === "#") {
        if (isHome) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
          router.push("/");
        }
        return;
      }
      if (isHome) {
        try {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        } catch {
          // Ignore invalid selector errors
        }
      } else {
        router.push(`/${href}`);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <footer className="bg-[#0A0A0A] border-t-[3px] border-[#E8A020]">
      {/* Main footer */}
      <AnimatedSection>
        <div className="max-w-[1280px] mx-auto px-5 py-16 grid footer-grid"
          style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr", gap: "clamp(1.5rem, 3vw, 3rem)" }}>

          {/* Brand column */}
          <div>
            <div className="flex items-center gap-[10px] mb-6">
              <img
                src="/mightyb_logo.png"
                alt="MBDC FIX ALL logo"
                className="w-10 h-10 object-contain"
              />
              <div>
                <div className="font-barlow font-extrabold text-[20px] tracking-[0.04em] text-white leading-none">
                  MBDC
                </div>
                <div className="font-dm text-[11px] tracking-[0.14em] text-[#E8A020] leading-tight mt-[2px]">
                  FIX ALL <span className="text-white/50">· HOME REPAIRS</span>
                </div>
              </div>
            </div>

            <p className="font-dm text-[14px] leading-[1.75] text-white/45 mb-6 font-light">
              Cebu&apos;s trusted home repair specialists since 1999. We handle all
              types of property repairs, maintenance programs, and facility services
              — fast, reliable, and priced transparently.
            </p>

            {/* Contact blurbs */}
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: MapPin, text: "8WX7+H64, Gov. M. Cuenco Ave, Cebu City", href: "https://maps.google.com/?q=8WX7+H64+Gov+M+Cuenco+Ave+Cebu+City" },
                { icon: Phone, text: "(032) 342 2202", href: "tel:0323422202" },
                { icon: Mail, text: "info@mightybeedevelopment.com", href: "mailto:info@mightybeedevelopment.com" },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.text}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex gap-2 items-start no-underline group"
                  >
                    <Icon size={13} color="#E8A020" className="mt-[3px] shrink-0" />
                    <span className="font-dm text-[13px] text-white/45 group-hover:text-white/70 transition-colors duration-200">
                      {item.text}
                    </span>
                  </a>
                );
              })}
            </div>

            {/* Social icons */}
            <div className="flex gap-2">
              {[
                { icon: Facebook, label: "Facebook", href: "https://facebook.com/mbdcfixall" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/mbdcfixall" },
                { icon: Youtube, label: "YouTube", href: "https://youtube.com/@mbdcfixall" },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 bg-white/[0.07] flex items-center justify-center no-underline transition-colors duration-200 hover:bg-[#E8A020]"
                >
                  <Icon size={15} color="#FFFFFF" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="font-barlow font-bold text-[13px] tracking-[0.15em] text-[#E8A020] mb-5 uppercase">
                {title}
              </div>
              <div className="flex flex-col gap-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleLink(e, link.href)}
                    className="font-dm text-[13px] text-white/45 no-underline transition-colors duration-200 hover:text-[#E8A020]"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.06] py-5 pb-20 lg:pb-5 px-5 max-w-[1280px] mx-auto flex justify-between items-center flex-wrap gap-3">
        <span className="font-dm text-[12px] text-white/30">
          © {new Date().getFullYear()} MBDC FIX ALL. All rights reserved.
        </span>
        <span className="font-dm text-[12px] text-white/30">
          PCAB Licensed · Cebu City, Philippines
        </span>
      </div>
    </footer>
  );
}
