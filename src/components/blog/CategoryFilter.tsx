'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'

interface CategoryFilterProps {
  categories: string[]
}

// Map categories to emojis and labels
const categoryInfo: Record<string, { emoji: string; label: string }> = {
  'all': { emoji: '📚', label: 'Tous les articles' },
  'études-france': { emoji: '🇫🇷', label: 'Études France' },
  'études-canada': { emoji: '🇨🇦', label: 'Études Canada' },
  'études-usa': { emoji: '🇺🇸', label: 'Études USA' },
  'études-uk': { emoji: '🇬🇧', label: 'Études UK' },
  'visa-documents': { emoji: '📄', label: 'Visa & Documents' },
  'conseils': { emoji: '💡', label: 'Conseils' },
  'testimonials': { emoji: '⭐', label: 'Témoignages' },
  'news': { emoji: '📰', label: 'Actualités' },
  'bourses': { emoji: '🎓', label: 'Bourses' },
  'logement': { emoji: '🏠', label: 'Logement' },
}

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category') || 'all'
  
  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    params.delete('page') // Reset to page 1 when changing category
    router.push(`/blog?${params.toString()}`)
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-wrap gap-3"
    >
      {/* Bouton "Tous" */}
      <button
        onClick={() => handleCategoryChange('all')}
        className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          activeCategory === 'all'
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200'
            : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md'
        }`}
      >
        <span className="flex items-center gap-2">
          <span>📚</span>
          <span>Tous les articles</span>
        </span>
      </button>

      {/* Boutons de catégories */}
      {categories.filter(cat => cat !== 'all').map((category) => {
        const info = categoryInfo[category] || { emoji: '📚', label: category }
        return (
          <button
            key={category}
            onClick={() => handleCategoryChange(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
              activeCategory === category
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200'
                : 'bg-white text-slate-700 border-2 border-slate-200 hover:border-blue-300 hover:shadow-md'
            }`}
          >
            <span className="flex items-center gap-2">
              <span>{info.emoji}</span>
              <span>{info.label}</span>
            </span>
          </button>
        )
      })}
    </motion.div>
  )
}
