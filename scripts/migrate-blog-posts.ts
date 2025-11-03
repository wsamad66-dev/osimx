import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import { randomUUID } from 'crypto'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

/**
 * Convertit du contenu Markdown en format Portable Text
 */
function convertToPortableText(content: string) {
  const lines = content.split('\n')
  const blocks: any[] = []
  let currentList: any = null

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line) {
      // Ligne vide - termine une liste si elle existe
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      continue
    }

    // Gestion des titres
    if (line.startsWith('# ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      blocks.push({
        _type: 'block',
        _key: randomUUID(),
        style: 'h2',
        children: [{ _type: 'span', _key: randomUUID(), text: line.substring(2), marks: [] }],
        markDefs: [],
      })
      continue
    }

    if (line.startsWith('## ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      blocks.push({
        _type: 'block',
        _key: randomUUID(),
        style: 'h3',
        children: [{ _type: 'span', _key: randomUUID(), text: line.substring(3), marks: [] }],
        markDefs: [],
      })
      continue
    }

    if (line.startsWith('### ')) {
      if (currentList) {
        blocks.push(currentList)
        currentList = null
      }
      blocks.push({
        _type: 'block',
        _key: randomUUID(),
        style: 'h4',
        children: [{ _type: 'span', _key: randomUUID(), text: line.substring(4), marks: [] }],
        markDefs: [],
      })
      continue
    }

    // Gestion des listes à puces
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const text = line.substring(2).trim()
      const listItem = {
        _type: 'block',
        _key: randomUUID(),
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', _key: randomUUID(), text, marks: [] }],
        markDefs: [],
      }

      blocks.push(listItem)
      continue
    }

    // Gestion des listes numérotées
    const numberedMatch = line.match(/^\d+\.\s+(.+)/)
    if (numberedMatch) {
      const text = numberedMatch[1].trim()
      const listItem = {
        _type: 'block',
        _key: randomUUID(),
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', _key: randomUUID(), text, marks: [] }],
        markDefs: [],
      }

      blocks.push(listItem)
      continue
    }

    // Paragraphe normal
    if (currentList) {
      blocks.push(currentList)
      currentList = null
    }

    // Gestion du texte en gras **texte**
    const textWithMarks = line.replace(/\*\*(.+?)\*\*/g, (_, text) => text)

    blocks.push({
      _type: 'block',
      _key: randomUUID(),
      style: 'normal',
      children: [{ _type: 'span', _key: randomUUID(), text: textWithMarks, marks: [] }],
      markDefs: [],
    })
  }

  // Ajouter la dernière liste si elle existe
  if (currentList) {
    blocks.push(currentList)
  }

  return blocks
}

async function migrateBlogPosts() {
  console.log('🔄 Migration des articles de blog vers Portable Text...\n')

  try {
    // Récupérer tous les articles
    const posts = await client.fetch(`*[_type == "blogPost"] {
      _id,
      title,
      content,
      _rev
    }`)

    console.log(`📊 ${posts.length} articles trouvés\n`)

    let migratedCount = 0
    let skippedCount = 0

    for (const post of posts) {
      // Vérifier si le contenu est déjà en Portable Text (array)
      if (Array.isArray(post.content)) {
        console.log(`⏭️  Skip: "${post.title}" (déjà en Portable Text)`)
        skippedCount++
        continue
      }

      // Vérifier si le contenu est un string
      if (typeof post.content !== 'string') {
        console.log(`⚠️  Skip: "${post.title}" (format de contenu inconnu)`)
        skippedCount++
        continue
      }

      console.log(`🔄 Migration: "${post.title}"...`)

      // Convertir le contenu Markdown en Portable Text
      const portableTextContent = convertToPortableText(post.content)

      // Mettre à jour l'article dans Sanity
      await client
        .patch(post._id)
        .set({ content: portableTextContent })
        .commit()

      console.log(`✅ Migré: "${post.title}" (${portableTextContent.length} blocs)\n`)
      migratedCount++
    }

    console.log('\n✨ Migration terminée!')
    console.log(`📊 Résumé:`)
    console.log(`   - Articles migrés: ${migratedCount}`)
    console.log(`   - Articles ignorés: ${skippedCount}`)
    console.log(`   - Total: ${posts.length}`)

    if (migratedCount > 0) {
      console.log('\n💡 Les articles migrés devraient maintenant s\'afficher correctement.')
      console.log('   Rafraîchissez votre navigateur pour voir les changements.')
    }
  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error)
    throw error
  }
}

// Exécuter la migration
migrateBlogPosts()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ Échec de la migration:', error)
    process.exit(1)
  })
