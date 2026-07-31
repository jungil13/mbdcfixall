'use client'

import { AnimatedSection } from './AnimatedSection'
import { TeamSectionSkeleton } from './Skeleton'

export function Team({ members }: { members: any[] }) {
  if (!members || members.length === 0) return <TeamSectionSkeleton />

  const loopMembers = [...members, ...members, ...members]

  return (
    <section id="team" className="section-padded" style={{ background: '#FFFFFF', padding: '7rem 0', overflow: 'hidden' }}>
      <style>{`
        @keyframes scrollMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3 - 2rem / 3)); }
        }
        .team-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.06);
          border-radius: 12px;
          padding: 1.25rem;
          width: 280px;
          flex-shrink: 0;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .team-marquee-container {
          display: flex;
          gap: 2rem;
          width: max-content;
          animation: scrollMarquee 30s linear infinite;
          padding: 1rem 0 2rem 0;
        }
        .team-marquee-container:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem', marginBottom: '3rem' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.18em', color: '#E8A020', fontWeight: 500 }}>
                OUR EXPERTS
              </span>
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(30px, 4vw, 54px)', lineHeight: 1.05, color: '#111111', textTransform: 'uppercase', margin: 0 }}>
              MEET THE <span style={{ color: '#E8A020' }}>TEAM</span>
            </h2>
          </div>
        </AnimatedSection>
      </div>

      <div style={{ width: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, #FFFFFF 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, #FFFFFF 0%, transparent 100%)', zIndex: 10, pointerEvents: 'none' }} />
        
        <div className="team-marquee-container">
          {loopMembers.map((member, i) => (
            <div key={`${member.id}-${i}`} className="team-card">
              <div style={{ width: '100%', aspectRatio: '4/5', marginBottom: '1.25rem', overflow: 'hidden', background: '#F7F4EE', borderRadius: '8px' }}>
                {member.image_url ? (
                  <img
                    src={member.image_url}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                    onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)' }}
                    onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>No Photo</div>
                )}
              </div>
              <div style={{ textAlign: 'center' }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: '#111111', margin: '0 0 0.5rem', textTransform: 'uppercase' }}>
                  {member.name}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#E8A020', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>
                  {member.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
