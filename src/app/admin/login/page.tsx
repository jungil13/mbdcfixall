'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import { ShieldAlert, Loader2 } from 'lucide-react'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    console.log('Login attempt:', { data, error })

    if (error) {
      setError(`${error.message} (Status: ${error.status})`)
      setLoading(false)
    } else if (data.session) {
      router.push('/admin/dashboard')
      router.refresh()
    } else {
      setError('Login succeeded but no session was created. Check Supabase settings.')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#111111' }}>
      <div style={{ background: '#1A1A1A', padding: '3rem', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.1)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ width: '48px', height: '48px', background: '#E8A020', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldAlert size={24} color="#111111" />
          </div>
        </div>

        <h1 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 800, fontSize: '28px', color: '#FFFFFF', textAlign: 'center', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
          Admin Login
        </h1>
        <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '14px', color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: '2rem' }}>
          MightyBee Platform Access
        </p>

        {error && (
          <div style={{ background: 'rgba(255, 0, 0, 0.1)', border: '1px solid rgba(255, 0, 0, 0.3)', padding: '12px', color: '#FF6B6B', fontSize: '13px', marginBottom: '1.5rem', fontFamily: "'DM Sans', sans-serif" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em' }}>
              EMAIL ADDRESS
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: '6px', fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: '0.1em' }}>
              PASSWORD
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#FFFFFF', outline: 'none', fontFamily: "'DM Sans', sans-serif" }}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '1rem',
              padding: '14px',
              background: loading ? '#A06A10' : '#E8A020',
              color: '#111111',
              border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: '15px',
              letterSpacing: '0.1em',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {loading && <Loader2 size={16} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />}
            {loading ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
          </button>
        </form>
      </div>
    </div>
  )
}
