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

async function debugContent() {
  console.log('🔍 Vérification du contenu des articles...\n')

  const post = await client.fetch(`*[_type == "blogPost" && slug.current == "guide-complet-etudier-canada-2025"][0] {
    title,
    "slug": slug.current,
    content
  }`)

  console.log('📄 Article:', post.title)
  console.log('🔗 Slug:', post.slug)
  console.log('\n📦 Type de content:', typeof post.content)
  console.log('📦 Est un Array:', Array.isArray(post.content))

  if (Array.isArray(post.content)) {
    console.log(`📦 Nombre de blocs: ${post.content.length}`)
    console.log('\n🔍 Premier bloc:')
    console.log(JSON.stringify(post.content[0], null, 2))
    
    if (post.content.length > 1) {
      console.log('\n🔍 Deuxième bloc:')
      console.log(JSON.stringify(post.content[1], null, 2))
    }

    // Vérifier la structure de chaque bloc
    console.log('\n✅ Validation des blocs:')
    post.content.forEach((block: any, index: number) => {
      const hasType = '_type' in block
      const hasKey = '_key' in block
      const hasChildren = 'children' in block
      const isValid = hasType && hasKey

      console.log(`  Bloc ${index + 1}:`, isValid ? '✅' : '❌', {
        _type: hasType,
        _key: hasKey,
        children: hasChildren,
        keys: Object.keys(block).join(', ')
      })
    })
  } else {
    console.log('❌ Content n\'est PAS un array!')
    console.log('Type:', typeof post.content)
    console.log('Valeur:', JSON.stringify(post.content).substring(0, 500))
  }
}

debugContent()
  .then(() => {
    console.log('\n✅ Debug terminé')
    process.exit(0)
  })
  .catch((error) => {
    console.error('❌ Erreur:', error)
    process.exit(1)
  })
