'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { MessageSquare, FileText, Users, Wrench, TrendingUp } from 'lucide-react'


type Stats = {
  inquiries: number
  blogs: number
  team: number
  services: number
}

type RecentInquiry = {
  id: string
  name: string
  email: string
  service: string | null
  created_at: string
}

export default function DashboardPage() {
  const supabase = createClient()
  const [stats, setStats] = useState<Stats>({ inquiries: 0, blogs: 0, team: 0, services: 0 })
  const [recent, setRecent] = useState<RecentInquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const fetchStats = async () => {
    const [
      { count: inquiriesCount },
      { count: blogsCount },
      { count: teamCount },
      { count: servicesCount },
    ] = await Promise.all([
      supabase.from('inquiries').select('*', { count: 'exact', head: true }),
      supabase.from('blogs').select('*', { count: 'exact', head: true }),
      supabase.from('team_members').select('*', { count: 'exact', head: true }),
      supabase.from('services').select('*', { count: 'exact', head: true }),
    ])
    setStats({
      inquiries: inquiriesCount ?? 0,
      blogs: blogsCount ?? 0,
      team: teamCount ?? 0,
      services: servicesCount ?? 0,
    })

    const { data: recentData } = await supabase
      .from('inquiries')
      .select('id, name, email, service, created_at')
      .order('created_at', { ascending: false })
      .limit(5)
    if (recentData) setRecent(recentData)
    setLoading(false)
  }

  useEffect(() => {
    fetchStats()

    const channel = supabase
      .channel('dashboard-realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'inquiries' }, () => {
        fetchStats()
      })
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'blogs' }, () => {
        fetchStats()
      })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const statCards = [
    { label: 'Total Inquiries', value: stats.inquiries, icon: MessageSquare, color: '#4CAF50', bg: 'rgba(76, 175, 80, 0.1)' },
    { label: 'Published Blogs', value: stats.blogs, icon: FileText, color: '#2196F3', bg: 'rgba(33, 150, 243, 0.1)' },
    { label: 'Services Listed', value: stats.services, icon: Wrench, color: '#E8A020', bg: 'rgba(232, 160, 32, 0.1)' },
    { label: 'Team Members', value: stats.team, icon: Users, color: '#9C27B0', bg: 'rgba(156, 39, 176, 0.1)' },
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.75rem' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ background: '#1a1a1a', padding: '1.1rem', borderRadius: '12px', border: '1px solid #333', animation: 'pulse 1.5s ease-in-out infinite' }}>
              <div style={{ height: '12px', background: '#333', borderRadius: '4px', marginBottom: '10px', width: '60%' }} />
              <div style={{ height: '30px', background: '#333', borderRadius: '4px', width: '40%' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>

      {/* Header */}
      <div style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
          <TrendingUp size={16} color="#E8A020" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#888', fontWeight: 600 }}>Live dashboard — updates automatically</span>
          <span style={{ width: '7px', height: '7px', background: '#4CAF50', borderRadius: '50%', display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: 'clamp(26px, 6vw, 38px)', color: '#fff', textTransform: 'uppercase', margin: 0 }}>
          Dashboard
        </h1>
      </div>

      {/* Stat Cards — 2 columns on mobile, 4 on desktop */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: isMobile ? '0.75rem' : '1.5rem', marginBottom: '2rem' }}>
        {statCards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} style={{ background: '#1a1a1a', padding: isMobile ? '1rem' : '1.75rem', borderRadius: '12px', border: '1px solid #222', display: 'flex', flexDirection: 'column', gap: '0.75rem', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: isMobile ? '10px' : '13px', color: '#AAA', fontWeight: 600, margin: '0 0 6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{card.label}</p>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: isMobile ? '32px' : '42px', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{card.value}</span>
                </div>
                <div style={{ width: isMobile ? '34px' : '48px', height: isMobile ? '34px' : '48px', background: card.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginLeft: '8px' }}>
                  <Icon size={isMobile ? 16 : 22} color={card.color} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Inquiries */}
      <div style={{ background: '#1a1a1a', borderRadius: '12px', border: '1px solid #222', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
        <div style={{ padding: isMobile ? '0.9rem 1.1rem' : '1.5rem 2rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: isMobile ? '17px' : '22px', margin: 0, color: '#fff' }}>Recent Inquiries</h2>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#4CAF50', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', background: '#4CAF50', borderRadius: '50%', animation: 'blink 2s ease-in-out infinite' }} />
            LIVE
          </span>
        </div>
        {recent.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif" }}>
            No inquiries yet. They will appear here in real-time!
          </div>
        ) : isMobile ? (
          /* Mobile: stacked card rows */
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {recent.map((inq, i) => (
              <div key={inq.id} style={{ padding: '0.9rem 1.1rem', borderBottom: i < recent.length - 1 ? '1px solid #222' : 'none', background: i % 2 === 0 ? '#1a1a1a' : '#111', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 700, color: '#fff' }}>{inq.name}</span>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#666', flexShrink: 0 }}>
                    {new Date(inq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#888', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{inq.email}</span>
                {inq.service && (
                  <span style={{ display: 'inline-block', alignSelf: 'flex-start', marginTop: '4px', background: 'rgba(232, 160, 32, 0.1)', border: '1px solid rgba(232, 160, 32, 0.3)', padding: '2px 8px', borderRadius: '20px', fontSize: '10px', fontWeight: 700, color: '#E8A020' }}>
                    {inq.service}
                  </span>
                )}
              </div>
            ))}
          </div>
        ) : (
          /* Desktop: table */
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
              <thead>
                <tr style={{ background: '#111' }}>
                  {['Customer', 'Email', 'Service', 'Date'].map(h => (
                    <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #333' }}>{h.toUpperCase()}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recent.map((inq, i) => (
                  <tr key={inq.id} style={{ background: i % 2 === 0 ? '#1a1a1a' : '#111' }}>
                    <td style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#fff', borderBottom: '1px solid #222' }}>{inq.name}</td>
                    <td style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#AAA', borderBottom: '1px solid #222' }}>{inq.email}</td>
                    <td style={{ padding: '14px 20px', borderBottom: '1px solid #222' }}>
                      {inq.service ? (
                        <span style={{ display: 'inline-block', background: 'rgba(232, 160, 32, 0.1)', border: '1px solid rgba(232, 160, 32, 0.3)', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: '#E8A020' }}>
                          {inq.service}
                        </span>
                      ) : <span style={{ color: '#555' }}>—</span>}
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888', borderBottom: '1px solid #222' }}>
                      {new Date(inq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
