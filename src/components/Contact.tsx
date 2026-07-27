'use client'
import { useState } from 'react'
import { MapPin, Phone, Clock, Mail, Send } from 'lucide-react'
import { AnimatedSection } from './AnimatedSection'

const serviceOptions = [
  { value: 'property-repair', label: 'Property Repair' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'facility-services', label: 'Facility Services' },
]

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.')
      setSubmitted(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message.')
    } finally {
      setLoading(false)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(255,255,255,0.12)',
    padding: '14px 16px',
    fontFamily: "'DM Sans', sans-serif",
    fontSize: '14px',
    color: '#FFFFFF',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
    fontSize: '12px',
    letterSpacing: '0.12em',
    color: 'rgba(255,255,255,0.5)',
    display: 'block',
    marginBottom: '6px',
  }

  return (
    <section
      id="contact"
      className="section-padded"
      style={{
        background: '#111111',
        padding: '7rem 1.25rem',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <AnimatedSection>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '1.25rem',
              }}
            >
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  color: '#E8A020',
                  fontWeight: 500,
                }}
              >
                START YOUR PROJECT
              </span>
              <div style={{ width: '32px', height: '2px', background: '#E8A020' }} />
            </div>
            <h2
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800,
                fontSize: 'clamp(30px, 4vw, 54px)',
                lineHeight: 1.05,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              LET&apos;S BUILD <span style={{ color: '#E8A020' }}>TOGETHER</span>
            </h2>
          </div>
        </AnimatedSection>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.5fr',
            gap: '2px',
            background: 'rgba(255,255,255,0.06)',
          }}
          className="contact-grid"
        >
          {/* Contact Info */}
          <AnimatedSection variant="left">
            <div style={{ background: '#1A1A1A', padding: 'clamp(1.5rem, 5vw, 3rem)', height: '100%' }}>
              <h3
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(18px, 3vw, 22px)',
                  color: '#FFFFFF',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  margin: '0 0 2rem',
                }}
              >
                Get In Touch
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                {[
                  {
                    icon: MapPin,
                    label: 'ADDRESS',
                    value: '8WX7+H64, Gov. M. Cuenco Ave\nCebu City, 6000 Cebu',
                  },
                  { icon: Phone, label: 'PHONE', value: '(032) 342 2202' },
                  { icon: Mail, label: 'EMAIL', value: 'info@mightybeecorp.com' },
                  {
                    icon: Clock,
                    label: 'OFFICE HOURS',
                    value: 'Monday – Friday\n8:00 AM – 5:00 PM',
                  },
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          background: '#E8A020',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Icon size={17} color="#111111" />
                      </div>
                      <div>
                        <div
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontWeight: 700,
                            fontSize: '11px',
                            letterSpacing: '0.15em',
                            color: '#E8A020',
                            marginBottom: '4px',
                          }}
                        >
                          {item.label}
                        </div>
                        <div
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '14px',
                            color: 'rgba(255,255,255,0.75)',
                            lineHeight: 1.6,
                            whiteSpace: 'pre-line',
                          }}
                        >
                          {item.value}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <a
                href="https://maps.google.com/?q=8WX7+H64,+Gov.+M.+Cuenco+Ave,+Cebu+City,+6000+Cebu"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginTop: '2.5rem',
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  color: '#E8A020',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(232,160,32,0.3)',
                  paddingBottom: '2px',
                }}
              >
                <MapPin size={14} /> VIEW ON GOOGLE MAPS
              </a>
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection variant="right" delay={150}>
            <div style={{ background: '#161616', padding: 'clamp(1.5rem, 5vw, 3rem)', height: '100%' }}>
              {submitted ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    minHeight: '300px',
                    textAlign: 'center',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: '64px',
                      height: '64px',
                      background: '#E8A020',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Send size={28} color="#111111" />
                  </div>
                  <h3
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 800,
                      fontSize: '28px',
                      color: '#FFFFFF',
                      textTransform: 'uppercase',
                      margin: 0,
                    }}
                  >
                    Message Sent!
                  </h3>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: '15px',
                      color: 'rgba(255,255,255,0.55)',
                      maxWidth: '320px',
                      lineHeight: 1.6,
                    }}
                  >
                    Thank you for reaching out. Our team will contact you within 1 business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setForm({ name: '', email: '', phone: '', service: '', message: '' })
                    }}
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '13px',
                      letterSpacing: '0.1em',
                      background: 'none',
                      border: '1px solid rgba(255,255,255,0.2)',
                      color: 'rgba(255,255,255,0.6)',
                      padding: '10px 22px',
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                    }}
                  >
                    SEND ANOTHER
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                >
                  <div
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}
                    className="form-row"
                  >
                    <div>
                      <label style={labelStyle}>FULL NAME *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Juan dela Cruz"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = '#E8A020')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>EMAIL ADDRESS *</label>
                      <input
                        required
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="juan@example.com"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = '#E8A020')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                    </div>
                  </div>

                  <div
                    style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}
                    className="form-row"
                  >
                    <div>
                      <label style={labelStyle}>PHONE NUMBER</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="+63 917 000 0000"
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = '#E8A020')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>SERVICE NEEDED</label>
                      <select
                        value={form.service}
                        onChange={(e) => setForm({ ...form, service: e.target.value })}
                        style={{ ...inputStyle, appearance: 'none' as const }}
                        onFocus={(e) => (e.target.style.borderColor = '#E8A020')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                      >
                        <option value="" style={{ background: '#1a1a1a' }}>
                          Select a service…
                        </option>
                        {serviceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value} style={{ background: '#1a1a1a' }}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>PROJECT DESCRIPTION *</label>
                    <textarea
                      required
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Briefly describe your project — location, scope, timeline, and budget range…"
                      style={{
                        ...inputStyle,
                        resize: 'vertical',
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = '#E8A020')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(255,255,255,0.12)')}
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: '13px',
                        color: '#FF6B6B',
                        margin: 0,
                        padding: '10px 14px',
                        background: 'rgba(255,107,107,0.08)',
                        border: '1px solid rgba(255,107,107,0.2)',
                      }}
                    >
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                      fontSize: '15px',
                      letterSpacing: '0.12em',
                      background: loading ? '#A06A10' : '#E8A020',
                      color: '#111111',
                      padding: '16px 32px',
                      border: 'none',
                      cursor: loading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      transition: 'background 0.2s',
                      alignSelf: 'flex-start',
                      width: '100%',
                      opacity: loading ? 0.7 : 1,
                    }}
                    onMouseEnter={(e) => {
                      if (!loading)
                        (e.currentTarget as HTMLElement).style.background = '#F0B030'
                    }}
                    onMouseLeave={(e) => {
                      if (!loading)
                        (e.currentTarget as HTMLElement).style.background = '#E8A020'
                    }}
                  >
                    <Send size={16} />
                    {loading ? 'SENDING…' : 'SEND INQUIRY'}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}
