'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

// Import schemas
import hero from '../../../../../sanity/schemas/hero'
import student from '../../../../../sanity/schemas/student'
import studentDocument from '../../../../../sanity/schemas/studentDocument'
import navigation from '../../../../../sanity/schemas/navigation'
import lead from '../../../../../sanity/schemas/lead'
import partner from '../../../../../sanity/schemas/partner'

// Homepage sections
import expertise from '../../../../../sanity/schemas/expertise'
import services from '../../../../../sanity/schemas/services'
import testimonials from '../../../../../sanity/schemas/testimonials'
import faq from '../../../../../sanity/schemas/faq'
import cta from '../../../../../sanity/schemas/cta'

// Blog schemas
import blogPost from '../../../../../sanity/schemas/blogPost'
import blogAuthor from '../../../../../sanity/schemas/blogAuthor'

// Admin schemas
import adminLead from '../../../../../sanity/schemas/admin/lead'
import adminStudentDocument from '../../../../../sanity/schemas/admin/studentDocument'
import destination from '../../../../../sanity/schemas/admin/destination'
import teamMember from '../../../../../sanity/schemas/admin/team'

const schemaTypes = [
  hero,
  student,
  studentDocument,
  navigation,
  lead,
  partner,
  // Homepage sections
  expertise,
  services,
  testimonials,
  faq,
  cta,
  // Blog
  blogPost,
  blogAuthor,
  // Admin
  adminLead,
  adminStudentDocument,
  destination,
  teamMember,
]

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

// Check if env vars are loaded
if (!projectId) {
  console.error('⚠️ NEXT_PUBLIC_SANITY_PROJECT_ID is not set')
}

const config = defineConfig({
  name: 'default',
  title: 'OSIM Student Portal',

  projectId,
  dataset,

  plugins: [
    structureTool({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      structure: (S: any) =>
        S.list()
          .title('Content')
          .items([
            // === PAGE D'ACCUEIL ===
            S.listItem()
              .title('🏠 Page d\'accueil')
              .child(
                S.list()
                  .title('Sections de la page d\'accueil')
                  .items([
                    S.documentTypeListItem('hero').title('Hero Section'),
                    S.documentTypeListItem('expertise').title('📊 Expertise'),
                    S.documentTypeListItem('services').title('�️ Services'),
                    S.documentTypeListItem('testimonials').title('💬 Témoignages'),
                    S.documentTypeListItem('faq').title('❓ FAQ'),
                    S.documentTypeListItem('cta').title('🎯 Call to Action'),
                  ])
              ),

            S.divider(),

            // Navigation
            S.listItem()
              .title('🧭 Navigation / Header')
              .child(
                S.document()
                  .schemaType('navigation')
                  .documentId('main-navigation')
              ),

            // Étudiants
            S.documentTypeListItem('student').title('👥 Étudiants'),

            // Student Documents
            S.documentTypeListItem('studentDocument').title('📄 Student Documents'),

            S.divider(),

            // BLOG - Articles
            S.documentTypeListItem('blogPost').title('📝 Articles de Blog'),

            // BLOG - Auteurs
            S.documentTypeListItem('blogAuthor').title('✍️ Auteurs'),

            S.divider(),

            // Leads
            S.documentTypeListItem('lead').title('📅 Leads'),

            // Partners
            S.documentTypeListItem('partner').title('🤝 Partenaires'),

            S.divider(),

            // Admin types
            S.documentTypeListItem('adminLead').title('📋 Admin Leads'),
            S.documentTypeListItem('adminStudentDocument').title('📑 Admin Documents'),
            S.documentTypeListItem('destination').title('🌍 Destinations'),
            S.documentTypeListItem('teamMember').title('👤 Équipe'),
          ]),
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
  
  basePath: '/studio',
})

export default function StudioPage() {
  // Show error if config is missing
  if (!projectId) {
    return (
      <div style={{
        padding: '2rem',
        fontFamily: 'system-ui, sans-serif',
        maxWidth: '600px',
        margin: '4rem auto',
      }}>
        <h1 style={{ color: '#f43f5e', marginBottom: '1rem' }}>❌ Configuration Error</h1>
        <p>Sanity project ID is not configured.</p>
        <p style={{ marginTop: '1rem' }}>
          Please check that <code>.env.local</code> contains:
        </p>
        <pre style={{ 
          background: '#f1f5f9', 
          padding: '1rem', 
          borderRadius: '0.5rem',
          marginTop: '1rem'
        }}>
          NEXT_PUBLIC_SANITY_PROJECT_ID=4hv0dnh9
        </pre>
      </div>
    )
  }

  return <NextStudio config={config} />
}
