'use client'

import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'
import { Info, Lightbulb, AlertTriangle, GraduationCap, ExternalLink } from 'lucide-react'

// Types pour les blocs personnalisés
interface ImageBlock {
  _type: 'image'
  asset: {
    _ref: string
  }
  alt?: string
  caption?: string
  hotspot?: {
    x: number
    y: number
  }
}

interface QuoteBlock {
  _type: 'advancedQuote'
  quote: string
  author?: string
  role?: string
}

interface CalloutBlock {
  _type: 'callout'
  type: 'info' | 'tip' | 'warning' | 'student'
  title: string
  content: string
}

interface LinkMark {
  _type: 'link'
  href: string
  external?: boolean
}

// Composants personnalisés pour PortableText
export const portableTextComponents: PortableTextComponents = {
  types: {
    // Rendu des images
    image: ({ value }: { value: ImageBlock }) => {
      if (!value?.asset?._ref) return null

      const imageUrl = urlFor(value).width(1200).height(675).url()

      return (
        <figure className="my-8 rounded-2xl overflow-hidden shadow-lg">
          <div className="relative w-full aspect-video bg-slate-100">
            <Image
              src={imageUrl}
              alt={value.alt || 'Image de l\'article'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
          {value.caption && (
            <figcaption className="px-6 py-4 bg-slate-50 text-sm text-slate-600 italic text-center border-t border-slate-200">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },

    // Rendu des citations avancées
    advancedQuote: ({ value }: { value: QuoteBlock }) => {
      return (
        <blockquote className="my-8 pl-8 border-l-4 border-blue-600 bg-blue-50 rounded-r-2xl py-6 pr-8">
          <p className="text-xl text-slate-900 font-serif italic mb-4">
            "{value.quote}"
          </p>
          {(value.author || value.role) && (
            <footer className="flex items-center gap-2 text-sm text-slate-600">
              <span className="font-bold">{value.author}</span>
              {value.role && (
                <>
                  <span>•</span>
                  <span>{value.role}</span>
                </>
              )}
            </footer>
          )}
        </blockquote>
      )
    },

    // Rendu des callouts
    callout: ({ value }: { value: CalloutBlock }) => {
      const calloutStyles = {
        info: {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          icon: Info,
          iconColor: 'text-blue-600',
          titleColor: 'text-blue-900',
        },
        tip: {
          bg: 'bg-emerald-50',
          border: 'border-emerald-200',
          icon: Lightbulb,
          iconColor: 'text-emerald-600',
          titleColor: 'text-emerald-900',
        },
        warning: {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          icon: AlertTriangle,
          iconColor: 'text-amber-600',
          titleColor: 'text-amber-900',
        },
        student: {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          icon: GraduationCap,
          iconColor: 'text-purple-600',
          titleColor: 'text-purple-900',
        },
      }

      const style = calloutStyles[value.type] || calloutStyles.info
      const Icon = style.icon

      return (
        <div className={`my-8 p-6 rounded-2xl border-2 ${style.bg} ${style.border}`}>
          <div className="flex items-start gap-4">
            <div className={`flex-shrink-0 ${style.iconColor}`}>
              <Icon className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className={`font-bold mb-2 ${style.titleColor}`}>
                {value.title}
              </h4>
              <p className="text-slate-700 leading-relaxed">
                {value.content}
              </p>
            </div>
          </div>
        </div>
      )
    },
  },

  block: {
    // Titres
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-slate-900 font-serif mt-12 mb-6">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-slate-900 font-serif mt-8 mb-4">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold text-slate-900 mt-6 mb-3">
        {children}
      </h4>
    ),

    // Paragraphe normal
    normal: ({ children }) => (
      <p className="text-lg text-slate-700 leading-relaxed mb-6">
        {children}
      </p>
    ),

    // Citation simple
    blockquote: ({ children }) => (
      <blockquote className="my-6 pl-6 border-l-4 border-slate-300 text-slate-600 italic">
        {children}
      </blockquote>
    ),
  },

  list: {
    // Liste à puces
    bullet: ({ children }) => (
      <ul className="my-6 space-y-3 ml-6">
        {children}
      </ul>
    ),

    // Liste numérotée
    number: ({ children }) => (
      <ol className="my-6 space-y-3 ml-6 list-decimal">
        {children}
      </ol>
    ),
  },

  listItem: {
    // Item de liste à puces
    bullet: ({ children }) => (
      <li className="text-lg text-slate-700 leading-relaxed flex items-start gap-3">
        <span className="text-blue-600 font-bold mt-1">•</span>
        <span className="flex-1">{children}</span>
      </li>
    ),

    // Item de liste numérotée
    number: ({ children }) => (
      <li className="text-lg text-slate-700 leading-relaxed ml-2">
        {children}
      </li>
    ),
  },

  marks: {
    // Texte en gras
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),

    // Texte en italique
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),

    // Code inline
    code: ({ children }) => (
      <code className="px-2 py-1 rounded bg-slate-100 text-blue-600 font-mono text-sm">
        {children}
      </code>
    ),

    // Liens
    link: ({ value, children }: { value?: LinkMark; children: React.ReactNode }) => {
      const href = value?.href || '#'
      const isExternal = value?.external || href.startsWith('http')

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 hover:decoration-blue-700 transition-colors inline-flex items-center gap-1"
        >
          {children}
          {isExternal && <ExternalLink className="w-3 h-3" />}
        </a>
      )
    },
  },
}

// Composant wrapper pour PortableText
interface PortableTextRendererProps {
  content: any
  className?: string
}

export function PortableTextRenderer({ content, className = '' }: PortableTextRendererProps) {
  if (!content) return null

  // Ensure content is an array
  const contentArray = Array.isArray(content) ? content : [content]

  return (
    <div className={`prose prose-lg max-w-none ${className}`}>
      <PortableText value={contentArray} components={portableTextComponents} />
    </div>
  )
}
