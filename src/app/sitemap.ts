import { MetadataRoute } from 'next'
import { createClient } from '@supabase/supabase-js'
import { SITE_URL } from '@/lib/seo'

// We create a fresh client here because sitemaps run at build/request time
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/team`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch dynamic blogs
  const { data: blogs } = await supabase
    .from('blogs')
    .select('id, updated_at, published_at')
    .eq('status', 'published')

  if (blogs) {
    blogs.forEach((blog) => {
      routes.push({
        url: `${SITE_URL}/blog/${blog.id}`,
        lastModified: new Date(blog.updated_at || blog.published_at || new Date()),
        changeFrequency: 'monthly',
        priority: 0.6,
      })
    })
  }

  return routes
}
