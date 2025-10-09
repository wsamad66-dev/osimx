import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'studentDocument',
  title: 'Student Document',
  type: 'document',
  fields: [
    defineField({
      name: 'student',
      title: 'Student Reference',
      type: 'reference',
      to: [{ type: 'student' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Document Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g., Passport, Transcript, Language Certificate',
    }),
    defineField({
      name: 'file',
      title: 'File',
      type: 'file',
      options: {
        accept: '.pdf,.jpg,.jpeg,.png',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mimeType',
      title: 'MIME Type',
      type: 'string',
      readOnly: true,
    }),
    defineField({
      name: 'size',
      title: 'File Size (bytes)',
      type: 'number',
      readOnly: true,
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
      rows: 3,
      description: 'Optional notes about this document',
    }),
    defineField({
      name: 'verified',
      title: 'Verified',
      type: 'boolean',
      initialValue: false,
      description: 'Has this document been verified by an admin?',
    }),
    defineField({
      name: 'createdAt',
      title: 'Uploaded At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'student.name',
      fileName: 'file.asset.originalFilename',
    },
    prepare(selection) {
      const { title, subtitle, fileName } = selection
      return {
        title: title || 'Untitled Document',
        subtitle: `${subtitle || 'Unknown Student'} - ${fileName || 'No file'}`,
      }
    },
  },
})
