import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
})

async function updateNavigationServices() {
  console.log('🔄 Mise à jour des liens Services dans la navigation Sanity...')

  try {
    // Récupérer toutes les navigations
    const navigations = await client.fetch(`*[_type == "navigation"]`)
    
    console.log(`📋 Trouvé ${navigations.length} navigation(s)`)

    for (const nav of navigations) {
      console.log(`\n🔧 Mise à jour de: ${nav.title}`)
      
      // Mettre à jour les menuItems
      const updatedMenuItems = nav.menuItems?.map((item: any) => {
        if (item.label === 'Services' && item.hasDropdown && item.dropdownItems) {
          console.log('  ✏️  Mise à jour du menu Services...')
          return {
            ...item,
            dropdownItems: item.dropdownItems.map((dropdownItem: any) => {
              if (
                dropdownItem.label === 'Admission' ||
                dropdownItem.label === 'Visa' ||
                dropdownItem.label === 'Logement'
              ) {
                console.log(`    📌 ${dropdownItem.label}: ${dropdownItem.link} → /services`)
                return {
                  ...dropdownItem,
                  link: '/services',
                }
              }
              return dropdownItem
            }),
          }
        }
        return item
      })

      // Mettre à jour dans Sanity
      await client
        .patch(nav._id)
        .set({ menuItems: updatedMenuItems })
        .commit()

      console.log(`  ✅ Navigation "${nav.title}" mise à jour`)
    }

    console.log('\n✨ Mise à jour terminée avec succès!')
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour:', error)
    process.exit(1)
  }
}

updateNavigationServices()
