// Sanity Schema: schemas/testimonial.js

export default {
  name: 'testimonial',
  title: 'Témoignages Étudiants',
  type: 'document',
  icon: () => '🎓',
  fields: [
    {
      name: 'studentName',
      title: 'Nom de l\'étudiant',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(50),
    },
    {
      name: 'studentImage',
      title: 'Photo de l\'étudiant',
      type: 'image',
      options: {
        hotspot: true, // Enable image cropping
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'originCountry',
      title: 'Pays d\'origine',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'destinationCountry',
      title: 'Pays de destination',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'originFlag',
      title: 'Drapeau origine (emoji)',
      type: 'string',
      description: 'Ex: 🇸🇳 pour Sénégal',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'destinationFlag',
      title: 'Drapeau destination (emoji)',
      type: 'string',
      description: 'Ex: 🇫🇷 pour France',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'programName',
      title: 'Programme d\'études',
      type: 'string',
      description: 'Ex: Master en Finance',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'degree',
      title: 'Niveau d\'études',
      type: 'string',
      options: {
        list: [
          { title: 'Bachelor / Licence', value: 'Bachelor' },
          { title: 'Master', value: 'Master' },
          { title: 'Doctorat / PhD', value: 'Doctorat' },
          { title: 'MBA', value: 'MBA' },
          { title: 'Certificat', value: 'Certificate' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'graduationYear',
      title: 'Année de diplomation',
      type: 'number',
      validation: (Rule) => Rule.required().min(2018).max(2030),
    },
    {
      name: 'testimonialText',
      title: 'Témoignage',
      type: 'text',
      description: 'Le témoignage de l\'étudiant (max 300 caractères)',
      validation: (Rule) => Rule.required().min(50).max(300),
    },
    {
      name: 'rating',
      title: 'Note (étoiles)',
      type: 'number',
      description: 'Note de 1 à 5 étoiles',
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    },
    {
      name: 'voiceTestimonial',
      title: 'Témoignage vocal (optionnel)',
      type: 'file',
      description: 'Fichier audio MP3 ou WAV (max 30 secondes)',
      options: {
        accept: 'audio/*',
      },
    },
    {
      name: 'sentiment',
      title: 'Sentiment émotionnel',
      type: 'string',
      description: 'Détermine la couleur de la bordure lumineuse',
      options: {
        list: [
          { title: '🔥 Excité / Enthousiaste', value: 'excited' },
          { title: '🙏 Reconnaissant', value: 'grateful' },
          { title: '💪 Confiant', value: 'confident' },
          { title: '😊 Heureux', value: 'happy' },
        ],
      },
      initialValue: 'happy',
    },
    {
      name: 'featured',
      title: 'Témoignage vedette',
      type: 'boolean',
      description: 'Afficher ce témoignage en premier',
      initialValue: false,
    },
    {
      name: 'published',
      title: 'Publié',
      type: 'boolean',
      description: 'Afficher sur le site web',
      initialValue: true,
    },
    {
      name: 'orderRank',
      title: 'Ordre d\'affichage',
      type: 'number',
      description: 'Plus petit = affiché en premier',
      initialValue: 100,
    },
  ],
  preview: {
    select: {
      title: 'studentName',
      subtitle: 'programName',
      media: 'studentImage',
      rating: 'rating',
    },
    prepare({ title, subtitle, media, rating }) {
      return {
        title: `${title} (${rating}⭐)`,
        subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Note (décroissant)',
      name: 'ratingDesc',
      by: [{ field: 'rating', direction: 'desc' }],
    },
    {
      title: 'Ordre personnalisé',
      name: 'orderRank',
      by: [{ field: 'orderRank', direction: 'asc' }],
    },
  ],
}

/* 
===========================================
INSTALLATION INSTRUCTIONS
===========================================

1. Install Sanity dependencies:
   npm install @sanity/client @sanity/image-url

2. Setup environment variables (.env.local):
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   SANITY_API_TOKEN=your_token (if needed)

3. Add this schema to your Sanity Studio:
   - Go to schemas/ folder in your Sanity project
   - Create testimonial.js with the content above
   - Import it in schemas/index.js:
     import testimonial from './testimonial'
     export const schemaTypes = [testimonial, ...]

4. Deploy Sanity schema:
   npm run deploy-schema (or sanity deploy)

5. Add sample testimonials in Sanity Studio

===========================================
EXAMPLE TESTIMONIAL DATA
===========================================

{
  "studentName": "Aminata Diallo",
  "originCountry": "Sénégal",
  "destinationCountry": "France",
  "originFlag": "🇸🇳",
  "destinationFlag": "🇫🇷",
  "programName": "Master en Finance",
  "degree": "Master",
  "graduationYear": 2024,
  "testimonialText": "Grâce à l'équipe, j'ai obtenu mon admission à HEC Paris. Un accompagnement exceptionnel du début à la fin !",
  "rating": 5,
  "sentiment": "excited",
  "featured": true,
  "published": true,
  "orderRank": 1
}

*/
