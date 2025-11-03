'use client'

import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface PaginationProps {
  currentPage: number
  totalPages: number
  baseUrl?: string
}

export function Pagination({ currentPage, totalPages, baseUrl = '/blog' }: PaginationProps) {
  if (totalPages <= 1) return null

  // Générer les numéros de page à afficher
  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = []
    const showEllipsisThreshold = 7

    if (totalPages <= showEllipsisThreshold) {
      // Afficher toutes les pages si peu nombreuses
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Toujours afficher la première page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('ellipsis')
      }

      // Pages autour de la page actuelle
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis')
      }

      // Toujours afficher la dernière page
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-center justify-center gap-2 mt-12"
    >
      {/* Bouton Précédent */}
      {currentPage > 1 ? (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Précédent</span>
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-400 cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Précédent</span>
        </button>
      )}

      {/* Numéros de page */}
      <div className="flex items-center gap-2">
        {pageNumbers.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-slate-400">
                ...
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <Link
              key={page}
              href={`${baseUrl}?page=${page}`}
              className={`
                relative px-4 py-2 rounded-xl font-bold transition-all
                ${isActive 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-110' 
                  : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-500 hover:text-blue-600 hover:shadow-md'
                }
              `}
            >
              {page}
              
              {/* Indicateur animé pour la page active */}
              {isActive && (
                <motion.div
                  layoutId="activePage"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </div>

      {/* Bouton Suivant */}
      {currentPage < totalPages ? (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border-2 border-slate-200 text-slate-700 font-semibold hover:border-blue-500 hover:text-blue-600 hover:shadow-md transition-all"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <button
          disabled
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 border-2 border-slate-200 text-slate-400 cursor-not-allowed"
        >
          <span className="hidden sm:inline">Suivant</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      )}
    </motion.div>
  )
}
