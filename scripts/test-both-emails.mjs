#!/usr/bin/env node

/**
 * Script de test pour envoyer les 2 types d'emails
 */

async function testBothEmails() {
  try {
    console.log('🧪 Test des 2 types d\'emails...\n')

    // Test 1: Email client (bienvenue)
    console.log('═══════════════════════════════════════════')
    console.log('📧 TEST 1: EMAIL CLIENT (Bienvenue)')
    console.log('═══════════════════════════════════════════\n')

    const clientData = {
      to: 'letudaintetranger@gmail.com',
      name: 'Amadou Diop',
      phone: '+221 77 123 45 67',
      country: 'Sénégal',
      type: 'client-welcome'
    }

    console.log('Envoi à:', clientData.to)
    const response1 = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    })

    const result1 = await response1.json()
    if (response1.ok) {
      console.log('✅ Email client envoyé!')
      console.log('   Message ID:', result1.messageId)
    } else {
      console.log('❌ Échec:', result1.error)
    }

    // Pause de 3 secondes
    console.log('\n⏳ Pause de 3 secondes...\n')
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Test 2: Email équipe (notification)
    console.log('═══════════════════════════════════════════')
    console.log('📧 TEST 2: EMAIL ÉQUIPE (Notification)')
    console.log('═══════════════════════════════════════════\n')

    const teamData = {
      to: 'letudaintetranger@gmail.com',
      name: 'Amadou Diop',
      phone: '+221 77 123 45 67',
      country: 'Sénégal',
      type: 'team-notification'
    }

    console.log('Envoi à:', teamData.to)
    const response2 = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teamData),
    })

    const result2 = await response2.json()
    if (response2.ok) {
      console.log('✅ Email équipe envoyé!')
      console.log('   Message ID:', result2.messageId)
    } else {
      console.log('❌ Échec:', result2.error)
    }

    console.log('\n═══════════════════════════════════════════')
    console.log('🎉 TESTS TERMINÉS !')
    console.log('═══════════════════════════════════════════\n')
    console.log('💡 Vérifiez votre boîte Gmail:', teamData.to)
    console.log('   Vous devriez avoir reçu 2 emails:')
    console.log('   1. 🎉 Bienvenue à L\'Étudiant Étranger !')
    console.log('   2. 🔔 Nouvelle inscription: Amadou Diop')
    console.log('')

  } catch (error) {
    console.error('❌ ERREUR:', error.message)
  }
}

testBothEmails()
