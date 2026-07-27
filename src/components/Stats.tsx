'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatedSection } from './AnimatedSection'

const stats = [
  { value: 25, suffix: '+', label: 'Years in Business', sublabel: 'Est. 1999' },
  { value: 500, suffix: '+', label: 'Projects Completed', sublabel: 'Across Cebu' },
  { value: 120, suffix: '+', label: 'Expert Team Members', sublabel: 'Engineers & Tradespeople' },
  { value: 98, suffix: '%', label: 'Client Satisfaction', sublabel: 'Based on surveys' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const duration = 1800
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref}>
      <span
        style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(48px, 8vw, 72px)',
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        {count}
        <span style={{ color: '#E8A020' }}>{suffix}</span>
      </span>
    </div>
  )
}

export function Stats() {
  return (
    <section
      className="section-padded"
      style={{
        background: '#111111',
        borderTop: '4px solid #E8A020',
        padding: '5rem 1.25rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Subtle background texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage:
            'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
          backgroundSize: '20px 20px',
        }}
      />

      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px',
          background: 'rgba(255,255,255,0.06)',
          position: 'relative',
        }}
        className="stats-grid"
      >
        {stats.map((stat, i) => (
          <AnimatedSection key={stat.label} delay={i * 100} variant="scale">
            <div
              style={{
                background: '#111111',
                padding: 'clamp(2rem, 5vw, 3rem) clamp(1rem, 4vw, 2.5rem)',
                textAlign: 'center',
                position: 'relative',
                height: '100%',
              }}
            >
              {i < stats.length - 1 && (
                <div
                  style={{
                    position: 'absolute',
                    right: '-1px',
                    top: '20%',
                    bottom: '20%',
                    width: '1px',
                    background: 'rgba(255,255,255,0.08)',
                  }}
                />
              )}
              <Counter target={stat.value} suffix={stat.suffix} />
              <div
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(13px, 2vw, 16px)',
                  color: '#FFFFFF',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginTop: '0.5rem',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.4)',
                  marginTop: '4px',
                }}
              >
                {stat.sublabel}
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </section>
  )
}
