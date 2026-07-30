'use client'

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2, Trash2, Search, ChevronLeft, ChevronRight, Mail, Phone } from 'lucide-react'

type Inquiry = {
  id: string
  name: string
  email: string
  phone: string | null
  service: string | null
  message: string
  created_at: string
}

export default function InquiriesAdminPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [isMobile, setIsMobile] = useState(false)
  const itemsPerPage = 10

  const supabase = createClient()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const fetchInquiries = async () => {
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false })
    if (data) setInquiries(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchInquiries()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this inquiry?')) return
    await supabase.from('inquiries').delete().eq('id', id)
    fetchInquiries()
  }

  const filteredInquiries = useMemo(() => {
    return inquiries.filter(i => 
      i.name.toLowerCase().includes(search.toLowerCase()) || 
      i.email.toLowerCase().includes(search.toLowerCase()) ||
      (i.service && i.service.toLowerCase().includes(search.toLowerCase()))
    )
  }, [inquiries, search])

  const totalPages = Math.ceil(filteredInquiries.length / itemsPerPage)
  const paginatedInquiries = filteredInquiries.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  useEffect(() => {
    setPage(1)
  }, [search])

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(24px, 6vw, 32px)', color: '#fff', textTransform: 'uppercase', margin: '0 0 4px' }}>
            Customer Inquiries
          </h1>
          <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888', margin: 0 }}>Manage and respond to customer messages</p>
        </div>
        <div style={{ position: 'relative', width: isMobile ? '100%' : '300px' }}>
          <Search size={16} color="#888" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search name, email, or service..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 38px', background: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', color: '#fff', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
          />
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#fff' }}><Loader2 className="animate-spin" /></div>
      ) : inquiries.length === 0 ? (
        <div style={{ background: '#1a1a1a', padding: '3rem', textAlign: 'center', borderRadius: '12px', border: '1px solid #222' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#888' }}>No inquiries yet.</p>
        </div>
      ) : (
        <div style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
          {isMobile ? (
            /* Mobile: stacked cards */
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {paginatedInquiries.length > 0 ? paginatedInquiries.map((inq, i) => (
                <div key={inq.id} style={{ padding: '1rem', borderBottom: '1px solid #222', background: i % 2 === 0 ? '#1a1a1a' : '#111', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                    <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '17px', color: '#fff' }}>{inq.name}</div>
                    <button onClick={() => handleDelete(inq.id)} style={{ background: 'rgba(255,68,68,0.1)', border: '1px solid rgba(255,68,68,0.2)', color: '#FF4444', borderRadius: '6px', cursor: 'pointer', padding: '6px', display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={12} color="#E8A020" />
                    <a href={`mailto:${inq.email}`} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#E8A020', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.email}</a>
                  </div>
                  {inq.phone && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Phone size={12} color="#888" />
                      <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#888' }}>{inq.phone}</span>
                    </div>
                  )}
                  {inq.service && (
                    <span style={{ display: 'inline-block', alignSelf: 'flex-start', background: 'rgba(232,160,32,0.1)', border: '1px solid rgba(232,160,32,0.3)', padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, color: '#E8A020' }}>
                      {inq.service.toUpperCase()}
                    </span>
                  )}
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', lineHeight: 1.6, color: '#ccc', whiteSpace: 'pre-wrap', maxHeight: '80px', overflowY: 'auto', marginTop: '2px' }}>
                    {inq.message}
                  </div>
                  <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#666', marginTop: '2px' }}>
                    {new Date(inq.created_at).toLocaleString()}
                  </div>
                </div>
              )) : (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>No matching inquiries found.</div>
              )}
            </div>
          ) : (
            /* Desktop: table */
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ background: '#111' }}>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '25%' }}>CUSTOMER</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '45%' }}>MESSAGE</th>
                    <th style={{ padding: '16px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '20%' }}>DATE</th>
                    <th style={{ padding: '16px 20px', textAlign: 'right', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333', width: '10%' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedInquiries.length > 0 ? (
                    paginatedInquiries.map((inq, i) => (
                      <tr key={inq.id} style={{ background: i % 2 === 0 ? '#1a1a1a' : '#111' }}>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'top' }}>
                          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '18px', color: '#fff', marginBottom: '4px' }}>{inq.name}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#AAA', marginBottom: '4px' }}>
                            <a href={`mailto:${inq.email}`} style={{ color: '#E8A020', textDecoration: 'none' }}>{inq.email}</a>
                          </div>
                          {inq.phone && <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#888' }}>{inq.phone}</div>}
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'top' }}>
                          {inq.service && (
                            <div style={{ display: 'inline-block', background: 'rgba(232, 160, 32, 0.1)', border: '1px solid rgba(232, 160, 32, 0.3)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: '#E8A020', marginBottom: '8px' }}>
                              {inq.service.toUpperCase()}
                            </div>
                          )}
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.6, color: '#ccc', whiteSpace: 'pre-wrap', maxHeight: '100px', overflowY: 'auto' }}>
                            {inq.message}
                          </div>
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'top', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888' }}>
                          {new Date(inq.created_at).toLocaleString()}
                        </td>
                        <td style={{ padding: '20px', borderBottom: '1px solid #222', verticalAlign: 'top', textAlign: 'right' }}>
                          <button onClick={() => handleDelete(inq.id)} style={{ background: 'rgba(255, 68, 68, 0.1)', border: '1px solid rgba(255, 68, 68, 0.2)', color: '#FF4444', borderRadius: '6px', cursor: 'pointer', padding: '8px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}>
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} style={{ padding: '3rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif" }}>No matching inquiries found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ padding: isMobile ? '0.75rem 1rem' : '1rem 2rem', borderTop: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#111', flexWrap: 'wrap', gap: '0.5rem' }}>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#888' }}>
                Showing {(page - 1) * itemsPerPage + 1}–{Math.min(page * itemsPerPage, filteredInquiries.length)} of {filteredInquiries.length}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setPage(p => Math.max(1, p - 1))} 
                  disabled={page === 1}
                  style={{ background: '#1a1a1a', border: '1px solid #333', color: page === 1 ? '#555' : '#fff', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', cursor: page === 1 ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))} 
                  disabled={page === totalPages}
                  style={{ background: '#1a1a1a', border: '1px solid #333', color: page === totalPages ? '#555' : '#fff', padding: '6px 12px', borderRadius: '6px', display: 'flex', alignItems: 'center', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
