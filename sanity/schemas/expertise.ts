import { defineType, defineField } from 'sanity'

/**
 * Schéma Section "Une expertise prouvée"
 * Affiche les statistiques de l'agence (étudiants accompagnés, taux de réussite, etc.)
 */
export default defineType({
  name: 'expertise',
  title: 'Expertise Section',
  type: 'document',
  icon: () => '📊',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      description: 'Titre principal (ex: "Une expertise prouvée")',
      initialValue: 'Une expertise prouvée',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      description: 'Description courte sous le titre',
      rows: 2,
      initialValue: 'Des résultats concrets qui parlent d\'eux-mêmes',
    }),
    defineField({
      name: 'stats',
      title: 'Statistiques',
      type: 'array',
      description: 'Ajoutez 3-4 statistiques clés',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'number',
              title: 'Nombre',
              type: 'string',
              description: 'Ex: "500+", "98%", "15"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'Ex: "Étudiants accompagnés"',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icône (emoji)',
              type: 'string',
              description: 'Emoji pour représenter la stat',
              initialValue: '🎓',
            },
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'number',
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(3).max(4),
    }),
    defineField({
      name: 'image',
      title: 'Image de fond',
      type: 'image',
      description: 'Image illustrative pour cette section (optionnelle)',
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
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
    },
  },
})
