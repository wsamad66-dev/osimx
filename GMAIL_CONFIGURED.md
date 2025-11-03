# ✅ Configuration Gmail Complète

## 📧 Identifiants Configurés

**Email d'envoi (Gmail API)**:
- Email: `etudaintetrangerapi@gmail.com`
- Mot de passe d'application: `rycy rmgq quin wvln` (configuré dans .env.local)

**Email de réception (Équipe)**:
- Email: `letudaintetranger@gmail.com`

## 🎯 Comment ça fonctionne

À chaque inscription d'un étudiant sur le site:

1. **Email Client** → Envoyé depuis `etudaintetrangerapi@gmail.com` vers l'email de l'étudiant
   - Sujet: 🎉 Bienvenue à L'Étudiant Étranger !
   - Contenu: Message de bienvenue personnalisé avec les informations

2. **Email Équipe** → Envoyé depuis `etudaintetrangerapi@gmail.com` vers `letudaintetranger@gmail.com`
   - Sujet: 🔔 Nouvelle inscription: [Nom de l'étudiant]
   - Contenu: Notification avec coordonnées complètes + boutons d'action

## 🧪 Tester le Système

### Méthode 1: Via le site

1. Lancez le serveur:
   ```bash
   npm run dev
   ```

2. Allez sur: http://localhost:3000

3. Cliquez sur "Demander un devis" ou "Prendre rendez-vous"

4. Remplissez le formulaire avec un email test

5. Vérifiez:
   - Console serveur → `✅ Email envoyé`
   - `letudaintetranger@gmail.com` → Email de notification reçu
   - Email de test → Email de bienvenue reçu

### Méthode 2: Via API directe

```bash
# Le serveur doit être lancé (npm run dev)

curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "letudaintetranger@gmail.com",
    "name": "Test Étudiant",
    "phone": "+221 77 123 45 67",
    "country": "Sénégal",
    "type": "client-welcome"
  }'
```

**Réponse attendue**:
```json
{
  "success": true,
  "message": "Email envoyé avec succès",
  "messageId": "<random-id@gmail.com>"
}
```

### Méthode 3: Via script de test

```bash
npx tsx scripts/test-send-email.ts
```

## 📊 Logs Attendus

Dans la console du serveur, vous verrez:

```
📧 Email à envoyer: {
  to: 'student@email.com',
  subject: '🎉 Bienvenue à L'Étudiant Étranger !',
  type: 'client-welcome',
  name: 'Jean Dupont',
  phone: '+221 77 123 45 67',
  country: 'Sénégal'
}
✅ Email envoyé: <1234567890.abcdef@gmail.com>
```

## ✅ Vérifications

- [x] `GMAIL_USER` configuré: `etudaintetrangerapi@gmail.com`
- [x] `GMAIL_APP_PASSWORD` configuré: `rycyrmgqquinwvln`
- [x] `TEAM_EMAIL` configuré: `letudaintetranger@gmail.com`
- [x] Nodemailer installé
- [x] Templates HTML créés
- [x] API endpoint fonctionnel
- [x] Intégration dans le formulaire

## 🚀 Déploiement Vercel

Pour que ça fonctionne en production sur Vercel:

1. Allez dans votre projet Vercel
2. Settings → Environment Variables
3. Ajoutez ces 3 variables:

```
GMAIL_USER=etudaintetrangerapi@gmail.com
GMAIL_APP_PASSWORD=rycyrmgqquinwvln
TEAM_EMAIL=letudaintetranger@gmail.com
```

4. Redéployez le projet
5. Testez en production !

## 💰 Limites

**Gmail gratuit**:
- 500 emails/jour
- Largement suffisant pour commencer

**Si vous dépassez 500/jour**:
- Utilisez plusieurs comptes Gmail (gratuit)
- Passez à Google Workspace: $6/mois = 2,000 emails/jour

## 🆘 Dépannage

### ❌ Erreur: "Invalid login"

**Cause**: Mot de passe d'application incorrect

**Solution**:
1. Vérifiez que la validation en 2 étapes est activée sur `etudaintetrangerapi@gmail.com`
2. Allez sur: https://myaccount.google.com/security
3. Créez un nouveau mot de passe d'application
4. Mettez à jour `GMAIL_APP_PASSWORD` dans `.env.local`
5. Relancez le serveur

### ❌ Emails non reçus

**Vérifications**:
1. Console montre "✅ Email envoyé" ? → OK
2. Vérifiez le dossier **Spam** dans `letudaintetranger@gmail.com`
3. Vérifiez les "Messages envoyés" dans `etudaintetrangerapi@gmail.com`

### ❌ Erreur: "Daily sending quota exceeded"

**Cause**: Plus de 500 emails envoyés aujourd'hui

**Solution**: Attendez 24h ou utilisez un autre compte Gmail

## 📚 Documentation

- Guide complet: `docs/GMAIL_SETUP.md`
- Guide rapide: `GMAIL_QUICK_START.md`
- Guide visuel: `docs/GMAIL_VISUAL_GUIDE.txt`

## 🎉 Résultat

✅ **Système d'emails 100% fonctionnel et configuré**

Dès maintenant, chaque inscription sur le site enverra automatiquement:
- Un email de bienvenue à l'étudiant
- Une notification à votre équipe

**Coût**: 0€ (Gmail gratuit)
**Limite**: 500 emails/jour
**Maintenance**: 0 heure

---

**Configuration effectuée le**: 17 octobre 2025
**Status**: ✅ Production Ready
