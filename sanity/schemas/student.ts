import { defineType, defineField } from 'sanity'
import { User } from 'lucide-react'

/**
 * Student Schema - Simplified
 * Matches the QuickRegistrationModal form fields:
 * - Name (full name)
 * - Email
 * - Phone
 * - Country (optional)
 * 
 * Can be manually added, edited, or deleted in Sanity Studio
 */
export default defineType({
  name: 'student',
  title: 'Étudiants',
  type: 'document',
  icon: User,
  fields: [
    // ===================================
    // Basic Information (from form)
    // ===================================
    defineField({
      name: 'fullName',
      title: 'Nom complet',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(100),
      description: 'Prénom et nom de l\'étudiant',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      description: 'Adresse email de l\'étudiant',
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone / WhatsApp',
      type: 'string',
      validation: (Rule) => Rule.required().min(8),
      description: 'Numéro de téléphone (format international recommandé)',
    }),
    defineField({
      name: 'country',
      title: 'Pays d\'origine',
      type: 'string',
      options: {
        list: [
          { title: '🇫🇷 France', value: 'France' },
          { title: '🇨🇦 Canada', value: 'Canada' },
          { title: '🇺🇸 États-Unis', value: 'États-Unis' },
          { title: '🇬🇧 Royaume-Uni', value: 'Royaume-Uni' },
          { title: '🇩🇪 Allemagne', value: 'Allemagne' },
          { title: '🇪🇸 Espagne', value: 'Espagne' },
          { title: '🇮🇹 Italie', value: 'Italie' },
          { title: '🇧🇪 Belgique', value: 'Belgique' },
          { title: '🇨🇭 Suisse', value: 'Suisse' },
          { title: '🇲🇦 Maroc', value: 'Maroc' },
          { title: '🇸🇳 Sénégal', value: 'Sénégal' },
          { title: '🇨🇮 Côte d\'Ivoire', value: 'Côte d\'Ivoire' },
        ],
      },
      description: 'Pays d\'origine de l\'étudiant (optionnel)',
    }),

    // ===================================
    // Metadata & Status
    // ===================================
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: '📝 Nouveau', value: 'nouveau' },
          { title: '📞 Contacté', value: 'contacte' },
          { title: '✅ Actif', value: 'actif' },
          { title: '🎓 En cours', value: 'en-cours' },
          { title: '✨ Diplômé', value: 'diplome' },
          { title: '⏸️ En pause', value: 'pause' },
          { title: '❌ Inactif', value: 'inactif' },
        ],
      },
      initialValue: 'nouveau',
      description: 'Statut actuel de l\'étudiant',
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'string',
      options: {
        list: [
          { title: 'Formulaire site web', value: 'site-web' },
          { title: 'Rendez-vous zcal', value: 'zcal' },
          { title: 'Manuel (Sanity)', value: 'manuel' },
          { title: 'Réseaux sociaux', value: 'reseaux-sociaux' },
          { title: 'Bouche à oreille', value: 'bouche-a-oreille' },
          { title: 'Autre', value: 'autre' },
        ],
      },
      initialValue: 'site-web',
      description: 'Comment l\'étudiant nous a trouvé',
    }),
    defineField({
      name: 'registeredAt',
      title: 'Date d\'inscription',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      description: 'Date de première inscription',
    }),
    defineField({
      name: 'notes',
      title: 'Notes administratives',
      type: 'text',
      description: 'Notes internes pour l\'équipe',
      rows: 5,
    }),
  ],

  // ===================================
  // Preview Configuration
  // ===================================
  preview: {
    select: {
      fullName: 'fullName',
      email: 'email',
      country: 'country',
      status: 'status',
      phone: 'phone',
    },
    prepare(selection: any) {
      const { fullName, email, country, status, phone } = selection
      const statusMap: Record<string, string> = {
        nouveau: '📝',
        contacte: '📞',
        actif: '✅',
        'en-cours': '🎓',
        diplome: '✨',
        pause: '⏸️',
        inactif: '❌',
      }
      const statusEmoji = statusMap[status] || '📝'
      const countryDisplay = country ? ` • ${country}` : ''

      return {
        title: fullName || 'Sans nom',
        subtitle: `${statusEmoji} ${email}${countryDisplay}`,
        description: phone,
        media: User,
      }
    },
  },

  // ===================================
  // Ordering Options
  // ===================================
  orderings: [
    {
      title: 'Date d\'inscription (récent)',
      name: 'registeredAtDesc',
      by: [{ field: 'registeredAt', direction: 'desc' }],
    },
    {
      title: 'Date d\'inscription (ancien)',
      name: 'registeredAtAsc',
      by: [{ field: 'registeredAt', direction: 'asc' }],
    },
    {
      title: 'Nom (A-Z)',
      name: 'nameAsc',
      by: [{ field: 'fullName', direction: 'asc' }],
    },
    {
      title: 'Statut',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
