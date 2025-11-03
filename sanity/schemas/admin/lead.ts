import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'adminLead',
  title: 'Leads (Admin)',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'Prénom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Nom',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'country',
      title: 'Pays d\'origine',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'destination',
      title: 'Destination souhaitée',
      type: 'string',
      options: {
        list: [
          { title: 'France', value: 'france' },
          { title: 'Canada', value: 'canada' },
          { title: 'Belgique', value: 'belgique' },
          { title: 'Allemagne', value: 'allemagne' },
          { title: 'Espagne', value: 'espagne' },
          { title: 'Chine', value: 'chine' },
          { title: 'Royaume-Uni', value: 'uk' },
          { title: 'États-Unis', value: 'usa' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'program',
      title: 'Programme souhaité',
      type: 'string',
      options: {
        list: [
          { title: 'Bachelor', value: 'bachelor' },
          { title: 'Master', value: 'master' },
          { title: 'Doctorat', value: 'doctorat' },
          { title: 'Formation courte', value: 'short' },
        ],
      },
    }),
    defineField({
      name: 'field',
      title: 'Domaine d\'études',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: '🆕 Nouveau', value: 'new' },
          { title: '📞 Contacté', value: 'contacted' },
          { title: '📅 RDV Planifié', value: 'meeting' },
          { title: '✅ Converti', value: 'converted' },
          { title: '❌ Perdu', value: 'lost' },
        ],
        layout: 'dropdown',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'assignedTo',
      title: 'Assigné à',
      type: 'string',
      options: {
        list: [
          { title: 'Non assigné', value: 'unassigned' },
          { title: 'Commercial Manager', value: 'cm' },
          { title: 'Équipe France', value: 'fr' },
        ],
      },
      initialValue: 'unassigned',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Site Web', value: 'website' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Google', value: 'google' },
          { title: 'Référence', value: 'referral' },
          { title: 'Autre', value: 'other' },
        ],
      },
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
    }),
    defineField({
      name: 'notes',
      title: 'Notes internes',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'note', type: 'text', title: 'Note' },
            { name: 'author', type: 'string', title: 'Auteur' },
            { name: 'createdAt', type: 'datetime', title: 'Date' },
          ],
        },
      ],
    }),
    defineField({
      name: 'meetingDate',
      title: 'Date du RDV',
      type: 'datetime',
    }),
    defineField({
      name: 'convertedDate',
      title: 'Date de conversion',
      type: 'datetime',
    }),
    defineField({
      name: 'createdAt',
      title: 'Date de création',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Dernière mise à jour',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      status: 'status',
      destination: 'destination',
    },
    prepare({ firstName, lastName, email, status, destination }) {
      const statusIcons: Record<string, string> = {
        new: '🆕',
        contacted: '📞',
        meeting: '📅',
        converted: '✅',
        lost: '❌',
      }
      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${email} • ${destination}`,
        media: statusIcons[status] || '👤',
      }
    },
  },
  orderings: [
    {
      title: 'Date de création (récent)',
      name: 'createdAtDesc',
      by: [{ field: 'createdAt', direction: 'desc' }],
    },
    {
      title: 'Date de création (ancien)',
      name: 'createdAtAsc',
      by: [{ field: 'createdAt', direction: 'asc' }],
    },
    {
      title: 'Nom (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'lastName', direction: 'asc' }],
    },
  ],
})
