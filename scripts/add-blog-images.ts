import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Charger les variables d'environnement
config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Images Unsplash pour les articles (études à l'étranger)
const blogImages = {
  'etudes-canada': 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&h=630&fit=crop', // Toronto
  'etudes-france': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=630&fit=crop', // Paris
  'etudes-usa': 'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?w=1200&h=630&fit=crop', // NYC
  'etudes-uk': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=630&fit=crop', // Londres
  'visa-documents': 'https://images.unsplash.com/photo-1554224311-beee1860c62f?w=1200&h=630&fit=crop', // Passeport
  'conseils': 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=630&fit=crop', // Étudiant
  'testimonials': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=630&fit=crop', // Groupe
  'news': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&h=630&fit=crop', // News
  'bourses': 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=1200&h=630&fit=crop', // Money
  'logement': 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&h=630&fit=crop', // Apartment
}

async function uploadImageFromUrl(url: string, filename: string) {
  try {
    // Télécharger l'image
    const response = await fetch(url)
    const blob = await response.blob()
    const buffer = Buffer.from(await blob.arrayBuffer())

    // Upload vers Sanity
    const asset = await client.assets.upload('image', buffer, {
      filename,
    })

    return asset._id
  } catch (error) {
    console.error(`❌ Erreur upload image ${filename}:`, error)
    return null
  }
}

async function addImagesToArticles() {
  console.log('🖼️  Ajout d\'images aux articles de blog...\n')

  try {
    // Récupérer tous les articles sans image
    const articles = await client.fetch(
      `*[_type == "blogPost" && !defined(mainImage)] {
        _id,
        title,
        category,
        slug
      }`
    )

    console.log(`📝 ${articles.length} article(s) sans image trouvé(s)\n`)

    for (const article of articles) {
      console.log(`\n📄 ${article.title}`)
      console.log(`   Catégorie: ${article.category}`)

      // Choisir l'image selon la catégorie
      const imageUrl = blogImages[article.category as keyof typeof blogImages] || blogImages.conseils
      const filename = `${article.slug.current}.jpg`

      console.log(`   📥 Upload de l'image...`)
      const imageAssetId = await uploadImageFromUrl(imageUrl, filename)

      if (imageAssetId) {
        // Mettre à jour l'article avec l'image
        await client
          .patch(article._id)
          .set({
            mainImage: {
              _type: 'image',
              asset: {
                _type: 'reference',
                _ref: imageAssetId,
              },
              alt: `Image pour l'article: ${article.title}`,
              caption: 'Photo: Unsplash',
            },
          })
          .commit()

        console.log(`   ✅ Image ajoutée avec succès !`)
      } else {
        console.log(`   ⚠️  Échec de l'upload`)
      }
    }

    console.log('\n\n🎉 Processus terminé !')
    console.log(`✅ ${articles.length} article(s) mis à jour avec des images`)
  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

// Exécuter le script
addImagesToArticles()
