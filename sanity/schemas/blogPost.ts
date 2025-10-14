import { defineType, defineField } from 'sanity'

/**
 * Schéma Article de Blog
 * Système complet de blog pour L'Étudiant Étranger
 * Support images, rich text, catégories, SEO
 */
export default defineType({
  name: 'blogPost',
  title: 'Articles de Blog',
  type: 'document',
  icon: () => '📝',
  // Groupes pour organiser les champs dans l'interface
  groups: [
    {
      name: 'content',
      title: 'Contenu',
      default: true,
    },
    {
      name: 'metadata',
      title: 'Métadonnées',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    // ===== CONTENU PRINCIPAL =====
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Titre principal de l\'article (50-60 caractères recommandés)',
      validation: (Rule) => Rule.required().min(10).max(100),
      group: 'content',
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'URL de l\'article. Cliquez sur "Generate" pour créer automatiquement',
      options: {
        source: 'title',
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[àáâãäå]/g, 'a')
            .replace(/[èéêë]/g, 'e')
            .replace(/[ìíîï]/g, 'i')
            .replace(/[òóôõö]/g, 'o')
            .replace(/[ùúûü]/g, 'u')
            .replace(/[ç]/g, 'c')
            .replace(/[^a-z0-9-]/g, '')
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'mainImage',
      title: 'Image principale',
      type: 'image',
      description: 'Image de couverture (recommandé: 1200x630px pour réseaux sociaux)',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: 'Description de l\'image pour accessibilité et SEO',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'caption',
          title: 'Légende',
          type: 'string',
          description: 'Crédit photo ou description optionnelle',
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
      description: 'Résumé court de l\'article (120-160 caractères). Apparaît dans les listes et meta description.',
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(200),
      group: 'content',
    }),
    defineField({
      name: 'content',
      title: 'Contenu de l\'article',
      type: 'array',
      description: 'Contenu principal avec texte enrichi, images, citations',
      of: [
        {
          type: 'block',
          // Styles disponibles
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Titre H2', value: 'h2' },
            { title: 'Titre H3', value: 'h3' },
            { title: 'Titre H4', value: 'h4' },
            { title: 'Citation', value: 'blockquote' },
          ],
          // Listes
          lists: [
            { title: 'Liste à puces', value: 'bullet' },
            { title: 'Liste numérotée', value: 'number' },
          ],
          // Formatage de texte
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Souligné', value: 'underline' },
              { title: 'Code', value: 'code' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Lien externe',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel'],
                      }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Ouvrir dans un nouvel onglet',
                    initialValue: true,
                  },
                ],
              },
              {
                name: 'internalLink',
                type: 'object',
                title: 'Lien interne',
                fields: [
                  {
                    name: 'reference',
                    type: 'reference',
                    title: 'Article',
                    to: [{ type: 'blogPost' }],
                  },
                ],
              },
            ],
          },
        },
        // Images dans le contenu
        {
          type: 'image',
          options: {
            hotspot: true,
          },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Texte alternatif',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Légende',
            },
          ],
        },
        // Bloc de citation avancé
        {
          type: 'object',
          name: 'quote',
          title: 'Citation mise en valeur',
          fields: [
            {
              name: 'text',
              type: 'text',
              title: 'Citation',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'author',
              type: 'string',
              title: 'Auteur de la citation',
            },
          ],
          preview: {
            select: {
              title: 'text',
              subtitle: 'author',
            },
          },
        },
        // Bloc d'alerte / CTA
        {
          type: 'object',
          name: 'callout',
          title: 'Encadré informatif',
          fields: [
            {
              name: 'type',
              type: 'string',
              title: 'Type',
              options: {
                list: [
                  { title: '💡 Information', value: 'info' },
                  { title: '✅ Conseil', value: 'tip' },
                  { title: '⚠️ Attention', value: 'warning' },
                  { title: '🎓 Astuce étudiant', value: 'student' },
                ],
              },
              initialValue: 'info',
            },
            {
              name: 'title',
              type: 'string',
              title: 'Titre de l\'encadré',
            },
            {
              name: 'content',
              type: 'text',
              title: 'Contenu',
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: {
              title: 'title',
              type: 'type',
              content: 'content',
            },
            prepare({ title, type, content }) {
              return {
                title: title || 'Encadré',
                subtitle: content?.slice(0, 50) + '...',
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),

    // ===== MÉTADONNÉES =====
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'reference',
      description: 'Sélectionnez l\'auteur de l\'article',
      to: [{ type: 'blogAuthor' }],
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      description: 'Catégorie principale de l\'article',
      options: {
        list: [
          { title: '🇫🇷 Études en France', value: 'etudes-france' },
          { title: '🇨🇦 Études au Canada', value: 'etudes-canada' },
          { title: '🇺🇸 Études aux USA', value: 'etudes-usa' },
          { title: '🇬🇧 Études au UK', value: 'etudes-uk' },
          { title: '📄 Visa & Documents', value: 'visa-documents' },
          { title: '💡 Conseils Étudiants', value: 'conseils' },
          { title: '💬 Témoignages', value: 'testimonials' },
          { title: '📰 Actualités', value: 'news' },
          { title: '💼 Bourses & Financement', value: 'bourses' },
          { title: '🏠 Logement', value: 'logement' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Mots-clés pour filtrage et SEO (3-5 recommandés)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      validation: (Rule) => Rule.max(8),
      group: 'metadata',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
      description: 'Date et heure de publication de l\'article',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
      group: 'metadata',
    }),
    defineField({
      name: 'estimatedReadingTime',
      title: 'Temps de lecture estimé',
      type: 'number',
      description: 'En minutes (calculé automatiquement si vide)',
      placeholder: 'Auto',
      group: 'metadata',
    }),
    defineField({
      name: 'featured',
      title: 'Article mis en avant',
      type: 'boolean',
      description: 'Afficher cet article en premier sur la page blog',
      initialValue: false,
      group: 'metadata',
    }),
    defineField({
      name: 'relatedPosts',
      title: 'Articles connexes',
      type: 'array',
      description: 'Articles suggérés en bas de page (max 3)',
      of: [
        {
          type: 'reference',
          to: [{ type: 'blogPost' }],
        },
      ],
      validation: (Rule) => Rule.max(3),
      group: 'metadata',
    }),

    // ===== SEO =====
    defineField({
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      description: 'Titre optimisé pour les moteurs de recherche (50-60 caractères). Laissez vide pour utiliser le titre principal.',
      validation: (Rule) => Rule.max(70),
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Meta Description',
      type: 'text',
      description: 'Description pour Google (120-160 caractères). Laissez vide pour utiliser le résumé.',
      rows: 3,
      validation: (Rule) => Rule.max(160),
      group: 'seo',
    }),
    defineField({
      name: 'seoKeywords',
      title: 'Mots-clés SEO',
      type: 'array',
      description: 'Mots-clés pour SEO (optionnel)',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      group: 'seo',
    }),
  ],

  // Prévisualisation dans Sanity Studio
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
      category: 'category',
      publishedAt: 'publishedAt',
      featured: 'featured',
    },
    prepare({ title, author, media, category, publishedAt, featured }) {
      const date = publishedAt
        ? new Date(publishedAt).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          })
        : 'Brouillon'

      return {
        title: `${featured ? '⭐ ' : ''}${title}`,
        subtitle: `${author} • ${category} • ${date}`,
        media,
      }
    },
  },

  // Tri par défaut dans Sanity Studio
  orderings: [
    {
      title: 'Date de publication (récent)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Date de publication (ancien)',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Titre (A-Z)',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
})
