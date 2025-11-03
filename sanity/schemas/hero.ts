import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'array',
      description: 'Main attention-grabbing headline (vous pouvez formater le texte)',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
          ],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
              { title: 'Souligné', value: 'underline' },
            ],
            annotations: [
              {
                name: 'color',
                title: 'Couleur du texte',
                type: 'object',
                fields: [
                  {
                    name: 'value',
                    title: 'Couleur',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Noir (défaut)', value: '#111827' },
                        { title: 'Bleu', value: '#2563EB' },
                        { title: 'Bleu foncé', value: '#1E40AF' },
                        { title: 'Orange', value: '#F97316' },
                        { title: 'Violet', value: '#9333EA' },
                        { title: 'Vert', value: '#10B981' },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'array',
      description: 'Supporting text (vous pouvez formater le texte)',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Gras', value: 'strong' },
              { title: 'Italique', value: 'em' },
            ],
            annotations: [
              {
                name: 'color',
                title: 'Couleur du texte',
                type: 'object',
                fields: [
                  {
                    name: 'value',
                    title: 'Couleur',
                    type: 'string',
                    options: {
                      list: [
                        { title: 'Gris (défaut)', value: '#4B5563' },
                        { title: 'Bleu', value: '#2563EB' },
                        { title: 'Noir', value: '#111827' },
                      ],
                    },
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'urgencyBadge',
      title: 'Urgency Badge Text',
      type: 'string',
      description: 'Texte du badge d\'urgence (ex: "Promotion : 1ère consultation offerte")',
      initialValue: 'Promotion : 1ère consultation offerte (12 places)',
    }),
    defineField({
      name: 'studentsCount',
      title: 'Nombre d\'étudiants accompagnés',
      type: 'string',
      description: 'Nombre d\'étudiants (ex: "500+" ou "1,000+")',
      initialValue: '500+',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'studentsCountText',
      title: 'Texte du compteur d\'étudiants',
      type: 'string',
      description: 'Texte affiché après le nombre (ex: "étudiants déjà accompagnés")',
      initialValue: 'étudiants déjà accompagnés',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'primaryCtaText',
      title: 'Primary CTA Text',
      type: 'string',
      initialValue: 'Start Your Journey',
    }),
    defineField({
      name: 'secondaryCtaText',
      title: 'Secondary CTA Text',
      type: 'string',
      initialValue: 'Learn More',
    }),
    defineField({
      name: 'benefits',
      title: 'Benefits',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon Name',
              type: 'string',
              description: 'Lucide icon name (e.g., Shield, Clock, Award)',
            },
            {
              name: 'title',
              title: 'Benefit Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Benefit Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Active Hero',
      type: 'boolean',
      initialValue: true,
      description: 'Only one hero should be active at a time',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'subheadline',
      media: 'heroImage',
    },
  },
})
