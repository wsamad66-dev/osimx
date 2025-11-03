import { NextRequest, NextResponse } from 'next/server'
import { getClientWelcomeEmail, getTeamNotificationEmail } from '@/lib/email-templates'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { to, name, email, phone, country, type } = await request.json()

    // Utiliser l'email du client (si fourni) sinon fallback sur 'to'
    const clientEmail = email || to

    // Générer le bon template selon le type
    let emailData
    if (type === 'client-welcome') {
      emailData = getClientWelcomeEmail({ name, email: clientEmail, phone, country })
    } else if (type === 'team-notification') {
      emailData = getTeamNotificationEmail({ name, email: clientEmail, phone, country })
    } else {
      return NextResponse.json(
        { error: 'Type d\'email invalide' },
        { status: 400 }
      )
    }

    console.log('📧 Email à envoyer:', { 
      to, 
      clientEmail,
      subject: emailData.subject, 
      type,
      name,
      phone,
      country 
    })

    // Configuration Gmail avec Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // Mot de passe d'application Gmail
      },
    })

    // Envoyer l'email
    const info = await transporter.sendMail({
      from: `"L'Étudiant Étranger" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: emailData.subject,
      html: emailData.html,
    })

    console.log('✅ Email envoyé:', info.messageId)
    
    return NextResponse.json({
      success: true,
      message: 'Email envoyé avec succès',
      messageId: info.messageId,
    })
  } catch (error) {
    console.error('❌ Erreur envoi email:', error)
    return NextResponse.json(
      { error: 'Échec de l\'envoi de l\'email', details: String(error) },
      { status: 500 }
    )
  }
}
