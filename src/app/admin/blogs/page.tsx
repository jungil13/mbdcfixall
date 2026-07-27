'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Plus, Trash2, Edit2, Loader2, Image as ImageIcon, X, Check } from 'lucide-react'
import { AdminPageLoader } from '@/components/admin/LoadingSpinner'
import { format } from 'date-fns'

type Blog = {
  id: string
  title: string
  subheading: string
  body: string
  image_url: string
  published_at: string
}

const emptyForm = { title: '', subheading: '', body: '' }

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  // Form state
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const supabase = createClient()

  const fetchBlogs = async () => {
    const { data } = await supabase.from('blogs').select('*').order('published_at', { ascending: false })
    if (data) setBlogs(data)
    setLoading(false)
  }

  useEffect(() => { fetchBlogs() }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) setImagePreview(URL.createObjectURL(file))
    else setImagePreview(null)
  }

  const openCreate = () => {
    setForm(emptyForm)
    setEditingId(null)
    setImageFile(null)
    setImagePreview(null)
    setIsOpen(true)
  }

  const openEdit = (b: Blog) => {
    setForm({ title: b.title, subheading: b.subheading, body: b.body })
    setEditingId(b.id)
    setImagePreview(b.image_url)
    setImageFile(null)
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    let image_url = imagePreview || null
    if (imageFile) {
      const fileName = `blogs/${Date.now()}.${imageFile.name.split('.').pop()}`
      const { data: uploadData } = await supabase.storage.from('mightybee-assets').upload(fileName, imageFile)
      if (uploadData) {
        const { data: publicUrlData } = supabase.storage.from('mightybee-assets').getPublicUrl(fileName)
        image_url = publicUrlData.publicUrl
      }
    }

    const payload = { title: form.title, subheading: form.subheading, body: form.body, image_url }

    if (editingId) {
      await supabase.from('blogs').update(payload).eq('id', editingId)
    } else {
      await supabase.from('blogs').insert(payload)
    }

    setIsOpen(false)
    setEditingId(null)
    setSubmitting(false)
    fetchBlogs()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return
    await supabase.from('blogs').delete().eq('id', id)
    fetchBlogs()
  }

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #E5E5E5', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', background: '#FAFAFA' }
  const labelStyle = { display: 'block', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', color: '#555' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '38px', color: '#111111', textTransform: 'uppercase', margin: '0 0 4px' }}>Blog & News</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#888', margin: 0 }}>Publish articles, updates, and announcements</p>
        </div>
        <button
          onClick={openCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '0.06em' }}
        >
          <Plus size={18} /> NEW POST
        </button>
      </div>

      {loading ? <AdminPageLoader label="Loading posts..." /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
          {blogs.map(blog => (
            <div key={blog.id} style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EBEBEB', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px', zIndex: 10 }}>
                  <button onClick={() => openEdit(blog)} style={{ width: '32px', height: '32px', background: '#FFFFFF', border: 'none', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <Edit2 size={14} color="#111" />
                  </button>
                  <button onClick={() => handleDelete(blog.id)} style={{ width: '32px', height: '32px', background: '#FFFFFF', border: 'none', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                    <Trash2 size={14} color="#FF4444" />
                  </button>
                </div>
                {blog.image_url ? (
                  <img src={blog.image_url} alt={blog.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '100%', height: '180px', background: 'linear-gradient(135deg, #F0F0F0, #E5E5E5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CCC' }}>
                    <ImageIcon size={40} />
                  </div>
                )}
              </div>
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#999', marginBottom: '8px', fontWeight: 500 }}>{format(new Date(blog.published_at), 'MMMM dd, yyyy')}</div>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', margin: '0 0 0.5rem', lineHeight: 1.2 }}>{blog.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6B6B6B', margin: '0', flex: 1, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{blog.subheading}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '720px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#FFFFFF', zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '24px', margin: 0 }}>{editingId ? 'EDIT POST' : 'NEW POST'}</h2>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>TITLE *</label>
                <input required style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="E.g., 2026 Housing Trends in Cebu" />
              </div>
              <div>
                <label style={labelStyle}>SUBHEADING / EXCERPT</label>
                <input style={inputStyle} value={form.subheading} onChange={e => setForm(f => ({ ...f, subheading: e.target.value }))} placeholder="A brief summary of the article..." />
              </div>
              <div>
                <label style={labelStyle}>COVER IMAGE</label>
                {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }} />}
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px dashed #CCC', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#888' }}>
                  <ImageIcon size={16} />
                  {imageFile ? imageFile.name : 'Choose Image'}
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              </div>
              <div>
                <label style={labelStyle}>BODY CONTENT *</label>
                <textarea required rows={12} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }} value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} placeholder="Write your full article here..." />
              </div>
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #F0F0F0', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsOpen(false)} style={{ flex: 1, padding: '13px', background: '#F5F5F5', color: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px' }}>CANCEL</button>
                <button type="submit" disabled={submitting} style={{ flex: 2, padding: '13px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '8px', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> SAVING...</> : <><Check size={16} /> {editingId ? 'UPDATE POST' : 'PUBLISH POST'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
