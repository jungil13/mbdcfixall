import { FeaturedBlogsSkeleton } from '@/components/Skeleton'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

export default function BlogLoading() {
  return (
    <main style={{ background: '#F2EFE8', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <div style={{ flex: 1, paddingTop: 'clamp(90px, 12vw, 120px)', paddingBottom: '7rem' }}>
        {/* Header skeleton */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem', marginBottom: '3.5rem', textAlign: 'center' }}>
          <style>{`
            @keyframes skeletonShimmer {
              0%   { background-position: 200% 0; }
              100% { background-position: -200% 0; }
            }
          `}</style>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
            <div style={{ width: '120px', height: '12px', background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)', backgroundSize: '200% 100%', animation: 'skeletonShimmer 1.5s ease-in-out infinite', borderRadius: '4px' }} />
            <div style={{ width: 'min(340px, 80%)', height: '54px', background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)', backgroundSize: '200% 100%', animation: 'skeletonShimmer 1.5s ease-in-out infinite', borderRadius: '4px' }} />
          </div>
        </div>
        {/* Featured card skeleton */}
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1.25rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: '1.5rem' }}>
          {[0, 1, 2, 3, 4, 5].map(i => (
            <div key={i} style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ height: 'clamp(160px, 20vw, 220px)', background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)', backgroundSize: '200% 100%', animation: 'skeletonShimmer 1.5s ease-in-out infinite' }} />
              <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ width: '40%', height: '12px', background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)', backgroundSize: '200% 100%', animation: 'skeletonShimmer 1.5s ease-in-out infinite', borderRadius: '4px' }} />
                <div style={{ width: '85%', height: '22px', background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)', backgroundSize: '200% 100%', animation: 'skeletonShimmer 1.5s ease-in-out infinite', borderRadius: '4px' }} />
                <div style={{ width: '100%', height: '14px', background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)', backgroundSize: '200% 100%', animation: 'skeletonShimmer 1.5s ease-in-out infinite', borderRadius: '4px' }} />
                <div style={{ width: '70%', height: '14px', background: 'linear-gradient(90deg, rgba(0,0,0,0.06) 25%, rgba(0,0,0,0.12) 50%, rgba(0,0,0,0.06) 75%)', backgroundSize: '200% 100%', animation: 'skeletonShimmer 1.5s ease-in-out infinite', borderRadius: '4px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  )
}
