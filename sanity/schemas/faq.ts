import { defineType, defineField } from 'sanity'

/**
 * Schéma Section FAQ
 * Gestion des questions fréquentes
 */
export default defineType({
  name: 'faq',
  title: 'FAQ Section',
  type: 'document',
  icon: () => '❓',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre de la section',
      type: 'string',
      initialValue: 'Questions Fréquentes',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
      initialValue: 'Trouvez les réponses à vos questions',
    }),
    defineField({
      name: 'questions',
      title: 'Questions et réponses',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'question',
              title: 'Question',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'answer',
              title: 'Réponse',
              type: 'text',
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'category',
              title: 'Catégorie',
              type: 'string',
              options: {
                list: [
                  { title: 'Général', value: 'general' },
                  { title: 'Visa', value: 'visa' },
                  { title: 'Inscriptions', value: 'inscriptions' },
                  { title: 'Logement', value: 'logement' },
                  { title: 'Financement', value: 'financement' },
                ],
              },
            },
          ],
          preview: {
            select: {
              title: 'question',
              subtitle: 'category',
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
