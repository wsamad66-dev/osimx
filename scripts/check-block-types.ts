import { createClient } from '@sanity/client'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function checkTypes() {
  const post = await client.fetch(`*[_type == "blogPost" && slug.current == "guide-complet-etudier-canada-2025"][0] {
    title,
    content
  }`)

  console.log('📊 Types de blocs trouvés:\n')

  const typeCount: Record<string, number> = {}

  post.content.forEach((block: any) => {
    const type = block._type
    typeCount[type] = (typeCount[type] || 0) + 1
  })

  Object.entries(typeCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([type, count]) => {
      console.log(`  ${type}: ${count} blocs`)
    })

  // Trouver les blocs problématiques (qui ont "type" au lieu de "style")
  console.log('\n🔍 Blocs avec "type" au lieu de "style":')
  const problematicBlocks = post.content.filter((block: any) => 'type' in block)
  
  if (problematicBlocks.length > 0) {
    console.log(`  Trouvé ${problematicBlocks.length} blocs problématiques`)
    console.log('\n  Premier bloc problématique:')
    console.log(JSON.stringify(problematicBlocks[0], null, 2))
  } else {
    console.log('  Aucun bloc problématique trouvé')
  }
}

checkTypes()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Erreur:', error)
    process.exit(1)
  })
