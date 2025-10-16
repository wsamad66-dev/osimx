import { NextRequest, NextResponse } from 'next/server'
import { getClientWelcomeEmail, getTeamNotificationEmail } from '@/lib/email-templates'
// import { Resend } from 'resend'

// const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const { to, name, phone, country, type } = await request.json()

    // Générer le bon template selon le type
    let emailData
    if (type === 'client-welcome') {
      emailData = getClientWelcomeEmail({ name, email: to, phone, country })
    } else if (type === 'team-notification') {
      emailData = getTeamNotificationEmail({ name, email: to, phone, country })
    } else {
      return NextResponse.json(
        { error: 'Type d\'email invalide' },
        { status: 400 }
      )
    }

    // Pour le moment, on log juste l'email (développement)
    console.log('📧 Email à envoyer:', { 
      to, 
      subject: emailData.subject, 
      type,
      name,
      phone,
      country 
    })

    // Décommenter quand Resend est configuré:
    /*
    const { data, error } = await resend.emails.send({
      from: 'L\'Étudiant Étranger <noreply@letudiantetranger.com>',
      to: [to],
      subject: emailData.subject,
      html: emailData.html,
    })

    if (error) {
      console.error('Erreur Resend:', error)
      return NextResponse.json(
        { error: 'Échec de l\'envoi de l\'email' },
        { status: 500 }
      )
    }

    console.log('✅ Email envoyé:', data)
    return NextResponse.json({ success: true, data })
    */

    // Response temporaire pour développement
    return NextResponse.json({
      success: true,
      message: 'Email simulation réussie',
      preview: {
        to,
        subject: emailData.subject,
        type,
        name,
        country,
        note: 'L\'email sera envoyé en production avec Resend',
      },
    })
  } catch (error) {
    console.error('Erreur send-email:', error)
    return NextResponse.json(
      { error: 'Erreur lors du traitement de la demande' },
      { status: 500 }
    )
  }
}
