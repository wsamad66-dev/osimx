import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'

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
 * Create a new student in Sanity with complete registration data
 * 
 * Expected body structure:
 * {
 *   step1: { firstName, lastName, email, phone, dateOfBirth, nationality, countryOfResidence },
 *   step2: { currentEducationLevel, desiredDegree, fieldOfStudy, preferredCountry, preferredUniversity, intendedStartDate },
 *   step3: { documents: [{ name, type, size, assetId, url }] },
 *   step4: { password, confirmPassword }
 * }
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json()
    const { step1, step2, step3, step4 } = body

    console.log('📥 Registration request received for:', step1?.email)

    // ===================================
    // 1. VALIDATION
    // ===================================
    if (!step1 || !step2 || !step3 || !step4) {
      return NextResponse.json(
        { error: 'Données incomplètes. Toutes les étapes sont requises.' },
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

    // Validate password strength (min 8 chars)
    if (!step4.password || step4.password.length < 8) {
      return NextResponse.json(
        { error: 'Le mot de passe doit contenir au moins 8 caractères' },
        { status: 400 }
      )
    }

    // Validate password confirmation
    if (step4.password !== step4.confirmPassword) {
      return NextResponse.json(
        { error: 'Les mots de passe ne correspondent pas' },
        { status: 400 }
      )
    }

    // Validate documents (optional for quick registration)
    const hasDocuments = step3.documents && step3.documents.length > 0
    
    // If documents are provided, validate they are properly uploaded
    if (hasDocuments) {
      const allDocumentsUploaded = step3.documents.every((doc: any) => 
        doc.assetId && doc.assetId !== 'temp-placeholder'
      )
      if (!allDocumentsUploaded) {
        return NextResponse.json(
          { error: 'Tous les documents doivent être téléchargés avec succès' },
          { status: 400 }
        )
      }
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
    // 3. HASH PASSWORD
    // ===================================
    console.log('🔐 Hashing password...')
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(step4.password, saltRounds)

    // ===================================
    // 4. GENERATE EMAIL VERIFICATION TOKEN
    // ===================================
    const verificationToken = crypto.randomBytes(32).toString('hex')

    // ===================================
    // 5. PREPARE DOCUMENTS WITH SANITY REFERENCES
    // ===================================
    console.log('📎 Preparing document references...')
    const documentsWithReferences = hasDocuments 
      ? step3.documents
          .filter((doc: any) => doc.assetId && doc.assetId !== 'temp-placeholder')
          .map((doc: any) => ({
            _type: 'object',
            file: {
              _type: 'file',
              asset: {
                _type: 'reference',
                _ref: doc.assetId, // Reference to uploaded Sanity asset
              },
            },
            name: doc.name,
            mimeType: doc.type,
            size: doc.size,
            uploadedAt: new Date().toISOString(),
          }))
      : [] // Empty array for quick registration without documents

    // ===================================
    // 6. CREATE STUDENT DOCUMENT IN SANITY
    // ===================================
    const studentData = {
      _type: 'student',
      
      // Step 1: Personal Information
      firstName: step1.firstName,
      lastName: step1.lastName,
      email: step1.email,
      phone: step1.phone,
      dateOfBirth: step1.dateOfBirth,
      nationality: step1.nationality,
      countryOfResidence: step1.countryOfResidence,

      // Step 2: Education Information
      currentEducationLevel: step2.currentEducationLevel,
      desiredDegree: step2.desiredDegree,
      fieldOfStudy: step2.fieldOfStudy,
      preferredCountry: step2.preferredCountry,
      preferredUniversity: step2.preferredUniversity || '',
      intendedStartDate: step2.intendedStartDate,

      // Step 3: Documents
      documents: documentsWithReferences,

      // Step 4: Security
      passwordHash,

      // Metadata
      status: 'pending',
      emailVerified: false,
      verificationToken,
      registeredAt: new Date().toISOString(),
    }

    console.log('📝 Creating student document in Sanity...')
    const createdStudent = await client.create(studentData)
    console.log(`✅ Student created successfully: ${createdStudent._id}`)

    // ===================================
    // 7. TODO: SEND CONFIRMATION EMAIL
    // ===================================
    // TODO: Implement email sending (Resend, SendGrid, etc.)
    // const verificationLink = `${process.env.NEXT_PUBLIC_SITE_URL}/verify-email?token=${verificationToken}`
    // await sendEmail({
    //   to: step1.email,
    //   subject: 'Confirmez votre inscription - L\'Étudiant à l\'Étranger',
    //   html: welcomeEmailTemplate({ firstName: step1.firstName, verificationLink })
    // })

    console.log('📧 Email confirmation skipped (email service not configured yet)')
    console.log(`   Verification token: ${verificationToken}`)

    // ===================================
    // 8. RETURN SUCCESS RESPONSE
    // ===================================
    return NextResponse.json({
      success: true,
      studentId: createdStudent._id,
      message: 'Inscription réussie! Bienvenue chez L\'Étudiant à l\'Étranger.',
      data: {
        firstName: step1.firstName,
        lastName: step1.lastName,
        email: step1.email,
        status: 'pending',
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
    message: 'Student Registration API',
    version: '1.0',
    status: 'operational',
    endpoints: {
      POST: {
        description: 'Register a new student with complete 4-step data',
        requiredFields: {
          step1: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'nationality', 'countryOfResidence'],
          step2: ['currentEducationLevel', 'desiredDegree', 'fieldOfStudy', 'preferredCountry', 'intendedStartDate'],
          step3: ['documents (array with assetId)'],
          step4: ['password', 'confirmPassword'],
        },
      },
    },
  })
}
