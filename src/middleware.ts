import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Define protected admin routes
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// Define public routes
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/unauthorized',
])

export default clerkMiddleware(
  async (auth, req) => {
    // Always allow public routes
    if (isPublicRoute(req)) {
      return NextResponse.next()
    }

    // Protect admin routes
    if (isAdminRoute(req)) {
      try {
        const { userId } = await auth()

        // Redirect to sign-in if not authenticated
        if (!userId) {
          const signInUrl = new URL('/sign-in', req.url)
          signInUrl.searchParams.set('redirect_url', req.url)
          return NextResponse.redirect(signInUrl)
        }

        // Allow all authenticated users to access admin
        // TODO: Add role checking after configuring JWT template in Clerk
      } catch (error) {
        // If auth fails, redirect to sign-in
        const signInUrl = new URL('/sign-in', req.url)
        return NextResponse.redirect(signInUrl)
      }
    }

    return NextResponse.next()
  },
  {
    // Make Clerk optional - won't fail if keys are invalid
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  }
)

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
