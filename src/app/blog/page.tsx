import { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { format } from 'date-fns'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ArrowRight, Newspaper, Calendar, Clock, Bookmark, Sparkles } from 'lucide-react'
import { SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'News & Insights | MBDC FIX ALL',
  description: 'Read the latest updates, repair tips, and company news from MBDC FIX ALL in Cebu.',
  alternates: { canonical: `${SITE_URL}/blog` }
}

export const revalidate = 0

export default async function BlogIndexPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const { data: blogs } = await supabase
    .from('blogs')
    .select('*')
    .order('published_at', { ascending: false })

  const featuredBlog = blogs && blogs.length > 0 ? blogs[0] : null
  const regularBlogs = blogs && blogs.length > 1 ? blogs.slice(1) : []

  return (
    <main style={{ background: '#111111', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, paddingTop: 'clamp(100px, 12vw, 130px)', paddingBottom: '7rem', maxWidth: '1280px', margin: '0 auto', width: '100%', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
        
        {/* Modern Editorial Header */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', background: 'rgba(232, 160, 32, 0.1)', padding: '6px 16px', borderRadius: '30px', border: '1px solid rgba(232, 160, 32, 0.25)' }}>
              <Newspaper size={14} className="text-[#E8A020]" />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.18em', color: '#E8A020', fontWeight: 700, textTransform: 'uppercase' }}>
                JOURNAL & DISPATCHES
              </span>
            </div>

            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(40px, 7vw, 72px)', lineHeight: 1.0, color: '#FFFFFF', textTransform: 'uppercase', margin: '0 0 1rem', letterSpacing: '-0.01em' }}>
              NEWS & <span style={{ color: '#E8A020' }}>EDITORIAL INSIGHTS</span>
            </h1>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(15px, 2vw, 18px)', color: 'rgba(255, 255, 255, 0.65)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6, fontWeight: 300 }}>
              Professional repair insights, architectural maintenance guides, and official updates from the MBDC FIX ALL engineering team in Cebu.
            </p>
          </div>
        </AnimatedSection>

        {!featuredBlog ? (
          <div style={{ textAlign: 'center', padding: '5rem 1rem', color: 'rgba(255, 255, 255, 0.5)', fontFamily: "'DM Sans', sans-serif", fontSize: '18px' }}>
            No articles published yet. Please check back soon!
          </div>
        ) : (
          <>
            {/* Main Featured Hero Story */}
            <AnimatedSection delay={100}>
              <Link href={`/blog/${featuredBlog.id}`} style={{ textDecoration: 'none' }}>
                <div 
                  className="featured-editorial-card"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(12, 1fr)',
                    gap: '0',
                    background: '#181818',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '4rem',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ gridColumn: 'span 7', padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }} className="hero-content-col">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                      <span style={{ background: '#E8A020', color: '#111111', fontSize: '11px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, letterSpacing: '0.12em', padding: '3px 10px', textTransform: 'uppercase', borderRadius: '4px' }}>
                        TOP STORY
                      </span>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255, 255, 255, 0.5)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={13} color="#E8A020" /> {format(new Date(featuredBlog.published_at), 'MMMM dd, yyyy')}
                      </span>
                    </div>

                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 4vw, 48px)', color: '#FFFFFF', margin: '0 0 1.25rem', lineHeight: 1.08, textTransform: 'uppercase' }}>
                      {featuredBlog.title}
                    </h2>

                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(14px, 1.8vw, 16px)', color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.7, margin: '0 0 2rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {featuredBlog.subheading}
                    </p>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', color: '#E8A020', letterSpacing: '0.1em' }}>
                      READ FULL ARTICLE <ArrowRight size={16} />
                    </div>
                  </div>

                  <div style={{ gridColumn: 'span 5', position: 'relative', minHeight: '320px' }} className="hero-img-col">
                    {featuredBlog.image_url ? (
                      <img src={featuredBlog.image_url} alt={featuredBlog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: '#222222' }} />
                    )}
                  </div>
                </div>
              </Link>
            </AnimatedSection>

            {/* Grid of Other Editorial Articles */}
            {regularBlogs.length > 0 && (
              <div>
                <AnimatedSection>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '1rem' }}>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 4vw, 36px)', color: '#FFFFFF', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      RECENT <span style={{ color: '#E8A020' }}>DISPATCHES</span>
                    </h3>
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: 'rgba(255, 255, 255, 0.4)' }}>
                      {regularBlogs.length} ARTICLES
                    </span>
                  </div>
                </AnimatedSection>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))', gap: '2rem' }}>
                  {regularBlogs.map((blog, idx) => (
                    <AnimatedSection key={blog.id} delay={(idx % 3) * 100}>
                      <Link href={`/blog/${blog.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                        <div 
                          className="news-card"
                          style={{
                            background: '#181818',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            overflow: 'hidden',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {blog.image_url ? (
                            <div style={{ overflow: 'hidden', height: '210px' }}>
                              <img src={blog.image_url} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }} />
                            </div>
                          ) : (
                            <div style={{ width: '100%', height: '210px', background: '#222' }} />
                          )}
                          <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#E8A020', fontWeight: 600, marginBottom: '0.75rem' }}>
                              {format(new Date(blog.published_at), 'MMMM dd, yyyy')}
                            </div>
                            <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 2.2vw, 24px)', color: '#FFFFFF', margin: '0 0 0.75rem', lineHeight: 1.2, textTransform: 'uppercase' }}>
                              {blog.title}
                            </h4>
                            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255, 255, 255, 0.65)', lineHeight: 1.6, margin: '0 0 1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {blog.subheading}
                            </p>
                            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '14px', color: '#E8A020', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                              READ ARTICLE <ArrowRight size={14} />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Hover CSS Effects */}
        <style dangerouslySetInnerHTML={{__html: `
          .featured-editorial-card:hover {
            border-color: rgba(232, 160, 32, 0.5) !important;
            transform: translateY(-4px);
            box-shadow: 0 24px 48px rgba(0,0,0,0.5) !important;
          }
          .news-card:hover {
            border-color: rgba(232, 160, 32, 0.4) !important;
            transform: translateY(-6px);
            box-shadow: 0 16px 32px rgba(0,0,0,0.4) !important;
          }
          .news-card:hover img {
            transform: scale(1.05);
          }
          @media (max-width: 860px) {
            .featured-editorial-card {
              display: flex !important;
              flex-direction: column-reverse !important;
            }
            .hero-img-col {
              min-height: 240px !important;
            }
          }
        `}} />
      </div>

      <Footer />
    </main>
  )
}
