import { Metadata } from 'next'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { SITE_URL, SITE_NAME } from '@/lib/seo'
import { JsonLd } from '@/components/SEO/JsonLd'

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const { data: blog } = await supabase.from('blogs').select('*').eq('id', params.id).single()

  if (!blog) return {}

  const url = `${SITE_URL}/blog/${blog.id}`

  return {
    title: blog.title,
    description: blog.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      url: url,
      type: 'article',
      publishedTime: blog.published_at,
      images: blog.image_url ? [{ url: blog.image_url }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.excerpt,
      images: blog.image_url ? [blog.image_url] : [],
    },
  }
}

export default async function BlogPostLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
  )

  const { data: blog } = await supabase.from('blogs').select('*').eq('id', params.id).single()

  const articleSchema = blog ? {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": blog.title,
    "image": blog.image_url ? [blog.image_url] : [],
    "datePublished": blog.published_at,
    "dateModified": blog.updated_at || blog.published_at,
    "author": {
      "@type": "Person",
      "name": "MBDC FIX ALL Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/mightyb_logo.png`
      }
    }
  } : null

  return (
    <>
      {articleSchema && <JsonLd schema={articleSchema} />}
      {children}
    </>
  )
}
