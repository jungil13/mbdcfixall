import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { AnimatedSection } from '@/components/AnimatedSection'
import { Linkedin, Mail } from 'lucide-react'

export const revalidate = 0 // fetch fresh data

export default async function TeamPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const { data: team } = await supabase
    .from('team_members')
    .select('*')
    .order('order_index', { ascending: true })

  return (
    <main style={{ background: '#F2EFE8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, paddingTop: '140px', paddingBottom: '7rem', maxWidth: '1280px', margin: '0 auto', width: '100%', paddingLeft: '2rem', paddingRight: '2rem' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '700px', margin: '0 auto 5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.18em', color: '#E8A020', fontWeight: 600 }}>
                MEET THE EXPERTS
              </span>
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(42px, 5vw, 64px)', lineHeight: 1.05, color: '#111111', textTransform: 'uppercase', margin: '0 0 1.5rem' }}>
              THE MINDS BEHIND <span style={{ color: '#E8A020' }}>MIGHTYBEE</span>
            </h1>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '16px', color: '#6B6B6B', lineHeight: 1.6 }}>
              Our team of dedicated professionals brings decades of combined experience in engineering, construction, and property development to every project we undertake.
            </p>
          </div>
        </AnimatedSection>

        {!team || team.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
            No team members found.
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '3rem 2rem' }}>
            {team.map((member, i) => (
              <AnimatedSection key={member.id} delay={(i % 4) * 100}>
                <div className="team-card" style={{ background: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease', position: 'relative' }}>
                  <div style={{ width: '100%', height: '320px', overflow: 'hidden' }}>
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom right, #E5E5E5, #F5F5F5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#AAA' }}>No Photo</div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="team-overlay" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '320px', background: 'linear-gradient(to top, rgba(232, 160, 32, 0.9), rgba(232, 160, 32, 0.4))', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: '2rem', opacity: 0, transition: 'opacity 0.3s ease' }}>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8A020', cursor: 'pointer', transform: 'translateY(20px)', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} className="social-btn" style={{ transitionDelay: '0.1s' }}>
                          <Linkedin size={18} />
                        </button>
                        <button style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFFFFF', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#E8A020', cursor: 'pointer', transform: 'translateY(20px)', transition: 'transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' }} className="social-btn" style={{ transitionDelay: '0.2s' }}>
                          <Mail size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ padding: '1.5rem', textAlign: 'center', borderTop: '3px solid #E8A020' }}>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '24px', color: '#111111', margin: '0 0 4px', textTransform: 'uppercase' }}>
                      {member.name}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888', fontWeight: 600, letterSpacing: '0.1em', margin: 0, textTransform: 'uppercase' }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>

      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        .team-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
        .team-card:hover img { transform: scale(1.05); }
        .team-card:hover .team-overlay { opacity: 1; }
        .team-card:hover .social-btn { transform: translateY(0) !important; }
      `}} />
    </main>
  )
}
