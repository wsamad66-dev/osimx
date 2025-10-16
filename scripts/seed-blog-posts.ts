import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN!,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const sampleBlogPosts = [
  {
    title: 'Guide Complet pour Étudier au Canada en 2025',
    excerpt: 'Découvrez toutes les étapes pour réussir votre admission dans une université canadienne, de la préparation du dossier à l\'obtention du visa.',
    content: `# Étudier au Canada : Le Guide Complet 2025

Le Canada est l'une des destinations les plus prisées par les étudiants internationaux. Voici pourquoi et comment y étudier.

## Pourquoi Choisir le Canada ?

1. **Éducation de qualité** : Universités reconnues mondialement
2. **Coût abordable** : Moins cher que les USA ou le UK
3. **Immigration facile** : Possibilité de rester après les études
4. **Multiculturalisme** : Société ouverte et accueillante

## Les Étapes Clés

### 1. Choisir votre Programme
Recherchez les programmes qui correspondent à vos objectifs de carrière.

### 2. Préparer votre Dossier
- Diplômes et relevés de notes
- Test de langue (IELTS/TEF)
- Lettre de motivation
- CV

### 3. Obtenir le Permis d'Études
Le processus prend généralement 8 semaines.

## Budget Estimé

- Frais de scolarité : 15,000 - 25,000 CAD/an
- Logement : 800 - 1,500 CAD/mois
- Vie quotidienne : 500 - 1,000 CAD/mois

## Contactez-nous

OSIMX vous accompagne dans chaque étape de votre projet d'études au Canada !`,
    categories: ['etudes', 'visa'],
    tags: ['canada', 'admission', 'permis-etudes'],
    featured: true,
  },
  {
    title: 'Comment Obtenir une Bourse d\'Études au Canada',
    excerpt: 'Les meilleures stratégies pour obtenir une bourse d\'études et financer vos études au Canada.',
    content: `# Obtenir une Bourse d'Études au Canada

Étudier au Canada peut coûter cher, mais de nombreuses bourses sont disponibles !

## Types de Bourses

### Bourses Gouvernementales
- Programme de bourses d'excellence
- Bourses Vanier CGS (35,000$/an)
- Bourses du Commonwealth

### Bourses Universitaires
Chaque université offre ses propres bourses :
- University of Toronto
- McGill University
- UBC

### Bourses Privées
- Fondations
- Entreprises
- ONG

## Comment Maximiser vos Chances ?

1. **Commencez tôt** : 6-12 mois avant
2. **Excellents résultats académiques**
3. **Implication communautaire**
4. **Projet clair**

## Documents Requis

- Formulaire de candidature
- Lettre de motivation
- Lettres de recommandation
- Preuve d'admission
- Relevés de notes

## Nos Services

OSIMX vous aide à :
- Identifier les bourses
- Préparer vos dossiers
- Optimiser vos chances

Contactez-nous pour un accompagnement personnalisé !`,
    categories: ['financement'],
    tags: ['bourses', 'canada', 'financement'],
    featured: true,
  },
  {
    title: 'Trouver un Logement Étudiant au Canada',
    excerpt: 'Conseils pratiques pour trouver le logement idéal pour vos études au Canada.',
    content: `# Guide du Logement Étudiant au Canada

Trouver un bon logement est essentiel pour réussir vos études !

## Options de Logement

### 1. Résidence Universitaire
**Avantages :**
- Proche du campus
- Communauté étudiante
- Services inclus

**Inconvénients :**
- Places limitées
- Moins d'intimité

### 2. Appartement Privé
**Avantages :**
- Indépendance totale
- Plus d'espace

**Inconvénients :**
- Plus cher
- Bail à long terme

### 3. Colocation
**Avantages :**
- Coût partagé
- Vie sociale

**Inconvénients :**
- Compromis nécessaires

## Budget Mensuel

**Toronto/Vancouver :**
- Studio : 1,200 - 1,800 CAD
- Colocation : 700 - 1,000 CAD
- Résidence : 800 - 1,500 CAD

**Autres villes :**
- Studio : 800 - 1,200 CAD
- Colocation : 500 - 700 CAD

## Sites Utiles

- Places4Students.com
- Kijiji.ca
- Facebook Marketplace
- Padmapper.com

## Conseils Importants

1. **Visitez avant de louer**
2. **Lisez le bail attentivement**
3. **Vérifiez les transports**
4. **Demandez l'état des lieux**

## Notre Assistance

OSIMX vous aide à :
- Trouver un logement avant votre arrivée
- Négocier avec les propriétaires
- Comprendre vos droits

Contactez-nous !`,
    categories: ['logement'],
    tags: ['logement', 'canada', 'vie-etudiante'],
    featured: false,
  },
  {
    title: 'Visa Étudiant France : Processus Complet 2025',
    excerpt: 'Tout ce que vous devez savoir sur la demande de visa étudiant pour la France.',
    content: `# Visa Étudiant France : Le Guide Complet

La France accueille plus de 350,000 étudiants internationaux chaque année.

## Types de Visa

### Visa Court Séjour (Type C)
- Durée : Jusqu'à 90 jours
- Pour : Stages, cours de langue courts

### Visa Long Séjour (VLS-TS)
- Durée : Plus de 3 mois
- Pour : Études supérieures

## Étapes de la Demande

### 1. Admission (2-4 mois avant)
Obtenir une lettre d'acceptation de l'université française.

### 2. Campus France (1-2 mois)
- Créer votre dossier
- Passer l'entretien
- Obtenir l'attestation

### 3. Demande de Visa (1 mois)
- Prendre rendez-vous
- Déposer les documents
- Payer les frais (99€)

### 4. Après l'Arrivée
Valider votre VLS-TS en ligne dans les 3 mois.

## Documents Requis

- Passeport valide
- Formulaire de demande
- Photo d'identité
- Attestation Campus France
- Lettre d'admission
- Justificatifs financiers (615€/mois)
- Assurance santé
- Preuve de logement

## Justificatifs Financiers

**Montant requis :** 7,380€ pour 12 mois

**Options :**
- Compte bancaire personnel
- Prise en charge parentale
- Bourse d'études

## Délais

- **Normal** : 2-4 semaines
- **Haute saison** : 4-8 semaines

## Taux de Refus

Environ 15% des demandes sont refusées.

**Causes principales :**
- Dossier incomplet
- Financement insuffisant
- Projet d'études peu clair

## Notre Accompagnement

OSIMX vous aide à :
- Préparer un dossier parfait
- Éviter les pièges
- Maximiser vos chances

**Taux de réussite OSIMX : 98%**

Contactez-nous pour un accompagnement expert !`,
    categories: ['visa', 'etudes'],
    tags: ['france', 'visa', 'campus-france'],
    featured: true,
  },
  {
    title: 'Top 10 des Universités Canadiennes pour les Étudiants Internationaux',
    excerpt: 'Notre sélection des meilleures universités canadiennes qui accueillent des étudiants internationaux.',
    content: `# Top 10 des Universités Canadiennes

Le Canada compte plusieurs universités de renommée mondiale.

## 1. University of Toronto
- **Classement mondial :** Top 20
- **Programmes phares :** Ingénierie, Commerce, Médecine
- **Bourses :** Nombreuses opportunités

## 2. University of British Columbia
- **Localisation :** Vancouver
- **Points forts :** Recherche, Innovation
- **Campus :** L'un des plus beaux au monde

## 3. McGill University
- **Localisation :** Montréal
- **Réputation :** Excellente à l'international
- **Langue :** Anglais (à Montréal !)

## 4. University of Alberta
- **Spécialités :** Sciences, Ingénierie
- **Coût :** Plus abordable
- **Immigration :** Facilité après études

## 5. McMaster University
- **Force :** Santé et médecine
- **Localisation :** Hamilton, Ontario
- **Recherche :** Très active

## 6. University of Waterloo
- **Excellence :** Informatique, Tech
- **Coop Programs :** Meilleurs du Canada
- **Emploi :** Excellent taux de placement

## 7. Western University
- **Programmes :** Business (Ivey School)
- **Vie étudiante :** Très active
- **Campus :** Magnifique

## 8. Queen's University
- **Tradition :** Plus de 175 ans
- **Communauté :** Très soudée
- **Localisation :** Kingston, Ontario

## 9. University of Ottawa
- **Bilinguisme :** Français/Anglais
- **Capital :** Nombreuses opportunités
- **Politique :** Programmes réputés

## 10. Simon Fraser University
- **Innovation :** Programmes uniques
- **Localisation :** Vancouver
- **Flexibilité :** Trimestres

## Comment Choisir ?

Considérez :
1. Votre domaine d'études
2. Votre budget
3. La localisation souhaitée
4. Les opportunités post-études

## Notre Service

OSIMX vous aide à :
- Choisir l'université idéale
- Préparer votre candidature
- Maximiser vos chances d'admission

**Plus de 500 étudiants placés !**

Contactez-nous pour une consultation gratuite !`,
    categories: ['etudes', 'conseils'],
    tags: ['canada', 'universites', 'classement'],
    featured: false,
  },
]

