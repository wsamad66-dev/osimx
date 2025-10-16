import { defineType, defineField } from 'sanity'

/**
 * Schéma Section CTA (Call to Action)
 * Section d'appel à l'action pour encourager l'inscription
 */
export default defineType({
  name: 'cta',
  title: 'CTA Section',
  type: 'document',
  icon: () => '🎯',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre principal',
      type: 'string',
      initialValue: 'Prêt à commencer votre aventure ?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
      initialValue: 'Réservez votre consultation gratuite dès aujourd\'hui',
    }),
    defineField({
      name: 'buttonText',
      title: 'Texte du bouton',
      type: 'string',
      initialValue: 'Réserver une consultation',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Lien du bouton',
      type: 'string',
      initialValue: '/contact',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Couleur de fond',
      type: 'string',
      options: {
        list: [
          { title: 'Bleu', value: 'blue' },
          { title: 'Vert', value: 'green' },
          { title: 'Orange', value: 'orange' },
          { title: 'Violet', value: 'purple' },
        ],
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'features',
      title: 'Points clés',
      type: 'array',
      description: 'Liste des avantages à afficher',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icône (emoji)',
              type: 'string',
              initialValue: '✅',
            },
            {
              name: 'text',
              title: 'Texte',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
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
