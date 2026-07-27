import React from 'react'

interface LoadingSpinnerProps {
  size?: number
  color?: string
  fullPage?: boolean
  label?: string
}

export function LoadingSpinner({ size = 40, color = '#E8A020', fullPage = false, label }: LoadingSpinnerProps) {
  const spinner = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 50 50"
        style={{ animation: 'spin 0.8s linear infinite' }}
      >
        <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray="80 30"
          strokeLinecap="round"
        />
      </svg>
      {label && (
        <span style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: '13px',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.05em'
        }}>
          {label}
        </span>
      )}
    </div>
  )

  if (fullPage) {
    return (
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17,17,17,0.92)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
        backdropFilter: 'blur(4px)'
      }}>
        {spinner}
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem' }}>
      {spinner}
    </div>
  )
}

export function AdminPageLoader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
      <LoadingSpinner size={48} color="#E8A020" label={label} />
    </div>
  )
}
