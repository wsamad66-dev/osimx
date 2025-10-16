import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { client, urlFor } from '@/lib/sanity.client'
import { 
  BLOG_POST_BY_SLUG_QUERY, 
  BLOG_SLUGS_QUERY,
  BlogPost 
} from '@/lib/sanity-queries'
import { PortableTextRenderer } from '@/components/blog/PortableTextRenderer'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { NewsletterCTA } from '@/components/blog/NewsletterCTA'
import { ArrowLeft, Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

// Générer les routes statiques pour tous les articles
export async function generateStaticParams() {
  const slugs = await client.fetch<Array<{ slug: string }>>(BLOG_SLUGS_QUERY)
  return slugs.map((item: { slug: string }) => ({
    slug: item.slug,
  }))
}

// Générer les métadonnées SEO dynamiques
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch<BlogPost>(BLOG_POST_BY_SLUG_QUERY, { slug })

  if (!post) {
    return {
      title: 'Article non trouvé',
    }
  }

  const imageUrl = post.mainImage 
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : undefined

  return {
    title: post.seoTitle || `${post.title} | Blog L'Étudiant Étranger`,
    description: post.seoDescription || post.excerpt,
    keywords: post.seoKeywords,
    authors: post.author ? [{ name: post.author.name }] : [],
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: post.author ? [post.author.name] : [],
      images: imageUrl ? [{ url: imageUrl, width: 1200, height: 630 }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: imageUrl ? [imageUrl] : [],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await client.fetch<BlogPost>(BLOG_POST_BY_SLUG_QUERY, { slug })

  if (!post) {
    notFound()
  }

  const publishedDate = post.publishedAt 
    ? format(new Date(post.publishedAt), 'dd MMMM yyyy', { locale: fr })
    : ''

  // Mapper les emojis pour les catégories
  const categoryEmojis: Record<string, string> = {
    'études-france': '🇫🇷',
    'études-canada': '🇨🇦',
    'études-usa': '🇺🇸',
    'études-uk': '🇬🇧',
    'visa-documents': '📄',
    'conseils': '💡',
    'testimonials': '⭐',
    'news': '📰',
    'bourses': '🎓',
    'logement': '🏠',
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section avec Image */}
      <article className="relative">
        {/* Image de couverture */}
        {post.mainImage && (
          <div className="relative w-full h-[60vh] bg-slate-900">
            <Image
              src={urlFor(post.mainImage).width(1920).height(1080).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover opacity-90"
              priority
              sizes="100vw"
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          </div>
        )}

        {/* Header Content */}
        <div className="relative container mx-auto px-4">
          <div className={`max-w-4xl mx-auto ${post.mainImage ? '-mt-32' : 'pt-32'}`}>
            {/* Back Buttons */}
            <div className="flex items-center gap-3 mb-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Accueil</span>
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white hover:shadow-lg transition-all"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Blog</span>
              </Link>
            </div>

            {/* Category Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white font-bold text-sm shadow-lg">
                <span>{categoryEmojis[post.category] || '📚'}</span>
                <span>{post.category}</span>
              </span>
              {post.featured && (
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500 text-white font-bold text-sm shadow-lg">
                  <span>⭐</span>
                  <span>À la une</span>
                </span>
              )}
            </div>

            {/* Title */}
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 font-serif ${post.mainImage ? 'text-white' : 'text-slate-900'}`}>
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className={`text-xl md:text-2xl mb-8 ${post.mainImage ? 'text-white/90' : 'text-slate-600'}`}>
              {post.excerpt}
            </p>

            {/* Meta Info */}
            <div className={`flex flex-wrap items-center gap-6 pb-8 ${post.mainImage ? 'text-white/90' : 'text-slate-600'}`}>
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden bg-slate-200 ring-4 ring-white/20">
                      <Image
                        src={urlFor(post.author.image).width(96).height(96).url()}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="font-bold">{post.author.name}</span>
                    </div>
                    {post.author.role && (
                      <p className="text-sm opacity-75">{post.author.role}</p>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.publishedAt}>{publishedDate}</time>
              </div>

              {post.estimatedReadingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.estimatedReadingTime} min</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Article Content */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <PortableTextRenderer content={post.content} />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-3">
                  {post.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full bg-slate-100 text-slate-700 text-sm hover:bg-slate-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share Buttons */}
            <div className="mt-12 pt-8 border-t border-slate-200">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-4">
                Partager cet article
              </h3>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                  <span>Facebook</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500 text-white hover:bg-sky-600 transition-colors">
                  <Twitter className="w-4 h-4" />
                  <span>Twitter</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-700 text-white hover:bg-blue-800 transition-colors">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </button>
                <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          {post.author && post.author.bio && (
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
              <h3 className="text-2xl font-bold text-slate-900 font-serif mb-6">
                À propos de l'auteur
              </h3>
              <div className="flex flex-col md:flex-row gap-6">
                {post.author.image && (
                  <div className="relative w-24 h-24 rounded-full overflow-hidden bg-slate-200 flex-shrink-0">
                    <Image
                      src={urlFor(post.author.image).width(192).height(192).url()}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-slate-900 mb-1">
                    {post.author.name}
                  </h4>
                  {post.author.role && (
                    <p className="text-slate-600 mb-4">{post.author.role}</p>
                  )}
                  <div className="text-slate-700 prose prose-lg">
                    <PortableTextRenderer content={post.author.bio} />
                  </div>
                  {post.author.socialLinks && (
                    <div className="flex items-center gap-4 mt-4">
                      {post.author.socialLinks.linkedin && (
                        <a
                          href={post.author.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-700"
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {post.author.socialLinks.twitter && (
                        <a
                          href={post.author.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sky-500 hover:text-sky-600"
                        >
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Newsletter CTA */}
          <NewsletterCTA />

          {/* Related Posts */}
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts posts={post.relatedPosts} />
          )}
        </div>
      </div>
    </div>
  )
}
