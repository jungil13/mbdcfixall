'use client'
import { useState } from 'react'
import { ArrowRight, MapPin, Calendar, ExternalLink } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const projects = [
  {
    title: 'Arcadia Heights Subdivision',
    category: 'Residential',
    location: 'Consolacion, Cebu',
    year: '2024',
    description: '80-unit premium residential subdivision with clubhouse and amenities.',
    image: 'https://images.unsplash.com/photo-1721815693498-cc28507c0ba2?w=800&h=560&fit=crop&auto=format',
  },
  {
    title: 'BPO Tower Cebu',
    category: 'Commercial',
    location: 'Cebu Business Park',
    year: '2023',
    description: '12-story PEZA-accredited office tower with 24,000 sqm of leasable space.',
    image: 'https://images.unsplash.com/photo-1621831337128-35676ca30868?w=800&h=560&fit=crop&auto=format',
  },
  {
    title: 'Gov. Cuenco Road Widening',
    category: 'Infrastructure',
    location: 'Cebu City',
    year: '2023',
    description: '3.2km road widening project with drainage and pedestrian upgrades.',
    image: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?w=800&h=560&fit=crop&auto=format',
  },
  {
    title: 'Casa Miel Villas',
    category: 'Residential',
    location: 'Talisay City, Cebu',
    year: '2022',
    description: '24 premium single-detached villas with modern tropical architecture.',
    image: 'https://images.unsplash.com/photo-1543071293-d91175a68672?w=800&h=560&fit=crop&auto=format',
  },
  {
    title: 'Pacific Mall Expansion',
    category: 'Commercial',
    location: 'Mandaue City, Cebu',
    year: '2022',
    description: '18,000 sqm retail expansion with food court, cinema, and parking decks.',
    image: 'https://images.unsplash.com/photo-1580742432710-d3c3703559a9?w=800&h=560&fit=crop&auto=format',
  },
  {
    title: 'Lahug Footbridge',
    category: 'Infrastructure',
    location: 'Lahug, Cebu City',
    year: '2021',
    description: 'Steel-and-concrete pedestrian footbridge spanning 45 meters.',
    image: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&h=560&fit=crop&auto=format',
  },
]

export function Projects({ dynamicProjects }: { dynamicProjects?: any[] }) {
  const [active, setActive] = useState('All')

  const currentProjects = dynamicProjects && dynamicProjects.length > 0 ? dynamicProjects : projects
  const uniqueCategories = ['All', ...Array.from(new Set(currentProjects.map(p => p.category)))]
  const filtered = active === 'All' ? currentProjects : currentProjects.filter((p) => p.category === active)

  return (
    <section
      id="projects"
      className="section-padded"
      style={{
        background: '#141414',
        padding: '7rem 1.25rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header & Tabs */}
        <AnimatedSection>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '3rem',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '1.25rem',
                }}
              >
                <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '12px',
                    letterSpacing: '0.18em',
                    color: '#E8A020',
                    fontWeight: 600,
                  }}
                >
                  PORTFOLIO
                </span>
              </div>
              <h2
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: 'clamp(32px, 4vw, 56px)',
                  lineHeight: 1.05,
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                FEATURED <span style={{ color: '#E8A020' }}>PROJECTS</span>
              </h2>
            </div>

            {/* Filter Pill Tabs */}
            <div
              style={{
                display: 'inline-flex',
                gap: '6px',
                background: '#1C1C1C',
                padding: '6px',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)',
                overflowX: 'auto',
                maxWidth: '100%',
              }}
            >
              {uniqueCategories.map((cat) => (
                <button
                  key={cat}
                  id={`projects-filter-${cat.toLowerCase()}`}
                  onClick={() => setActive(cat)}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(12px, 2vw, 14px)',
                    letterSpacing: '0.08em',
                    padding: '8px 18px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                    background: active === cat ? '#E8A020' : 'transparent',
                    color: active === cat ? '#111111' : 'rgba(255, 255, 255, 0.65)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {cat.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Projects Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: '2rem',
          }}
        >
          {filtered.map((project, i) => (
            <AnimatedSection key={project.title} delay={(i % 3) * 100} variant="up">
              <div
                className="project-card-item"
                style={{
                  background: '#1D1D1D',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  position: 'relative',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.35s ease',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                }}
              >
                {/* Project Image */}
                <div style={{ position: 'relative', overflow: 'hidden', height: '230px' }}>
                  <img
                    src={project.image_url || project.image}
                    alt={project.title}
                    className="proj-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      display: 'block',
                    }}
                  />
                  {/* Category Pill Overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      left: '1rem',
                      background: 'rgba(17, 17, 17, 0.85)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(232, 160, 32, 0.4)',
                      padding: '4px 12px',
                      borderRadius: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: '11px',
                        letterSpacing: '0.12em',
                        color: '#E8A020',
                      }}
                    >
                      {project.category.toUpperCase()}
                    </span>
                  </div>
                </div>

                {/* Content Details */}
                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: '0.75rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '12.5px',
                        color: 'rgba(255, 255, 255, 0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <MapPin size={13} color="#E8A020" /> {project.location}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: '13px',
                        color: '#E8A020',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <Calendar size={13} /> {project.year}
                    </span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: 'clamp(20px, 2.5vw, 24px)',
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      letterSpacing: '0.03em',
                      margin: '0 0 0.75rem',
                      lineHeight: 1.15,
                    }}
                  >
                    {project.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      color: 'rgba(255, 255, 255, 0.65)',
                      lineHeight: 1.6,
                      margin: 0,
                      fontWeight: 300,
                      flex: 1,
                    }}
                  >
                    {project.description}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .project-card-item:hover {
          border-color: rgba(232, 160, 32, 0.5) !important;
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important;
        }
        .project-card-item:hover .proj-img {
          transform: scale(1.06);
        }
      `}} />
    </section>
  )
}
