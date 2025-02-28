"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function UserDashboard() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user && user.role !== "user") {
      router.push("/unauthorized")
    }
  }, [user, router])

  if (!user || user.role !== "user") {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
      {/* Add regular user-specific content here */}
    </div>
  )
}

