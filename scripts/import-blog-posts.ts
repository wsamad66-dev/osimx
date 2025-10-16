import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

interface BlogPostData {
  title: string
  slug?: string
  excerpt: string
  content: string
  author?: {
    name: string
    email: string
    bio?: string
  }
  categories: string[]
  tags?: string[]
  featured?: boolean
  publishedAt?: string
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

async function getOrCreateAuthor(authorData: BlogPostData['author']) {
  if (!authorData) {
    // Créer un auteur par défaut
    const defaultAuthor = await client.fetch(
      `*[_type == "blogAuthor" && email == $email][0]`,
      { email: 'admin@osimx.com' }
    )
    
    if (defaultAuthor) return defaultAuthor._id
    
    const newAuthor = await client.create({
      _type: 'blogAuthor',
      name: 'Équipe L'Étudiant Étranger',
      email: 'admin@osimx.com',
      bio: 'L\'équipe OSIMX - Experts en accompagnement d\'étudiants internationaux',
    })
    return newAuthor._id
  }
  
  // Chercher l'auteur existant
  const existingAuthor = await client.fetch(
    `*[_type == "blogAuthor" && email == $email][0]`,
    { email: authorData.email }
  )
  
  if (existingAuthor) return existingAuthor._id
  
  // Créer le nouvel auteur
  const newAuthor = await client.create({
    _type: 'blogAuthor',
    name: authorData.name,
    email: authorData.email,
    bio: authorData.bio,
  })
  
  return newAuthor._id
}

async function createBlogPostFromJSON(data: BlogPostData) {
  console.log(`📝 Création de l'article: ${data.title}`)
  
  // Obtenir ou créer l'auteur
  const authorId = await getOrCreateAuthor(data.author)
  
  // Générer le slug si non fourni
  const slug = data.slug || generateSlug(data.title)
  
  // Créer l'article
  const post = await client.create({
    _type: 'blogPost',
    title: data.title,
    slug: { current: slug },
    author: { _ref: authorId },
    excerpt: data.excerpt,
    content: data.content,
    categories: data.categories,
    tags: data.tags || [],
    featured: data.featured || false,
    publishedAt: data.publishedAt || new Date().toISOString(),
  })
  
  console.log(`✅ Article créé: ${post._id} (${slug})`)
  return post
}

async function importFromJSON(filePath: string) {
  console.log('📥 Import d\'articles depuis JSON')
  console.log('=================================\n')
  
  try {
    // Lire le fichier JSON
    const jsonContent = fs.readFileSync(filePath, 'utf-8')
    const data = JSON.parse(jsonContent)
    
    // Vérifier si c'est un tableau ou un seul article
    const posts = Array.isArray(data) ? data : [data]
    
    console.log(`📚 ${posts.length} article(s) à importer\n`)
    
    // Créer tous les articles
    for (const postData of posts) {
      await createBlogPostFromJSON(postData)
    }
    
    console.log('\n✨ Import terminé avec succès!')
    console.log(`📍 Accédez au Studio: http://localhost:3000/studio`)
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'import:', error)
    process.exit(1)
  }
}

// Lire le chemin du fichier depuis les arguments
const filePath = process.argv[2]

if (!filePath) {
  console.error('❌ Usage: npx tsx scripts/import-blog-posts.ts <chemin-vers-fichier.json>')
  console.log('\nFormat JSON attendu:')
  console.log(JSON.stringify({
    title: 'Mon article',
    excerpt: 'Résumé de l\'article',
    content: 'Contenu complet de l\'article...',
    categories: ['etudes', 'visa'],
    tags: ['canada', 'admission'],
    featured: true,
    author: {
      name: 'John Doe',
      email: 'john@example.com',
      bio: 'Expert en...'
    }
  }, null, 2))
  console.log('\nOu un tableau de plusieurs articles: [{ ... }, { ... }]')
  process.exit(1)
}

importFromJSON(filePath)
