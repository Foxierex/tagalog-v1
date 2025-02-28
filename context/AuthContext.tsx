"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { supabase } from "@/lib/supabase"

type UserRole = "admin" | "local" | "user"

interface User {
  id: string
  email: string
  role: UserRole
  user_metadata?: {
    role?: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<User>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (session?.user) {
          // Get the user's role from user_metadata or set a default
          const role = session.user.user_metadata?.role || "user"

          setUser({
            id: session.user.id,
            email: session.user.email || "",
            role: role as UserRole,
            user_metadata: session.user.user_metadata,
          })
        } else {
          setUser(null)
        }
      } catch (error) {
        console.error("Error checking user:", error)
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    checkUser()

    // Set up auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const role = session.user.user_metadata?.role || "user"

        setUser({
          id: session.user.id,
          email: session.user.email || "",
          role: role as UserRole,
          user_metadata: session.user.user_metadata,
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    const role = data.user.user_metadata?.role || "user"

    const user = {
      id: data.user.id,
      email: data.user.email || "",
      role: role as UserRole,
      user_metadata: data.user.user_metadata,
    }

    setUser(user)
    return user
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
  }

  const value = {
    user,
    loading,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

