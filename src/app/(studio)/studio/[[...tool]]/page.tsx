'use client'

import { NextStudio } from 'next-sanity/studio'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

// Import schemas
import hero from '../../../../../sanity/schemas/hero'
import student from '../../../../../sanity/schemas/student'
import studentDocument from '../../../../../sanity/schemas/studentDocument'
import navigation from '../../../../../sanity/schemas/navigation'

const schemaTypes = [hero, student, studentDocument, navigation]

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
    deskTool(),
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
