import { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { SITE_URL } from '@/lib/seo'
import { GalleryClient } from './GalleryClient'

export const metadata: Metadata = {
  title: 'Work & Project Gallery | MBDC FIX ALL',
  description: 'View photos of our home repair, building maintenance, and facility management work across Cebu.',
  alternates: { canonical: `${SITE_URL}/gallery` }
}

export const revalidate = 0

export default async function GalleryPage() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const { data: gallery } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="bg-[#111111] text-white min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-[100px] lg:pt-[130px] pb-24">
        <GalleryClient initialItems={gallery || []} />
      </div>
      <Footer />
    </main>
  )
}
