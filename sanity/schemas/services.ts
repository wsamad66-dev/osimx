import { defineType, defineField } from 'sanity'

/**
 * Schéma Section Services
 * Gestion des services offerts par l'agence
 */
export default defineType({
  name: 'services',
  title: 'Services Section',
  type: 'document',
  icon: () => '🛠️',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Nos Services',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
      initialValue: 'Un accompagnement complet pour votre projet d\'études',
    }),
    defineField({
      name: 'servicesList',
      title: 'Liste des services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Nom du service',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'icon',
              title: 'Icône (emoji)',
              type: 'string',
              initialValue: '📚',
            },
            {
              name: 'features',
              title: 'Points clés',
              type: 'array',
              of: [{ type: 'string' }],
              description: 'Liste des caractéristiques principales',
            },
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'description',
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
