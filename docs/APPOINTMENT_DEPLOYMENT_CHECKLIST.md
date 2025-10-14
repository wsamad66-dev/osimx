# ✅ CHECKLIST DE DÉPLOIEMENT - Système de Rendez-vous

## 📋 Avant le déploiement

### Configuration Sanity
- [ ] Ouvrir terminal dans le projet
- [ ] Exécuter `npx sanity deploy`
- [ ] Vérifier que le schéma "Leads & Rendez-vous" apparaît dans Sanity Studio
- [ ] Tester la création manuelle d'un lead dans Studio
- [ ] Créer un token API avec permission "Editor" (si pas déjà fait)
- [ ] Copier le token pour les variables d'environnement

### Configuration zcal
- [ ] Se connecter sur https://zcal.co
- [ ] Vérifier que le lien fonctionne: https://zcal.co/letudiantetranger/consultation
- [ ] Configurer la durée: 30 minutes
- [ ] Définir les disponibilités (ex: Lun-Ven 9h-18h)
- [ ] Ajouter un buffer time: 15 minutes
- [ ] Personnaliser l'email de confirmation
- [ ] Tester la réservation d'un créneau

### Variables d'environnement Vercel
- [ ] Aller sur https://vercel.com/[votre-projet]/settings/environment-variables
- [ ] Ajouter `NEXT_PUBLIC_SANITY_PROJECT_ID` (valeur: votre project ID)
- [ ] Ajouter `NEXT_PUBLIC_SANITY_DATASET` (valeur: production)
- [ ] Ajouter `SANITY_API_TOKEN` (valeur: le token créé ci-dessus)
- [ ] (Optionnel) Ajouter `NEXT_PUBLIC_GA_MEASUREMENT_ID` pour Google Analytics

---

## 🧪 Tests en local

### Test du formulaire
- [ ] Lancer `npm run dev`
- [ ] Ouvrir http://localhost:3000/rendez-vous
- [ ] Remplir le formulaire avec des données de test
- [ ] Vérifier la validation des champs requis
- [ ] Soumettre le formulaire

### Test du modal
- [ ] Vérifier que le modal s'ouvre après soumission
- [ ] Vérifier que l'iframe zcal se charge
- [ ] Tester le bouton de fermeture (X en haut à droite)
- [ ] Vérifier l'animation de fermeture

### Test de la sauvegarde Sanity
- [ ] Ouvrir http://localhost:3000/studio
- [ ] Aller dans "Leads & Rendez-vous"
- [ ] Vérifier qu'un nouveau lead a été créé
- [ ] Vérifier que toutes les données sont présentes
- [ ] Vérifier que le status est "📝 Nouveau"

### Test de la page de confirmation
- [ ] Fermer le modal après "réservation"
- [ ] Vérifier que le toast de succès apparaît (coin en bas à droite)
- [ ] Vérifier le message "Rendez-vous confirmé !"
- [ ] Aller sur http://localhost:3000/merci
- [ ] Vérifier que la page s'affiche correctement

### Test responsive
- [ ] Ouvrir Chrome DevTools (F12)
- [ ] Tester sur iPhone SE (375px)
- [ ] Tester sur iPad (768px)
- [ ] Tester sur Desktop (1920px)
- [ ] Vérifier que le formulaire est lisible sur tous les écrans
- [ ] Vérifier que le modal prend toute la hauteur sur mobile

---

## 🚀 Déploiement

### Git commit
```bash
git add .
git status  # Vérifier les fichiers ajoutés
```

- [ ] Vérifier que ces fichiers sont bien ajoutés:
  - sanity/schemas/lead.ts
  - sanity/schemas/index.ts
  - src/components/appointment/AppointmentForm.tsx
  - src/components/appointment/AppointmentCTA.tsx
  - src/app/api/save-lead/route.ts
  - src/app/(main)/rendez-vous/page.tsx
  - src/app/(main)/merci/page.tsx
  - docs/ (tous les fichiers de documentation)

```bash
git commit -m "feat: Add appointment booking system

- Add AppointmentForm component with zcal integration
- Add Sanity lead schema for CRM
- Add API routes for lead management
- Add /rendez-vous and /merci pages
- Add GA4 tracking events
- Add comprehensive documentation
- Full responsive design"
```

- [ ] Commit réussi

### Push vers GitHub
```bash
git push origin ouassimsamad-dev
```

- [ ] Push réussi
- [ ] Vérifier sur GitHub que les fichiers sont bien présents

### Déploiement Vercel
- [ ] Aller sur https://vercel.com/dashboard
- [ ] Vérifier que le build automatique s'est lancé
- [ ] Attendre la fin du build (2-5 minutes)
- [ ] Vérifier qu'il n'y a pas d'erreurs dans les logs
- [ ] Noter l'URL de production

---

## ✅ Tests en production

### Test de base
- [ ] Ouvrir https://letudiantetranger.com/rendez-vous
- [ ] Vérifier que la page se charge
- [ ] Remplir le formulaire avec de vraies données
- [ ] Soumettre le formulaire

### Test du modal
- [ ] Vérifier que le modal s'ouvre
- [ ] Vérifier que zcal se charge
- [ ] Tester la réservation d'un créneau réel (ou annuler avant de confirmer)

### Test Sanity
- [ ] Ouvrir https://letudiantetranger.com/studio
- [ ] Vérifier que le lead a été créé
- [ ] Changer le status à "📞 Contacté"
- [ ] Ajouter une note

