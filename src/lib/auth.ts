import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import bcrypt from "bcryptjs"

export const authOptions: NextAuthOptions = {
  providers: [
    // Connexion avec Email + Mot de passe
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@osimx.com" },
        password: { label: "Mot de passe", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.error("❌ Credentials manquantes")
          throw new Error("Email et mot de passe requis")
        }

        // Email et mot de passe admin depuis les variables d'environnement
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@osimx.com'
        // Hash codé en dur temporairement pour debug
        const adminPasswordHash = '$2b$10$DfLPFah/A6orsDvkFeX4aOt6I9Op9eXN3F1gFQQWFMjg7AX.vpWwq'

        console.log("🔍 Debug auth:", {
          hasAdminEmail: !!adminEmail,
          hasAdminHash: !!adminPasswordHash,
          providedEmail: credentials.email,
          emailMatch: credentials.email === adminEmail
        })

        if (!adminEmail || !adminPasswordHash) {
          console.error("❌ Configuration admin manquante")
          throw new Error("Configuration admin manquante")
        }

        // Vérifier l'email
        if (credentials.email !== adminEmail) {
          console.error("❌ Email incorrect:", credentials.email, "!=", adminEmail)
          throw new Error("Email ou mot de passe incorrect")
        }

        // Vérifier le mot de passe
        console.log("🔍 Comparing:", {
          passwordLength: credentials.password.length,
          hashLength: adminPasswordHash.length,
          hashStart: adminPasswordHash.substring(0, 10),
          passwordStart: credentials.password.substring(0, 5) + "..."
        })
        
        const isValid = await bcrypt.compare(credentials.password, adminPasswordHash)
        
        console.log("🔍 Password check:", { isValid })
        
        if (!isValid) {
          console.error("❌ Mot de passe incorrect")
          throw new Error("Email ou mot de passe incorrect")
        }

        console.log("✅ Authentification réussie")
        // Authentification réussie
        return {
          id: "admin",
          email: adminEmail,
          name: "Admin OSIMX",
          role: "admin"
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      console.log("🔍 signIn callback:", { email: user.email, provider: account?.provider })
      
      // Pour Credentials provider, toujours autoriser (déjà vérifié dans authorize)
      if (account?.provider === "credentials") {
        return true
      }
      
      // Pour OAuth (Google/GitHub), vérifier la liste blanche
      const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',') || []
      
      if (allowedEmails.length > 0 && user.email) {
        return allowedEmails.includes(user.email)
      }
      
      return true // Autoriser tous les utilisateurs OAuth pour l'instant
    },
    async session({ session, token }) {
      // Ajouter l'ID utilisateur à la session
      if (session.user) {
        session.user.id = token.sub as string
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
}
