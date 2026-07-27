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

    // Realtime: re-fetch stats whenever a new inquiry comes in
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
    { label: 'Total Inquiries', value: stats.inquiries, icon: MessageSquare, color: '#4CAF50', bg: '#F0FAF0' },
    { label: 'Published Blogs', value: stats.blogs, icon: FileText, color: '#2196F3', bg: '#F0F7FF' },
    { label: 'Services Listed', value: stats.services, icon: Wrench, color: '#E8A020', bg: '#FFF8EC' },
    { label: 'Team Members', value: stats.team, icon: Users, color: '#9C27B0', bg: '#F9F0FF' },
  ]

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {[1,2,3,4].map(i => (
            <div key={i} style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #EBEBEB', animation: 'pulse 1.5s ease-in-out infinite' }}>
              <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
              <div style={{ height: '14px', background: '#F0F0F0', borderRadius: '4px', marginBottom: '12px', width: '60%' }} />
              <div style={{ height: '36px', background: '#F0F0F0', borderRadius: '4px', width: '40%' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
          <TrendingUp size={20} color="#E8A020" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#999', fontWeight: 600 }}>Live dashboard — updates automatically</span>
          <span style={{ width: '8px', height: '8px', background: '#4CAF50', borderRadius: '50%', display: 'inline-block', animation: 'blink 2s ease-in-out infinite' }} />
          <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
        </div>
        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '38px', color: '#111111', textTransform: 'uppercase', margin: 0 }}>
          Dashboard
        </h1>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
        {statCards.map(card => {
          const Icon = card.icon
          return (
            <div key={card.label} style={{ background: '#FFFFFF', padding: '1.75rem', borderRadius: '12px', border: '1px solid #EBEBEB', display: 'flex', flexDirection: 'column', gap: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#888', fontWeight: 600, margin: '0 0 8px' }}>{card.label}</p>
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: '42px', fontWeight: 800, color: '#111111', lineHeight: 1 }}>{card.value}</span>
                </div>
                <div style={{ width: '48px', height: '48px', background: card.bg, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={22} color={card.color} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Inquiries */}
      <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EBEBEB', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
        <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '22px', margin: 0 }}>Recent Inquiries</h2>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#4CAF50', fontWeight: 600 }}>
            <span style={{ width: '6px', height: '6px', background: '#4CAF50', borderRadius: '50%', animation: 'blink 2s ease-in-out infinite' }} />
            LIVE
          </span>
        </div>
        {recent.length === 0 ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#999', fontFamily: "'DM Sans', sans-serif" }}>
            No inquiries yet. They will appear here in real-time!
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#FAFAFA' }}>
                {['Customer', 'Email', 'Service', 'Date'].map(h => (
                  <th key={h} style={{ padding: '12px 20px', textAlign: 'left', fontFamily: "'Barlow Condensed', sans-serif", fontSize: '13px', fontWeight: 700, color: '#888', letterSpacing: '0.08em', borderBottom: '1px solid #F0F0F0' }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((inq, i) => (
                <tr key={inq.id} style={{ background: i % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }}>
                  <td style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', fontWeight: 600, color: '#111111', borderBottom: '1px solid #F5F5F5' }}>{inq.name}</td>
                  <td style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#6B6B6B', borderBottom: '1px solid #F5F5F5' }}>{inq.email}</td>
                  <td style={{ padding: '14px 20px', borderBottom: '1px solid #F5F5F5' }}>
                    {inq.service ? (
                      <span style={{ display: 'inline-block', background: '#FFF8EC', border: '1px solid #F5D9A0', padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: 700, color: '#A06010' }}>
                        {inq.service}
                      </span>
                    ) : <span style={{ color: '#CCC' }}>—</span>}
                  </td>
                  <td style={{ padding: '14px 20px', fontFamily: "'DM Sans', sans-serif", fontSize: '13px', color: '#999', borderBottom: '1px solid #F5F5F5' }}>
                    {new Date(inq.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
