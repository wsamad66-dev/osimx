import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

// Extend session claims type to include publicMetadata
declare module '@clerk/types' {
  interface CustomJwtSessionClaims {
    publicMetadata?: {
      role?: string
    }
  }
}

// Define protected admin routes
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

// Define public routes (Clerk auth pages)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/unauthorized',
  '/',
])

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes
  if (isPublicRoute(req)) {
    return NextResponse.next()
  }

  // Protect admin routes
  if (isAdminRoute(req)) {
    const authResult = await auth()
    const { userId } = authResult

    // Redirect to sign-in if not authenticated
    if (!userId) {
      const signInUrl = new URL('/sign-in', req.url)
      signInUrl.searchParams.set('redirect_url', req.url)
      return NextResponse.redirect(signInUrl)
    }

    // For development: temporarily allow all authenticated users
    // TODO: Configure JWT template in Clerk Dashboard (see CLERK_JWT_SETUP.md)
    console.log('[Middleware] User authenticated:', userId)

    // Uncomment this block once JWT template is configured:
    /*
    const sessionClaims = authResult.sessionClaims
    const role = sessionClaims?.publicMetadata?.role
    const allowedRoles = ['admin', 'cm', 'fr']

    if (!role || !allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL('/unauthorized', req.url))
    }
    */
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
