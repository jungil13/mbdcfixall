import { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { format } from 'date-fns'
import { AnimatedSection } from '@/components/AnimatedSection'
import { ArrowRight } from 'lucide-react'
import { JsonLd } from '@/components/SEO/JsonLd'
import { generateBreadcrumbSchema, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  title: 'Blog & Updates',
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
  const gridBlogs = blogs && blogs.length > 1 ? blogs.slice(1) : []

  return (
    <main style={{ background: '#F2EFE8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, paddingTop: 'clamp(90px, 12vw, 120px)', paddingBottom: '7rem', maxWidth: '1280px', margin: '0 auto', width: '100%', paddingLeft: '1.25rem', paddingRight: '1.25rem' }}>
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
              <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', letterSpacing: '0.18em', color: '#E8A020', fontWeight: 600 }}>
                MIGHTYBEE JOURNAL
              </span>
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
            </div>
            <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1.05, color: '#111111', textTransform: 'uppercase', margin: 0 }}>
              NEWS & <span style={{ color: '#E8A020' }}>INSIGHTS</span>
            </h1>
          </div>
        </AnimatedSection>

        {!featuredBlog ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: '#6B6B6B', fontFamily: "'DM Sans', sans-serif" }}>
            No articles found. Check back later!
          </div>
        ) : (
          <>
            {/* Featured Hero Article */}
            <AnimatedSection delay={100}>
              <Link href={`/blog/${featuredBlog.id}`} style={{ textDecoration: 'none' }}>
                <div
                  className="blog-featured-grid"
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', 
                    gap: '0', 
                    background: '#FFFFFF', 
                    borderRadius: '16px', 
                    overflow: 'hidden', 
                    boxShadow: '0 24px 48px rgba(0,0,0,0.06)',
                    marginBottom: '4rem',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                  }}
                >
                  <div style={{ padding: 'clamp(2rem, 5vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#E8A020', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ width: '8px', height: '8px', background: '#E8A020', borderRadius: '50%' }} />
                      LATEST STORY
                    </div>
                    <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 3.5vw, 42px)', color: '#111111', margin: '0 0 1.5rem', lineHeight: 1.1, textTransform: 'uppercase' }}>
                      {featuredBlog.title}
                    </h2>
                    <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(14px, 1.8vw, 15px)', color: '#555', lineHeight: 1.7, margin: '0 0 2rem' }}>
                      {featuredBlog.subheading}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F0F0F0', paddingTop: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#999' }}>
                        {format(new Date(featuredBlog.published_at), 'MMMM dd, yyyy')}
                      </span>
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', color: '#111', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        READ ARTICLE <ArrowRight size={16} color="#E8A020" />
                      </span>
                    </div>
                  </div>
                  {featuredBlog.image_url ? (
                    <img src={featuredBlog.image_url} alt={featuredBlog.title} style={{ width: '100%', height: '100%', minHeight: 'clamp(240px, 35vw, 400px)', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '100%', minHeight: 'clamp(240px, 35vw, 400px)', background: '#E5E5E5' }} />
                  )}
                </div>
              </Link>
            </AnimatedSection>

            {/* Grid of other articles */}
            {gridBlogs.length > 0 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))', gap: '2rem' }}>
                {gridBlogs.map((blog, index) => (
                  <AnimatedSection key={blog.id} delay={(index % 3) * 100}>
                    <Link href={`/blog/${blog.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                      <div className="blog-card" style={{ background: '#FFFFFF', borderRadius: '12px', overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                        {blog.image_url ? (
                          <div style={{ overflow: 'hidden', height: 'clamp(180px, 22vw, 240px)' }}>
                            <img src={blog.image_url} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} />
                          </div>
                        ) : (
                          <div style={{ width: '100%', height: 'clamp(180px, 22vw, 240px)', background: '#E5E5E5' }} />
                        )}
                        <div style={{ padding: 'clamp(1.25rem, 4vw, 2rem)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#999', marginBottom: '0.75rem', fontWeight: 500 }}>
                            {format(new Date(blog.published_at), 'MMMM dd, yyyy')}
                          </div>
                          <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(20px, 2.5vw, 24px)', color: '#111111', margin: '0 0 0.75rem', lineHeight: 1.2 }}>
                            {blog.title}
                          </h3>
                          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#6B6B6B', lineHeight: 1.6, margin: '0 0 1.5rem', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {blog.subheading}
                          </p>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '14px', color: '#E8A020', letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            READ MORE <ArrowRight size={14} />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </AnimatedSection>
                ))}
              </div>
            )}
            {/* CSS for hover effects on grid cards */}
            <style dangerouslySetInnerHTML={{__html: `
              .blog-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08) !important; }
              .blog-card:hover img { transform: scale(1.05); }
              .blog-featured-grid:hover { transform: translateY(-4px); box-shadow: 0 32px 64px rgba(0,0,0,0.10) !important; }
            `}} />
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
