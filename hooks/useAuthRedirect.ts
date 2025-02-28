"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/context/AuthContext"

export function useAuthRedirect() {
  const [isRedirecting, setIsRedirecting] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading } = useAuth()

  // Auth pages that should not redirect unauthenticated users
  const authPages = ["/sign-in", "/sign-up", "/forgot-password", "/reset-password"]
  const isAuthPage = authPages.includes(pathname)

  useEffect(() => {
    // If we're still loading auth state, do nothing
    if (loading) return

    // If user is authenticated and on an auth page, redirect to dashboard
    if (user && isAuthPage && !isRedirecting) {
      setIsRedirecting(true)
      console.log("Redirecting authenticated user from auth page...")
      const userRole = user.user_metadata?.role || "user"
      if (userRole === "admin") {
        router.replace("/admin/dashboard")
      } else {
        router.replace("/dashboard")
      }
    }
    // If user is not authenticated and on a protected page (not an auth page), redirect to sign-in
    else if (!user && !isAuthPage && !isRedirecting) {
      setIsRedirecting(true)
      console.log("Redirecting unauthenticated user from protected page...")
      router.replace("/sign-in")
    }
  }, [user, loading, isRedirecting, router])

  return { isRedirecting }
}

