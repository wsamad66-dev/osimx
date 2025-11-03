# ✅ Email Équipe Mis à Jour

## 📧 Changement Effectué

**Ancien email** : `contact@letudiantetranger.com`  
**Nouveau email** : `teametudantetranger@gmail.com`

## 📂 Fichiers Modifiés

### 1. `.env.local`
```bash
# Ajouté NEXT_PUBLIC_TEAM_EMAIL pour accès côté client
NEXT_PUBLIC_TEAM_EMAIL=teametudantetranger@gmail.com

# Variable serveur
TEAM_EMAIL=teametudantetranger@gmail.com
```

### 2. `src/components/registration/QuickRegistrationModal.tsx`
```tsx
to: process.env.NEXT_PUBLIC_TEAM_EMAIL || 'teametudantetranger@gmail.com'
```
- Utilise la variable d'environnement
- Fallback sur l'email direct si variable non définie

## 🧪 Test

Pour vérifier que ça fonctionne :

1. **Relancer le serveur** (important pour charger les nouvelles variables)
   ```bash
   # Arrêter le serveur (Ctrl+C)
   npm run dev
   ```

2. **Tester l'inscription**
   - Aller sur http://localhost:3000
   - Remplir le formulaire d'inscription
   - Soumettre

3. **Vérifier l'email**
   - Ouvrir `teametudantetranger@gmail.com`
   - Vous devriez recevoir l'email de notification
   - Sujet: "🔔 Nouvelle inscription: [Nom de l'étudiant]"

## 📊 Flux d'Emails

```
Étudiant remplit le formulaire
         ↓
┌────────────────────────────────────────┐
│ Email 1: Client                        │
│ → À: email-etudiant@example.com        │
│ → Sujet: 🎉 Bienvenue                  │
└────────────────────────────────────────┘
         ↓
┌────────────────────────────────────────┐
│ Email 2: Équipe                        │
│ → À: teametudantetranger@gmail.com ✅  │
│ → Sujet: 🔔 Nouvelle inscription       │
└────────────────────────────────────────┘
```

## ⚙️ Configuration Vercel (Production)

Quand vous déployez sur Vercel, ajoutez cette variable :

1. Aller sur https://vercel.com/dashboard
2. Sélectionner votre projet
3. **Settings** → **Environment Variables**
4. Ajouter :
   ```
   Name: NEXT_PUBLIC_TEAM_EMAIL
   Value: teametudantetranger@gmail.com
   Environment: Production, Preview, Development
   ```
5. Redéployer le projet

## ✅ Checklist

- [x] NEXT_PUBLIC_TEAM_EMAIL ajouté dans .env.local
- [x] TEAM_EMAIL mis à jour dans .env.local
- [x] Code mis à jour dans QuickRegistrationModal.tsx
- [ ] Serveur relancé (npm run dev)
- [ ] Test effectué
- [ ] Email reçu sur teametudantetranger@gmail.com
- [ ] Variable ajoutée dans Vercel (pour production)

## 🔄 Pour Changer à Nouveau

Si vous voulez changer l'email de l'équipe dans le futur :

1. Modifier `.env.local` :
   ```bash
   NEXT_PUBLIC_TEAM_EMAIL=nouvel-email@example.com
   TEAM_EMAIL=nouvel-email@example.com
   ```

2. Relancer le serveur

3. C'est tout ! Le code utilise la variable d'environnement automatiquement.

---

**Date** : 17 octobre 2025  
**Email Équipe** : `teametudantetranger@gmail.com` ✅  
**Status** : Prêt pour les tests
