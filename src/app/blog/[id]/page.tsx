'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Heart, MessageSquare, Send, ArrowLeft, Share2 } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { format } from 'date-fns'
import Link from 'next/link'
import { AnimatedSection } from '@/components/AnimatedSection'
import { BlogPostSkeleton } from '@/components/Skeleton'

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const [blog, setBlog] = useState<any>(null)
  const [comments, setComments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Comment form
  const [authorName, setAuthorName] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  // Like system
  const [hasLiked, setHasLiked] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: blogData } = await supabase.from('blogs').select('*').eq('id', params.id).single()
      if (blogData) {
        setBlog(blogData)
        setLikesCount(blogData.likes || 0)
      }
      
      const { data: commentsData } = await supabase.from('blog_comments').select('*').eq('blog_id', params.id).order('created_at', { ascending: true })
      if (commentsData) setComments(commentsData)
      
      setLoading(false)
    }
    
    fetchData()
  }, [params.id, supabase])

  const handleLike = async () => {
    if (hasLiked || !blog) return
    setHasLiked(true)
    setLikesCount(prev => prev + 1)
    
    await supabase.from('blogs').update({ likes: likesCount + 1 }).eq('id', blog.id)
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!authorName.trim() || !content.trim()) return
    
    setSubmitting(true)
    const newComment = { blog_id: blog.id, author_name: authorName, content }
    const { data } = await supabase.from('blog_comments').insert(newComment).select().single()
    
    if (data) {
      setComments([...comments, data])
      setAuthorName('')
      setContent('')
    } else {
      alert('Failed to post comment.')
    }
    setSubmitting(false)
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <BlogPostSkeleton />
        <Footer />
      </>
    )
  }
  
  if (!blog) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F2EFE8' }}>
        <div style={{ textAlign: 'center', padding: '0 1.25rem' }}>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 'clamp(32px, 6vw, 48px)', fontWeight: 800 }}>Article Not Found</h1>
          <Link href="/blog" style={{ color: '#E8A020', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>Return to Journal</Link>
        </div>
      </main>
    )
  }

  return (
    <main style={{ background: '#111111', color: '#FFFFFF', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <div style={{ flex: 1, paddingTop: '72px' }}>
        {/* Massive Hero Section */}
        <AnimatedSection>
          <div style={{ width: '100%', height: 'clamp(320px, 50vw, 60vh)', minHeight: '340px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {blog.image_url ? (
              <img src={blog.image_url} alt={blog.title} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <div style={{ position: 'absolute', inset: 0, background: '#111' }} />
            )}
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(17,17,17,0.4) 0%, rgba(17,17,17,0.95) 100%)' }} />
            
            <div style={{ position: 'relative', zIndex: 10, maxWidth: '900px', width: '100%', padding: '0 1.25rem', textAlign: 'center', marginTop: 'clamp(2rem, 8vw, 10vh)' }}>
              <Link
                href="/blog"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#FFFFFF', opacity: 0.8, textDecoration: 'none', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', marginBottom: '1.5rem', transition: 'opacity 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.8'}
              >
                <ArrowLeft size={16} /> Back to Journal
              </Link>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#E8A020', fontWeight: 700, letterSpacing: '0.15em', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span>{format(new Date(blog.published_at), 'MMMM dd, yyyy')}</span>
                <span style={{ width: '4px', height: '4px', background: '#E8A020', borderRadius: '50%' }} />
                <span>MIGHTYBEE INSIGHTS</span>
              </div>
              
              <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(28px, 5.5vw, 68px)', lineHeight: 1.05, color: '#FFFFFF', margin: '0 0 1.5rem', textTransform: 'uppercase', textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
                {blog.title}
              </h1>
            </div>
          </div>
        </AnimatedSection>

        {/* Article Body */}
        <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 1.25rem', position: 'relative', zIndex: 20, marginTop: 'clamp(-2rem, -4vw, -4vh)' }}>
          
          <AnimatedSection delay={200}>
            <div style={{ background: '#181818', border: '1px solid rgba(255,255,255,0.08)', padding: 'clamp(1.5rem, 5vw, 4rem)', borderRadius: '16px', boxShadow: '0 24px 48px rgba(0,0,0,0.3)', marginBottom: '3rem' }}>
              
              <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(16px, 2vw, 21px)', color: 'rgba(255,255,255,0.85)', lineHeight: 1.7, margin: '0 0 2.5rem', fontWeight: 400, fontStyle: 'italic', borderLeft: '4px solid #E8A020', paddingLeft: '1.25rem' }}>
                {blog.subheading}
              </p>

              {/* Dynamic Content Body */}
              <div 
                className="article-body"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 'clamp(15px, 1.8vw, 17px)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.9, fontWeight: 400 }}
                dangerouslySetInnerHTML={{ __html: blog.body.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br />') }}
              />

              {/* Share & Like Actions */}
              <div
                className="blog-actions-row"
                style={{ marginTop: '3.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}
              >
                <button 
                  onClick={handleLike}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', background: hasLiked ? 'rgba(232,160,32,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${hasLiked ? '#E8A020' : 'rgba(255,255,255,0.1)'}`, color: hasLiked ? '#E8A020' : '#FFFFFF', borderRadius: '30px', cursor: hasLiked ? 'default' : 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '15px', transition: 'all 0.2s', flex: '1 1 auto', justifyContent: 'center' }}
                >
                  <Heart size={18} fill={hasLiked ? '#E8A020' : 'none'} color={hasLiked ? '#E8A020' : '#FFFFFF'} />
                  {likesCount} {likesCount === 1 ? 'Like' : 'Likes'}
                </button>
                
                <button 
                  onClick={() => navigator.clipboard.writeText(window.location.href).then(() => alert('Link copied!'))}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', borderRadius: '30px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '15px', transition: 'background 0.2s', flex: '1 1 auto', justifyContent: 'center' }}
                >
                  <Share2 size={18} />
                  Share Article
                </button>
              </div>
            </div>
          </AnimatedSection>

          {/* Comments Section */}
          <AnimatedSection delay={300}>
            <div style={{ marginBottom: '6rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 3.5vw, 32px)', color: '#FFFFFF', textTransform: 'uppercase', margin: 0 }}>
                  Discussion
                </h3>
                <span style={{ background: '#E8A020', color: '#111', padding: '2px 12px', borderRadius: '20px', fontFamily: "'DM Sans', sans-serif", fontWeight: 700, fontSize: '14px' }}>
                  {comments.length}
                </span>
              </div>

              {/* Leave a Comment */}
              <div style={{ background: '#FFFFFF', padding: 'clamp(1.5rem, 4vw, 3rem)', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', marginBottom: '2.5rem' }}>
                <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 'clamp(18px, 2.5vw, 22px)', marginBottom: '1.5rem', color: '#111' }}>Join the conversation</h4>
                <form onSubmit={handleCommentSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <input 
                    required
                    placeholder="Your Email" 
                    value={authorName}
                    onChange={e => setAuthorName(e.target.value)}
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', outline: 'none', background: '#FAFAFA', color: '#111111', transition: 'border-color 0.2s' }} 
                    onFocus={e => e.currentTarget.style.borderColor = '#E8A020'}
                    onBlur={e => e.currentTarget.style.borderColor = '#EBEBEB'}
                  />
                  <textarea 
                    required
                    rows={4} 
                    placeholder="What are your thoughts?"
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    style={{ width: '100%', padding: '14px 16px', border: '1px solid #EBEBEB', borderRadius: '8px', fontFamily: "'DM Sans', sans-serif", fontSize: '15px', outline: 'none', resize: 'vertical', background: '#FAFAFA', color: '#111111', transition: 'border-color 0.2s' }}
                    onFocus={e => e.currentTarget.style.borderColor = '#E8A020'}
                    onBlur={e => e.currentTarget.style.borderColor = '#EBEBEB'} 
                  />
                  <button 
                    type="submit"
                    disabled={submitting}
                    style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '16px', letterSpacing: '0.05em', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'background 0.2s', width: '100%', justifyContent: 'center' }}
                    onMouseEnter={e => { if(!submitting) e.currentTarget.style.background = '#E8A020'; e.currentTarget.style.color = '#111' }}
                    onMouseLeave={e => { if(!submitting) e.currentTarget.style.background = '#111111'; e.currentTarget.style.color = '#FFFFFF' }}
                  >
                    <Send size={16} /> {submitting ? 'POSTING...' : 'PUBLISH'}
                  </button>
                </form>
              </div>

              {/* Comment List */}
              {comments.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {comments.map((c, i) => (
                    <AnimatedSection key={c.id} delay={i * 80}>
                      <div style={{ background: '#FFFFFF', padding: 'clamp(1.25rem, 3vw, 2rem)', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ width: '40px', height: '40px', background: '#E8A020', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#111', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '18px', flexShrink: 0 }}>
                              {c.author_name.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', color: '#111111' }}>{c.author_name}</span>
                          </div>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#999' }}>{format(new Date(c.created_at), 'MMM dd, yyyy')}</span>
                        </div>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#555', margin: 0, lineHeight: 1.6, paddingLeft: 'clamp(0px, 5vw, 52px)' }}>{c.content}</p>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              )}
            </div>
          </AnimatedSection>

        </div>
      </div>
      
      <Footer />
      
      <style dangerouslySetInnerHTML={{__html: `
        .article-body p { margin-bottom: 1.5em; }
        .article-body strong { color: #111; font-weight: 700; }
        .article-body a { color: #E8A020; text-decoration: underline; }
        @media (max-width: 600px) {
          .blog-actions-row { flex-direction: column !important; }
          .blog-actions-row button { width: 100% !important; }
        }
      `}} />
    </main>
  )
}
