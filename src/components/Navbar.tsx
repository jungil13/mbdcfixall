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

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)

    // If it's a hash link (section scroll)
    if (href.startsWith('#')) {
      if (isHomePage) {
        // On home page — just scroll
        const el = document.querySelector(href)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      } else {
        // On another page — navigate home first then scroll
        setLoading(true)
        router.push(`/${href}`)
      }
    } else {
      // Regular page navigation
      setLoading(true)
      router.push(href)
    }
  }

  // Show transparent on home page hero, solid otherwise
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
            padding: '0 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '72px',
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}
          >
            <img src="/mightyb_logo.png" alt="MightyBee logo" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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
                padding: '10px 22px',
                textDecoration: 'none',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = '#F0B030')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = '#E8A020')}
            >
              GET A QUOTE
            </a>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="mobile-menu-btn"
              aria-label="Toggle menu"
              style={{ display: 'none', background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: '4px' }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={{ background: '#111111', padding: '1.5rem 2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '20px', letterSpacing: '0.1em', color: '#FFFFFF', textDecoration: 'none' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
