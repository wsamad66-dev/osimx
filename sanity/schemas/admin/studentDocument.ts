import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'adminStudentDocument',
  title: 'Documents Étudiants (Admin)',
  type: 'document',
  fields: [
    defineField({
      name: 'leadId',
      title: 'Lead associé',
      type: 'reference',
      to: [{ type: 'lead' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'documentType',
      title: 'Type de document',
      type: 'string',
      options: {
        list: [
          { title: '📄 Passeport', value: 'passport' },
          { title: '🎓 Diplômes', value: 'diploma' },
          { title: '📊 Relevés de notes', value: 'transcript' },
          { title: '📝 Lettre de motivation', value: 'motivation_letter' },
          { title: '📋 CV', value: 'cv' },
          { title: '💰 Justificatif financier', value: 'financial' },
          { title: '📸 Photo d\'identité', value: 'photo' },
          { title: '🏛️ Attestation', value: 'certificate' },
          { title: '📄 Autre', value: 'other' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileName',
      title: 'Nom du fichier',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileUrl',
      title: 'URL du fichier',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fileSize',
      title: 'Taille du fichier (bytes)',
      type: 'number',
    }),
    defineField({
      name: 'mimeType',
      title: 'Type MIME',
      type: 'string',
    }),
    defineField({
      name: 'isVerified',
      title: 'Vérifié',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'verifiedBy',
      title: 'Vérifié par',
      type: 'string',
    }),
    defineField({
      name: 'verifiedAt',
      title: 'Date de vérification',
      type: 'datetime',
    }),
    defineField({
      name: 'status',
      title: 'Statut',
      type: 'string',
      options: {
        list: [
          { title: '⏳ En attente', value: 'pending' },
          { title: '✅ Approuvé', value: 'approved' },
          { title: '❌ Rejeté', value: 'rejected' },
          { title: '⚠️ À corriger', value: 'needs_correction' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'rejectionReason',
      title: 'Raison du rejet',
      type: 'text',
      hidden: ({ document }) => document?.status !== 'rejected',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
    defineField({
      name: 'uploadedBy',
      title: 'Téléversé par',
      type: 'string',
    }),
    defineField({
      name: 'uploadedAt',
      title: 'Date de téléversement',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expiryDate',
      title: 'Date d\'expiration',
      type: 'date',
      description: 'Pour les documents avec date d\'expiration (passeport, visa, etc.)',
    }),
  ],
  preview: {
    select: {
      documentType: 'documentType',
      fileName: 'fileName',
      isVerified: 'isVerified',
      status: 'status',
    },
    prepare({ documentType, fileName, isVerified, status }) {
      const typeLabels: Record<string, string> = {
        passport: '📄 Passeport',
        diploma: '🎓 Diplômes',
        transcript: '📊 Relevés',
        motivation_letter: '📝 Lettre',
        cv: '📋 CV',
        financial: '💰 Financier',
        photo: '📸 Photo',
        certificate: '🏛️ Attestation',
        other: '📄 Autre',
      }
      
      const statusIcons: Record<string, string> = {
        pending: '⏳',
        approved: '✅',
        rejected: '❌',
        needs_correction: '⚠️',
      }
      
      return {
        title: fileName,
        subtitle: `${typeLabels[documentType] || documentType} • ${statusIcons[status] || ''} ${isVerified ? '✓' : ''}`,
      }
    },
  },
  orderings: [
    {
      title: 'Date de téléversement (récent)',
      name: 'uploadedAtDesc',
      by: [{ field: 'uploadedAt', direction: 'desc' }],
    },
    {
      title: 'Type de document',
      name: 'typeAsc',
      by: [{ field: 'documentType', direction: 'asc' }],
    },
  ],
})
