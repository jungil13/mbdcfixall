'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowUpRight } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'
import { TeamSectionSkeleton } from './Skeleton'

export function Team({ members }: { members: any[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)

  if (!members || members.length === 0) return <TeamSectionSkeleton />

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' })
    }
  }

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="team" 
      className="section-padded" 
      style={{ 
        background: '#FFFFFF', 
        padding: '7rem 1.25rem', 
        borderTop: '1px solid #EBEBEB' 
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        {/* Header with Navigation Arrows */}
        <AnimatedSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.18em', color: '#E8A020', fontWeight: 700 }}>
                  OUR EXPERTS
                </span>
              </div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(32px, 4vw, 54px)', lineHeight: 1.05, color: '#111111', textTransform: 'uppercase', margin: 0 }}>
                MEET THE <span style={{ color: '#E8A020' }}>TEAM</span>
              </h2>
            </div>

            {/* Left & Right Arrow Controls + View All Link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <Link 
                href="/team" 
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '0.1em',
                  color: '#111111',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  marginRight: '0.5rem'
                }}
              >
                VIEW ALL <ArrowUpRight size={16} color="#E8A020" />
              </Link>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={scrollLeft}
                  aria-label="Previous Team Member"
                  className="team-nav-arrow"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid #E0E0E0',
                    background: '#FFFFFF',
                    color: '#111111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={scrollRight}
                  aria-label="Next Team Member"
                  className="team-nav-arrow"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    border: '1px solid #E0E0E0',
                    background: '#FFFFFF',
                    color: '#111111',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </AnimatedSection>

        {/* Scrollable Container with Clickable Member Cards */}
        <div 
          ref={scrollRef}
          className="team-carousel-scroll"
          style={{ 
            display: 'flex', 
            gap: '1.75rem', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none',
            paddingBottom: '1rem',
            paddingTop: '0.5rem'
          }}
        >
          {members.map((member, i) => (
            <div 
              key={member.id || i}
              style={{ scrollSnapAlign: 'start', flexShrink: 0 }}
            >
              <Link 
                href="/team" 
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div 
                  className="team-card-item"
                  style={{ 
                    width: '290px', 
                    background: '#FAFAFA', 
                    border: '1px solid #EBEBEB', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.03)'
                  }}
                >
                  <div style={{ width: '100%', height: '320px', overflow: 'hidden', position: 'relative' }}>
                    {member.image_url ? (
                      <img
                        src={member.image_url}
                        alt={member.name}
                        className="team-member-img"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#EEE', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999', fontFamily: "'DM Sans', sans-serif" }}>
                        No Photo
                      </div>
                    )}
                    <div 
                      className="team-card-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'linear-gradient(to top, rgba(17,17,17,0.7) 0%, transparent 60%)',
                        opacity: 0,
                        transition: 'opacity 0.3s ease',
                        display: 'flex',
                        alignItems: 'flex-end',
                        padding: '1.25rem'
                      }}
                    >
                      <span style={{ color: '#E8A020', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        VIEW PROFILE <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </div>

                  <div style={{ padding: '1.25rem 1.5rem', textAlign: 'center', background: '#FFFFFF' }}>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '22px', color: '#111111', margin: '0 0 0.25rem', textTransform: 'uppercase' }}>
                      {member.name}
                    </h3>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#E8A020', fontWeight: 700, letterSpacing: '0.06em', margin: 0, textTransform: 'uppercase' }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .team-carousel-scroll::-webkit-scrollbar {
          display: none;
        }
        .team-nav-arrow:hover {
          background-color: #E8A020 !important;
          border-color: #E8A020 !important;
          color: #111111 !important;
          box-shadow: 0 4px 12px rgba(232, 160, 32, 0.3) !important;
        }
        .team-card-item:hover {
          transform: translateY(-8px);
          border-color: #E8A020 !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important;
        }
        .team-card-item:hover .team-member-img {
          transform: scale(1.06);
        }
        .team-card-item:hover .team-card-overlay {
          opacity: 1;
        }
      `}} />
    </section>
  )
}