async function seedBlogPosts() {
  console.log('🌱 Création d\'articles de blog d\'exemple...\n')

  try {
    // Créer l'auteur par défaut
    console.log('👤 Création de l\'auteur par défaut...')
    const author = await client.createOrReplace({
      _id: 'author-osimx-team',
      _type: 'blogAuthor',
      name: 'Équipe L'Étudiant Étranger',
      email: 'content@osimx.com',
      bio: 'L\'équipe OSIMX - Experts en accompagnement d\'étudiants internationaux depuis plus de 10 ans. Nous partageons nos conseils et notre expertise pour vous aider à réussir votre projet d\'études à l\'étranger.',
    })
    console.log('✅ Auteur créé:', author.name)

    // Créer les articles
    console.log('\n📝 Création des articles...\n')
    
    for (const postData of sampleBlogPosts) {
      const slug = postData.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      const post = await client.create({
        _type: 'blogPost',
        title: postData.title,
        slug: { current: slug },
        author: { _ref: author._id },
        excerpt: postData.excerpt,
        content: postData.content,
        categories: postData.categories,
        tags: postData.tags,
        featured: postData.featured,
        publishedAt: new Date().toISOString(),
      })

      console.log(`✅ ${postData.featured ? '⭐ ' : ''}Article créé: ${post.title}`)
    }

    console.log('\n✨ Articles de blog créés avec succès !')
    console.log(`\n📍 Total: ${sampleBlogPosts.length} articles`)
    console.log(`📍 Articles en vedette: ${sampleBlogPosts.filter(p => p.featured).length}`)
    console.log(`\n👉 Accédez au Studio pour ajouter des images: http://localhost:3000/studio`)
    console.log(`👉 Modifiez le contenu selon vos besoins!\n`)

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

seedBlogPosts()
