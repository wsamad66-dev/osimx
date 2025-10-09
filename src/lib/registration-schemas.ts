import { z } from 'zod'

// Step 1: Personal Information
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'Le prénom doit contenir au moins 2 caractères'),
  lastName: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Adresse e-mail invalide'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  country: z.string().min(2, 'Veuillez sélectionner un pays'),
  dateOfBirth: z.string().min(1, 'Date de naissance requise'),
  nationality: z.string().min(2, 'Nationalité requise'),
})

export type PersonalInfo = z.infer<typeof personalInfoSchema>

// Step 2: Education Information
export const educationInfoSchema = z.object({
  educationLevel: z.enum(['high_school', 'bachelors', 'masters', 'phd', 'other'], {
    errorMap: () => ({ message: 'Veuillez sélectionner un niveau d\'études' }),
  }),
  intendedProgram: z.string().min(3, 'Le programme doit contenir au moins 3 caractères'),
  intendedCountry: z.string().min(2, 'Veuillez sélectionner un pays de destination'),
})

export type EducationInfo = z.infer<typeof educationInfoSchema>

// Step 3: Document Upload
export const documentUploadSchema = z.object({
  documents: z.array(z.object({
    name: z.string(),
    size: z.number(),
    type: z.string(),
    file: z.instanceof(File),
  })).min(1, 'Veuillez télécharger au moins un document'),
})

export type DocumentUpload = z.infer<typeof documentUploadSchema>

// Step 4: Security (Password)
export const securitySchema = z.object({
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .regex(/[A-Z]/, 'Le mot de passe doit contenir au moins une majuscule')
    .regex(/[a-z]/, 'Le mot de passe doit contenir au moins une minuscule')
    .regex(/[0-9]/, 'Le mot de passe doit contenir au moins un chiffre')
    .regex(/[^A-Za-z0-9]/, 'Le mot de passe doit contenir au moins un caractère spécial'),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val === true, {
    message: 'Vous devez accepter les conditions d\'utilisation',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export type Security = z.infer<typeof securitySchema>

// Complete registration data
export const registrationSchema = z.object({
  personalInfo: personalInfoSchema,
  educationInfo: educationInfoSchema,
  documentUpload: documentUploadSchema,
  security: securitySchema,
})

export type RegistrationData = z.infer<typeof registrationSchema>

// Countries list
export const COUNTRIES = [
  'Afghanistan', 'Afrique du Sud', 'Albanie', 'Algérie', 'Allemagne', 'Andorre', 'Angola',
  'Arabie Saoudite', 'Argentine', 'Arménie', 'Australie', 'Autriche', 'Azerbaïdjan',
  'Bahamas', 'Bahreïn', 'Bangladesh', 'Barbade', 'Belgique', 'Belize', 'Bénin', 'Bhoutan',
  'Biélorussie', 'Birmanie', 'Bolivie', 'Bosnie-Herzégovine', 'Botswana', 'Brésil', 'Brunei',
  'Bulgarie', 'Burkina Faso', 'Burundi', 'Cambodge', 'Cameroun', 'Canada', 'Cap-Vert',
  'Chili', 'Chine', 'Chypre', 'Colombie', 'Comores', 'Congo', 'Corée du Nord', 'Corée du Sud',
  'Costa Rica', 'Côte d\'Ivoire', 'Croatie', 'Cuba', 'Danemark', 'Djibouti', 'Dominique',
  'Égypte', 'Émirats Arabes Unis', 'Équateur', 'Érythrée', 'Espagne', 'Estonie', 'Eswatini',
  'États-Unis', 'Éthiopie', 'Fidji', 'Finlande', 'France', 'Gabon', 'Gambie', 'Géorgie',
  'Ghana', 'Grèce', 'Grenade', 'Guatemala', 'Guinée', 'Guinée-Bissau', 'Guinée équatoriale',
  'Guyana', 'Haïti', 'Honduras', 'Hongrie', 'Inde', 'Indonésie', 'Irak', 'Iran', 'Irlande',
  'Islande', 'Israël', 'Italie', 'Jamaïque', 'Japon', 'Jordanie', 'Kazakhstan', 'Kenya',
  'Kirghizistan', 'Kiribati', 'Kosovo', 'Koweït', 'Laos', 'Lesotho', 'Lettonie', 'Liban',
  'Liberia', 'Libye', 'Liechtenstein', 'Lituanie', 'Luxembourg', 'Macédoine du Nord',
  'Madagascar', 'Malaisie', 'Malawi', 'Maldives', 'Mali', 'Malte', 'Maroc', 'Maurice',
  'Mauritanie', 'Mexique', 'Moldavie', 'Monaco', 'Mongolie', 'Monténégro', 'Mozambique',
  'Namibie', 'Nauru', 'Népal', 'Nicaragua', 'Niger', 'Nigeria', 'Norvège', 'Nouvelle-Zélande',
  'Oman', 'Ouganda', 'Ouzbékistan', 'Pakistan', 'Palaos', 'Palestine', 'Panama',
  'Papouasie-Nouvelle-Guinée', 'Paraguay', 'Pays-Bas', 'Pérou', 'Philippines', 'Pologne',
  'Portugal', 'Qatar', 'République Centrafricaine', 'République Démocratique du Congo',
  'République Dominicaine', 'République Tchèque', 'Roumanie', 'Royaume-Uni', 'Russie',
  'Rwanda', 'Saint-Kitts-et-Nevis', 'Sainte-Lucie', 'Saint-Vincent-et-les-Grenadines',
  'Salomon', 'Salvador', 'Samoa', 'Sao Tomé-et-Principe', 'Sénégal', 'Serbie', 'Seychelles',
  'Sierra Leone', 'Singapour', 'Slovaquie', 'Slovénie', 'Somalie', 'Soudan', 'Soudan du Sud',
  'Sri Lanka', 'Suède', 'Suisse', 'Suriname', 'Syrie', 'Tadjikistan', 'Tanzanie', 'Tchad',
  'Thaïlande', 'Timor oriental', 'Togo', 'Tonga', 'Trinité-et-Tobago', 'Tunisie',
  'Turkménistan', 'Turquie', 'Tuvalu', 'Ukraine', 'Uruguay', 'Vanuatu', 'Vatican',
  'Venezuela', 'Viêt Nam', 'Yémen', 'Zambie', 'Zimbabwe',
]

// Education levels
export const EDUCATION_LEVELS = [
  { value: 'high_school', label: 'Lycée / Baccalauréat' },
  { value: 'bachelors', label: 'Licence (Bachelor)' },
  { value: 'masters', label: 'Master' },
  { value: 'phd', label: 'Doctorat (PhD)' },
  { value: 'other', label: 'Autre' },
]
