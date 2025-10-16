#!/usr/bin/env node

/**
 * Script de test pour envoyer un email via l'API
 * Usage: node scripts/test-send-email.mjs
 */

async function testEmail() {
  try {
    console.log('🧪 Test d\'envoi d\'email...\n')

    const testData = {
      to: 'letudaintetranger@gmail.com',
      name: 'Test Étudiant',
      phone: '+221 77 123 45 67',
      country: 'Sénégal',
      type: 'client-welcome'
    }

    console.log('📧 Envoi à:', testData.to)
    console.log('👤 Nom:', testData.name)
    console.log('📱 Téléphone:', testData.phone)
    console.log('🌍 Pays:', testData.country)
    console.log('📋 Type:', testData.type)
    console.log('\n⏳ Envoi en cours...\n')

    const response = await fetch('http://localhost:3000/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    })

    const result = await response.json()

    if (response.ok) {
      console.log('✅ SUCCESS!')
      console.log('\n📬 Résultat:')
      console.log(JSON.stringify(result, null, 2))
      console.log('\n💡 Vérifiez votre boîte Gmail:', testData.to)
      console.log('📧 Sujet: 🎉 Bienvenue à L\'Étudiant Étranger !')
    } else {
      console.log('❌ ÉCHEC!')
      console.log('\n🔴 Erreur:')
      console.log(JSON.stringify(result, null, 2))
    }
  } catch (error) {
    console.error('❌ ERREUR:', error.message)
    console.log('\n💡 Vérifiez que le serveur tourne sur http://localhost:3000')
  }
}

testEmail()
