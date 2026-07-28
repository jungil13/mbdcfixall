'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Team', href: '/team' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setLoading(false)
  }, [pathname])

  // Prevent body scroll when mobile menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)

    if (href.startsWith('#')) {
      if (isHomePage) {
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        setLoading(true)
        router.push(`/${href}`)
      }
    } else {
      setLoading(true)
      router.push(href)
    }
  }

  const isSolid = scrolled || !isHomePage

  return (
    <>
      {/* Page loading bar */}
      {loading && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', background: '#E8A020', zIndex: 9999, animation: 'loadBar 1s ease-in-out' }}>
          <style>{`@keyframes loadBar { from { width: 0% } to { width: 85% } }`}</style>
        </div>
      )}

      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          transition: 'background 0.3s ease, box-shadow 0.3s ease',
          background: isSolid ? '#111111' : 'transparent',
          boxShadow: isSolid ? '0 2px 20px rgba(0,0,0,0.3)' : 'none',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 1.25rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <img src="/mightyb_logo.png" alt="MightyBee logo" style={{ width: '36px', height: '36px', objectFit: 'contain' }} />
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '18px', letterSpacing: '0.05em', color: '#FFFFFF', lineHeight: 1 }}>
                MIGHTYBEE
              </div>
              <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '10px', color: '#E8A020', letterSpacing: '0.12em', lineHeight: 1.2 }}>
                DEVELOPMENT CORP.
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="navbar-desktop-nav" style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {navLinks.map((link) => {
              const isActive = !link.href.startsWith('#') && pathname === link.href
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600,
                    fontSize: '15px',
                    letterSpacing: '0.1em',
                    color: isActive ? '#E8A020' : '#FFFFFF',
                    textDecoration: 'none',
                    opacity: isActive ? 1 : 0.85,
                    transition: 'opacity 0.2s, color 0.2s',
                    borderBottom: isActive ? '2px solid #E8A020' : '2px solid transparent',
                    paddingBottom: '2px',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.target as HTMLElement).style.opacity = '1'
                    ;(e.target as HTMLElement).style.color = '#E8A020'
                  }}
                  onMouseLeave={(e) => {
                    ;(e.target as HTMLElement).style.opacity = isActive ? '1' : '0.85'
                    ;(e.target as HTMLElement).style.color = isActive ? '#E8A020' : '#FFFFFF'
                  }}
                >
                  {link.label}
                </a>
              )
            })}
          </nav>

          {/* CTA + Mobile toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <a
              href="tel:0323422202"
              className="navbar-phone"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: '#E8A020', textDecoration: 'none' }}
            >
              <Phone size={14} />
              (032) 342 2202
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '14px',
                letterSpacing: '0.12em',
                background: '#E8A020',
                color: '#111111',
                padding: '10px 20px',
                textDecoration: 'none',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#F0B030')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#E8A020')}
            >
              INQUIRE NOW!
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              style={{ display: 'none', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '8px', lineHeight: 0 }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu — full-screen overlay */}
        {menuOpen && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              top: '68px',
              background: '#0D0D0D',
              zIndex: 99,
              display: 'flex',
              flexDirection: 'column',
              padding: '2.5rem 1.25rem',
              gap: '0',
              overflowY: 'auto',
              animation: 'slideDown 0.25s ease-out',
            }}
          >
            <style>{`
              @keyframes slideDown {
                from { opacity: 0; transform: translateY(-12px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>

            {navLinks.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(26px, 6vw, 32px)',
                  letterSpacing: '0.08em',
                  color: '#FFFFFF',
                  textDecoration: 'none',
                  padding: '1rem 0',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  transition: 'color 0.2s, padding-left 0.2s',
                  display: 'block',
                  animationDelay: `${i * 0.05}s`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#E8A020'
                  e.currentTarget.style.paddingLeft = '0.5rem'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#FFFFFF'
                  e.currentTarget.style.paddingLeft = '0'
                }}
              >
                {link.label}
              </a>
            ))}

            {/* Mobile contact info */}
            <div style={{ marginTop: '2.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <a
                href="tel:0323422202"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '15px', color: '#E8A020', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <Phone size={16} />
                (032) 342 2202
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '16px',
                  letterSpacing: '0.12em',
                  background: '#E8A020',
                  color: '#111111',
                  padding: '15px',
                  textDecoration: 'none',
                  textAlign: 'center',
                  display: 'block',
                  marginTop: '0.5rem',
                }}
              >
                GET A FREE QUOTE
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
