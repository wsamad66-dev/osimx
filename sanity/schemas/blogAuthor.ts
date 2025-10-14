import { defineType, defineField } from 'sanity'

/**
 * Schéma Auteur de Blog
 * Permet de gérer les auteurs d'articles avec photo et bio
 */
export default defineType({
  name: 'blogAuthor',
  title: 'Auteurs',
  type: 'document',
  icon: () => '✍️',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
      type: 'string',
      description: 'Nom de l\'auteur (ex: Marie Dupont)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'URL-friendly identifier (ex: marie-dupont)',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Photo de profil',
      type: 'image',
      description: 'Photo professionnelle de l\'auteur (recommandé: 400x400px)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'array',
      description: 'Courte bio de l\'auteur (2-3 lignes)',
      of: [
        {
          type: 'block',
          styles: [],
          lists: [],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
          },
        },
      ],
    }),
    defineField({
      name: 'role',
      title: 'Rôle / Titre',
      type: 'string',
      description: 'Ex: Conseiller en orientation, Expert visa, etc.',
      placeholder: 'Conseiller en orientation',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Réseaux sociaux',
      type: 'object',
      fields: [
        {
          name: 'linkedin',
          title: 'LinkedIn',
          type: 'url',
          description: 'URL complète du profil LinkedIn',
        },
        {
          name: 'twitter',
          title: 'Twitter/X',
          type: 'url',
          description: 'URL complète du profil Twitter',
        },
        {
          name: 'email',
          title: 'Email',
          type: 'string',
          description: 'Adresse email professionnelle',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
})
