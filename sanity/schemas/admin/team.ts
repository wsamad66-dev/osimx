import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Membres de l\'équipe',
  type: 'document',
  fields: [
    defineField({
      name: 'clerkUserId',
      title: 'Clerk User ID',
      type: 'string',
      description: 'ID utilisateur Clerk pour la correspondance',
      validation: (Rule) => Rule.required(),
    }),
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
      name: 'role',
      title: 'Rôle',
      type: 'string',
      options: {
        list: [
          { title: '👑 Administrateur', value: 'admin' },
          { title: '💼 Commercial Manager', value: 'cm' },
          { title: '🇫🇷 Équipe France', value: 'fr' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Actif',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'assignedDestinations',
      title: 'Destinations assignées',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'destination' }],
        },
      ],
      description: 'Destinations gérées par ce membre',
    }),
    defineField({
      name: 'maxLeadsPerWeek',
      title: 'Maximum de leads par semaine',
      type: 'number',
      description: 'Limite de nouveaux leads à assigner automatiquement',
      initialValue: 10,
    }),
    defineField({
      name: 'currentLeadCount',
      title: 'Nombre actuel de leads actifs',
      type: 'number',
      description: 'Compteur de leads actuellement assignés (status: new, contacted, meeting)',
      initialValue: 0,
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar URL',
      type: 'url',
      description: 'URL de l\'image de profil (synced from Clerk)',
    }),
    defineField({
      name: 'bio',
      title: 'Biographie',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'joinedAt',
      title: 'Date d\'arrivée',
      type: 'datetime',
    }),
    defineField({
      name: 'lastActiveAt',
      title: 'Dernière activité',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      name: 'name',
      email: 'email',
      role: 'role',
      isActive: 'isActive',
      currentLeads: 'currentLeadCount',
    },
    prepare({ name, email, role, isActive, currentLeads }) {
      const roleIcons: Record<string, string> = {
        admin: '👑',
        cm: '💼',
        fr: '🇫🇷',
      }
      const roleLabels: Record<string, string> = {
        admin: 'Admin',
        cm: 'CM',
        fr: 'FR',
      }
      return {
        title: `${roleIcons[role] || '👤'} ${name}`,
        subtitle: `${roleLabels[role] || role} • ${email} • ${currentLeads || 0} leads ${isActive ? '✅' : '⏸️'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Nom (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Rôle',
      name: 'roleAsc',
      by: [{ field: 'role', direction: 'asc' }],
    },
    {
      title: 'Nombre de leads (↓)',
      name: 'leadsDesc',
      by: [{ field: 'currentLeadCount', direction: 'desc' }],
    },
  ],
})
