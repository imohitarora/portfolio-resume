import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Only apply middleware to /api/portfolio/update
    if (pathname === '/api/portfolio/update') {
        // Check for authentication token
        const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

        // If there's no token, redirect to login
        if (!token) {
            const url = new URL('/api/auth/signin', request.url)
            url.searchParams.set('callbackUrl', encodeURI(request.url))
            return NextResponse.redirect(url)
        }
    }

    // For all other routes, allow the request to proceed
    return NextResponse.next()
}

export const config = {
    matcher: ['/api/portfolio/update']
}