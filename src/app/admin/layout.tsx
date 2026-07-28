'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { 
  LayoutDashboard, 
  MessageSquare, 
  FileText, 
  Wrench, 
  Users,
  LogOut,
  Bell,
  X,
  Mail,
  Menu
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Inquiries', href: '/admin/inquiries', icon: MessageSquare },
  { label: 'Blogs & News', href: '/admin/blogs', icon: FileText },
  { label: 'Services', href: '/admin/services', icon: Wrench },
  { label: 'Projects', href: '/admin/projects', icon: FileText },
  { label: 'Team', href: '/admin/team', icon: Users },
]

type Notification = {
  id: string
  name: string
  email: string
  service: string | null
  created_at: string
  read?: boolean
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [bellOpen, setBellOpen] = useState(false)
  const [pageLoading, setPageLoading] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const bellRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (isMobile) setIsSidebarOpen(false)
  }, [pathname, isMobile])

  useEffect(() => {
    const fetchRecent = async () => {
      const { data } = await supabase
        .from('inquiries')
        .select('id, name, email, service, created_at')
        .order('created_at', { ascending: false })
        .limit(10)
      if (data) setNotifications(data.map(d => ({ ...d, read: false })))
    }
    fetchRecent()
  }, [])

  useEffect(() => {
    const channel = supabase
      .channel('admin-inquiries-realtime')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'inquiries' },
        (payload) => {
          const newInquiry = { ...payload.new as Notification, read: false }
          setNotifications(prev => [newInquiry, ...prev])
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [supabase])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (bellRef.current && !bellRef.current.contains(e.target as Node)) {
        setBellOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setPageLoading(true)
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0a0a0a', color: '#ffffff' }}>
      
      {/* Page loading overlay */}
      {pageLoading && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <svg width={48} height={48} viewBox="0 0 50 50" style={{ animation: 'spin 0.8s linear infinite' }}>
              <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
              <circle cx="25" cy="25" r="20" fill="none" stroke="#E8A020" strokeWidth="4" strokeDasharray="80 30" strokeLinecap="round" />
            </svg>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>Signing out...</span>
          </div>
        </div>
      )}

      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 90, backdropFilter: 'blur(2px)' }}
        />
      )}

      {/* Sidebar */}
      <aside style={{ 
        width: '260px', 
        background: '#111111', 
        display: 'flex', 
        flexDirection: 'column', 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        height: '100vh', 
        zIndex: 100,
        transform: isMobile ? (isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)') : 'translateX(0)',
        transition: 'transform 0.3s ease-in-out',
        borderRight: '1px solid #222'
      }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
           <img src="../mightyb_logo.png" alt="logo" style={{ width: '40px', height:'40px'}}/>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '18px', color: '#FFFFFF', lineHeight: 1 }}>MIGHTYBEE</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#E8A020', letterSpacing: '0.12em', marginTop: '2px' }}>ADMIN PANEL</div>
            </div>
          </div>
          {isMobile && (
            <button onClick={() => setIsSidebarOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
              <X size={20} />
            </button>
          )}
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 1rem', overflowY: 'auto' }}>
          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#888', letterSpacing: '0.15em', fontWeight: 700, marginBottom: '0.75rem', paddingLeft: '12px' }}>
            NAVIGATION
          </div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname.startsWith(item.href)
              return (
                <li key={item.href}>
                  <Link 
                    href={item.href}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '11px 16px',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? '#111111' : '#AAA',
                      background: isActive ? '#E8A020' : 'transparent',
                      transition: 'all 0.15s',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                        e.currentTarget.style.color = '#FFFFFF'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent'
                        e.currentTarget.style.color = '#AAA'
                      }
                    }}
                  >
                    <Icon size={16} />
                    {item.label}
                    {item.href === '/admin/inquiries' && unreadCount > 0 && (
                      <span style={{ marginLeft: 'auto', background: '#FF4444', color: 'white', fontSize: '10px', fontWeight: 700, minWidth: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '9px', padding: '0 4px' }}>
                        {unreadCount}
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div style={{ padding: '1rem', borderTop: '1px solid #222' }}>
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '11px 16px',
              borderRadius: '8px',
              border: 'none',
              background: 'transparent',
              color: '#888',
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,80,80,0.1)'; e.currentTarget.style.color = '#FF6B6B' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#888' }}
          >
            <LogOut size={16} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        marginLeft: isMobile ? '0' : '260px',
        width: isMobile ? '100%' : 'calc(100% - 260px)',
        transition: 'margin 0.3s ease-in-out'
      }}>
        {/* Topbar */}
        <header style={{ 
          height: '64px', 
          background: '#111111', 
          borderBottom: '1px solid #222', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '0 2rem', 
          position: 'sticky', 
          top: 0, 
          zIndex: 50
        }}>
          
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {isMobile && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', marginRight: '1rem', display: 'flex', alignItems: 'center' }}
              >
                <Menu size={24} />
              </button>
            )}
          </div>

          {/* Bell notification */}
          <div ref={bellRef} style={{ position: 'relative' }}>
            <button
              onClick={() => { setBellOpen(!bellOpen); markAllRead() }}
              style={{ position: 'relative', background: bellOpen ? '#222' : 'transparent', border: '1px solid', borderColor: bellOpen ? '#333' : 'transparent', borderRadius: '8px', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.15s', color: '#fff' }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span style={{ position: 'absolute', top: '6px', right: '6px', background: '#FF4444', width: '8px', height: '8px', borderRadius: '50%', border: '2px solid #111' }} />
              )}
            </button>

            {/* Bell dropdown */}
            {bellOpen && (
              <div style={{ position: 'absolute', top: '48px', right: 0, width: '360px', maxWidth: 'calc(100vw - 2rem)', background: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', zIndex: 200, overflow: 'hidden' }}>
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ margin: 0, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '16px', color: '#fff' }}>Notifications</h4>
                    <p style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#888' }}>{notifications.length} recent inquiries</p>
                  </div>
                  <button onClick={() => setBellOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}><X size={16} /></button>
                </div>
                <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
                  {notifications.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#888', fontFamily: "'DM Sans', sans-serif", fontSize: '14px' }}>
                      No inquiries yet
                    </div>
                  ) : (
                    notifications.map(n => (
                      <Link href="/admin/inquiries" key={n.id} onClick={() => setBellOpen(false)} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '1rem 1.25rem', borderBottom: '1px solid #222', textDecoration: 'none', transition: 'background 0.15s' }}
                        onMouseEnter={e => e.currentTarget.style.background = '#222'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                      >
                        <div style={{ width: '36px', height: '36px', background: 'rgba(232, 160, 32, 0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Mail size={16} color="#E8A020" />
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: '14px', color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.name}</div>
                          <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '12px', color: '#AAA', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{n.email}</div>
                          {n.service && <div style={{ display: 'inline-block', background: '#333', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, color: '#fff', marginTop: '4px' }}>{n.service}</div>}
                        </div>
                        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '11px', color: '#666', flexShrink: 0 }}>{new Date(n.created_at).toLocaleDateString()}</div>
                      </Link>
                    ))
                  )}
                </div>
                <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #333' }}>
                  <Link href="/admin/inquiries" onClick={() => setBellOpen(false)} style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', color: '#E8A020', textDecoration: 'none', display: 'block', textAlign: 'center' }}>
                    VIEW ALL INQUIRIES →
                  </Link>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <div style={{ padding: isMobile ? '1.5rem' : '2.5rem', flex: 1, overflowX: 'hidden' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
