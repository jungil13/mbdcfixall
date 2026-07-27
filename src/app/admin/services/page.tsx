'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Plus, Trash2, Edit2, Loader2, Image as ImageIcon, X, Check } from 'lucide-react'
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

  // Form
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const supabase = createClient()

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

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #E5E5E5', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', background: '#FAFAFA' }
  const labelStyle = { display: 'block', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', color: '#555' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '38px', color: '#111111', textTransform: 'uppercase', margin: '0 0 4px' }}>Services</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#888', margin: 0 }}>Manage the services you offer to clients</p>
        </div>
        <button
          onClick={openCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '0.06em' }}
        >
          <Plus size={18} /> ADD SERVICE
        </button>
      </div>

      {loading ? <AdminPageLoader label="Loading services..." /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
          {services.map(svc => (
            <div key={svc.id} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '12px', border: '1px solid #EBEBEB', display: 'flex', gap: '1.5rem', alignItems: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              {svc.image_url ? (
                <img src={svc.image_url} alt={svc.title} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px' }} />
              ) : (
                <div style={{ width: '120px', height: '120px', background: 'linear-gradient(135deg, #F0F0F0, #E5E5E5)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CCC' }}>
                  <ImageIcon size={32} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '11px', fontWeight: 700, color: '#E8A020', letterSpacing: '0.1em', background: '#FFF8EC', padding: '2px 8px', borderRadius: '12px' }}>{svc.category}</span>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', margin: '8px 0 4px', color: '#111' }}>{svc.title}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6B6B6B', margin: '0 0 8px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{svc.description}</p>
                <div style={{ fontSize: '12px', color: '#999', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {svc.items.map(item => <span key={item} style={{ background: '#F5F5F5', padding: '2px 8px', borderRadius: '4px' }}>{item}</span>)}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button onClick={() => openEdit(svc)} style={{ background: '#F5F5F5', border: 'none', color: '#111', cursor: 'pointer', padding: '10px', borderRadius: '6px' }}><Edit2 size={16} /></button>
                <button onClick={() => handleDelete(svc.id)} style={{ background: '#FFF5F5', border: 'none', color: '#FF4444', cursor: 'pointer', padding: '10px', borderRadius: '6px' }}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, background: '#FFFFFF', zIndex: 1 }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '24px', margin: 0 }}>{editingId ? 'EDIT SERVICE' : 'ADD SERVICE'}</h2>
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
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px dashed #CCC', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#888' }}>
                    <ImageIcon size={16} />
                    {imageFile ? imageFile.name : 'Choose Image'}
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #F0F0F0', marginTop: '0.5rem' }}>
                <button type="button" onClick={() => setIsOpen(false)} style={{ flex: 1, padding: '13px', background: '#F5F5F5', color: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px' }}>CANCEL</button>
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
