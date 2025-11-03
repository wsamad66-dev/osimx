import { defineType, defineField } from 'sanity'

/**
 * Schéma Section Témoignages
 * Gestion des témoignages d'étudiants
 */
export default defineType({
  name: 'testimonials',
  title: 'Testimonials Section',
  type: 'document',
  icon: () => '💬',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Témoignages',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
      initialValue: 'Ce que disent nos étudiants',
    }),
    defineField({
      name: 'testimonialsList',
      title: 'Liste des témoignages',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Nom de l\'étudiant',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Rôle / Études',
              type: 'string',
              description: 'Ex: "Étudiant en Master, Paris"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'content',
              title: 'Témoignage',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required().min(50).max(300),
            },
            {
              name: 'rating',
              title: 'Note',
              type: 'number',
              description: 'Note sur 5',
              validation: (Rule) => Rule.required().min(1).max(5),
              initialValue: 5,
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              description: 'Photo de l\'étudiant (optionnelle)',
              options: {
                hotspot: true,
              },
              fields: [
                {
                  name: 'alt',
                  title: 'Texte alternatif',
                  type: 'string',
                },
              ],
            },
            {
              name: 'country',
              title: 'Pays de destination',
              type: 'string',
              options: {
                list: [
                  { title: '🇫🇷 France', value: 'france' },
                  { title: '🇨🇦 Canada', value: 'canada' },
                  { title: '🇺🇸 USA', value: 'usa' },
                  { title: '🇬🇧 UK', value: 'uk' },
                  { title: '🇮🇹 Italie', value: 'italy' },
                  { title: '🇨🇳 Chine', value: 'china' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image',
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
