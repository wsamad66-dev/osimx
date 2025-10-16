import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Clé secrète pour l'authentification de l'API
const API_SECRET = process.env.BLOG_API_SECRET || 'your-secret-key-change-me'

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

function convertToPortableText(content: string) {
  // Convertit un texte Markdown simple en Portable Text
  const blocks = []
  const lines = content.split('\n')
  
  let currentBlock: any = null
  
  for (const line of lines) {
    const trimmedLine = line.trim()
    
    // Ligne vide - finalise le bloc courant
    if (!trimmedLine) {
      if (currentBlock) {
        blocks.push(currentBlock)
        currentBlock = null
      }
      continue
    }
    
    // Titres H1
    if (trimmedLine.startsWith('# ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'h2',
        children: [{ _type: 'span', text: trimmedLine.substring(2) }],
        markDefs: [],
      })
      currentBlock = null
      continue
    }
    
    // Titres H2
    if (trimmedLine.startsWith('## ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'h3',
        children: [{ _type: 'span', text: trimmedLine.substring(3) }],
        markDefs: [],
      })
      currentBlock = null
      continue
    }
    
    // Titres H3
    if (trimmedLine.startsWith('### ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'h4',
        children: [{ _type: 'span', text: trimmedLine.substring(4) }],
        markDefs: [],
      })
      currentBlock = null
      continue
    }
    
    // Liste à puces
    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: trimmedLine.substring(2) }],
        markDefs: [],
      })
      currentBlock = null
      continue
    }
    
    // Liste numérotée
    if (/^\d+\.\s/.test(trimmedLine)) {
      if (currentBlock) blocks.push(currentBlock)
      blocks.push({
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: trimmedLine.replace(/^\d+\.\s/, '') }],
        markDefs: [],
      })
      currentBlock = null
      continue
    }
    
    // Paragraphe normal
    if (!currentBlock) {
      currentBlock = {
        _type: 'block',
        _key: Math.random().toString(36).substr(2, 9),
        style: 'normal',
        children: [{ _type: 'span', text: trimmedLine }],
        markDefs: [],
      }
    } else {
      // Ajouter à la ligne existante
      currentBlock.children[0].text += ' ' + trimmedLine
    }
  }
  
  // Ajouter le dernier bloc
  if (currentBlock) {
    blocks.push(currentBlock)
  }
  
  return blocks
}

async function getOrCreateAuthor(authorData?: { name: string; email: string; bio?: string }) {
  if (!authorData) {
    // Utiliser l'auteur par défaut
    const defaultAuthor = await client.fetch(
      `*[_type == "blogAuthor" && email == $email][0]`,
      { email: 'content@osimx.com' }
    )
    
    if (defaultAuthor) return defaultAuthor._id
    
    const newAuthor = await client.create({
      _type: 'blogAuthor',
      name: 'Équipe L'Étudiant Étranger',
      email: 'content@osimx.com',
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

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authHeader = request.headers.get('authorization')
    const apiKey = request.headers.get('x-api-key')
    
    if (authHeader !== `Bearer ${API_SECRET}` && apiKey !== API_SECRET) {
      return NextResponse.json(
        { error: 'Non autorisé', message: 'Clé API manquante ou invalide' },
        { status: 401 }
      )
    }

    // Récupérer les données
    const data = await request.json()

    // Validation des champs requis
    if (!data.title || !data.excerpt || !data.content) {
      return NextResponse.json(
        { 
          error: 'Données manquantes',
          message: 'Les champs title, excerpt et content sont requis',
          required: ['title', 'excerpt', 'content']
        },
        { status: 400 }
      )
    }

    // Obtenir ou créer l'auteur
    const authorId = await getOrCreateAuthor(data.author)

    // Générer le slug
    const slug = data.slug || generateSlug(data.title)

    // Convertir le contenu string en Portable Text si nécessaire
    let portableTextContent
    if (typeof data.content === 'string') {
      // Convertir Markdown/texte simple en Portable Text
      portableTextContent = convertToPortableText(data.content)
    } else {
      // Déjà au format Portable Text
      portableTextContent = data.content
    }

    // Créer l'article
    const post = await client.create({
      _type: 'blogPost',
      title: data.title,
      slug: { current: slug },
      author: { _ref: authorId },
      excerpt: data.excerpt,
      content: portableTextContent,
      category: data.categories?.[0] || data.category || 'conseils',
      tags: data.tags || [],
      featured: data.featured || false,
      publishedAt: data.publishedAt || new Date().toISOString(),
    })

    return NextResponse.json({
      success: true,
      message: 'Article créé avec succès',
      data: {
        id: post._id,
        title: post.title,
        slug: slug,
        publishedAt: post.publishedAt,
        studioUrl: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/studio/desk/blogPost;${post._id}`,
      }
    }, { status: 201 })

  } catch (error: any) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { 
        error: 'Erreur serveur',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// GET: Récupérer tous les articles
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const category = searchParams.get('category')

    let query = `*[_type == "blogPost"]`
    if (category) {
      query = `*[_type == "blogPost" && $category in categories]`
    }
    query += ` | order(publishedAt desc) [${offset}...${offset + limit}]`

    const posts = await client.fetch(query, { category })

    return NextResponse.json({
      success: true,
      data: posts,
      pagination: {
        limit,
        offset,
        count: posts.length
      }
    })

  } catch (error: any) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur serveur', message: error.message },
      { status: 500 }
    )
  }
}
