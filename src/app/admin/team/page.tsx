'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Plus, Trash2, Edit2, Image as ImageIcon, Loader2, X, Check } from 'lucide-react'
import { AdminPageLoader } from '@/components/admin/LoadingSpinner'

type TeamMember = {
  id: string
  name: string
  role: string
  image_url: string
}

const emptyForm = { name: '', role: '' }

export default function TeamAdminPage() {
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  
  // Form state
  const [form, setForm] = useState(emptyForm)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const supabase = createClient()

  const fetchMembers = async () => {
    const { data } = await supabase.from('team_members').select('*').order('order_index', { ascending: true })
    if (data) setMembers(data)
    setLoading(false)
  }

  useEffect(() => { fetchMembers() }, [])

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

  const openEdit = (m: TeamMember) => {
    setForm({ name: m.name, role: m.role })
    setEditingId(m.id)
    setImagePreview(m.image_url)
    setImageFile(null)
    setIsOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    let image_url = imagePreview || null
    if (imageFile) {
      const fileName = `team/${Date.now()}.${imageFile.name.split('.').pop()}`
      const { data: uploadData } = await supabase.storage.from('mightybee-assets').upload(fileName, imageFile)
      if (uploadData) {
        const { data: publicUrlData } = supabase.storage.from('mightybee-assets').getPublicUrl(fileName)
        image_url = publicUrlData.publicUrl
      }
    }

    const payload = { ...form, image_url }

    if (editingId) {
      await supabase.from('team_members').update(payload).eq('id', editingId)
    } else {
      await supabase.from('team_members').insert({ ...payload, order_index: members.length })
    }

    setIsOpen(false)
    setEditingId(null)
    setSubmitting(false)
    fetchMembers()
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this team member?')) return
    await supabase.from('team_members').delete().eq('id', id)
    fetchMembers()
  }

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #E5E5E5', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', background: '#FAFAFA' }
  const labelStyle = { display: 'block', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', color: '#555' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '38px', color: '#111111', textTransform: 'uppercase', margin: '0 0 4px' }}>Team Roster</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#888', margin: 0 }}>Manage your leadership and team members</p>
        </div>
        <button
          onClick={openCreate}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', background: '#111111', color: '#FFFFFF', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', letterSpacing: '0.06em' }}
        >
          <Plus size={18} /> ADD MEMBER
        </button>
      </div>

      {loading ? <AdminPageLoader label="Loading team..." /> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {members.map(member => (
            <div key={member.id} style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EBEBEB', overflow: 'hidden', textAlign: 'center', position: 'relative', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px', zIndex: 10 }}>
                <button onClick={() => openEdit(member)} style={{ width: '32px', height: '32px', background: '#FFFFFF', border: 'none', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <Edit2 size={14} color="#111" />
                </button>
                <button onClick={() => handleDelete(member.id)} style={{ width: '32px', height: '32px', background: '#FFFFFF', border: 'none', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
                  <Trash2 size={14} color="#FF4444" />
                </button>
              </div>
              {member.image_url ? (
                <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '240px', background: 'linear-gradient(135deg, #F0F0F0, #E5E5E5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#CCC' }}>
                  <ImageIcon size={40} />
                </div>
              )}
              <div style={{ padding: '1.25rem' }}>
                <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', margin: '0 0 4px', color: '#111' }}>{member.name}</h3>
                <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#E8A020', fontWeight: 600, margin: 0 }}>{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.25)' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '24px', margin: 0 }}>{editingId ? 'EDIT MEMBER' : 'ADD MEMBER'}</h2>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={labelStyle}>FULL NAME</label>
                <input required style={inputStyle} value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="E.g., Engr. Juan Cruz" />
              </div>
              <div>
                <label style={labelStyle}>ROLE / POSITION</label>
                <input required style={inputStyle} value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} placeholder="E.g., Chief Engineer" />
              </div>
              <div>
                <label style={labelStyle}>PROFILE PHOTO</label>
                {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', marginBottom: '0.75rem', border: '4px solid #F0F0F0' }} />}
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px dashed #CCC', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#888', width: '100%', justifyContent: 'center' }}>
                  <ImageIcon size={16} />
                  {imageFile ? imageFile.name : 'Upload New Photo'}
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              </div>
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #F0F0F0', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsOpen(false)} style={{ flex: 1, padding: '13px', background: '#F5F5F5', color: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px' }}>CANCEL</button>
                <button type="submit" disabled={submitting} style={{ flex: 2, padding: '13px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '8px', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
                  {submitting ? <><Loader2 size={16} className="animate-spin" /> SAVING...</> : <><Check size={16} /> {editingId ? 'UPDATE MEMBER' : 'SAVE MEMBER'}</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
