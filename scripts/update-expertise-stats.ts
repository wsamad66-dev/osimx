import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function updateExpertiseStats() {
  console.log('📊 Mise à jour de la section "Une expertise prouvée"...\n')

  try {
    // Récupérer le document d'expertise existant
    const existingExpertise = await client.fetch(`*[_type == "expertise"][0]`)
    
    if (!existingExpertise) {
      console.log('❌ Aucun document expertise trouvé dans Sanity.')
      console.log('💡 Allez sur http://localhost:3000/studio et créez-le manuellement.')
      return
    }

    console.log('✅ Document expertise trouvé:', existingExpertise._id)
    console.log('\n📝 Statistiques actuelles:')
    existingExpertise.stats?.forEach((stat: any) => {
      console.log(`   - ${stat.label}: ${stat.number}`)
    })

    // Mettre à jour les statistiques
    const updatedStats = existingExpertise.stats?.map((stat: any) => {
      // Changer "Étudiants accompagnés" à 500+
      if (stat.label === 'Étudiants accompagnés' || stat.label.toLowerCase().includes('étudiant')) {
        return {
          ...stat,
          number: '500+'
        }
      }
      return stat
    })

    // Mettre à jour le document
    const updated = await client
      .patch(existingExpertise._id)
      .set({ stats: updatedStats })
      .commit()

    console.log('\n✅ Statistiques mises à jour avec succès!')
    console.log('\n📝 Nouvelles statistiques:')
    updated.stats?.forEach((stat: any) => {
      console.log(`   - ${stat.label}: ${stat.number}`)
    })

    console.log('\n🎉 Succès ! Rafraîchissez votre navigateur pour voir les changements.')

  } catch (error) {
    console.error('\n❌ Erreur:', error)
    console.log('\n💡 Utilisez plutôt Sanity Studio: http://localhost:3000/studio')
  }
}

updateExpertiseStats()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Erreur fatale:', error)
    process.exit(1)
  })
