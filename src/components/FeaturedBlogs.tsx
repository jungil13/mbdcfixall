'use client'

import Link from 'next/link'

import { format } from 'date-fns'

export function FeaturedBlogs({ blogs }: { blogs: any[] }) {
  if (!blogs || blogs.length === 0) return null

  return (
    <section style={{ background: '#111111', padding: '7rem 2rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.18em', color: '#E8A020', fontWeight: 500 }}>
                LATEST UPDATES
              </span>
            </div>
            <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 4vw, 54px)', lineHeight: 1.05, color: '#FFFFFF', textTransform: 'uppercase', margin: 0 }}>
              NEWS & <span style={{ color: '#E8A020' }}>ANNOUNCEMENTS</span>
            </h2>
          </div>
          <Link href="/blog" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '14px', letterSpacing: '0.1em', color: '#E8A020', textDecoration: 'none', borderBottom: '1px solid rgba(232,160,32,0.3)', paddingBottom: '2px' }}>
            VIEW ALL POSTS →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {blogs.slice(0, 3).map((blog) => (
            <Link 
              href={`/blog/${blog.id}`} 
              key={blog.id}
              style={{ background: 'rgba(255,255,255,0.03)', textDecoration: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', transition: 'transform 0.2s, background 0.2s' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
              }}
            >
              {blog.image_url ? (
                <img src={blog.image_url} alt={blog.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '220px', background: 'rgba(255,255,255,0.02)' }} />
              )}
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#E8A020', fontWeight: 700, letterSpacing: '0.1em', marginBottom: '1rem' }}>
                  {format(new Date(blog.published_at), 'MMMM dd, yyyy')}
                </div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '22px', color: '#FFFFFF', margin: '0 0 1rem', lineHeight: 1.2 }}>
                  {blog.title}
                </h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, margin: '0' }}>
                  {blog.subheading}
                </p>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}
