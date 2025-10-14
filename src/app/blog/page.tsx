import { Suspense } from 'react'
import { Metadata } from 'next'
import { motion } from 'framer-motion'
import { client } from '@/lib/sanity.client'
import { 
  BLOG_POSTS_QUERY, 
  BLOG_POSTS_COUNT_QUERY, 
  BLOG_FEATURED_POSTS_QUERY,
  BLOG_CATEGORIES_QUERY,
  BlogPostPreview 
} from '@/lib/sanity-queries'
import { BlogCard } from '@/components/blog/BlogCard'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { CategoryFilter } from '@/components/blog/CategoryFilter'
import { Pagination } from '@/components/blog/Pagination'
import { BookOpen, Sparkles } from 'lucide-react'

const POSTS_PER_PAGE = 6

export const metadata: Metadata = {
  title: 'Blog - Conseils et Guides pour Étudiants Étrangers | L\'Étudiant Étranger',
  description: 'Découvrez nos guides complets, témoignages d\'étudiants et conseils d\'experts pour réussir vos études à l\'étranger. Visas, bourses, logement et plus.',
  openGraph: {
    title: 'Blog - L\'Étudiant Étranger',
    description: 'Guides, témoignages et conseils pour étudiants internationaux',
    type: 'website',
  },
}

interface BlogPageProps {
  searchParams: Promise<{ page?: string; category?: string; search?: string }>
}

async function getBlogData(page: number, category?: string, search?: string) {
  const start = (page - 1) * POSTS_PER_PAGE
  const end = start + POSTS_PER_PAGE

  const [posts, totalCount, featuredPosts, categories] = await Promise.all([
    client.fetch<BlogPostPreview[]>(BLOG_POSTS_QUERY, { start, end }),
    client.fetch<number>(BLOG_POSTS_COUNT_QUERY),
    client.fetch<BlogPostPreview[]>(BLOG_FEATURED_POSTS_QUERY),
    client.fetch<string[]>(BLOG_CATEGORIES_QUERY),
  ])

  return {
    posts,
    totalCount,
    totalPages: Math.ceil(totalCount / POSTS_PER_PAGE),
    featuredPosts,
    categories,
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const selectedCategory = params.category || 'all'
  const searchTerm = params.search || ''

  const { posts, totalPages, featuredPosts, categories } = await getBlogData(
    currentPage,
    selectedCategory !== 'all' ? selectedCategory : undefined,
    searchTerm
  )

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 md:py-28 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <BookOpen className="w-10 h-10" />
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
              Blog de L'Étudiant Étranger
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
              Guides complets, témoignages inspirants et conseils d'experts pour réussir votre aventure académique à l'étranger
            </p>

            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-lg">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                <span>{posts.length} articles</span>
              </div>
              <div className="flex items-center gap-2">
                <span>📚</span>
                <span>{categories.length} catégories</span>
              </div>
              <div className="flex items-center gap-2">
                <span>🌍</span>
                <span>10+ destinations</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Featured Posts Section */}
          {featuredPosts.length > 0 && currentPage === 1 && (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles className="w-6 h-6 text-amber-500" />
              <h2 className="text-3xl font-bold text-slate-900 font-serif">
                Articles à la une
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post: BlogPostPreview, index: number) => (
                <BlogCard key={post._id} post={post} index={index} />
              ))}
            </div>
          </section>
        )}        {/* Search and Filters */}
        <div className="mb-12 space-y-6">
          <BlogSearch />
          
          <CategoryFilter categories={['all', ...categories]} />
        </div>

        {/* Posts Grid */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 font-serif mb-8">
            {selectedCategory !== 'all' 
              ? `Articles - ${selectedCategory}` 
              : 'Tous les articles'}
          </h2>

          {posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-100 mb-6">
                <BookOpen className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                Aucun article trouvé
              </h3>
              <p className="text-slate-600">
                Essayez de changer vos filtres ou revenez plus tard.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {posts.map((post: BlogPostPreview, index: number) => (
                  <BlogCard 
                    key={post._id} 
                    post={post} 
                    index={index + (currentPage - 1) * POSTS_PER_PAGE} 
                  />
                ))}
              </div>

              {/* Pagination */}
              <Pagination 
                currentPage={currentPage} 
                totalPages={totalPages} 
              />
            </>
          )}
        </section>
      </div>
    </div>
  )
}
