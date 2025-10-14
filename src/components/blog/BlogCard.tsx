import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calendar, Clock, User } from 'lucide-react'
import type { BlogPostPreview } from '@/lib/sanity-queries'

interface BlogCardProps {
  post: BlogPostPreview
  index?: number
}

// Mapping des catégories vers leurs emojis et couleurs
const categoryStyles: Record<string, { emoji: string; color: string; bg: string }> = {
  'etudes-france': { emoji: '🇫🇷', color: 'text-blue-700', bg: 'bg-blue-50' },
  'etudes-canada': { emoji: '🇨🇦', color: 'text-red-700', bg: 'bg-red-50' },
  'etudes-usa': { emoji: '🇺🇸', color: 'text-indigo-700', bg: 'bg-indigo-50' },
  'etudes-uk': { emoji: '🇬🇧', color: 'text-purple-700', bg: 'bg-purple-50' },
  'visa-documents': { emoji: '📄', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  'conseils': { emoji: '💡', color: 'text-amber-700', bg: 'bg-amber-50' },
  'testimonials': { emoji: '💬', color: 'text-pink-700', bg: 'bg-pink-50' },
  'news': { emoji: '📰', color: 'text-slate-700', bg: 'bg-slate-50' },
  'bourses': { emoji: '💼', color: 'text-green-700', bg: 'bg-green-50' },
  'logement': { emoji: '🏠', color: 'text-orange-700', bg: 'bg-orange-50' },
}

// Labels lisibles pour les catégories
const categoryLabels: Record<string, string> = {
  'etudes-france': 'Études en France',
  'etudes-canada': 'Études au Canada',
  'etudes-usa': 'Études aux USA',
  'etudes-uk': 'Études au UK',
  'visa-documents': 'Visa & Documents',
  'conseils': 'Conseils Étudiants',
  'testimonials': 'Témoignages',
  'news': 'Actualités',
  'bourses': 'Bourses & Financement',
  'logement': 'Logement',
}

export function BlogCard({ post, index = 0 }: BlogCardProps) {
  const categoryStyle = categoryStyles[post.category] || categoryStyles['news']
  const categoryLabel = categoryLabels[post.category] || post.category

  // Format date
  const publishDate = new Date(post.publishedAt).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-56 overflow-hidden bg-slate-100">
            {post.mainImage?.asset?.url ? (
              <Image
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                <span className="text-6xl">{categoryStyle.emoji}</span>
              </div>
            )}
            
            {/* Badge catégorie */}
            <div className="absolute top-4 left-4">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${categoryStyle.bg} ${categoryStyle.color} backdrop-blur-sm`}>
                <span>{categoryStyle.emoji}</span>
                {categoryLabel}
              </span>
            </div>

            {/* Badge "Featured" si article mis en avant */}
            {post.featured && (
              <div className="absolute top-4 right-4">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg">
                  <span>⭐</span>
                  <span>À la une</span>
                </span>
              </div>
            )}
          </div>

          {/* Contenu */}
          <div className="p-6 flex-1 flex flex-col">
            {/* Titre */}
            <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors font-serif">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-slate-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            {/* Métadonnées */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-4">
                {/* Auteur */}
                <div className="flex items-center gap-1.5">
                  {post.author.image?.asset?.url ? (
                    <Image
                      src={post.author.image.asset.url}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                  <span className="font-medium">{post.author.name}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={post.publishedAt}>{publishDate}</time>
                </div>
              </div>

              {/* Temps de lecture */}
              {post.estimatedReadingTime && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{post.estimatedReadingTime} min</span>
                </div>
              )}
            </div>
          </div>

          {/* Barre de couleur au bas */}
          <div className={`h-1 w-full ${categoryStyle.bg} group-hover:h-2 transition-all duration-300`} />
        </div>
      </Link>
    </motion.article>
  )
}
