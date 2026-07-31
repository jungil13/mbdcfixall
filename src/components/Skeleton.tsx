'use client'

// ─── Reusable Skeleton Primitives ────────────────────────────────────────────

export function SkeletonPulse({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.10) 50%, rgba(255,255,255,0.05) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeletonShimmer 1.5s ease-in-out infinite',
        borderRadius: '4px',
        ...style,
      }}
    />
  )
}

export function SkeletonPulseLight({ style }: { style?: React.CSSProperties }) {
  return (
    <div
      style={{
        background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)',
        backgroundSize: '200% 100%',
        animation: 'skeletonShimmer 1.5s ease-in-out infinite',
        borderRadius: '4px',
        ...style,
      }}
    />
  )
}

// Global keyframe — injected once
export function SkeletonStyles() {
  return (
    <style>{`
      @keyframes skeletonShimmer {
        0%   { background-position: 200% 0; }
        100% { background-position: -200% 0; }
      }
    `}</style>
  )
}

// ─── Blog Card Skeleton (dark theme) ─────────────────────────────────────────

export function BlogCardSkeleton() {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.03)',
      border: '1px solid rgba(255,255,255,0.06)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Image */}
      <SkeletonPulse style={{ height: 'clamp(160px, 20vw, 220px)', borderRadius: 0 }} />
      {/* Content */}
      <div style={{ padding: 'clamp(1.25rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <SkeletonPulse style={{ width: '40%', height: '12px' }} />
        <SkeletonPulse style={{ width: '90%', height: '22px' }} />
        <SkeletonPulse style={{ width: '75%', height: '22px' }} />
        <SkeletonPulse style={{ width: '100%', height: '14px', marginTop: '0.25rem' }} />
        <SkeletonPulse style={{ width: '80%', height: '14px' }} />
      </div>
    </div>
  )
}

// ─── Featured Blogs Section Skeleton ─────────────────────────────────────────

export function FeaturedBlogsSkeleton() {
  return (
    <section id="blog" style={{ background: '#111111', padding: '7rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <SkeletonStyles />
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <SkeletonPulse style={{ width: '120px', height: '10px' }} />
            <SkeletonPulse style={{ width: '300px', height: '48px' }} />
          </div>
          <SkeletonPulse style={{ width: '120px', height: '14px' }} />
        </div>
        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
          {[0, 1, 2].map(i => <BlogCardSkeleton key={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─── Team Card Skeleton ───────────────────────────────────────────────────────

export function TeamCardSkeleton() {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid rgba(0,0,0,0.06)',
      borderRadius: '12px',
      padding: '1.25rem',
      width: '280px',
      flexShrink: 0,
    }}>
      <SkeletonPulseLight style={{ width: '100%', aspectRatio: '4/5', marginBottom: '1.25rem', borderRadius: '8px' }} />
      <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
        <SkeletonPulseLight style={{ width: '70%', height: '22px' }} />
        <SkeletonPulseLight style={{ width: '50%', height: '14px' }} />
      </div>
    </div>
  )
}

// ─── Team Section Skeleton ────────────────────────────────────────────────────

export function TeamSectionSkeleton() {
  return (
    <section id="team" style={{ background: '#FFFFFF', padding: '7rem 0', overflow: 'hidden' }}>
      <SkeletonStyles />
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem', marginBottom: '3rem' }}>
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <SkeletonPulseLight style={{ width: '100px', height: '10px' }} />
          <SkeletonPulseLight style={{ width: '260px', height: '48px' }} />
        </div>
      </div>
      <div style={{ display: 'flex', gap: '2rem', padding: '1rem 1.25rem 2rem', overflowX: 'hidden' }}>
        {[0, 1, 2, 3, 4].map(i => <TeamCardSkeleton key={i} />)}
      </div>
    </section>
  )
}

// ─── Blog Post Page Skeleton ──────────────────────────────────────────────────

export function BlogPostSkeleton() {
  return (
    <main style={{ minHeight: '100vh', background: '#F2EFE8' }}>
      <SkeletonStyles />
      {/* Hero image area */}
      <SkeletonPulseLight style={{ width: '100%', height: 'clamp(280px, 45vw, 480px)', borderRadius: 0 }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', padding: '3rem 1.25rem' }}>
        {/* Meta */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
          <SkeletonPulseLight style={{ width: '80px', height: '12px' }} />
          <SkeletonPulseLight style={{ width: '120px', height: '12px' }} />
        </div>
        {/* Title */}
        <SkeletonPulseLight style={{ width: '90%', height: '52px', marginBottom: '0.75rem' }} />
        <SkeletonPulseLight style={{ width: '65%', height: '52px', marginBottom: '2.5rem' }} />
        {/* Body lines */}
        {[100, 95, 88, 100, 92, 80, 96, 70].map((w, i) => (
          <SkeletonPulseLight key={i} style={{ width: `${w}%`, height: '16px', marginBottom: '0.85rem' }} />
        ))}
        <div style={{ marginTop: '1.5rem' }}>
          {[88, 100, 90, 75].map((w, i) => (
            <SkeletonPulseLight key={i} style={{ width: `${w}%`, height: '16px', marginBottom: '0.85rem' }} />
          ))}
        </div>
      </div>
    </main>
  )
}
