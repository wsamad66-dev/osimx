import { defineType, defineField } from 'sanity'
import { User } from 'lucide-react'

/**
 * Student Schema - Complete Registration Data
 * Stores all information from the 4-step registration modal:
 * - Step 1: Personal Information
 * - Step 2: Education Details
 * - Step 3: Uploaded Documents (Sanity asset references)
 * - Step 4: Security (hashed password)
 */
export default defineType({
  name: 'student',
  title: 'Students',
  type: 'document',
  icon: User,
  fields: [
    // ===================================
    // STEP 1: Personal Information
    // ===================================
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'dateOfBirth',
      title: 'Date of Birth',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'countryOfResidence',
      title: 'Country of Residence',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    // ===================================
    // STEP 2: Education Information
    // ===================================
    defineField({
      name: 'currentEducationLevel',
      title: 'Current Education Level',
      type: 'string',
      options: {
        list: [
          { title: 'Baccalauréat', value: 'baccalaureat' },
          { title: 'Licence (Bachelor)', value: 'licence' },
          { title: 'Master', value: 'master' },
          { title: 'Doctorat (PhD)', value: 'doctorat' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'desiredDegree',
      title: 'Desired Degree',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'fieldOfStudy',
      title: 'Field of Study',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preferredCountry',
      title: 'Preferred Country',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'preferredUniversity',
      title: 'Preferred University',
      type: 'string',
    }),
    defineField({
      name: 'intendedStartDate',
      title: 'Intended Start Date',
      type: 'string',
      options: {
        list: [
          { title: 'Septembre 2025', value: '2025-09' },
          { title: 'Janvier 2026', value: '2026-01' },
          { title: 'Septembre 2026', value: '2026-09' },
          { title: 'Plus tard', value: 'later' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    // ===================================
    // STEP 3: Documents (Sanity Asset References)
    // ===================================
    defineField({
      name: 'documents',
      title: 'Uploaded Documents',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'file',
              title: 'File',
              type: 'file',
              description: 'Reference to uploaded Sanity asset',
            },
            {
              name: 'name',
              title: 'Original Filename',
              type: 'string',
            },
            {
              name: 'mimeType',
              title: 'MIME Type',
              type: 'string',
            },
            {
              name: 'size',
              title: 'File Size (bytes)',
              type: 'number',
            },
            {
              name: 'uploadedAt',
              title: 'Uploaded At',
              type: 'datetime',
            },
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'mimeType',
            },
          },
        },
      ],
      description: 'Diplomas, transcripts, passport, and other documents',
    }),

    // ===================================
    // STEP 4: Security
    // ===================================
    defineField({
      name: 'passwordHash',
      title: 'Password Hash',
      type: 'string',
      description: 'Hashed password (bcrypt)',
      hidden: true, // Hide from Studio UI for security
    }),

    // ===================================
    // Metadata & Status
    // ===================================
    defineField({
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          { title: '📝 Pending', value: 'pending' },
          { title: '✅ Approved', value: 'approved' },
          { title: '🔄 In Review', value: 'in-review' },
          { title: '❌ Rejected', value: 'rejected' },
          { title: '⏸️ On Hold', value: 'on-hold' },
        ],
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'verificationToken',
      title: 'Email Verification Token',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'registeredAt',
      title: 'Registration Date',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'notes',
      title: 'Admin Notes',
      type: 'text',
      description: 'Internal notes for administrators',
      rows: 4,
    }),
  ],

  // ===================================
  // Preview Configuration
  // ===================================
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      status: 'status',
      registeredAt: 'registeredAt',
    },
    prepare({ firstName, lastName, email, status, registeredAt }) {
      const statusEmoji = {
        pending: '📝',
        approved: '✅',
        'in-review': '🔄',
        rejected: '❌',
        'on-hold': '⏸️',
      }[status] || '📝'

      return {
        title: `${firstName} ${lastName}`,
        subtitle: `${statusEmoji} ${status} • ${email}`,
        media: User,
      }
    },
  },

  // ===================================
  // Ordering Options
  // ===================================
  orderings: [
    {
      title: 'Registration Date (Newest)',
      name: 'registeredAtDesc',
      by: [{ field: 'registeredAt', direction: 'desc' }],
    },
    {
      title: 'Last Name (A-Z)',
      name: 'lastNameAsc',
      by: [{ field: 'lastName', direction: 'asc' }],
    },
    {
      title: 'Status',
      name: 'statusAsc',
      by: [{ field: 'status', direction: 'asc' }],
    },
  ],
})
