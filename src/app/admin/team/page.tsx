'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Plus, Trash2, Edit2, Image as ImageIcon, Loader2, X, Check, Search, ChevronLeft, ChevronRight } from 'lucide-react'
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
  
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const itemsPerPage = 10

  // Form state
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

  const filteredMembers = useMemo(() => {
    return members.filter(m => 
      m.name.toLowerCase().includes(search.toLowerCase()) || 
      m.role.toLowerCase().includes(search.toLowerCase())
    )
  }, [members, search])

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const paginatedMembers = filteredMembers.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  useEffect(() => { setPage(1) }, [search])

  const inputStyle = { width: '100%', padding: '11px 14px', border: '1px solid #333', borderRadius: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', background: '#111', color: '#fff' }
  const labelStyle = { display: 'block', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.06em', color: '#888' }

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 6vw, 38px)', color: '#fff', textTransform: 'uppercase', margin: '0 0 4px' }}>Team Roster</h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888', margin: 0 }}>Manage your leadership and team members</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', width: isMobile ? '100%' : 'auto' }}>
          <div style={{ position: 'relative', flex: isMobile ? 1 : 'none', width: isMobile ? 'auto' : '240px' }}>
            <Search size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search team members..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 38px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
            />
          </div>
          <button
            onClick={openCreate}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', background: '#E8A020', color: '#111', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '14px', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}
          >
            <Plus size={16} /> ADD MEMBER
          </button>
        </div>
      </div>

      {loading ? <AdminPageLoader label="Loading team..." /> : (
        <div style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          {isMobile ? (
            /* Mobile: card list */
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {paginatedMembers.length > 0 ? paginatedMembers.map((member, i) => (
                <div key={member.id} style={{ padding: '1rem', borderBottom: '1px solid #222', background: i % 2 === 0 ? '#1a1a1a' : '#111', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ flexShrink: 0 }}>
                    {member.image_url ? (
                      <img src={member.image_url} alt={member.name} style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '50%' }} />
                    ) : (
                      <div style={{ width: '52px', height: '52px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                        <ImageIcon size={20} />
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '17px', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{member.name}</div>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#E8A020', fontWeight: 600 }}>{member.role}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                    <button onClick={() => openEdit(member)} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid #333', color: '#fff', cursor: 'pointer', padding: '7px', borderRadius: '6px' }}>
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => handleDelete(member.id)} style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.2)', color: '#FF4444', borderRadius: '6px', cursor: 'pointer', padding: '7px' }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              )) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>No team members found.</div>
              )}
            </div>
          ) : (
            /* Desktop: table */
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: '#111' }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '15%' }}>PHOTO</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '40%' }}>NAME</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '30%' }}>ROLE</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '15%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.length > 0 ? (
                    paginatedMembers.map((member, i) => (
                      <tr key={member.id} style={{ background: i % 2 === 0 ? '#1a1a1a' : '#111' }}>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'middle' }}>
                          {member.image_url ? (
                            <img src={member.image_url} alt={member.name} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '50%' }} />
                          ) : (
                            <div style={{ width: '60px', height: '60px', background: '#222', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555' }}>
                              <ImageIcon size={24} />
                            </div>
                          )}
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'middle' }}>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', color: '#fff' }}>{member.name}</div>
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'middle' }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#E8A020', fontWeight: 600 }}>{member.role}</div>
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'middle', textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                            <button onClick={() => openEdit(member)} style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid #333', color: '#fff', cursor: 'pointer', padding: '8px', borderRadius: '6px', transition: 'all 0.2s' }}>
                              <Edit2 size={16} />
                            </button>
                            <button onClick={() => handleDelete(member.id)} style={{ background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.2)', color: '#FF4444', borderRadius: '6px', cursor: 'pointer', padding: '8px', transition: 'all 0.2s' }}>
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif" }}>No team members found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          {totalPages > 1 && (
            <div style={{ padding: isMobile ? '0.75rem 1rem' : '1rem 2rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#888' }}>
                Showing {(page - 1) * itemsPerPage + 1}–{Math.min(page * itemsPerPage, filteredMembers.length)} of {filteredMembers.length} members
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
          <div style={{ background: '#1a1a1a', borderRadius: '16px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 24px 64px rgba(0,0,0,0.5)', border: '1px solid #333' }}>
            <div style={{ padding: '2rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '24px', margin: 0, color: '#fff' }}>{editingId ? 'EDIT MEMBER' : 'ADD MEMBER'}</h2>
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
                {imagePreview && <img src={imagePreview} alt="preview" style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '50%', marginBottom: '0.75rem', border: '4px solid #222' }} />}
                <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 20px', border: '1px dashed #444', borderRadius: '6px', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#aaa', width: '100%', justifyContent: 'center', background: '#111' }}>
                  <ImageIcon size={16} />
                  {imageFile ? imageFile.name : 'Upload New Photo'}
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                </label>
              </div>
              <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid #333', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsOpen(false)} style={{ flex: 1, padding: '13px', background: '#222', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px' }}>CANCEL</button>
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
