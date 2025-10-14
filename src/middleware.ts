import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // For now, allow all routes to work
  // Admin will be protected once Clerk is properly configured for production
  const { pathname } = req.nextUrl

  // Block admin routes if Clerk is not configured
  if (pathname.startsWith('/admin')) {
    // Check if Clerk keys are available
    if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
