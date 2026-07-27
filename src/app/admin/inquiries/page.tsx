'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Loader2, Trash2 } from 'lucide-react'

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
  const supabase = createClient()

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

  return (
    <div>
      <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '32px', color: '#111111', textTransform: 'uppercase', marginBottom: '2rem' }}>
        Customer Inquiries
      </h1>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem' }}><Loader2 className="animate-spin" /></div>
      ) : inquiries.length === 0 ? (
        <div style={{ background: '#FFFFFF', padding: '3rem', textAlign: 'center', borderRadius: '8px', border: '1px solid #E5E5E5' }}>
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: '#6B6B6B' }}>No inquiries yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {inquiries.map((inq) => (
            <div key={inq.id} style={{ background: '#FFFFFF', padding: '1.5rem', borderRadius: '8px', border: '1px solid #E5E5E5', display: 'flex', gap: '1.5rem' }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', margin: '0 0 4px' }}>{inq.name}</h3>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#6B6B6B', display: 'flex', gap: '1rem' }}>
                      <a href={`mailto:${inq.email}`} style={{ color: '#E8A020', textDecoration: 'none' }}>{inq.email}</a>
                      {inq.phone && <span>{inq.phone}</span>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#999' }}>
                      {new Date(inq.created_at).toLocaleString()}
                    </div>
                    {inq.service && (
                      <div style={{ display: 'inline-block', background: '#F7F4EE', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, color: '#111111', marginTop: '6px' }}>
                        {inq.service.toUpperCase()}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ background: '#F9F9F9', padding: '1rem', borderRadius: '4px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', lineHeight: 1.6, color: '#333', whiteSpace: 'pre-wrap' }}>
                  {inq.message}
                </div>
              </div>
              <div>
                <button onClick={() => handleDelete(inq.id)} style={{ background: 'none', border: 'none', color: '#FF4444', cursor: 'pointer', padding: '8px' }}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
