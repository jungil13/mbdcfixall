import { useState } from "react";
import { ArrowRight } from "lucide-react";

const categories = ["All", "Residential", "Commercial", "Infrastructure"];

const projects = [
  {
    title: "Arcadia Heights Subdivision",
    category: "Residential",
    location: "Consolacion, Cebu",
    year: "2024",
    description: "80-unit premium residential subdivision with clubhouse and amenities.",
    image: "https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?w=800&h=560&fit=crop&auto=format",
  },
  {
    title: "BPO Tower Cebu",
    category: "Commercial",
    location: "Cebu Business Park",
    year: "2023",
    description: "12-story PEZA-accredited office tower with 24,000 sqm of leasable space.",
    image: "https://images.unsplash.com/photo-1621831337128-35676ca30868?w=800&h=560&fit=crop&auto=format",
  },
  {
    title: "Gov. Cuenco Road Widening",
    category: "Infrastructure",
    location: "Cebu City",
    year: "2023",
    description: "3.2km road widening project with drainage and pedestrian upgrades.",
    image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&h=560&fit=crop&auto=format",
  },
  {
    title: "Casa Miel Villas",
    category: "Residential",
    location: "Talisay City, Cebu",
    year: "2022",
    description: "24 premium single-detached villas with modern tropical architecture.",
    image: "https://images.unsplash.com/photo-1543071293-d91175a68672?w=800&h=560&fit=crop&auto=format",
  },
  {
    title: "Pacific Mall Expansion",
    category: "Commercial",
    location: "Mandaue City, Cebu",
    year: "2022",
    description: "18,000 sqm retail expansion with food court, cinema, and parking decks.",
    image: "https://images.unsplash.com/photo-1580742432710-d3c3703559a9?w=800&h=560&fit=crop&auto=format",
  },
  {
    title: "Lahug Footbridge",
    category: "Infrastructure",
    location: "Lahug, Cebu City",
    year: "2021",
    description: "Steel-and-concrete pedestrian footbridge spanning 45 meters.",
    image: "https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=560&fit=crop&auto=format",
  },
];

export function Projects() {
  const [active, setActive] = useState("All");

  const filtered =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <section
      id="projects"
      style={{
        background: "#F7F4EE",
        padding: "7rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "2rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
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
                PORTFOLIO
              </span>
            </div>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(36px, 4vw, 54px)",
                lineHeight: 1.05,
                color: "#111111",
                textTransform: "uppercase",
                margin: 0,
              }}
            >
              FEATURED
              <br />
              <span style={{ color: "#E8A020" }}>PROJECTS</span>
            </h2>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "2px", background: "#D8D4CC" }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: "13px",
                  letterSpacing: "0.1em",
                  padding: "12px 22px",
                  border: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, color 0.2s",
                  background: active === cat ? "#E8A020" : "#FFFFFF",
                  color: active === cat ? "#111111" : "#6B6B6B",
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2px",
            background: "#D8D4CC",
          }}
          className="projects-grid"
        >
          {filtered.map((project) => (
            <div
              key={project.title}
              style={{
                background: "#FFFFFF",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                if (img) img.style.transform = "scale(1.05)";
                const overlay = e.currentTarget.querySelector(".proj-overlay") as HTMLElement;
                if (overlay) overlay.style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                const img = e.currentTarget.querySelector("img") as HTMLImageElement;
                if (img) img.style.transform = "scale(1)";
                const overlay = e.currentTarget.querySelector(".proj-overlay") as HTMLElement;
                if (overlay) overlay.style.opacity = "0";
              }}
            >
              <div style={{ position: "relative", overflow: "hidden", height: "240px" }}>
                <img
                  src={project.image}
                  alt={project.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                    display: "block",
                  }}
                />
                {/* Category badge */}
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    left: "1rem",
                    background: "#E8A020",
                    padding: "4px 10px",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "11px",
                      letterSpacing: "0.1em",
                      color: "#111111",
                    }}
                  >
                    {project.category.toUpperCase()}
                  </span>
                </div>
                {/* Hover overlay */}
                <div
                  className="proj-overlay"
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "rgba(232, 160, 32, 0.15)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s",
                  }}
                >
                  <div
                    style={{
                      background: "#E8A020",
                      width: "48px",
                      height: "48px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ArrowRight size={20} color="#111111" />
                  </div>
                </div>
              </div>

              <div style={{ padding: "1.5rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: "12px",
                      color: "#6B6B6B",
                    }}
                  >
                    {project.location}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: "14px",
                      color: "#E8A020",
                    }}
                  >
                    {project.year}
                  </span>
                </div>
                <h3
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: "20px",
                    color: "#111111",
                    textTransform: "uppercase",
                    letterSpacing: "0.03em",
                    margin: "0 0 0.5rem",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "13px",
                    color: "#6B6B6B",
                    lineHeight: 1.6,
                    margin: 0,
                    fontWeight: 300,
                  }}
                >
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 600px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
