import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

// Initialize Sanity client with write permissions
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

/**
 * POST /api/register-student
 * Create a new student in Sanity with simplified data
 * 
 * Expected body structure:
 * {
 *   step1: { firstName, lastName, email, phone, countryOfResidence },
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { step1 } = body

    console.log('📥 Registration request received for:', step1?.email)

    // ===================================
    // 1. VALIDATION
    // ===================================
    if (!step1) {
      return NextResponse.json(
        { error: 'Données incomplètes.' },
        { status: 400 }
      )
    }

    // Validate required fields
    if (!step1.firstName || !step1.email || !step1.phone) {
      return NextResponse.json(
        { error: 'Nom, email et téléphone sont requis.' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(step1.email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      )
    }

    // ===================================
    // 2. CHECK FOR DUPLICATE EMAIL
    // ===================================
    console.log('🔍 Checking for existing student with email:', step1.email)
    
    const existingStudent = await client.fetch(
      `*[_type == "student" && email == $email][0]`,
      { email: step1.email }
    )

    if (existingStudent) {
      return NextResponse.json(
        { error: 'Un compte avec cet email existe déjà' },
        { status: 409 }
      )
    }

    // ===================================
    // 3. CREATE STUDENT DOCUMENT IN SANITY
    // ===================================
    
    // Combine firstName and lastName into fullName
    const fullName = step1.lastName 
      ? `${step1.firstName} ${step1.lastName}` 
      : step1.firstName

    const studentData = {
      _type: 'student',
      
      // Basic information from form
      fullName: fullName,
      email: step1.email,
      phone: step1.phone,
      country: step1.countryOfResidence || '',

      // Metadata
      status: 'nouveau',
      source: 'site-web',
      registeredAt: new Date().toISOString(),
    }

    console.log('📝 Creating student document in Sanity...')
    const createdStudent = await client.create(studentData)
    console.log(`✅ Student created successfully: ${createdStudent._id}`)

    // ===================================
    // 4. RETURN SUCCESS RESPONSE
    // ===================================
    return NextResponse.json({
      success: true,
      studentId: createdStudent._id,
      message: 'Inscription réussie! Bienvenue chez L\'Étudiant à l\'Étranger.',
      data: {
        fullName: fullName,
        email: step1.email,
        status: 'nouveau',
      },
    }, { status: 201 })

  } catch (error) {
    console.error('❌ Registration error:', error)

    // Handle specific Sanity errors
    if (error instanceof Error) {
      if (error.message.includes('Insufficient permissions')) {
        return NextResponse.json(
          { error: 'Erreur de configuration serveur. Contactez l\'administrateur.' },
          { status: 500 }
        )
      }
      
      if (error.message.includes('Invalid _ref')) {
        return NextResponse.json(
          { error: 'Certains documents n\'ont pas été correctement uploadés. Veuillez réessayer.' },
          { status: 400 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Erreur lors de l\'inscription. Veuillez réessayer.' },
      { status: 500 }
    )
  }
}

/**
 * GET /api/register-student
 * Return API info and health check
 */
export async function GET() {
  return NextResponse.json({
    message: 'Student Registration API - Simplified',
    version: '2.0',
    status: 'operational',
    endpoints: {
      POST: {
        description: 'Register a new student with basic information',
        requiredFields: {
          step1: ['firstName', 'email', 'phone', 'countryOfResidence (optional)'],
        },
      },
    },
  })
}
