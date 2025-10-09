import { config } from 'dotenv'
import { resolve } from 'path'
import { createClient } from '@sanity/client'

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') })

/**
 * Seed script for initial hero content
 * Run: npm run seed:hero OR npx tsx scripts/seed-hero.ts
 */

async function seedHeroContent() {
  try {
    console.log('🌱 Seeding hero content...')
    
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
    const token = process.env.SANITY_API_TOKEN
    
    console.log('📋 Project ID:', projectId)
    console.log('📋 Dataset:', dataset)
    console.log('📋 Token:', token ? '✅ Found' : '❌ Missing')
    
    if (!projectId || !token) {
      console.error('❌ Missing environment variables. Check .env.local')
      process.exit(1)
    }
    
    // Create client for this script
    const client = createClient({
      projectId,
      dataset,
      token,
      useCdn: false,
      apiVersion: '2024-01-01',
    })

    const heroContent = {
      _type: 'hero',
      headline: 'Commencez Votre Aventure Académique Internationale',
      subheadline:
        "Inscrivez-vous en quelques minutes et accédez à nos services d'accompagnement complet pour étudier dans les meilleures universités du monde.",
      primaryCtaText: 'Créer Mon Compte Étudiant',
      secondaryCtaText: 'En Savoir Plus',
      benefits: [
        {
          icon: 'shield',
          title: 'Sécurisé et Confidentiel',
          description: 'Vos documents sont chiffrés et stockés en toute sécurité',
        },
        {
          icon: 'clock',
          title: 'Inscription Rapide',
          description: 'Complétez votre profil en moins de 5 minutes',
        },
        {
          icon: 'users',
          title: 'Accompagnement Personnalisé',
          description: 'Un conseiller dédié à votre projet',
        },
        {
          icon: 'globe',
          title: 'Accès à 50+ Destinations',
          description: 'Universités partenaires dans le monde entier',
        },
      ],
      isActive: true,
    }

    const result = await client.create(heroContent)
    console.log('✅ Hero content seeded successfully!')
    console.log('Document ID:', result._id)
  } catch (error) {
    console.error('❌ Error seeding hero content:', error)
    process.exit(1)
  }
}

seedHeroContent()
