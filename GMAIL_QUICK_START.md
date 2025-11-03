# ⚡ Gmail Setup - Guide Ultra-Rapide

## 🎯 3 Étapes pour Activer les Emails

### 1️⃣ Mot de passe d'application Gmail (2 minutes)

```
https://myaccount.google.com/security
→ Validation en deux étapes (activez-la)
→ Mots de passe d'application
→ Sélectionnez "Mail" + "Autre appareil personnalisé"
→ Nom: "L'Étudiant Étranger"
→ Générer
→ Copiez le mot de passe de 16 caractères
```

### 2️⃣ Configuration .env.local (30 secondes)

Ouvrez `/Users/asf/Documents/GitHub/osimx/.env.local` et remplacez:

```bash
# Changez ces lignes:
GMAIL_USER=your-email@gmail.com           # ← Votre email Gmail
GMAIL_APP_PASSWORD=your-16-char-app-password  # ← Mot de passe de 16 caractères
TEAM_EMAIL=contact@letudiantetranger.com  # ← Email de votre équipe
```

**Exemple**:
```bash
GMAIL_USER=ouassim@gmail.com
GMAIL_APP_PASSWORD=abcdefghijklmnop
TEAM_EMAIL=contact@letudiantetranger.com
```

### 3️⃣ Relancer le serveur (10 secondes)

```bash
# Arrêtez le serveur (Ctrl+C) puis:
npm run dev
```

## ✅ Test

1. Allez sur http://localhost:3000
2. Inscrivez un étudiant test
3. Vérifiez la console → `✅ Email envoyé`
4. Vérifiez votre Gmail → Vous devez avoir reçu 2 emails :
   - Email de bienvenue (client)
   - Notification équipe

## 🎉 C'est tout !

Les emails sont maintenant envoyés **automatiquement** et **gratuitement** depuis votre Gmail.

**500 emails/jour** = Largement suffisant pour commencer !

---

## 🆘 Problème?

**❌ "Invalid login"**
→ Vérifiez que vous utilisez bien le **mot de passe d'application** (16 caractères) et pas votre mot de passe Gmail normal.

**❌ "Password not accepted"**
→ Réactivez la validation en 2 étapes puis recréez un mot de passe d'application.

**❌ Emails non reçus**
→ Vérifiez le dossier **Spam** dans Gmail.

---

📚 **Guide complet**: `docs/GMAIL_SETUP.md`
