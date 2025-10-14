import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset) {
  throw new Error(
    'Missing Sanity environment variables. Please check NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET'
  )
}

if (!token) {
  console.warn(
    '⚠️ SANITY_API_WRITE_TOKEN not found. Write operations will fail. Add it to .env.local'
  )
}

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Must be false for write operations
  token, // API token with write permissions
  perspective: 'published',
})

// Helper function to check if write client is configured
export function isWriteClientReady(): boolean {
  return !!token
}
