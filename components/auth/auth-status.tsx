"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut, User, Settings } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/components/ui/use-toast"

export function AuthStatus() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      setIsOpen(false) // Close the dropdown
      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      })
      router.push("/") // Redirect to home page
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "An error occurred during sign out. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Don't render anything during SSR to prevent hydration mismatch
  if (!isClient) return null

  if (!user) {
    return (
      <div className="flex items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="relative h-10 w-10 rounded-full"
        onClick={() => {
          console.log("Avatar clicked, toggling dropdown")
          setIsOpen(!isOpen)
        }}
      >
        <Avatar className="h-10 w-10 border-2 border-primary/10">
          <AvatarImage src={user.avatar_url || undefined} alt={user.email || "User"} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {user.email ? user.email.charAt(0).toUpperCase() : "U"}
          </AvatarFallback>
        </Avatar>
        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <div className="px-4 py-2 text-sm text-gray-700">
              <p className="font-medium">Account</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <div className="border-t border-gray-100"></div>
            <Link href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <User className="inline-block mr-2 h-4 w-4" />
              Profile
            </Link>
            <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
              <Settings className="inline-block mr-2 h-4 w-4" />
              Dashboard
            </Link>
            <div className="border-t border-gray-100"></div>
            <button
              onClick={handleSignOut}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
              role="menuitem"
            >
              <LogOut className="inline-block mr-2 h-4 w-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

