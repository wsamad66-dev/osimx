import { defineType, defineField } from 'sanity'

/**
 * Partner Schema for Sanity CMS
 * 
 * Allows managing university and partner logos dynamically
 */
export default defineType({
  name: 'partner',
  title: 'Partenaires / Universités',
  type: 'document',
  icon: () => '🎓',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom de l\'université / partenaire',
      type: 'string',
      description: 'Ex: Université de la Sorbonne, McGill University',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Logo de l\'université (PNG avec fond transparent de préférence)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'country',
      title: 'Pays',
      type: 'string',
      description: 'Ex: France, Canada, Belgique',
      options: {
        list: [
          { title: '🇫🇷 France', value: 'France' },
          { title: '🇨🇦 Canada', value: 'Canada' },
          { title: '🇧🇪 Belgique', value: 'Belgique' },
          { title: '🇺🇸 USA', value: 'USA' },
          { title: '🇬🇧 Royaume-Uni', value: 'Royaume-Uni' },
          { title: '🇩🇪 Allemagne', value: 'Allemagne' },
          { title: '🇪🇸 Espagne', value: 'Espagne' },
          { title: '🇨🇭 Suisse', value: 'Suisse' },
          { title: '🇨🇳 Chine', value: 'Chine' },
          { title: '🇯🇵 Japon', value: 'Japon' },
          { title: '🇦🇺 Australie', value: 'Australie' },
        ],
      },
    }),
    defineField({
      name: 'website',
      title: 'Site web (optionnel)',
      type: 'url',
      description: 'URL du site de l\'université',
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Position dans le défilement (1, 2, 3...)',
      initialValue: 10,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isActive',
      title: 'Actif',
      type: 'boolean',
      description: 'Afficher ce partenaire sur le site',
      initialValue: true,
    }),
    defineField({
      name: 'isFeatured',
      title: 'Partenaire vedette',
      type: 'boolean',
      description: 'Mettre en avant ce partenaire',
      initialValue: false,
    }),
    defineField({
      name: 'description',
      title: 'Description (optionnel)',
      type: 'text',
      description: 'Courte description du partenariat',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'country',
      media: 'logo',
      isActive: 'isActive',
      order: 'order',
    },
    prepare({ title, subtitle, media, isActive, order }) {
      return {
        title: `${order}. ${title}`,
        subtitle: `${subtitle || 'Non spécifié'} ${isActive ? '✅' : '❌'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Ordre d\'affichage',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Nom',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Pays',
      name: 'countryAsc',
      by: [{ field: 'country', direction: 'asc' }],
    },
  ],
})
