import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'

interface RelatedPost {
  _id: string
  title: string
  slug: string
  mainImage: {
    asset: {
      url: string
    }
    alt: string
  }
  excerpt: string
  category: string
  publishedAt: string
}

interface RelatedPostsProps {
  posts: RelatedPost[]
}

const categoryEmojis: Record<string, string> = {
  'etudes-france': '🇫🇷',
  'etudes-canada': '🇨🇦',
  'etudes-usa': '🇺🇸',
  'etudes-uk': '🇬🇧',
  'visa-documents': '📄',
  'conseils': '💡',
  'testimonials': '💬',
  'news': '📰',
  'bourses': '💼',
  'logement': '🏠',
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <section className="mt-16 py-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Titre de section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-3 font-serif">
            Articles connexes
          </h2>
          <p className="text-slate-600">
            Continuez votre lecture avec ces articles similaires
          </p>
        </motion.div>

        {/* Grille d'articles */}
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt || post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    
                    {/* Badge catégorie */}
                    <div className="absolute top-3 left-3">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-slate-700">
                        {categoryEmojis[post.category] || '📝'} {post.category}
                      </span>
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors font-serif">
                      {post.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4 flex-1">
                      {post.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-xs text-slate-500 pt-3 border-t border-slate-100">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        <time dateTime={post.publishedAt}>
                          {new Date(post.publishedAt).toLocaleDateString('fr-FR', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </time>
                      </div>

                      <div className="flex items-center gap-1 text-blue-600 font-semibold group-hover:gap-2 transition-all">
                        <span>Lire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