### Test des pages
- [ ] Tester /rendez-vous
- [ ] Tester /merci
- [ ] Vérifier le footer (liens vers pages légales)
- [ ] Tester la navigation mobile

### Test GA4 (si configuré)
- [ ] Ouvrir Chrome DevTools > Network
- [ ] Filtrer par "collect"
- [ ] Soumettre le formulaire
- [ ] Vérifier l'envoi de l'event `appointment_form_submitted`
- [ ] Fermer le modal
- [ ] Vérifier l'envoi de l'event `appointment_booked`

---

## 🎨 Intégration sur la homepage

### Ajouter un CTA dans le hero
- [ ] Ouvrir `src/app/page.tsx`
- [ ] Importer `AppointmentCTA`
- [ ] Ajouter le bouton dans le hero:
```tsx
<AppointmentCTA 
  text="Réserver ma consultation gratuite"
  scrollTo="rendez-vous"
  variant="primary"
  size="lg"
/>
```

### Ajouter le formulaire sur la homepage
- [ ] Ajouter une div avec id="rendez-vous" à l'endroit souhaité
- [ ] Importer `AppointmentForm`
- [ ] Ajouter le composant:
```tsx
<div id="rendez-vous">
  <AppointmentForm variant="section" />
</div>
```

### Test de l'intégration
- [ ] Vérifier que le bouton CTA scroll vers le formulaire
- [ ] Vérifier l'animation de scroll
- [ ] Tester sur mobile
- [ ] Commit et push les modifications

---

## 📊 Suivi post-déploiement

### Jour 1
- [ ] Vérifier qu'aucune erreur n'apparaît dans Vercel logs
- [ ] Tester une vraie réservation
- [ ] Vérifier la réception de l'email de confirmation zcal
- [ ] Partager le lien /rendez-vous sur les réseaux sociaux

### Semaine 1
- [ ] Analyser les premières soumissions dans Sanity
- [ ] Vérifier le taux de conversion (form → booking)
- [ ] Contacter les premiers leads
- [ ] Ajuster les disponibilités zcal si besoin

### Mois 1
- [ ] Analyser les KPIs dans GA4
- [ ] Identifier les pays les plus populaires
- [ ] Optimiser le formulaire (A/B tests)
- [ ] Ajouter des CTA additionnels si besoin

---

## 🎯 Objectifs de conversion

### Benchmarks cibles
- [ ] Form completion rate > 60%
- [ ] Modal open rate > 90%
- [ ] Booking completion > 40%
- [ ] Overall conversion > 25%

### Si les objectifs ne sont pas atteints
- [ ] Simplifier le formulaire (enlever téléphone?)
- [ ] Ajouter de l'urgency ("3 créneaux restants")
- [ ] Tester différents CTA texts
- [ ] Ajouter des testimonials avant le form
- [ ] Améliorer le copywriting

---

## 📞 Support

### En cas de problème

#### Le modal ne s'ouvre pas
1. Vérifier la console du navigateur (F12)
2. Chercher les erreurs JavaScript
3. Vérifier que Framer Motion est installé: `npm list framer-motion`
4. Réinstaller si nécessaire: `npm install framer-motion`

#### L'API retourne une erreur
1. Vérifier les logs Vercel: https://vercel.com/[projet]/deployments
2. Vérifier les variables d'environnement
3. Tester l'API en local
4. Vérifier le token Sanity

#### zcal ne se charge pas
1. Tester l'URL directement dans le navigateur
2. Vérifier que le compte zcal est actif
3. Vérifier les paramètres de confidentialité du compte
4. Contacter le support zcal si besoin

#### Sanity ne sauvegarde pas
1. Vérifier que le schéma est déployé: `npx sanity deploy`
2. Vérifier le token API (permissions "Editor")
3. Tester la création manuelle dans Studio
4. Vérifier les logs de l'API route

---

## ✨ Prochaines étapes

### Phase 2 (optionnel)
- [ ] Ajouter CAPTCHA pour anti-spam
- [ ] Configurer les emails automatiques (Resend)
- [ ] Créer un dashboard admin avec stats
- [ ] Ajouter l'export CSV des leads
- [ ] Intégrer avec un CRM (Hubspot, Pipedrive)

### Phase 3 (futur)
- [ ] Chatbot AI pour pré-qualification
- [ ] Version multilingue (EN, ES, AR)
- [ ] A/B testing avancé
- [ ] SMS reminders 24h avant
- [ ] Video call intégré (alternative zcal)

---

## 🎉 Félicitations !

Si vous avez coché toutes les cases ci-dessus, votre système de prise de rendez-vous est **100% opérationnel** ! 🚀

### Ce que vous avez maintenant
✅ Formulaire professionnel et responsive  
✅ Intégration zcal pour la réservation  
✅ Sauvegarde automatique dans Sanity CMS  
✅ Tracking Google Analytics  
✅ Pages de confirmation  
✅ Documentation complète  

### Impact attendu
📈 Augmentation du taux de conversion de 30-50%  
📊 Meilleure qualification des leads  
⏱️ Réduction du temps de réponse  
📧 Automatisation du processus  
💼 Professionnalisation de votre service  

**Bravo et bon succès avec votre plateforme ! 🎊**

---

**Date de complétion:** ___________  
**Testé par:** ___________  
**Status:** □ En cours  □ **✅ Complété**
