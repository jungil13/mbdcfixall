'use client'

import Link from 'next/link'
import { format } from 'date-fns'
import { AnimatedSection } from './AnimatedSection'

export function FeaturedBlogs({ blogs }: { blogs: any[] }) {
  if (!blogs || blogs.length === 0) return null

  return (
    <section id="blog" className="section-padded" style={{ background: '#111111', padding: '7rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <AnimatedSection>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '1.5rem' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
                <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.18em', color: '#E8A020', fontWeight: 500 }}>
                  LATEST UPDATES
                </span>
              </div>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 54px)', lineHeight: 1.05, color: '#FFFFFF', textTransform: 'uppercase', margin: 0 }}>
                NEWS & <span style={{ color: '#E8A020' }}>ANNOUNCEMENTS</span>
              </h2>
            </div>
            <Link href="/blog" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '14px', letterSpacing: '0.1em', color: '#E8A020', textDecoration: 'none', borderBottom: '1px solid rgba(232,160,32,0.3)', paddingBottom: '2px', whiteSpace: 'nowrap' }}>
              VIEW ALL POSTS →
            </Link>
          </div>
        </AnimatedSection>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
          {blogs.slice(0, 3).map((blog, i) => (
            <AnimatedSection key={blog.id} delay={i * 120} variant="up">
              <Link 
                href={`/blog/${blog.id}`}
                style={{ background: 'rgba(255,255,255,0.03)', textDecoration: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.3s, background 0.3s', height: '100%' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
                }}
              >
                {blog.image_url ? (
                  <div style={{ overflow: 'hidden', height: 'clamp(160px, 20vw, 220px)' }}>
                    <img
                      src={blog.image_url}
                      alt={blog.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1.05)' }}
                      onMouseLeave={(e) => { (e.target as HTMLImageElement).style.transform = 'scale(1)' }}
                    />
                  </div>
                ) : (
                  <div style={{ width: '100%', height: 'clamp(160px, 20vw, 220px)', background: 'rgba(255,255,255,0.02)' }} />
                )}
                <div style={{ padding: 'clamp(1.25rem, 4vw, 2rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#E8A020', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                    {format(new Date(blog.published_at), 'MMMM dd, yyyy')}
                  </div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', color: '#FFFFFF', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
                    {blog.title}
                  </h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0' }}>
                    {blog.subheading}
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  )
}
