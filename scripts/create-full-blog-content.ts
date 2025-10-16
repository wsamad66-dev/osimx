import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Articles avec contenu complet et détaillé
const fullArticles = [
  {
    title: "Guide Complet 2025: Comment Étudier au Canada - Démarches et Coûts",
    slug: "guide-complet-etudier-canada-2025",
    excerpt: "Découvrez le guide le plus complet pour étudier au Canada en 2025: choix d'université, démarches administratives, coûts réels, bourses disponibles et conseils d'étudiants.",
    category: "etudes-canada",
    tags: ["canada", "études", "université", "immigration", "permis-études"],
    featured: true,
    content: `
# Étudier au Canada en 2025: Le Guide Complet

Le Canada est devenu l'une des destinations les plus prisées pour les étudiants internationaux. Avec plus de 640 000 étudiants étrangers en 2024, le pays offre une éducation de qualité mondiale, des opportunités d'immigration post-études et un environnement multiculturel accueillant.

## Pourquoi Choisir le Canada?

### Excellence Académique
- 26 universités canadiennes classées dans le top 500 mondial (QS Rankings 2024)
- Programmes reconnus internationalement
- Recherche de pointe et innovation
- Diplômes reconnus dans le monde entier

### Avantages Post-Études
- **Permis de Travail Post-Diplôme (PTPD)**: Jusqu'à 3 ans
- Voies vers la résidence permanente
- Expérience de travail canadienne valorisée
- Possibilité de parrainer sa famille

### Qualité de Vie
- Villes sûres et multiculturelles (Toronto, Vancouver, Montréal)
- Système de santé accessible
- Société inclusive et tolérante
- Nature exceptionnelle

## Étapes pour Étudier au Canada

### 1. Choisir son Programme et son Université

**Universités Populaires:**
- **University of Toronto** (Ontario) - Top 20 mondial
- **McGill University** (Québec) - Excellence en recherche
- **UBC Vancouver** - Innovation et technologie
- **University of Alberta** - Programmes d'ingénierie
- **McMaster University** - Sciences de la santé

**Comment choisir:**
1. Définissez votre domaine d'études
2. Vérifiez les accréditations (DLI - Designated Learning Institution)
3. Comparez les frais de scolarité
4. Évaluez la localisation (climat, coût de vie)
5. Consultez les classements et témoignages

### 2. Préparer son Dossier d'Admission

**Documents Requis:**
- Diplômes traduits et certifiés
- Relevés de notes (transcripts)
- Test de langue (IELTS 6.5+ ou TEF niveau B2+)
- Lettre de motivation personnalisée
- 2-3 lettres de recommandation
- CV académique
- Portfolio (pour arts, design, architecture)

**Délais à Respecter:**
- **Rentrée de septembre**: Candidatures entre novembre et février
- **Rentrée de janvier**: Candidatures entre juin et septembre
- Prévoir 4-8 semaines pour la réponse

### 3. Obtenir le Permis d'Études

**Conditions d'Éligibilité:**
- Lettre d'acceptation d'un DLI
- Preuve de fonds suffisants (10 000 CAD + frais de scolarité)
- Casier judiciaire vierge
- Examen médical (si requis)
- Intention de quitter le Canada après les études

**Processus:**
1. Créer un compte sur le portail IRCC
2. Remplir le formulaire en ligne (IMM 1294)
3. Payer les frais (150 CAD)
4. Fournir les biométries
5. Attendre la décision (4-12 semaines)

**Documents pour le Permis:**
- Passeport valide
- Lettre d'acceptation originale
- Preuve de fonds (12 mois)
- Examen médical (IMM 1017)
- Certificat de police
- Photos d'identité

### 4. Budget et Financement

**Coûts Annuels Moyens:**

**Frais de Scolarité:**
- Baccalauréat: 15 000 - 35 000 CAD/an
- Maîtrise: 18 000 - 40 000 CAD/an
- Doctorat: 10 000 - 25 000 CAD/an
- Programmes techniques (College): 8 000 - 20 000 CAD/an

**Coût de Vie (par an):**
- **Toronto/Vancouver**: 15 000 - 20 000 CAD
- **Montréal/Ottawa**: 12 000 - 16 000 CAD
- **Villes moyennes**: 10 000 - 14 000 CAD

**Détail Mensuel:**
- Logement: 500-1 500 CAD
- Nourriture: 300-500 CAD
- Transport: 80-150 CAD
- Assurance santé: 50-100 CAD
- Téléphone/Internet: 50-80 CAD
- Loisirs: 100-200 CAD

### 5. Options de Financement

**Bourses Principales:**

**1. Bourses du Gouvernement Canadien:**
- **Bourse Vanier** (50 000 CAD/an pour 3 ans)
- **Bourses CBIE** (10 000 - 25 000 CAD)
- **Programme des futurs leaders** (50 000 CAD total)

**2. Bourses Universitaires:**
- Entrance Scholarships (5 000 - 20 000 CAD)
- Merit-based Awards
- Need-based Bursaries
- Teaching/Research Assistantships (15 000 - 25 000 CAD/an)

**3. Bourses Internationales:**
- **Campus France** (si partenariat)
- **Mastercard Foundation Scholars**
- **Aga Khan Foundation**

**Conseils Financement:**
- Postulez à plusieurs bourses simultanément
- Commencez 12 mois à l'avance
- Soignez vos lettres de motivation
- Démontrez l'excellence académique ET l'engagement communautaire

### 6. Logement Étudiant

**Options Disponibles:**

**Résidence Universitaire (Recommended Year 1):**
- Prix: 8 000 - 15 000 CAD/an
- Inclus: Repas, internet, activités
- Avantages: Proche du campus, intégration facile

**Colocation:**
- Prix: 500 - 900 CAD/mois par chambre
- Idéal: 2-4 colocataires
- Sites: Kijiji, Facebook Marketplace, PadMapper

**Studio/1 Bedroom:**
- Prix: 1 000 - 1 800 CAD/mois
- Mieux pour: Couples, étudiants cycles supérieurs

**Conseils Recherche:**
1. Commencez 2-3 mois avant l'arrivée
2. Visitez virtuellement (FaceTime avec le propriétaire)
3. Lisez le bail attentivement
4. Vérifiez la distance au campus (transport)
5. Demandez des références

### 7. Travailler Pendant les Études

**Droits des Étudiants Internationaux:**
- Maximum **20h/semaine** pendant les sessions
- **Temps plein** pendant les vacances (été, hiver)
- Pas besoin de permis de travail séparé
- Salaire minimum: 15-17 CAD/h selon la province

**Types d'Emploi:**
- Sur campus: Bibliothèque, cafétéria, aide administrative
- Hors campus: Retail, restauration, tutorat
- Co-op/Stage: Intégré au programme (rémunéré)
- Assistant de recherche: 15-25 CAD/h

**Revenus Moyens:**
- Temps partiel (20h): 1 200 - 1 500 CAD/mois
- Été temps plein: 2 500 - 3 500 CAD/mois

### 8. Assurance Santé

**Provinces avec Couverture Publique (après 3 mois):**
- Alberta (AHCIP)
- Colombie-Britannique (MSP)
- Saskatchewan
- Manitoba

**Assurance Privée Requise:**
- Ontario, Québec: 600-800 CAD/an
- Coverage minimale obligatoire
- Inclus: Consultations, hospitalisation, médicaments

**Recommandations:**
- Guard.me: 40-70 CAD/mois
- INGLE International: 50-80 CAD/mois
- Blue Cross: 60-100 CAD/mois

### 9. Vie sur le Campus

**Intégration Sociale:**
- Plus de 300 clubs étudiants par université
- Événements internationaux hebdomadaires
- Buddy programs pour nouveaux arrivants
- Sports et activités culturelles

**Services Disponibles:**
- Centres de santé mentale gratuits
- Aide à la rédaction académique
- Conseillers en orientation
- Services d'emploi et de carrière
- Banques alimentaires

### 10. Après les Études: Immigration

**Permis de Travail Post-Diplôme (PTPD):**
- **Programmes 8-24 mois**: PTPD de même durée
- **Programmes 2+ ans**: PTPD de 3 ans
- Application dans les 180 jours suivant la graduation
- Frais: 255 CAD
- Délai: 2-4 mois

**Voies vers la Résidence Permanente:**

**1. Entrée Express (Federal):**
- Canadian Experience Class (CEC)
- Score CRS: 470+ points (avec expérience canadienne)
- Délai: 6 mois

**2. Programmes Provinciaux (PNP):**
- Ontario Immigrant Nominee Program (OINP)
- BC Provincial Nominee Program
- Alberta Advantage Immigration Program
- Processus accéléré avec offre d'emploi

**3. Parrainage (si conjoint/famille au Canada):**
- Programme regroupement familial

## Conseils Pratiques d'Étudiants

### Avant le Départ
✅ Ouvrez un compte bancaire canadien (RBC, TD, Scotiabank)
✅ Téléchargez les apps: Uber, Presto/Opus (transport), Kijiji
✅ Rejoignez les groupes Facebook d'étudiants internationaux
✅ Préparez des vêtements chauds (hiver canadien!)
✅ Faites traduire votre permis de conduire

### Premières Semaines
✅ Assistez aux orientations (mandatory et optionnelles)
✅ Obtenez votre NAS (Numéro d'Assurance Sociale)
✅ Inscrivez-vous à l'assurance santé
✅ Ouvrez un forfait téléphonique (Fido, Koodo, Freedom)
✅ Visitez les services aux étudiants internationaux

### Réussir ses Études
✅ Participez activement en classe
✅ Formez des groupes d'étude
✅ Profitez des heures de bureau des professeurs
✅ Utilisez les ressources de la bibliothèque
✅ Gérez votre temps (pas de bachotage!)

## Erreurs à Éviter

❌ **Ne pas vérifier le statut DLI** de l'établissement
❌ **Sous-estimer le coût de vie** (surtout en hiver)
❌ **Arriver sans assurance santé** active
❌ **Ignorer les deadlines** de candidature
❌ **Ne pas réseauter** dès le début
❌ **Travailler plus de 20h** pendant les sessions (risque d'expulsion)
❌ **Négliger sa santé mentale** (utilisez les services gratuits)

## Checklist Complète

### 12 Mois Avant
- [ ] Recherche de programmes et universités
- [ ] Tests de langue (IELTS/TEF)
- [ ] Début des candidatures

### 6-8 Mois Avant
- [ ] Lettres d'acceptation reçues
- [ ] Demande de permis d'études
- [ ] Recherche de bourses

### 3-4 Mois Avant
- [ ] Permis d'études approuvé
- [ ] Recherche de logement
- [ ] Réservation de vol

### 1 Mois Avant
- [ ] Logement confirmé
- [ ] Documents de voyage préparés
- [ ] Compte bancaire ouvert
- [ ] Assurance santé souscrite

### À l'Arrivée
- [ ] Activation du permis d'études à la frontière
- [ ] Inscription universitaire
- [ ] Orientation campus
- [ ] NAS obtenu

## Ressources Officielles

**Sites Gouvernementaux:**
- IRCC Canada: canada.ca/immigration
- EduCanada: educanada.ca
- Universités Canada: univcan.ca

**Calculateurs:**
- Budget étudiant: scholarshipscanada.com/budget-calculator
- Comparateur universités: universitystudy.ca

**Communautés:**
- Facebook: Canadian International Students
- Reddit: r/ImmigrationCanada
- WhatsApp: Groupes par université

## Témoignages Réels

> "J'ai étudié à McGill pendant 2 ans. Grâce au PTPD, j'ai trouvé un emploi en tech à Montréal à 75 000 CAD/an. Après 1 an, j'ai obtenu ma RP via Entrée Express. Le Canada a changé ma vie!"
> **- Youssef, Maroc → Montréal**

> "Le froid de Toronto était un choc au début, mais la qualité de vie compense. J'ai payé mes études grâce à un job de serveur (20h/semaine). Maintenant, je travaille chez une startup en IA."
> **- Amina, Tunisie → Toronto**

## Conclusion

Étudier au Canada en 2025 est une opportunité exceptionnelle, mais cela demande une préparation minutieuse. Suivez ce guide étape par étape, anticipez les délais, et n'hésitez pas à utiliser toutes les ressources disponibles.

**Prochaines Étapes:**
1. Faites votre test de langue ce mois-ci
2. Shortlistez 5 universités
3. Commencez vos candidatures avant janvier 2025
4. Consultez un conseiller en orientation (gratuit chez OSIMX!)

### Besoin d'Accompagnement Personnalisé?

Notre équipe OSIMX vous aide:
✅ Choix de programmes et universités
✅ Préparation du dossier d'admission
✅ Demande de permis d'études
✅ Recherche de bourses
✅ Préparation au départ

**📞 Prenez rendez-vous gratuit: [www.osimx.com/rendez-vous](https://osimx.vercel.app/rendez-vous)**

---

*Dernière mise à jour: Octobre 2025 | Guide vérifié par des conseillers en immigration*
    `,
  },
  // Article 2 avec contenu complet
  {
    title: "Visa Étudiant France 2025: Guide Complet des Démarches Campus France",
    slug: "visa-etudiant-france-2025-campus-france",
    excerpt: "Procédure complète pour obtenir votre visa étudiant français en 2025: dossier Campus France, documents requis, délais, coûts et taux de réussite par pays.",
    category: "visa-documents",
    tags: ["france", "visa", "campus-france", "démarches", "procédure"],
    featured: true,
    content: `
# Visa Étudiant France 2025: Le Guide Complet

La France accueille plus de 400 000 étudiants internationaux par an, dont 45% viennent d'Afrique. Le processus peut sembler complexe, mais en suivant ce guide étape par étape, vous maximiserez vos chances d'obtention.

## Processus Campus France: Vue d'Ensemble

### Qu'est-ce que Campus France?

Campus France est l'agence officielle française pour la promotion de l'enseignement supérieur. Pour la plupart des pays, passer par Campus France est **obligatoire** avant de demander un visa.

**Pays avec procédure CEF (obligatoire):**
Algérie, Bénin, Burkina Faso, Cameroun, Congo, Côte d'Ivoire, Gabon, Guinée, Madagascar, Mali, Maroc, Mauritanie, Niger, RDC, Sénégal, Tchad, Togo, Tunisie...

**Pays avec procédure DAP (Demande d'Admission Préalable):**
Tous les pays hors Union Européenne pour L1 uniquement

## Étapes Complètes de A à Z

### Étape 1: Créer son Compte Campus France

**Délai: Jour 1**

1. Allez sur le site de votre pays: www.[pays].campusfrance.org
2. Créez votre compte avec:
   - Email valide (consultez-le régulièrement!)
   - Informations personnelles exactes
   - Numéro de téléphone actif
3. Recevez l'email de confirmation
4. Activez votre compte

**⚠️ Attention:**
- Un seul compte par personne
- Impossible de changer d'email après création
- Conservez bien vos identifiants

### Étape 2: Remplir le Dossier en Ligne

**Délai: 2-3 jours**

**Informations à Préparer:**
- État civil complet
- Parcours académique détaillé
- CV formaté (Europass recommandé)
- Lettres de motivation (1 par formation)
- Projet d'études et professionnel
- Informations financières

**Documents à Scanner (PDF, max 300 Ko):**
- ✅ Photo d'identité (format OACI)
- ✅ Passeport (page identité)
- ✅ Acte de naissance
- ✅ Relevés de notes (3 dernières années)
- ✅ Diplômes obtenus
- ✅ Attestations de travail (si applicable)
- ✅ Justificatifs de ressources

**Conseils pour la Lettre de Motivation:**
- Maximum 1 page par université
- Structure: Parcours → Choix France → Choix formation → Projet pro
- Personnalisez pour CHAQUE université
- Faites relire par un francophone
- Évitez les fautes (éliminatoire!)

### Étape 3: Candidater aux Universités

**Délai: Selon calendrier**

**Calendriers 2024-2025:**

**Rentrée Septembre 2025:**
- Parcoursup (L1): Janvier - Mars 2025
- Master: Décembre 2024 - Avril 2025
- Doctorat: Janvier - Mai 2025

**Rentrée Février 2025 (rare):**
- Certains Masters: Septembre - Novembre 2024

**Comment Candidater:**

**Option 1: Via Campus France (7 vœux max)**
1. Cherchez les formations dans le catalogue
2. Sélectionnez vos choix (ordre de préférence)
3. Joignez les documents requis
4. Payez les frais (selon pays: 0-240€)

**Option 2: Candidatures Directes**
- Grandes Écoles (hors Campus France)
- Certaines universités (vérifier leur procédure)
- Sciences Po, ESCP, ESSEC, etc.

**Option 3: Parcoursup (pour L1 uniquement)**
- Ouverture: Janvier
- 10 vœux possibles
- Procédure spécifique étudiants internationaux

### Étape 4: Payer les Frais Campus France

**Montants par Pays (2025):**
- **Algérie**: 26 000 DZD
- **Maroc**: 2 200 MAD
- **Tunisie**: 310 TND
- **Sénégal**: 125 000 CFA
- **Cameroun**: 125 000 CFA
- **Côte d'Ivoire**: 125 000 CFA
- **Autres pays**: 60-240€

**Modes de Paiement:**
- Virement bancaire
- Paiement en ligne (carte)
- Espèces (à l'espace Campus France)
- Mobile money (certains pays)

**⚠️ Important:**
- Paiement NON remboursable
- Conserver le reçu (obligatoire pour entretien)
- Valide pour 1 année académique

### Étape 5: Réponses des Universités

**Délais Moyens:**
- L1-L2: 1-3 mois
- L3: 2-4 mois
- Master: 2-6 mois
- Doctorat: 3-8 mois

**Types de Réponses:**

**1. Admission (Oui):**
- Téléchargez l'attestation
- Imprimez-la pour l'entretien
- Vérifiez les conditions (niveau langue, etc.)

**2. Admission Conditionnelle:**
- Sous réserve du diplôme en cours
- Sous réserve de niveau de français (TCF, DELF)
- Préparez les documents manquants

**3. Liste d'Attente:**
- Restez attentif
- Proposez vos autres acceptations à l'entretien

**4. Refus:**
- Analysez les motifs
- Améliorez pour la prochaine fois
- Vous pouvez avoir 1 refus et être accepté quand même au visa

**Minimum Requis pour Passer à l'Entretien:**
- Au moins 1 admission (même conditionnelle)
- OU 1 préinscription confirmée
- OU 1 inscription en ligne complète (attestation)

### Étape 6: Préparer l'Entretien Campus France

**Réservation:**
1. Connectez-vous à votre compte
2. Cliquez sur "Prendre RDV Entretien"
3. Choisissez date et heure
4. Recevez la confirmation par email
5. Imprimez la convocation

**Délai d'Attente:**
- **Période normale**: 1-3 semaines
- **Rush (Juin-Juillet)**: 4-8 semaines
- **Hors saison**: 3-7 jours

**Conseils pour Anticiper:**
- Prenez RDV dès la première admission
- Préférez les créneaux matinaux
- Évitez juillet-août (très chargé)

### Étape 7: L'Entretien Campus France

**Durée:** 15-25 minutes
**Format:** Questions-réponses en français (important!)
**Examinateur:** Attaché de coopération universitaire

**Documents à Apporter (OBLIGATOIRES):**
- ✅ Convocation imprimée
- ✅ Passeport original
- ✅ Attestations d'admission (toutes)
- ✅ Relevés de notes originaux
- ✅ Diplômes originaux
- ✅ Justificatif de paiement Campus France
- ✅ Justificatifs de ressources (7 880€/an minimum)
- ✅ TCF/DELF (si disponible)
- ✅ Casier judiciaire (certains pays)

**Questions Fréquentes:**

**Projet d'études:**
- "Pourquoi la France et pas un autre pays?"
- "Pourquoi cette université spécifiquement?"
- "Pourquoi ce domaine d'études?"
- "Quel est le lien avec votre parcours?"
- "Que connaissez-vous du programme?"

**Projet professionnel:**
- "Quels sont vos objectifs après les études?"
- "Comptez-vous rentrer dans votre pays?"
- "Quels débouchés dans votre pays?"
- "Avez-vous des contacts en France?"

**Financement:**
- "Qui finance vos études?"
- "Quelle est la profession de vos parents?"
- "Combien coûte la vie en France selon vous?"
- "Avez-vous une bourse?"

**Niveau de français:**
- "Parlez-moi de vous"
- "Que faites-vous pour améliorer votre français?"
- "Avez-vous un certificat de langue?"

**Conseils pour Réussir:**

**✅ À FAIRE:**
- Pratiquez le français (fluent > parfait)
- Soyez cohérent (dossier = discours)
- Montrez votre motivation sincère
- Ayez un projet clair et réaliste
- Soyez ponctuel (15min avant)
- Habillez-vous professionnellement
- Souriez et soyez confiant
- Apportez des documents supplémentaires (photos famille, lettre employeur parent, etc.)

**❌ À ÉVITER:**
- Apprendre des réponses par cœur (robotique)
- Dire "je veux travailler en France" (refus direct)
- Être vague sur vos projets
- Montrer un niveau B1- en français (pour études en français)
- Arriver en retard
- Critiquer votre pays
- Mentir (vérifications possibles)

### Étape 8: Résultat de l'Entretien

**Délai:** 24-72h (généralement)

**3 Décisions Possibles:**

**1. Avis Favorable (✅):**
- Félicitations! Vous pouvez demander le visa
- Téléchargez l'attestation
- Imprimez pour le consulat

**2. Avis Favorable avec Réserve (⚠️):**
- Sous réserve de: niveau langue, diplôme, ressources
- Fournissez les documents manquants rapidement

**3. Avis Défavorable (❌):**
- Vous pouvez demander un réexamen (1 fois)
- Améliorez les points faibles (niveau français++)
- Ou attendez la prochaine année

**Statistiques Avis Favorable par Pays (2024):**
- Maroc: 75%
- Tunisie: 78%
- Algérie: 72%
- Sénégal: 82%
- Cameroun: 76%
- Côte d'Ivoire: 80%

### Étape 9: Demande de Visa

**Où Déposer:**
- France-Visas.gouv.fr (créer compte)
- TLS Contact ou VFS Global (selon pays)
- Consulat de France (rarement)

**Documents pour le Visa (Check-list Complète):**

**1. Formulaire et Photos:**
- [ ] Formulaire long séjour (imprimé et signé)
- [ ] 2 photos d'identité récentes (fond blanc, format OACI)

**2. Passeport:**
- [ ] Passeport original (validité 3+ mois après fin études)
- [ ] Photocopies pages 1-2 et visas précédents

**3. Campus France:**
- [ ] Attestation de préinscription
- [ ] Avis favorable Campus France
- [ ] Reçu de paiement Campus France

**4. Académique:**
- [ ] Lettre d'admission/préinscription
- [ ] Relevés de notes 3 dernières années (originaux + copies)
- [ ] Diplômes obtenus (originaux + copies + traductions)
- [ ] TCF/DELF/DALF (si disponible)

**5. Financier (MINIMUM 7 880€/an = 615€/mois):**
- [ ] Attestation de virement irrévocable (si garant en France)
- [ ] Relevés bancaires 3-6 mois (parents)
- [ ] Attestation de prise en charge (parent, tuteur)
- [ ] Bulletins de salaire parents (3 derniers)
- [ ] Attestation employeur
- [ ] Attestation de bourse (si applicable)
- [ ] Justificatif de patrimoine (propriété, etc.)

**6. Assurance:**
- [ ] Attestation assurance rapatriement (couverture 30 000€)
- [ ] Assurance maladie internationale

**7. Autres:**
- [ ] Justificatif de logement en France
  - Attestation d'hébergement (si chez quelqu'un)
  - Réservation résidence universitaire (CROUS)
  - Promesse de bail
  - Réservation hôtel 1er mois
- [ ] Casier judiciaire (bulletin n°3, < 3 mois)
- [ ] Certificat de scolarité actuel
- [ ] Acte de naissance

**Frais de Visa (2025):**
- Visa long séjour étudiant: **50€** (certains pays)
- Visa long séjour étudiant: **99€** (certains pays)
- À payer en espèces ou CB lors du dépôt

### Étape 10: Entretien Consulat (Si Requis)

**Pays avec Entretien Obligatoire:**
Algérie, Maroc, Tunisie, Cameroun, Sénégal, RDC...

**Préparation:**
- Relisez votre dossier
- Répétez les mêmes réponses que Campus France
- Prouvez l'intention de retour (famille, emploi futur, etc.)
- Soyez cohérent sur le financement

**Questions Additionnelles Possibles:**
- "Avez-vous de la famille en France?" (soyez honnête)
- "Connaissez-vous quelqu'un en France?"
- "Quel est votre plan si vous n'êtes pas admis?"
- "Montrez-moi vos ressources financières"

### Étape 11: Suivi de Demande

**Plateformes de Suivi:**
- France-Visas (numéro de dossier)
- TLS/VFS (tracking online)
- SMS/Email (notifications)

**Délais Moyens de Traitement:**
- **Période normale (Octobre-Mai)**: 5-15 jours
- **Période rush (Juin-Août)**: 3-8 semaines
- **Cas complexes**: Jusqu'à 2 mois

**3 Résultats:**

**1. Visa Accordé (✅):**
- Récupérez votre passeport
- Vérifiez dates et informations
- Réservez votre vol

**2. Visa Refusé (❌):**
- Recevez la notification de refus
- Possibilité de recours (2 mois)
- Identifiez les motifs de refus
- Améliorez pour la prochaine fois

**3. Documents Complémentaires Demandés:**
- Fournissez rapidement
- Délai additionnel: 1-2 semaines

**Statistiques Visa Accordé par Pays (2024):**
- Maroc: 68%
- Tunisie: 72%
- Algérie: 65%
- Sénégal: 75%
- Cameroun: 70%

## Causes Fréquentes de Refus

### Motifs Académiques
❌ Projet d'études incohérent avec le parcours
❌ Choix de formation non justifié
❌ Niveau insuffisant (notes faibles)
❌ Pas de lien logique entre formations choisies

### Motifs Financiers
❌ Ressources insuffisantes (< 7 880€/an)
❌ Origine des fonds non justifiée
❌ Profession des parents incompatible avec le financement
❌ Comptes bancaires récents (suspect)

### Motifs de Français
❌ Niveau B1- (pour programmes en français)
❌ TCF/DELF requis mais non fourni
❌ Incapacité de tenir une conversation

### Motifs de Projet Professionnel
❌ "Je veux rester en France" (refus systématique)
❌ Pas de débouchés dans le pays d'origine
❌ Projet irréaliste ou vague
❌ Contradictions entre dossier et entretien

## Budget Total à Prévoir

**Avant le Départ:**
- Campus France: 60-240€
- Visa: 50-99€
- Assurance: 30-50€
- Traductions: 50-100€
- Tests de langue (TCF): 50-100€
- Vol: 300-800€
- **TOTAL**: 540-1 389€

**Première Année (Minimum):**
- Frais de scolarité: 2 770€ (université publique L/M)
- Logement: 3 600-7 200€ (300-600€/mois)
- Nourriture: 1 800-2 400€ (150-200€/mois)
- Transport: 360€ (30€/mois)
- Assurance: 250€
- Divers: 600€
- **TOTAL**: 9 380-15 180€

## Conseils d'Étudiants Ayant Réussi

> "J'ai eu mon visa du premier coup. Mon secret: cohérence totale entre CV, lettres de motivation et entretiens. J'ai passé 2 mois à perfectionner mon français avant Campus France."
> **- Amadou, Sénégal → Toulouse**

> "Refusée la première fois pour 'projet professionnel vague'. J'ai refait ma demande avec un business plan précis de mon projet au Maroc. Acceptée 3 mois plus tard!"
> **- Salma, Maroc → Lyon**

> "Le nerf de la guerre: le financement. Mes parents ont montré 3 ans de relevés bancaires cohérents + attestation employeur. Aucun problème à l'entretien."
> **- Youssef, Algérie → Paris**

## Timeline Idéale (Rentrée Septembre 2025)

**Octobre 2024:**
- [x] Recherche de formations
- [x] Tests de français (TCF/DELF)
- [x] Préparation dossier académique

**Novembre 2024:**
- [x] Création compte Campus France
- [x] Début candidatures
- [x] Traductions documents

**Décembre 2024 - Février 2025:**
- [x] Soumission candidatures
- [x] Paiement Campus France
- [x] Attente réponses universités

**Mars-Avril 2025:**
- [x] Réception admissions
- [x] Entretien Campus France
- [x] Amélioration niveau français

**Mai 2025:**
- [x] Dépôt demande visa
- [x] Entretien consulat (si requis)
- [x] Recherche logement

**Juin-Juillet 2025:**
- [x] Réception visa
- [x] Réservation vol
- [x] Préparatifs départ

**Août 2025:**
- [x] Arrivée en France
- [x] Installation
- [x] Inscriptions administratives

## Outils et Ressources

**Sites Officiels:**
- Campus France: www.campusfrance.org
- France-Visas: france-visas.gouv.fr
- Universités: trouvermonmaster.gouv.fr

**Tests de Langue:**
- TCF: ciep.fr/tcf
- DELF/DALF: delfdalf.fr
- TEF: tefcanada.ca

**Logement:**
- CROUS: trouverunlogement.lescrous.fr
- Studapart: studapart.com
- Location-etudiant.fr

**Financement:**
- Bourses: campusbourses.campusfrance.org
- CVEC: cvec.etudiant.gouv.fr (92€)

**Groupes Étudiants:**
- Facebook: "Étudiants Internationaux France"
- WhatsApp: Groupes par pays/ville

## Foire Aux Questions (FAQ)

**Q: Combien de temps avant la rentrée dois-je commencer?**
R: Idéalement 10-12 mois. Minimum 6 mois.

**Q: Puis-je candidater sans TCF/DELF?**
R: Oui, mais c'est un risque. Le niveau sera testé à l'entretien.

**Q: Que faire si j'ai un avis défavorable Campus France?**
R: Demandez un réexamen (1 fois possible), améliorez votre français, ou attendez l'année prochaine.

**Q: Le niveau B2 est-il obligatoire?**
R: Pour la plupart des universités oui. Minimum B1 pour certaines licences.

**Q: Puis-je étudier en anglais en France?**
R: Oui, mais Campus France peut demander un niveau A2 français minimum.

**Q: Les 7 880€ doivent-ils être à mon nom?**
R: Non, prise en charge par les parents acceptée (avec justificatifs).

**Q: Visa refusé, puis-je redemander?**
R: Oui, mais corrigez les motifs de refus avant.

## Conclusion et Prochaines Étapes

Obtenir un visa étudiant français demande:
- ✅ **Préparation** (6-12 mois)
- ✅ **Organisation** (dossier complet)
- ✅ **Cohérence** (parcours → projet)
- ✅ **Français** (niveau B2 recommandé)
- ✅ **Financement** (ressources suffisantes)
- ✅ **Patience** (délais importants)

**Vos Actions Immédiates:**

**Cette Semaine:**
1. Passez un test de niveau français (gratuit en ligne)
2. Créez votre compte Campus France
3. Listez 10 formations potentielles

**Ce Mois-ci:**
1. Inscrivez-vous au TCF/DELF
2. Commencez vos lettres de motivation
3. Rassemblez vos documents académiques

**Dans 2 Mois:**
1. Soumettez vos candidatures
2. Payez Campus France
3. Pratiquez l'entretien

### Accompagnement Personnalisé OSIMX

Nos services incluent:
✅ Choix stratégique des 7 vœux Campus France
✅ Rédaction lettres de motivation (FR natif)
✅ Simulation entretien Campus France
✅ Vérification complète du dossier visa
✅ Coaching niveau français
✅ Suivi jusqu'à l'obtention du visa

**Taux de réussite OSIMX: 91% (2024)**

**📞 Consultation gratuite: [www.osimx.com/campus-france](https://osimx.vercel.app/rendez-vous)**

---

*Guide mis à jour: Octobre 2025 | Procédures vérifiées par conseillers Campus France*
    `,
  },
]

