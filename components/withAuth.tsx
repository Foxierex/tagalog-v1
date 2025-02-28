"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export function withAuth(WrappedComponent, allowedRoles) {
  return (props) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [hasAccess, setHasAccess] = useState(false)

    useEffect(() => {
      async function checkAuth() {
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (!user) {
          router.push("/sign-in")
          return
        }

        const { data: userData, error } = await supabase
          .from("users")
          .select("roles:role_id(name)")
          .eq("id", user.id)
          .single()

        if (error || !userData) {
          router.push("/sign-in")
          return
        }

        const userRole = userData.roles.name

        if (allowedRoles.includes(userRole)) {
          setHasAccess(true)
        } else {
          router.push("/unauthorized")
        }

        setIsLoading(false)
      }

      checkAuth()
    }, [allowedRoles, router])

    if (isLoading) {
      return <div>Loading...</div>
    }

    if (!hasAccess) {
      return null
    }

    return <WrappedComponent {...props} />
  }
}

