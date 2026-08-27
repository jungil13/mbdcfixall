'use client'

import { useState, useEffect } from 'react'
import { Cookie, X, ShieldCheck } from 'lucide-react'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user already made a choice
    const consent = localStorage.getItem('mbdc_cookie_consent')
    if (!consent) {
      // Delay display slightly for smooth page load experience
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1200)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('mbdc_cookie_consent', 'accepted')
    // Also set document cookie for 365 days
    document.cookie = 'mbdc_cookie_consent=accepted; max-age=31536000; path=/; SameSite=Lax'
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('mbdc_cookie_consent', 'declined')
    document.cookie = 'mbdc_cookie_consent=declined; max-age=31536000; path=/; SameSite=Lax'
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div
      role="region"
      aria-label="Cookie Consent"
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        right: '24px',
        maxWidth: '520px',
        zIndex: 99999,
        animation: 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }}
    >
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div
        style={{
          background: 'rgba(20, 20, 20, 0.95)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(232, 160, 32, 0.3)',
          boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.8), 0 0 20px rgba(232, 160, 32, 0.1)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                background: 'rgba(232, 160, 32, 0.15)',
                border: '1px solid rgba(232, 160, 32, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Cookie size={18} color="#E8A020" />
            </div>
            <h4
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: '18px',
                fontWeight: 700,
                color: '#FFFFFF',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                margin: 0,
              }}
            >
              We Value Your Privacy
            </h4>
          </div>

          <button
            onClick={handleDecline}
            aria-label="Close"
            style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.4)',
              cursor: 'pointer',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
          >
            <X size={18} />
          </button>
        </div>

        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '13px',
            lineHeight: 1.55,
            color: 'rgba(255, 255, 255, 0.7)',
            margin: 0,
          }}
        >
          We use cookies to enhance your browsing experience, provide secure features, and analyze our traffic to serve you better.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '10px',
            marginTop: '4px',
          }}
        >
          <button
            onClick={handleDecline}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.08em',
              background: 'transparent',
              color: 'rgba(255, 255, 255, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              padding: '8px 18px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.5)'
              e.currentTarget.style.color = '#FFFFFF'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
            }}
          >
            DECLINE
          </button>

          <button
            onClick={handleAccept}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '13px',
              letterSpacing: '0.08em',
              background: '#E8A020',
              color: '#111111',
              border: 'none',
              padding: '8px 22px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#F0B030')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#E8A020')}
          >
            <ShieldCheck size={15} />
            ACCEPT ALL
          </button>
        </div>
      </div>
    </div>
  )
}
