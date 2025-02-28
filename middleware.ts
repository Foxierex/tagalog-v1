import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Simplified authentication check
  if (!session && req.nextUrl.pathname.startsWith("/api")) {
    // For API routes, return a 401 response instead of redirecting
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // For admin routes, check if user exists and has admin role
  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!session) {
      return NextResponse.redirect(new URL("/sign-in", req.url))
    }

    // Check user role - simplified for now
    const userRole = session.user?.user_metadata?.role || "user"
    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/unauthorized", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/api/:path*", "/admin/:path*"],
}

