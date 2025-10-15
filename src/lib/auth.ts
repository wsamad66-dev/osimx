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
          throw new Error("Email et mot de passe requis")
        }

        // Email et mot de passe admin depuis les variables d'environnement
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH

        if (!adminEmail || !adminPasswordHash) {
          throw new Error("Configuration admin manquante")
        }

        // Vérifier l'email
        if (credentials.email !== adminEmail) {
          throw new Error("Email ou mot de passe incorrect")
        }

        // Vérifier le mot de passe
        const isValid = await bcrypt.compare(credentials.password, adminPasswordHash)
        
        if (!isValid) {
          throw new Error("Email ou mot de passe incorrect")
        }

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
    async signIn({ user }) {
      // Vous pouvez ajouter une liste blanche d'emails autorisés ici
      const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS?.split(',') || []
      
      if (allowedEmails.length > 0 && user.email) {
        return allowedEmails.includes(user.email)
      }
      
      return true // Autoriser tous les utilisateurs pour l'instant
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
