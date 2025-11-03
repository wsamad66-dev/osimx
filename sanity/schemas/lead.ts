import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'lead',
  title: 'Leads & Rendez-vous',
  type: 'document',
  icon: () => '📅',
  fields: [
    defineField({
      name: 'name',
      title: 'Nom complet',
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
      title: 'Pays d\'intérêt',
      type: 'string',
      options: {
        list: [
          { title: 'France 🇫🇷', value: 'france' },
          { title: 'Canada 🇨🇦', value: 'canada' },
          { title: 'États-Unis 🇺🇸', value: 'usa' },
          { title: 'Royaume-Uni 🇬🇧', value: 'uk' },
          { title: 'Belgique 🇧🇪', value: 'belgique' },
          { title: 'Suisse 🇨🇭', value: 'suisse' },
          { title: 'Allemagne 🇩🇪', value: 'allemagne' },
          { title: 'Italie 🇮🇹', value: 'italie' },
          { title: 'Espagne 🇪🇸', value: 'espagne' },
          { title: 'Chine 🇨🇳', value: 'chine' },
          { title: 'Autre', value: 'autre' },
        ],
      },
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: '📝 Nouveau', value: 'pending' },
          { title: '📞 Contacté', value: 'contacted' },
          { title: '✅ Converti', value: 'converted' },
          { title: '❌ Perdu', value: 'lost' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      description: 'D\'où vient le lead',
      initialValue: 'appointment_form',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'appointmentBooked',
      title: 'Rendez-vous réservé',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'appointmentDate',
      title: 'Date du rendez-vous',
      type: 'datetime',
    }),
    defineField({
      name: 'createdAt',
      title: 'Date de création',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      country: 'country',
      status: 'status',
    },
    prepare(selection) {
      const { name, email, country, status } = selection
      const statusEmoji = {
        pending: '📝',
        contacted: '📞',
        converted: '✅',
        lost: '❌',
      }
      return {
        title: name,
        subtitle: `${email} • ${country || 'Pas de pays'} • ${statusEmoji[status as keyof typeof statusEmoji] || ''}`,
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
      title: 'Statut',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
