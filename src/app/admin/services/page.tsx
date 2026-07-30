'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Plus, Trash2, Edit2, Loader2, Image as ImageIcon, X, Check, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { AdminPageLoader } from '@/components/admin/LoadingSpinner'

type Service = {
  id: string
  category: string
  title: string
  description: string
  items: string[]
  image_url: string
}

const emptyForm = { category: 'CONSTRUCTION', title: '', description: '', items: '' }

export default function ServicesAdminPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const itemsPerPage = 10

  // Form
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const supabase = createClient()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const fetchServices = async () => {
    const { data } = await supabase.from('services').select('*').order('created_at', { ascending: true })
    if (data) setServices(data)
    setLoading(false)
  }

  useEffect(() => { fetchServices() }, [])

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

  const openEdit = (s: Service) => {
    setForm({ category: s.category, title: s.title, description: s.description, items: s.items.join(', ') })
    setEditingId(s.id)
    setImagePreview(s.image_url)
    setImageFile(null)
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    let image_url = imagePreview || null
    if (imageFile) {
      const fileName = `services/${Date.now()}.${imageFile.name.split('.').pop()}`
      const { data: uploadData } = await supabase.storage.from('mightybee-assets').upload(fileName, imageFile)
      if (uploadData) {
        const { data: publicUrlData } = supabase.storage.from('mightybee-assets').getPublicUrl(fileName)
        image_url = publicUrlData.publicUrl
      }
    }

    const payload = {
      category: form.category,
      title: form.title,
      description: form.description,
      items: form.items.split(',').map(i => i.trim()).filter(Boolean),
      image_url,
      icon_name: 'Wrench'
    }

    if (editingId) {
      await supabase.from('services').update(payload).eq('id', editingId)
    } else {
      await supabase.from('services').insert(payload)
    }

    setIsOpen(false)
    setEditingId(null)
    setSubmitting(false)
    fetchServices()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this service?')) return
    await supabase.from('services').delete().eq('id', id)
    fetchServices()
  }

  const filteredServices = useMemo(() => {
    return services.filter(s => 
      s.title.toLowerCase().includes(search.toLowerCase()) || 
      s.category.toLowerCase().includes(search.toLowerCase())
    )
  }, [services, search])

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage)
  const paginatedServices = filteredServices.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  useEffect(() => { setPage(1) }, [search])

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #333', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', background: '#111', color: '#fff' }
  const labelStyle = { display: 'block', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', color: '#888' }

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 6vw, 38px)', color: '#fff', textTransform: 'uppercase', margin: '0 0 4px' }}>Services</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888', margin: 0 }}>Manage the services you offer to clients</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
          <div style={{ position: 'relative', flex: isMobile ? 1 : 'none', width: isMobile ? 'auto' : '240px' }}>
            <Search size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search services..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 38px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={openCreate}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}
          >
            <Plus size={16} /> ADD SERVICE
          </button>
        </div>
      </div>

      {loading ? <AdminPageLoader label="Loading services..." /> : (
        <div style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          {isMobile ? (
            /* Mobile: card list */
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {paginatedServices.length > 0 ? paginatedServices.map((svc, i) => (
                <div key={svc.id} style={{ padding: '1rem', borderBottom: '1px solid #222', background: i % 2 === 0 ? '#1a1a1a' : '#111', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ flexShrink: 0 }}>
                    {svc.image_url ? (
                      <img src={svc.image_url} alt={svc.title} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px' }} />
                    ) : (
                      <div style={{ width: '56px', height: '56px', background: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'inline-block', fontSize: '10px', fontWeight: 700, color: '#E8A020', letterSpacing: '0.1em', background: 'rgba(232,160,32,0.1)', padding: '1px 7px', borderRadius: '12px', marginBottom: '4px' }}>{svc.category}</span>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '16px', color: '#fff', marginBottom: '4px' }}>{svc.title}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#AAA', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{svc.description}</div>
                    {svc.items.length > 0 && (
                      <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginTop: '6px' }}>
                        {svc.items.slice(0, 3).map(item => (
                          <span key={item} style={{ background: '#222', color: '#ccc', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontFamily: "'DM Sans', sans-serif" }}>{item}</span>
                        ))}
                        {svc.items.length > 3 && <span style={{ fontSize: '10px', color: '#666' }}>+{svc.items.length - 3}</span>}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexShrink: 0 }}>
                    <button onClick={() => openEdit(svc)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', cursor: 'pointer', padding: '7px', borderRadius: '6px' }}>
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(svc.id)} style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.2)', color: '#FF4444', borderRadius: '6px', cursor: 'pointer', padding: '7px' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>No services found.</div>
              )}
            </div>
          ) : (
            /* Desktop: table */
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: '#111' }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '15%' }}>IMAGE</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '25%' }}>SERVICE INFO</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '45%' }}>DESCRIPTION &amp; ITEMS</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '15%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedServices.length > 0 ? (
                    paginatedServices.map((svc, i) => (
                      <tr key={svc.id} style={{ background: i % 2 === 0 ? '#1a1a1a' : '#111' }}>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'top' }}>
                          {svc.image_url ? (
                            <img src={svc.image_url} alt={svc.title} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                          ) : (
                            <div style={{ width: '80px', height: '80px', background: '#222', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                              <ImageIcon size={24} />
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'top' }}>
                          <span style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, color: '#E8A020', letterSpacing: '0.1em', background: 'rgba(232, 160, 32, 0.1)', padding: '2px 8px', borderRadius: '12px', marginBottom: '8px' }}>
                            {svc.category}
                          </span>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '18px', color: '#fff' }}>{svc.title}</div>
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'top' }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#AAA', marginBottom: '12px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {svc.description}
                          </div>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {svc.items.map(item => (
                              <span key={item} style={{ background: '#222', color: '#ccc', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', fontFamily: "'DM Sans', sans-serif" }}>
                                {item}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'top', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button onClick={() => openEdit(svc)} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid #333', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '6px', transition: 'all 0.2s' }}>
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(svc.id)} style={{ background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.2)', color: '#FF4444', borderRadius: '6px', cursor: 'pointer', padding: '8px', transition: 'all 0.2s' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif" }}>No services found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {totalPages > 1 && (
            <div style={{ padding: isMobile ? '0.75rem 1rem' : '1rem 2rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#888' }}>
                Showing {(page - 1) * itemsPerPage + 1}–{Math.min(page * itemsPerPage, filteredServices.length)} of {filteredServices.length} services
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ background: '#1a1a1a', border: '1px solid #333', color: page === 1 ? '#555' : '#fff', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', cursor: page === 1 ? 'not-allowed' : 'pointer' }}>
                  <ChevronLeft size={16} />
                </button>
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} style={{ background: '#1a1a1a', border: '1px solid #333', color: page === totalPages ? '#555' : '#fff', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#1a1a1a', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', border: '1px solid #333' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#1a1a1a', zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '24px', margin: 0, color: '#fff' }}>{editingId ? 'EDIT SERVICE' : 'ADD SERVICE'}</h2>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                <div>
                  <label style={labelStyle}>CATEGORY</label>
                  <select style={inputStyle} value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                    <option value="CONSTRUCTION">CONSTRUCTION</option>
                    <option value="SERVICES">SERVICES</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>SERVICE TITLE</label>
                  <input required style={inputStyle} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="E.g., Property Repair" />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>DESCRIPTION</label>
                  <textarea required rows={3} style={{ ...inputStyle, resize: 'vertical' }} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>BULLET POINTS (COMMA SEPARATED)</label>
                  <input style={inputStyle} value={form.items} onChange={e => setForm(f => ({ ...f, items: e.target.value }))} placeholder="Plumbing, Electrical, Roofing" />
                </div>
                <div style={{ gridColumn: '1/-1' }}>
                  <label style={labelStyle}>COVER IMAGE</label>
                  {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '8px', marginBottom: '0.75rem' }} />}
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px dashed #444', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#aaa', background: '#111' }}>
                    <ImageIcon size={16} />
                    {imageFile ? imageFile.name : 'Choose Image'}
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #333', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsOpen(false)} style={{ flex: 1, padding: '13px', background: '#222', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px' }}>CANCEL</button>
                <button type="submit" disabled={submitting} style={{ flex: 2, padding: '13px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '8px', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> SAVING...</> : <><Check size={16} /> {editingId ? 'UPDATE SERVICE' : 'SAVE SERVICE'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
