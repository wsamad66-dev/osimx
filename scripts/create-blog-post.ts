import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as readline from 'readline'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

function ask(question: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer)
    })
  })
}

async function getOrCreateAuthor() {
  console.log('\n👤 Gestion de l\'auteur')
  console.log('-------------------')
  
  // Récupérer tous les auteurs existants
  const authors = await client.fetch(`*[_type == "blogAuthor"]`)
  
  if (authors.length > 0) {
    console.log('\nAuteurs existants:')
    authors.forEach((author: any, index: number) => {
      console.log(`${index + 1}. ${author.name} (${author.email})`)
    })
    console.log(`${authors.length + 1}. Créer un nouvel auteur`)
    
    const choice = await ask('\nChoisissez un auteur (numéro): ')
    const choiceNum = parseInt(choice)
    
    if (choiceNum > 0 && choiceNum <= authors.length) {
      return authors[choiceNum - 1]._id
    }
  }
  
  // Créer un nouvel auteur
  console.log('\n📝 Créer un nouvel auteur')
  const name = await ask('Nom complet: ')
  const email = await ask('Email: ')
  const bio = await ask('Bio (optionnel): ')
  
  const author = await client.create({
    _type: 'blogAuthor',
    name,
    email,
    bio: bio || undefined,
  })
  
  console.log(`✅ Auteur créé: ${author.name}`)
  return author._id
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function createBlogPost() {
  console.log('🎨 Création d\'un nouvel article de blog')
  console.log('=======================================\n')
  
  try {
    // 1. Obtenir ou créer un auteur
    const authorId = await getOrCreateAuthor()
    
    // 2. Informations de l'article
    console.log('\n📰 Informations de l\'article')
    console.log('---------------------------')
    
    const title = await ask('Titre: ')
    const slug = await ask(`Slug (laisser vide pour auto: ${generateSlug(title)}): `)
    const finalSlug = slug || generateSlug(title)
    
    const excerpt = await ask('Résumé (excerpt): ')
    
    console.log('\n💬 Contenu de l\'article')
    console.log('Entrez le contenu (terminez avec une ligne vide):')
    
    let content = ''
    let line = ''
    while (true) {
      line = await ask('')
      if (line === '') break
      content += line + '\n'
    }
    
    // 3. Catégories
    console.log('\n🏷️  Catégories')
    console.log('Catégories disponibles: etudes, visa, logement, financement, temoignages, conseils')
    const categoriesInput = await ask('Catégories (séparées par des virgules): ')
    const categories = categoriesInput.split(',').map(c => c.trim())
    
    // 4. Tags
    const tagsInput = await ask('Tags (séparés par des virgules): ')
    const tags = tagsInput.split(',').map(t => t.trim()).filter(t => t)
    
    // 5. Options
    const featured = await ask('Article en vedette? (o/n): ')
    const publish = await ask('Publier maintenant? (o/n): ')
    
    // Créer l'article
    const post = await client.create({
      _type: 'blogPost',
      title,
      slug: { current: finalSlug },
      author: { _ref: authorId },
      excerpt,
      content,
      categories,
      tags,
      featured: featured.toLowerCase() === 'o',
      publishedAt: publish.toLowerCase() === 'o' ? new Date().toISOString() : undefined,
    })
    
    console.log('\n✅ Article créé avec succès!')
    console.log(`📍 ID: ${post._id}`)
    console.log(`🔗 Slug: ${finalSlug}`)
    console.log(`\n👉 Accédez au Studio pour ajouter une image: http://localhost:3000/studio`)
    
  } catch (error) {
    console.error('❌ Erreur:', error)
  } finally {
    rl.close()
  }
}

createBlogPost()
