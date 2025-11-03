// Email templates for L'Étudiant Étranger

export const getClientWelcomeEmail = (data: {
  name: string
  email: string
  phone: string
  country: string
}) => {
  return {
    subject: '🎉 Bienvenue à L\'Étudiant Étranger !',
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenue à L'Étudiant Étranger</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header avec gradient -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px; font-weight: bold;">
                🎓 L'Étudiant Étranger
              </h1>
              <p style="color: #e0e7ff; margin: 10px 0 0 0; font-size: 16px;">
                Votre succès académique commence ici
              </p>
            </td>
          </tr>

          <!-- Corps du message -->
          <tr>
            <td style="padding: 40px 30px;">
              <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 24px;">
                Bonjour ${data.name} ! 👋
              </h2>
              
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
                Merci de nous avoir contactés ! Nous sommes ravis de vous accompagner dans votre projet d'études à l'étranger.
              </p>

              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <p style="color: #1e40af; margin: 0; font-weight: 600; font-size: 16px;">
                  ✅ Votre demande a été enregistrée avec succès !
                </p>
                <p style="color: #3b82f6; margin: 10px 0 0 0; font-size: 14px;">
                  Notre équipe vous contactera sous 2 heures ouvrables.
                </p>
              </div>

              <h3 style="color: #1f2937; margin: 30px 0 15px 0; font-size: 18px;">
                📋 Vos informations
              </h3>
              
              <table width="100%" cellpadding="8" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px;">
                <tr style="background-color: #f9fafb;">
                  <td style="color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">📧 Email</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb;">${data.email}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">📱 Téléphone</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 500; border-bottom: 1px solid #e5e7eb;">${data.phone}</td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="color: #6b7280; font-size: 14px;">🌍 Pays</td>
                  <td style="color: #1f2937; font-size: 14px; font-weight: 500;">${data.country || 'Non spécifié'}</td>
                </tr>
              </table>

              <h3 style="color: #1f2937; margin: 30px 0 15px 0; font-size: 18px;">
                📅 Prochaines étapes
              </h3>
              
              <ol style="color: #4b5563; font-size: 15px; line-height: 1.8; padding-left: 20px;">
                <li>Un conseiller vous contactera dans les <strong>2 heures</strong></li>
                <li>Discussion de votre projet académique</li>
                <li>Sélection des meilleures universités</li>
                <li>Constitution de votre dossier</li>
                <li>Accompagnement visa et inscription</li>
              </ol>

              <div style="background-color: #fef3c7; border: 1px solid #fbbf24; padding: 15px; margin: 30px 0; border-radius: 8px;">
                <p style="color: #92400e; margin: 0; font-size: 14px;">
                  💡 <strong>Conseil :</strong> Préparez vos questions sur les destinations, programmes et budgets pour notre prochain échange.
                </p>
              </div>

              <!-- Bouton CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="https://osimx.vercel.app" style="display: inline-block; background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-weight: 600; font-size: 16px;">
                      📚 Découvrir nos destinations
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
                L'Étudiant Étranger - Votre partenaire pour études à l'étranger
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                📞 WhatsApp: +221 77 XXX XX XX | 📧 contact@letudiantetranger.com
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 10px 0 0 0;">
                © ${new Date().getFullYear()} L'Étudiant Étranger. Tous droits réservés.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  }
}

export const getTeamNotificationEmail = (data: {
  name: string
  email: string
  phone: string
  country: string
}) => {
  return {
    subject: `🔔 Nouvelle inscription: ${data.name}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouvelle Inscription</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f3f4f6;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold;">
                🔔 Nouvelle Inscription
              </h1>
              <p style="color: #d1fae5; margin: 10px 0 0 0; font-size: 14px;">
                ${new Date().toLocaleString('fr-FR', { 
                  dateStyle: 'full', 
                  timeStyle: 'short' 
                })}
              </p>
            </td>
          </tr>

          <!-- Corps -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <div style="background-color: #ecfdf5; border: 2px solid #10b981; padding: 20px; margin: 0 0 30px 0; border-radius: 12px;">
                <h2 style="color: #065f46; margin: 0 0 15px 0; font-size: 22px;">
                  👤 ${data.name}
                </h2>
                <p style="color: #059669; margin: 0; font-size: 16px;">
                  🌍 ${data.country || 'Pays non spécifié'}
                </p>
              </div>

              <h3 style="color: #1f2937; margin: 0 0 20px 0; font-size: 18px;">
                📊 Informations du contact
              </h3>

              <table width="100%" cellpadding="12" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; margin-bottom: 30px;">
                <tr style="background-color: #f9fafb;">
                  <td style="color: #6b7280; font-size: 14px; width: 30%; border-bottom: 1px solid #e5e7eb;">
                    <strong>📧 Email</strong>
                  </td>
                  <td style="color: #1f2937; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                    <a href="mailto:${data.email}" style="color: #3b82f6; text-decoration: none;">
                      ${data.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td style="color: #6b7280; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                    <strong>📱 Téléphone</strong>
                  </td>
                  <td style="color: #1f2937; font-size: 14px; border-bottom: 1px solid #e5e7eb;">
                    <a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">
                      ${data.phone}
                    </a>
                  </td>
                </tr>
                <tr style="background-color: #f9fafb;">
                  <td style="color: #6b7280; font-size: 14px;">
                    <strong>🌍 Pays</strong>
                  </td>
                  <td style="color: #1f2937; font-size: 14px;">
                    ${data.country || 'Non spécifié'}
                  </td>
                </tr>
              </table>

              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 30px 0; border-radius: 8px;">
                <p style="color: #92400e; margin: 0; font-weight: 600; font-size: 15px;">
                  ⚡ Action requise: Contacter sous 2 heures
                </p>
                <p style="color: #b45309; margin: 10px 0 0 0; font-size: 14px;">
                  Le client attend votre appel ou message WhatsApp.
                </p>
              </div>

              <!-- Boutons d'action -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="https://wa.me/${data.phone.replace(/[^0-9]/g, '')}" style="display: inline-block; background-color: #10b981; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 15px;">
                            💬 WhatsApp
                          </a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="mailto:${data.email}" style="display: inline-block; background-color: #3b82f6; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 15px;">
                            📧 Email
                          </a>
                        </td>
                        <td style="padding: 0 10px;">
                          <a href="tel:${data.phone}" style="display: inline-block; background-color: #8b5cf6; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 10px; font-weight: 600; font-size: 15px;">
                            📞 Appeler
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                Email généré automatiquement par le système L'Étudiant Étranger
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `
  }
}
