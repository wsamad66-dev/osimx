// Script de test pour visualiser les emails
import { getClientWelcomeEmail, getTeamNotificationEmail } from '../src/lib/email-templates'
import fs from 'fs'
import path from 'path'

// Données de test
const testData = {
  name: 'Amadou Diop',
  email: 'amadou.diop@example.com',
  phone: '+221 77 123 45 67',
  country: 'Sénégal',
}

// Générer l'email client
const clientEmail = getClientWelcomeEmail(testData)

// Générer l'email équipe
const teamEmail = getTeamNotificationEmail(testData)

// Créer le dossier test-emails s'il n'existe pas
const outputDir = path.join(process.cwd(), 'test-emails')
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir)
}

// Sauvegarder les emails en HTML
fs.writeFileSync(
  path.join(outputDir, 'client-welcome.html'),
  clientEmail.html
)

fs.writeFileSync(
  path.join(outputDir, 'team-notification.html'),
  teamEmail.html
)

console.log('✅ Emails générés avec succès !')
console.log('')
console.log('📧 Email Client:')
console.log('   Sujet:', clientEmail.subject)
console.log('   Fichier:', path.join(outputDir, 'client-welcome.html'))
console.log('')
console.log('📧 Email Équipe:')
console.log('   Sujet:', teamEmail.subject)
console.log('   Fichier:', path.join(outputDir, 'team-notification.html'))
console.log('')
console.log('💡 Ouvrez ces fichiers dans votre navigateur pour prévisualiser les emails')
