import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Initialize Sanity client with write token
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN, // Write token from environment
  useCdn: false,
})

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
]

/**
 * POST /api/upload
 * Upload files to Sanity Assets API
 */
export async function POST(request: NextRequest) {
  try {
    // Check for API token
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ SANITY_API_TOKEN is not configured')
      return NextResponse.json(
        { error: 'Configuration serveur manquante' },
        { status: 500 }
      )
    }

    // Parse FormData
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: `Fichier trop volumineux. Maximum ${MAX_FILE_SIZE / 1024 / 1024}MB` },
        { status: 400 }
      )
    }

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Type de fichier non supporté' },
        { status: 400 }
      )
    }

    // Convert File to Buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Upload to Sanity Assets
    console.log(`📤 Uploading file: ${file.name} (${file.type}, ${(file.size / 1024).toFixed(2)}KB)`)

    const asset = await client.assets.upload('file', buffer, {
      filename: file.name,
      contentType: file.type,
    })

    console.log(`✅ File uploaded successfully: ${asset._id}`)

    // Return success response
    return NextResponse.json({
      assetId: asset._id,
      url: asset.url,
      originalFilename: file.name,
      size: file.size,
      mimeType: file.type,
    })

  } catch (error) {
    console.error('❌ Upload error:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Erreur lors de l\'upload'
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}

/**
 * GET /api/upload
 * Return API info
 */
export async function GET() {
  return NextResponse.json({
    message: 'Sanity Upload API',
    maxFileSize: `${MAX_FILE_SIZE / 1024 / 1024}MB`,
    allowedTypes: ALLOWED_MIME_TYPES,
  })
}
