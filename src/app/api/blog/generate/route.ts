import { NextRequest, NextResponse } from 'next/server'

// Cette route permet de générer du contenu avec l'IA
// Vous pouvez utiliser OpenAI, Anthropic, ou tout autre service d'IA

const OPENAI_API_KEY = process.env.OPENAI_API_KEY
const API_SECRET = process.env.BLOG_API_SECRET || 'your-secret-key-change-me'

interface GenerateRequest {
  topic: string
  keywords?: string[]
  category?: string
  language?: 'fr' | 'en'
  tone?: 'professional' | 'casual' | 'academic'
  length?: 'short' | 'medium' | 'long'
}

export async function POST(request: NextRequest) {
  try {
    // Vérifier l'authentification
    const authHeader = request.headers.get('authorization')
    const apiKey = request.headers.get('x-api-key')
    
    if (authHeader !== `Bearer ${API_SECRET}` && apiKey !== API_SECRET) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const { topic, keywords = [], category = 'etudes', language = 'fr', tone = 'professional', length = 'medium' }: GenerateRequest = await request.json()

    if (!topic) {
      return NextResponse.json(
        { error: 'Le sujet (topic) est requis' },
        { status: 400 }
      )
    }

    // Si OpenAI API key n'est pas configurée
    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          error: 'OpenAI API non configurée',
          message: 'Ajoutez OPENAI_API_KEY dans .env.local',
          example: generateManualExample(topic, keywords, category)
        },
        { status: 503 }
      )
    }

    // Construire le prompt
    const wordCount = length === 'short' ? '800-1000' : length === 'medium' ? '1200-1500' : '2000-2500'
    
    const prompt = `Tu es un expert en rédaction de contenu pour une agence d'accompagnement d'étudiants internationaux (OSIMX).

Sujet: ${topic}
Catégorie: ${category}
Mots-clés: ${keywords.join(', ')}
Ton: ${tone}
Langue: ${language}

Rédige un article de blog complet (${wordCount} mots) au format suivant:

{
  "title": "Titre accrocheur et SEO-friendly (50-60 caractères)",
  "excerpt": "Résumé court et percutant (150-160 caractères)",
  "content": "# Titre Principal\\n\\nIntroduction...\\n\\n## Section 1\\n\\nContenu...\\n\\n## Section 2\\n\\nContenu...",
  "categories": ["${category}"],
  "tags": ["tag1", "tag2", "tag3"],
  "featured": false
}

IMPORTANT:
1. Le contenu doit être en Markdown avec des titres (##), listes, etc.
2. Inclure des conseils pratiques et actionnables
3. Mentionner les services OSIMX naturellement
4. Optimiser pour le SEO avec les mots-clés
5. Structure claire avec introduction, corps, conclusion
6. Call-to-action à la fin pour contacter OSIMX

Réponds UNIQUEMENT avec le JSON, sans autre texte.`

    // Appeler OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'Tu es un expert en rédaction de contenu éducatif pour étudiants internationaux. Tu réponds toujours en JSON valide.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const aiResponse = await response.json()
    const generatedContent = JSON.parse(aiResponse.choices[0].message.content)

    return NextResponse.json({
      success: true,
      message: 'Contenu généré avec succès',
      data: generatedContent,
      usage: {
        promptTokens: aiResponse.usage.prompt_tokens,
        completionTokens: aiResponse.usage.completion_tokens,
        totalTokens: aiResponse.usage.total_tokens
      }
    })

  } catch (error: any) {
    console.error('Erreur génération AI:', error)
    return NextResponse.json(
      { 
        error: 'Erreur lors de la génération',
        message: error.message 
      },
      { status: 500 }
    )
  }
}

// Fonction pour générer un exemple manuel si OpenAI n'est pas configuré
function generateManualExample(topic: string, keywords: string[], category: string) {
  return {
    title: `Guide Complet: ${topic}`,
    excerpt: `Découvrez tout ce que vous devez savoir sur ${topic} pour réussir vos études à l'étranger.`,
    content: `# ${topic}

## Introduction

Ce guide complet vous aide à comprendre ${topic}.

## Points Clés

- Point 1: Information importante
- Point 2: Conseil pratique
- Point 3: Recommandation

## Nos Services

OSIMX vous accompagne dans toutes vos démarches. Contactez-nous pour plus d'informations.

## Conclusion

N'hésitez pas à nous contacter pour un accompagnement personnalisé.`,
    categories: [category],
    tags: keywords,
    featured: false
  }
}
