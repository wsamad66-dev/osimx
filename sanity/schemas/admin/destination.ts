import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'destination',
  title: 'Destinations',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'string',
      description: 'Code unique pour la destination (ex: fr, ca, be)',
      validation: (Rule) => Rule.required().max(10),
    }),
    defineField({
      name: 'flag',
      title: 'Emoji drapeau',
      type: 'string',
      description: 'Emoji du drapeau (ex: 🇫🇷)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Ordre d\'affichage',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'teamAssigned',
      title: 'Équipe assignée',
      type: 'string',
      options: {
        list: [
          { title: 'Commercial Manager', value: 'cm' },
          { title: 'Équipe France', value: 'fr' },
          { title: 'Non assigné', value: 'unassigned' },
        ],
      },
      initialValue: 'unassigned',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'averageProcessingTime',
      title: 'Délai moyen de traitement (jours)',
      type: 'number',
      description: 'Temps moyen pour traiter une demande',
    }),
    defineField({
      name: 'requiredDocuments',
      title: 'Documents requis',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Passeport', value: 'passport' },
          { title: 'Diplômes', value: 'diploma' },
          { title: 'Relevés de notes', value: 'transcript' },
          { title: 'Lettre de motivation', value: 'motivation_letter' },
          { title: 'CV', value: 'cv' },
          { title: 'Justificatif financier', value: 'financial' },
          { title: 'Photo d\'identité', value: 'photo' },
          { title: 'Attestation', value: 'certificate' },
        ],
      },
    }),
  ],
  preview: {
    select: {
      name: 'name',
      flag: 'flag',
      isActive: 'isActive',
      team: 'teamAssigned',
    },
    prepare({ name, flag, isActive, team }) {
      const teamLabels: Record<string, string> = {
        cm: 'CM',
        fr: 'FR',
        unassigned: '-',
      }
      return {
        title: `${flag || '🌍'} ${name}`,
        subtitle: `${isActive ? '✅ Active' : '⏸️ Inactive'} • Équipe: ${teamLabels[team] || team}`,
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
      title: 'Nom (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