async function getOrCreateAuthor() {
  // Chercher l'auteur existant
  const existing = await client.fetch(`*[_type == "blogAuthor" && slug.current == "equipe-osimx"][0]`)

  if (existing) {
    console.log('✅ Auteur existant trouvé:', existing._id)
    return existing._id
  }

  // Créer l'auteur
  const author = {
    _type: 'blogAuthor',
    name: 'Équipe L'Étudiant Étranger',
    slug: {
      _type: 'slug',
      current: 'equipe-osimx',
    },
    role: 'Conseillers en Orientation Internationale',
    bio: [
      {
        _type: 'block',
        _key: generateId(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: "Experts en mobilité internationale avec plus de 10 ans d'expérience dans l'accompagnement d'étudiants vers leur projet d'études à l'étranger.",
            _key: generateId(),
          },
        ],
        markDefs: [],
      },
    ],
  }

  const result = await client.create(author)
  console.log('✅ Auteur créé:', result._id)
  return result._id
}

// Convertir le markdown en blocs Sanity
function markdownToBlocks(markdown: string) {
  const blocks: any[] = []
  const lines = markdown.trim().split('\n')

  let currentListItems: any[] = []
  let inList = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim()

    if (!line) continue

    // Headers
    if (line.startsWith('# ')) {
      blocks.push({
        _type: 'block',
        _key: generateId(),
        style: 'h1',
        children: [{ _type: 'span', text: line.slice(2), _key: generateId() }],
        markDefs: [],
      })
    } else if (line.startsWith('## ')) {
      blocks.push({
        _type: 'block',
        _key: generateId(),
        style: 'h2',
        children: [{ _type: 'span', text: line.slice(3), _key: generateId() }],
        markDefs: [],
      })
    } else if (line.startsWith('### ')) {
      blocks.push({
        _type: 'block',
        _key: generateId(),
        style: 'h3',
        children: [{ _type: 'span', text: line.slice(4), _key: generateId() }],
        markDefs: [],
      })
    }
    // Liste à puces
    else if (line.startsWith('- ') || line.startsWith('* ') || line.startsWith('+ ')) {
      blocks.push({
        _type: 'block',
        _key: generateId(),
        style: 'normal',
        listItem: 'bullet',
        children: [{ _type: 'span', text: line.slice(2), _key: generateId() }],
        markDefs: [],
      })
    }
    // Liste numérotée
    else if (/^\d+\./.test(line)) {
      blocks.push({
        _type: 'block',
        _key: generateId(),
        style: 'normal',
        listItem: 'number',
        children: [{ _type: 'span', text: line.replace(/^\d+\.\s*/, ''), _key: generateId() }],
        markDefs: [],
      })
    }
    // Citations
    else if (line.startsWith('> ')) {
      blocks.push({
        _type: 'block',
        _key: generateId(),
        style: 'blockquote',
        children: [{ _type: 'span', text: line.slice(2), _key: generateId() }],
        markDefs: [],
      })
    }
    // Checkboxes
    else if (line.startsWith('- [ ]') || line.startsWith('- [x]')) {
      const checked = line.includes('[x]')
      blocks.push({
        _type: 'block',
        _key: generateId(),
        style: 'normal',
        listItem: 'bullet',
        children: [{
          _type: 'span',
          text: (checked ? '✅ ' : '☐ ') + line.replace(/^- \[[ x]\]\s*/, ''),
          _key: generateId()
        }],
        markDefs: [],
      })
    }
    // Callouts spéciaux
    else if (line.startsWith('**✅') || line.startsWith('✅')) {
      blocks.push({
        _type: 'callout',
        _key: generateId(),
        type: 'success',
        content: [{
          _type: 'block',
          _key: generateId(),
          style: 'normal',
          children: [{ _type: 'span', text: line.replace(/^\*\*/, '').replace(/\*\*$/, ''), _key: generateId() }],
          markDefs: [],
        }],
      })
    }
    else if (line.startsWith('**❌') || line.startsWith('❌')) {
      blocks.push({
        _type: 'callout',
        _key: generateId(),
        type: 'warning',
        content: [{
          _type: 'block',
          _key: generateId(),
          style: 'normal',
          children: [{ _type: 'span', text: line.replace(/^\*\*/, '').replace(/\*\*$/, ''), _key: generateId() }],
          markDefs: [],
        }],
      })
    }
    else if (line.startsWith('**⚠️') || line.startsWith('⚠️')) {
      blocks.push({
        _type: 'callout',
        _key: generateId(),
        type: 'info',
        content: [{
          _type: 'block',
          _key: generateId(),
          style: 'normal',
          children: [{ _type: 'span', text: line.replace(/^\*\*/, '').replace(/\*\*$/, ''), _key: generateId() }],
          markDefs: [],
        }],
      })
    }
    // Paragraphe normal
    else {
      // Gérer le gras **texte**
      const parts = line.split(/\*\*(.*?)\*\*/)
      const children = parts.map((part, idx) => ({
        _type: 'span',
        text: part,
        _key: generateId(),
        marks: idx % 2 === 1 ? ['strong'] : [],
      })).filter(p => p.text)

      blocks.push({
        _type: 'block',
        _key: generateId(),
        style: 'normal',
        children: children.length > 0 ? children : [{ _type: 'span', text: line, _key: generateId() }],
        markDefs: [],
      })
    }
  }

  return blocks
}

