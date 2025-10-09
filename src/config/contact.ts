export const CONTACT = {
  phone: {
    main: process.env.NEXT_PUBLIC_PHONE_MAIN || '+33 1 23 45 67 89',
    whatsapp: process.env.NEXT_PUBLIC_PHONE_WHATSAPP || '+237 69 47 07 686',
    display: '+33 1 23 45 67 89',
  },
  email: {
    main: process.env.NEXT_PUBLIC_EMAIL_MAIN || 'contact@etudiantetranger.com',
    support: process.env.NEXT_PUBLIC_EMAIL_SUPPORT || 'support@etudiantetranger.com',
  },
  social: {
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_URL || 'https://facebook.com',
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com',
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || 'https://linkedin.com',
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || 'https://twitter.com',
  },
  address: 'Paris, France',
  whatsappMessage: encodeURIComponent("Bonjour, je souhaite des informations sur vos services d'accompagnement."),
}

export const getWhatsAppLink = () => {
  return `https://wa.me/${CONTACT.phone.whatsapp.replace(/\s/g, '')}?text=${CONTACT.whatsappMessage}`
}
