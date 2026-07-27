import { AnimatedSection } from './AnimatedSection'

export function About() {
  return (
    <section
      id="about"
      className="section-padded"
      style={{
        background: '#111111',
        padding: '7rem 1.25rem',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '5rem',
          alignItems: 'center',
        }}
        className="about-grid"
      >
        {/* Image column */}
        <AnimatedSection variant="left">
          <div style={{ position: 'relative' }}>
            <img
              src="https://images.unsplash.com/photo-1587582423116-ec07293f0395?w=800&h=960&fit=crop&auto=format"
              alt="Construction worker in hard hat on a building frame"
              style={{
                width: '100%',
                height: 'clamp(320px, 45vw, 520px)',
                objectFit: 'cover',
                display: 'block',
              }}
            />
            {/* Stats badge */}
            <div
              className="about-stats-badge"
              style={{
                position: 'absolute',
                bottom: '-2rem',
                right: '-2rem',
                background: '#E8A020',
                padding: '2rem',
                width: '160px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 900,
                  fontSize: '52px',
                  color: '#111111',
                  lineHeight: 1,
                }}
              >
                25+
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  color: '#111111',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  marginTop: '4px',
                }}
              >
                YEARS OF EXCELLENCE
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Text column */}
        <AnimatedSection variant="right" delay={150}>
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
                  fontWeight: 500,
                }}
              >
                WHO WE ARE
              </span>
            </div>

            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(30px, 4vw, 54px)',
                lineHeight: 1.05,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                margin: '0 0 1.25rem',
              }}
            >
              CEBU&apos;S MOST
              <br />
              <span style={{ color: '#E8A020' }}>TRUSTED</span> BUILDER
            </h2>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(14px, 1.8vw, 16px)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.70)',
                margin: '0 0 1.25rem',
                fontWeight: 300,
              }}
            >
              Founded in 1999, Mightybee Development Corp. has grown from a small
              contracting firm into one of Cebu&apos;s most respected construction
              and development companies. We serve the entire Cebu province —
              from Cebu City to the surrounding municipalities.
            </p>

            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 'clamp(14px, 1.8vw, 16px)',
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.70)',
                margin: '0 0 2rem',
                fontWeight: 300,
              }}
            >
              Our team of licensed engineers, architects, and skilled tradespeople
              brings precision, integrity, and Filipino craftsmanship to every
              project — from single-family homes to large commercial complexes.
            </p>

            {/* Key values */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Integrity', desc: 'Transparent dealings and honest timelines.' },
                { label: 'Quality', desc: 'Grade-A materials and rigorous quality control.' },
                { label: 'Safety', desc: 'DOLE-compliant jobsites, zero-compromise safety.' },
              ].map((v, i) => (
                <div key={v.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div
                    style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: '#E8A020',
                      marginTop: '9px',
                      flexShrink: 0,
                    }}
                  />
                  <div>
                    <span
                      style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700,
                        fontSize: '16px',
                        color: '#FFFFFF',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {v.label}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.55)',
                        marginLeft: '8px',
                      }}
                    >
                      — {v.desc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
