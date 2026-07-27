'use client'
import { Phone, MapPin, Mail, Facebook, Instagram, Youtube } from 'lucide-react'

const footerLinks: Record<string, string[]> = {
  Company: ['About Us', 'Our Team', 'Careers', 'News & Updates'],
  Services: [
    'Residential Construction',
    'Commercial Buildings',
    'Property Repair',
    'Maintenance',
    'Facility Services',
  ],
  Projects: ['Arcadia Heights', 'BPO Tower Cebu', 'Casa Miel Villas', 'Pacific Mall Expansion'],
  Support: ['Get a Quote', 'FAQ', 'Privacy Policy', 'Terms of Service'],
}

export function Footer() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer style={{ background: '#0A0A0A', borderTop: '3px solid #E8A020' }}>
      {/* Main footer */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '5rem 2rem 3rem',
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
          gap: '3rem',
        }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div>
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}
          >
            <img
              src="/mightyb_logo.png"
              alt="MightyBee logo"
              style={{ width: '40px', height: '40px', objectFit: 'contain' }}
            />
            <div>
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800,
                  fontSize: '18px',
                  letterSpacing: '0.05em',
                  color: '#FFFFFF',
                  lineHeight: 1,
                }}
              >
                MIGHTYBEE
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '10px',
                  color: '#E8A020',
                  letterSpacing: '0.12em',
                }}
              >
                DEVELOPMENT CORP.
              </div>
            </div>
          </div>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: '14px',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.45)',
              margin: '0 0 1.5rem',
              fontWeight: 300,
            }}
          >
            Building Cebu&apos;s future since 1999. A PCAB-licensed construction and development
            company dedicated to quality, integrity, and on-time delivery.
          </p>

          {/* Contact blurbs */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}
          >
            {[
              { icon: MapPin, text: '8WX7+H64, Gov. M. Cuenco Ave, Cebu City' },
              { icon: Phone, text: '(032) 342 2202' },
              { icon: Mail, text: 'info@mightybeecorp.com' },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                  <Icon size={13} color="#E8A020" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '13px',
                      color: 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Social icons */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {[
              { icon: Facebook, label: 'Facebook' },
              { icon: Instagram, label: 'Instagram' },
              { icon: Youtube, label: 'YouTube' },
            ].map(({ icon: Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                style={{
                  width: '36px',
                  height: '36px',
                  background: 'rgba(255,255,255,0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = '#E8A020')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.07)')
                }
              >
                <Icon size={15} color="#FFFFFF" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([title, links]) => (
          <div key={title}>
            <div
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: '13px',
                letterSpacing: '0.15em',
                color: '#E8A020',
                marginBottom: '1.25rem',
              }}
            >
              {title.toUpperCase()}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {links.map((link) => (
                <a
                  key={link}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault()
                    if (title === 'Services') scrollTo('#services')
                    else if (title === 'Projects') scrollTo('#projects')
                    else if (link === 'Get a Quote') scrollTo('#contact')
                  }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: '13px',
                    color: 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => ((e.target as HTMLElement).style.color = '#E8A020')}
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = 'rgba(255,255,255,0.45)')
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          padding: '1.5rem 2rem',
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          © {new Date().getFullYear()} Mightybee Development Corp. All rights reserved.
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '12px',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          PCAB Licensed · Cebu City, Philippines
        </span>
      </div>
    </footer>
  )
}
