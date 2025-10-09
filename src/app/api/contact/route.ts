import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

// Validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Email invalide'),
  phone: z.string().optional(),
  country: z.string().min(1, 'Veuillez sélectionner votre pays'),
  interest: z.string().min(1, 'Veuillez sélectionner votre besoin'),
  studyLevel: z.string().optional(),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères').max(2000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validated = contactSchema.parse(body)

    // TODO: Implement email sending service (Resend, SendGrid, etc.)
    // Example with Resend:
    // const { data, error } = await resend.emails.send({
    //   from: 'contact@yourdomain.com',
    //   to: process.env.CONTACT_EMAIL!,
    //   subject: `Nouvelle demande de ${validated.name}`,
    //   html: generateEmailHTML(validated),
    // })

    // For now, just log the submission
    console.log('Contact form submission:', validated)

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500))

    return NextResponse.json(
      {
        success: true,
        message: 'Votre message a été envoyé avec succès. Nous vous recontacterons sous 24h.'
      },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Données invalides',
          details: error.errors
        },
        { status: 400 }
      )
    }

    console.error('Contact form error:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Une erreur est survenue. Veuillez réessayer.'
      },
      { status: 500 }
    )
  }
}

// Email template helper - Uncomment when implementing email service
// function generateEmailHTML(data: z.infer<typeof contactSchema>) {
//   return `
//     <h2>Nouvelle demande de contact</h2>
//     <p><strong>Nom:</strong> ${data.name}</p>
//     <p><strong>Email:</strong> ${data.email}</p>
//     <p><strong>Téléphone:</strong> ${data.phone || 'Non fourni'}</p>
//     <p><strong>Pays:</strong> ${data.country}</p>
//     <p><strong>Besoin:</strong> ${data.interest}</p>
//     <p><strong>Niveau d'études:</strong> ${data.studyLevel || 'Non précisé'}</p>
//     <p><strong>Budget:</strong> ${data.budget || 'Non précisé'}</p>
//     <p><strong>Échéance:</strong> ${data.timeline || 'Non précisé'}</p>
//     <p><strong>Message:</strong></p>
//     <p>${data.message}</p>
//   `
// }