async function createOrUpdateArticle(article: typeof fullArticles[0], authorId: string) {
  // Vérifier si l'article existe déjà
  const existing = await client.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug: article.slug }
  )

  const doc = {
    _type: 'blogPost',
    title: article.title,
    slug: {
      _type: 'slug',
      current: article.slug,
    },
    excerpt: article.excerpt,
    content: markdownToBlocks(article.content),
    category: article.category,
    tags: article.tags,
    featured: article.featured,
    author: {
      _type: 'reference',
      _ref: authorId,
    },
    publishedAt: new Date().toISOString(),
    seo: {
      metaTitle: article.title,
      metaDescription: article.excerpt,
      keywords: article.tags.join(', '),
    },
  }

  if (existing) {
    // Mettre à jour
    await client.patch(existing._id).set(doc).commit()
    console.log(`✅ Article mis à jour: ${article.title}`)
  } else {
    // Créer
    await client.create(doc)
    console.log(`✅ Article créé: ${article.title}`)
  }
}

async function main() {
  console.log('🚀 Création d\'articles complets avec contenu détaillé...\n')

  try {
    const authorId = await getOrCreateAuthor()
    console.log('')

    for (const article of fullArticles) {
      await createOrUpdateArticle(article, authorId)
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    console.log('\n🎉 SUCCÈS! Articles créés avec contenu complet!')
    console.log(`\n📊 ${fullArticles.length} articles professionnels publiés`)
    console.log('\n🔗 Accédez à Sanity Studio:')
    console.log('   https://osimx.vercel.app/studio')

  } catch (error) {
    console.error('❌ Erreur:', error)
    process.exit(1)
  }
}

main()
