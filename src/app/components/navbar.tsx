import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import logo from "@/assets/mightyb_logo.png"


const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Why Us", href: "#why-us" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: "background 0.3s ease, box-shadow 0.3s ease",
        background: scrolled ? "#111111" : "transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.3)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "72px",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
          <img src={logo} alt="logo" style={{ width: "40px", height: "40px" }} />
          <div>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "18px",
                letterSpacing: "0.05em",
                color: "#FFFFFF",
                lineHeight: 1,
              }}
            >
              MIGHTYBEE
            </div>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                color: "#E8A020",
                letterSpacing: "0.12em",
                lineHeight: 1.2,
              }}
            >
              DEVELOPMENT CORP.
            </div>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "15px",
                letterSpacing: "0.1em",
                color: "#FFFFFF",
                textDecoration: "none",
                opacity: 0.85,
                transition: "opacity 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.opacity = "1";
                (e.target as HTMLElement).style.color = "#E8A020";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.opacity = "0.85";
                (e.target as HTMLElement).style.color = "#FFFFFF";
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a
            href="tel:0323422202"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "14px",
              color: "#E8A020",
              textDecoration: "none",
            }}
          >
            <Phone size={14} />
            (032) 342 2202
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNavClick("#contact"); }}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              letterSpacing: "0.12em",
              background: "#E8A020",
              color: "#111111",
              padding: "10px 22px",
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#F0B030")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#E8A020")}
          >
            GET A QUOTE
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              color: "#FFFFFF",
              cursor: "pointer",
              padding: "4px",
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          style={{
            background: "#111111",
            padding: "1.5rem 2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                letterSpacing: "0.1em",
                color: "#FFFFFF",
                textDecoration: "none",
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .mobile-menu-btn { display: block !important; }
          nav { display: none !important; }
          a[href="tel:0323422202"] { display: none !important; }
        }
      `}</style>
    </header>
  );
}
