// Script pour tester l'envoi d'emails via Gmail
// Usage: npx tsx scripts/test-send-email.ts

async function testEmail() {
  console.log('🧪 Test d\'envoi d\'email via Gmail...\n')

  const testData = {
    to: 'letudaintetranger@gmail.com', // Email de test (votre équipe)
    name: 'Test Étudiant',
    phone: '+221 77 123 45 67',
    country: 'Sénégal',
    type: 'client-welcome', // ou 'team-notification'
  }

  try {
    console.log('📧 Envoi de l\'email de test...')
    console.log('   Destinataire:', testData.to)
    console.log('   Nom:', testData.name)
    console.log('   Type:', testData.type)
    console.log('')

    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()

    if (response.ok) {
      console.log('✅ EMAIL ENVOYÉ AVEC SUCCÈS!')
      console.log('')
      console.log('📊 Détails:')
      console.log('   Status:', response.status)
      console.log('   Message ID:', result.messageId)
      console.log('')
      console.log('💡 Vérifiez maintenant:')
      console.log('   1. Votre boîte Gmail:', testData.to)
      console.log('   2. Le dossier spam si l\'email n\'est pas dans la boîte de réception')
      console.log('')
      console.log('🎉 Le système d\'emails fonctionne parfaitement!')
    } else {
      console.error('❌ ERREUR lors de l\'envoi:')
      console.error('   Status:', response.status)
      console.error('   Erreur:', result.error)
      console.error('   Détails:', result.details)
      console.log('')
      console.log('💡 Vérifications:')
      console.log('   1. GMAIL_USER est correct dans .env.local')
      console.log('   2. GMAIL_APP_PASSWORD est le mot de passe d\'application (16 caractères)')
      console.log('   3. Le serveur Next.js est lancé (npm run dev)')
      console.log('   4. La validation en 2 étapes est activée sur Gmail')
    }
  } catch (error) {
    console.error('❌ ERREUR de connexion:')
    console.error('   ', error)
    console.log('')
    console.log('💡 Solution:')
    console.log('   Vérifiez que le serveur Next.js est lancé:')
    console.log('   → npm run dev')
  }
}

// Vérifier que le serveur est lancé
console.log('⏳ Vérification du serveur Next.js...\n')

fetch('http://localhost:3000')
  .then(() => {
    console.log('✅ Serveur Next.js détecté\n')
    return testEmail()
  })
  .catch(() => {
    console.error('❌ Serveur Next.js non détecté!')
    console.log('')
    console.log('💡 Lancez le serveur d\'abord:')
    console.log('   npm run dev')
    console.log('')
    console.log('Puis relancez ce script:')
    console.log('   npx tsx scripts/test-send-email.ts')
    process.exit(1)
  })
