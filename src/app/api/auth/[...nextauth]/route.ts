import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import type { NextAuthOptions } from "next-auth"

export const authOptions: NextAuthOptions = {
  providers: [
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
    async signIn({ user, account, profile }) {
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

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
