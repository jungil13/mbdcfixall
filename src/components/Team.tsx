import { AnimatedSection } from './AnimatedSection'

export function Team({ members }: { members: any[] }) {
  if (!members || members.length === 0) return null

  return (
    <section id="team" className="section-padded" style={{ background: '#FFFFFF', padding: '7rem 1.25rem' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
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

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))', gap: '2rem' }}>
          {members.map((member, i) => (
            <AnimatedSection key={member.id} delay={(i % 4) * 100} variant="up">
              <div
                style={{ textAlign: 'center', transition: 'transform 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
              >
                <div style={{ width: '100%', aspectRatio: '4/5', marginBottom: '1.25rem', overflow: 'hidden', background: '#F7F4EE' }}>
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
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: '#111111', margin: '0 0 0.5rem', textTransform: 'uppercase' }}>
                  {member.name}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#E8A020', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>
                  {member.role}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
