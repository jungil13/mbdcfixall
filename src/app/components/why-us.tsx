import { ShieldCheck, Clock, Award, Users, FileCheck, Banknote } from "lucide-react";

const reasons = [
  {
    icon: ShieldCheck,
    title: "Licensed & Insured",
    description:
      "PCAB-licensed, DOLE-registered, and fully insured. We meet every regulatory requirement before breaking ground.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    description:
      "96% of our projects are delivered on or before schedule. We use rigorous project management and milestone tracking.",
  },
  {
    icon: Award,
    title: "Award-Winning Work",
    description:
      "Multiple CCCI and PICPA recognition awards for construction excellence and business integrity across Cebu.",
  },
  {
    icon: Users,
    title: "In-House Expertise",
    description:
      "Our team of 120+ includes licensed civil engineers, architects, MEP specialists, and master tradespersons.",
  },
  {
    icon: FileCheck,
    title: "Transparent Reporting",
    description:
      "Clients receive weekly progress reports, photo documentation, and open access to project financials.",
  },
  {
    icon: Banknote,
    title: "Competitive Pricing",
    description:
      "We offer detailed, itemized quotations with no hidden costs — and flexible payment terms for qualified clients.",
  },
];

export function WhyUs() {
  return (
    <section
      id="why-us"
      style={{
        background: "#111111",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background image with overlay */}
      <img
        src="https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?w=1920&h=900&fit=crop&auto=format"
        alt="Construction workers at sunset"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: 0.08,
        }}
      />

      <div style={{ maxWidth: "1280px", margin: "0 auto", position: "relative" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "1.25rem",
            }}
          >
            <div style={{ width: "32px", height: "2px", background: "#E8A020" }} />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                letterSpacing: "0.18em",
                color: "#E8A020",
                fontWeight: 500,
              }}
            >
              OUR ADVANTAGE
            </span>
            <div style={{ width: "32px", height: "2px", background: "#E8A020" }} />
          </div>
          <h2
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(36px, 4vw, 54px)",
              lineHeight: 1.05,
              color: "#FFFFFF",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            WHY CHOOSE{" "}
            <span style={{ color: "#E8A020" }}>MIGHTYBEE</span>
          </h2>
        </div>

        {/* Reasons grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            background: "rgba(255,255,255,0.06)",
          }}
          className="why-grid"
        >
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div
                key={reason.title}
                style={{
                  background: "rgba(17,17,17,0.95)",
                  padding: "2.5rem",
                  transition: "background 0.2s",
                  borderBottom: "3px solid transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(30,30,30,0.98)";
                  el.style.borderBottomColor = "#E8A020";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget;
                  el.style.background = "rgba(17,17,17,0.95)";
                  el.style.borderBottomColor = "transparent";
                }}
              >
                <div
                  style={{
                    width: "52px",
                    height: "52px",
                    background: "#E8A020",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <Icon size={22} color="#111111" />
                </div>
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#FFFFFF",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    margin: "0 0 0.75rem",
                  }}
                >
                  {reason.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px",
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.55)",
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .why-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .why-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
