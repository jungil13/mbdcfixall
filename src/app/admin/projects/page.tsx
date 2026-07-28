'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Plus, Trash2, Edit2, Image as ImageIcon, Loader2, Star, MapPin, Calendar, X, Check, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { AdminPageLoader } from '@/components/admin/LoadingSpinner'

type Project = {
  id: string
  title: string
  subtitle: string | null
  description: string
  image_url: string | null
  category: string
  location: string | null
  year: string | null
  is_featured: boolean
  created_at: string
}

type FormData = {
  title: string
  subtitle: string
  description: string
  category: string
  location: string
  year: string
  is_featured: boolean
}

const emptyForm: FormData = { title: '', subtitle: '', description: '', category: 'CONSTRUCTION', location: '', year: new Date().getFullYear().toString(), is_featured: false }

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const itemsPerPage = 8

  const [form, setForm] = useState<FormData>(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const supabase = createClient()

  const fetchProjects = async () => {
    const { data } = await supabase.from('projects').select('*').order('created_at', { ascending: false })
    if (data) setProjects(data)
    setLoading(false)
  }

  useEffect(() => { fetchProjects() }, [])

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

  const openEdit = (p: Project) => {
    setForm({ title: p.title, subtitle: p.subtitle || '', description: p.description, category: p.category, location: p.location || '', year: p.year || '', is_featured: p.is_featured })
    setEditingId(p.id)
    setImagePreview(p.image_url)
    setImageFile(null)
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    let image_url = imagePreview || null
    if (imageFile) {
      const fileName = `projects/${Date.now()}.${imageFile.name.split('.').pop()}`
      const { data: up } = await supabase.storage.from('mightybee-assets').upload(fileName, imageFile)
      if (up) {
        const { data: pub } = supabase.storage.from('mightybee-assets').getPublicUrl(fileName)
        image_url = pub.publicUrl
      }
    }

    const payload = { ...form, image_url }

    if (editingId) {
      await supabase.from('projects').update(payload).eq('id', editingId)
    } else {
      await supabase.from('projects').insert(payload)
    }

    setIsOpen(false)
    setEditingId(null)
    setSubmitting(false)
    fetchProjects()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    fetchProjects()
  }

  const toggleFeatured = async (p: Project) => {
    await supabase.from('projects').update({ is_featured: !p.is_featured }).eq('id', p.id)
    fetchProjects()
  }

  const filteredProjects = useMemo(() => {
    return projects.filter(p => 
      p.title.toLowerCase().includes(search.toLowerCase()) || 
      p.category.toLowerCase().includes(search.toLowerCase()) ||
      (p.location && p.location.toLowerCase().includes(search.toLowerCase()))
    )
  }, [projects, search])

  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage)
  const paginatedProjects = filteredProjects.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  useEffect(() => { setPage(1) }, [search])

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #333', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', background: '#111', color: '#fff' }
  const labelStyle = { display: 'block', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', color: '#888' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '38px', color: '#fff', textTransform: 'uppercase', margin: '0 0 4px' }}>Projects</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#888', margin: 0 }}>Manage your project portfolio and featured highlights</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', width: '260px' }}>
            <Search size={18} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search projects..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 40px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none' }}
            />
          </div>
          <button
            onClick={openCreate}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '0.06em' }}
          >
            <Plus size={18} /> ADD PROJECT
          </button>
        </div>
      </div>

      {loading ? <AdminPageLoader label="Loading projects..." /> : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            {paginatedProjects.map(project => (
              <div key={project.id} style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative' }}>
                  {project.image_url ? (
                    <img src={project.image_url} alt={project.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  ) : (
                    <div style={{ width: '100%', height: '200px', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                      <ImageIcon size={40} />
                    </div>
                  )}
                  {project.is_featured && (
                    <div style={{ position: 'absolute', top: '12px', left: '12px', background: '#E8A020', color: '#111', padding: '4px 10px', borderRadius: '20px', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '11px', fontWeight: 700, letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={10} fill="#111" /> FEATURED
                    </div>
                  )}
                  <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                    <button onClick={() => openEdit(project)} style={{ width: '32px', height: '32px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>
                      <Edit2 size={14} color="#fff" />
                    </button>
                    <button onClick={() => handleDelete(project.id)} style={{ width: '32px', height: '32px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'background 0.2s' }} onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,0,0,0.8)'} onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}>
                      <Trash2 size={14} color="#FF4444" />
                    </button>
                  </div>
                </div>
                <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ background: 'rgba(232, 160, 32, 0.1)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: '#E8A020', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.06em' }}>{project.category}</span>
                    {project.year && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#222', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', color: '#AAA' }}><Calendar size={10} />{project.year}</span>}
                    {project.location && <span style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#222', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', color: '#AAA' }}><MapPin size={10} />{project.location}</span>}
                  </div>
                  <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', margin: '0 0 4px', color: '#fff' }}>{project.title}</h3>
                  {project.subtitle && <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#E8A020', fontWeight: 600, margin: '0 0 8px' }}>{project.subtitle}</p>}
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#AAA', margin: '0 0 1rem', lineHeight: 1.5, flex: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                  <button
                    onClick={() => toggleFeatured(project)}
                    style={{ alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: project.is_featured ? 'rgba(232, 160, 32, 0.1)' : '#111', color: project.is_featured ? '#E8A020' : '#888', border: `1px solid ${project.is_featured ? 'rgba(232, 160, 32, 0.3)' : '#333'}`, borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', fontWeight: 600, transition: 'all 0.2s' }}
                  >
                    <Star size={12} fill={project.is_featured ? '#E8A020' : 'none'} color={project.is_featured ? '#E8A020' : '#888'} />
                    {project.is_featured ? 'Featured' : 'Set as Featured'}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', padding: '1rem' }}>
              <button 
                onClick={() => setPage(p => Math.max(1, p - 1))} 
                disabled={page === 1}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: page === 1 ? '#555' : '#fff', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
              >
                <ChevronLeft size={18} /> PREV
              </button>
              <div style={{ display: 'flex', alignItems: 'center', padding: '0 12px', color: '#888', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
                Page {page} of {totalPages}
              </div>
              <button 
                onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                disabled={page === totalPages}
                style={{ background: '#1a1a1a', border: '1px solid #333', color: page === totalPages ? '#555' : '#fff', padding: '8px 16px', borderRadius: '8px', display: 'flex', alignItems: 'center', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
              >
                NEXT <ChevronRight size={18} />
              </button>
            </div>
          )}
          {filteredProjects.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif" }}>No matching projects found.</div>
          )}
        </>
      )}

      {/* Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#1a1a1a', borderRadius: '16px', width: '100%', maxWidth: '640px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', border: '1px solid #333' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#1a1a1a', zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '24px', margin: 0, color: '#fff' }}>{editingId ? 'EDIT PROJECT' : 'NEW PROJECT'}</h2>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>PROJECT TITLE *</label>
                  <input required style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="E.g., Cebu Grand Tower" />
                </div>
                <div>
                  <label style={labelStyle}>SUBTITLE / TAGLINE</label>
                  <input style={inputStyle} value={form.subtitle} onChange={e => setForm(f => ({ ...f, subtitle: e.target.value }))} placeholder="E.g., Commercial & Residential" />
                </div>
                <div>
                  <label style={labelStyle}>CATEGORY</label>
                  <select style={inputStyle} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    <option value="CONSTRUCTION">Construction</option>
                    <option value="RENOVATION">Renovation</option>
                    <option value="MAINTENANCE">Maintenance</option>
                    <option value="FACILITY">Facility Services</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>LOCATION</label>
                  <input style={inputStyle} value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} placeholder="E.g., Cebu City" />
                </div>
                <div>
                  <label style={labelStyle}>YEAR</label>
                  <input style={inputStyle} value={form.year} onChange={e => setForm(f => ({ ...f, year: e.target.value }))} placeholder="E.g., 2024" />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>DESCRIPTION *</label>
                  <textarea required rows={4} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Project description..." />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>PROJECT PHOTO</label>
                  {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }} />}
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px dashed #444', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#aaa', background: '#111' }}>
                    <ImageIcon size={16} />
                    {imageFile ? imageFile.name : 'Choose Image'}
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  </label>
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                    <input type="checkbox" checked={form.is_featured} onChange={e => setForm(f => ({ ...f, is_featured: e.target.checked }))} style={{ width: '18px', height: '18px' }} />
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#aaa' }}>Mark as Featured Project (shown on homepage)</span>
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.5rem', borderTop: '1px solid #333' }}>
                <button type="button" onClick={() => setIsOpen(false)} style={{ flex: 1, padding: '13px', background: '#222', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px' }}>CANCEL</button>
                <button type="submit" disabled={submitting} style={{ flex: 2, padding: '13px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '8px', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> SAVING...</> : <><Check size={16} /> {editingId ? 'UPDATE PROJECT' : 'PUBLISH PROJECT'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
