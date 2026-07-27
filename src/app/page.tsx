import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Navbar } from '@/components/Navbar'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Services } from '@/components/Services'
import { Stats } from '@/components/Stats'
import { Projects } from '@/components/Projects'
import { WhyUs } from '@/components/WhyUs'
import { Team } from '@/components/Team'
import { FeaturedBlogs } from '@/components/FeaturedBlogs'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'

export const revalidate = 0 // fetch fresh data

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const [
    { data: services },
    { data: team },
    { data: blogs },
    { data: projects }
  ] = await Promise.all([
    supabase.from('services').select('*').order('created_at', { ascending: true }),
    supabase.from('team_members').select('*').order('order_index', { ascending: true }),
    supabase.from('blogs').select('*').order('published_at', { ascending: false }).limit(3),
    supabase.from('projects').select('*').eq('is_featured', true).order('created_at', { ascending: false })
  ])

  return (
    <main style={{ overflowX: 'hidden' }}>
      <Navbar />
      
      <Hero />
      <About />
      <Services dynamicServices={services || []} />
      <Stats />
      <Projects dynamicProjects={projects || []} />
      <WhyUs />
      <Team members={team || []} />
      <FeaturedBlogs blogs={blogs || []} />
      <Contact />
      
      <Footer />
    </main>
  )
}


