"use client";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        background: "#1a1a1a",
      }}
    >
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1602513704488-9dc3af8f9983?w=1920&h=1080&fit=crop&auto=format"
        alt="Construction crane silhouette against orange sky"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.3) 100%)",
        }}
      />

      {/* Accent line left */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "5px",
          background: "#E8A020",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "0 2rem",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "760px" }}>
          {/* Label */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{ width: "40px", height: "2px", background: "#E8A020" }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                letterSpacing: "0.18em",
                color: "#E8A020",
                fontWeight: 500,
              }}
            >
              CEBU&apos;S TRUSTED BUILDER SINCE 1999
            </span>
          </div>

          {/* Headline */}
          <h1
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(52px, 8vw, 96px)",
              lineHeight: 0.95,
              color: "#FFFFFF",
              margin: "0 0 1.5rem",
              letterSpacing: "-0.01em",
              textTransform: "uppercase",
            }}
          >
            MIGHTYBEE
            <br />
            <span style={{ color: "#E8A020" }}>DEVELOPMENT</span>
            <br />
            CORP.
          </h1>

          {/* Subtext */}
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "18px",
              lineHeight: 1.65,
              color: "rgba(255,255,255,0.80)",
              maxWidth: "480px",
              margin: "0 0 2.5rem",
              fontWeight: 300,
            }}
          >
            Mightybee Development Corp. delivers world-class construction and
            development projects across Cebu — on time, on budget, and built to
            last.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.12em",
                background: "#E8A020",
                color: "#111111",
                padding: "16px 36px",
                textDecoration: "none",
                display: "inline-block",
                transition: "background 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#F0B030";
                el.style.transform = "translateY(-1px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "#E8A020";
                el.style.transform = "translateY(0)";
              }}
            >
              VIEW OUR PROJECTS
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector("#contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                letterSpacing: "0.12em",
                background: "transparent",
                color: "#FFFFFF",
                padding: "16px 36px",
                textDecoration: "none",
                display: "inline-block",
                border: "2px solid rgba(255,255,255,0.5)",
                transition: "border-color 0.2s, color 0.2s",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "#E8A020";
                el.style.color = "#E8A020";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.borderColor = "rgba(255,255,255,0.5)";
                el.style.color = "#FFFFFF";
              }}
            >
              GET A FREE QUOTE
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToAbout}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          background: "none",
          border: "none",
          color: "rgba(255,255,255,0.6)",
          cursor: "pointer",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
          animation: "bounce 2s ease-in-out infinite",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.15em",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          SCROLL
        </span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}
