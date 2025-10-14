import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Charger les variables d'environnement
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function fixServicesLinks() {
  console.log('🔧 Correction des liens Services dans Sanity...\n')

  try {
    // Récupérer toutes les navigations
    const navigations = await client.fetch(`*[_type == "navigation"]`)
    
    if (!navigations || navigations.length === 0) {
      console.log('⚠️  Aucune navigation trouvée dans Sanity')
      return
    }

    console.log(`📋 Trouvé ${navigations.length} navigation(s)\n`)

    for (const nav of navigations) {
      console.log(`📌 Navigation: "${nav.title}"`)
      
      let needsUpdate = false
      const updatedMenuItems = nav.menuItems?.map((item) => {
        if (item.label === 'Services' || item.label === 'Nos Services') {
          if (item.dropdownItems && item.dropdownItems.length > 0) {
            const updatedDropdownItems = item.dropdownItems.map((dropdownItem) => {
              // Vérifier si le lien ne pointe pas déjà vers /services
              if (dropdownItem.link && dropdownItem.link !== '/services' && dropdownItem.link.startsWith('/services/')) {
                console.log(`  ✏️  ${dropdownItem.label}: ${dropdownItem.link} → /services`)
                needsUpdate = true
                return {
                  ...dropdownItem,
                  link: '/services',
                }
              }
              return dropdownItem
            })
            
            return {
              ...item,
              dropdownItems: updatedDropdownItems,
            }
          }
        }
        return item
      })

      if (needsUpdate) {
        await client
          .patch(nav._id)
          .set({ menuItems: updatedMenuItems })
          .commit()
        
        console.log(`  ✅ Mise à jour effectuée\n`)
      } else {
        console.log(`  ℹ️  Aucune modification nécessaire\n`)
      }
    }

    console.log('✨ Terminé !')
  } catch (error) {
    console.error('❌ Erreur:', error.message)
    process.exit(1)
  }
}

fixServicesLinks()
