"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Mail, Loader2, ArrowLeft } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { FormMessage } from "@/components/auth/form-message"
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  const [fieldErrors, setFieldErrors] = useState({ email: "" })
  const { toast } = useToast()

  const validateForm = () => {
    const errors = { email: "" }
    let isValid = true

    // Email validation
    if (!email) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    setFieldErrors(errors)
    return isValid
  }

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError("")
    setFormSuccess("")

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      setFormSuccess("Password reset email sent. Please check your inbox.")
      toast({
        title: "Password reset email sent",
        description: "Check your email for the password reset link.",
      })

      // Clear email field
      setEmail("")
    } catch (error: any) {
      console.error("Password reset error:", error)
      setFormError(error.message || "An error occurred. Please try again.")

      toast({
        title: "Password reset failed",
        description: "An error occurred. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthFormWrapper
      title="Forgot Password"
      description="Enter your email to receive a password reset link"
      footer={
        <Link href="/sign-in" className="flex items-center text-sm text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>
      }
    >
      {formError && <FormMessage type="error" message={formError} />}
      {formSuccess && <FormMessage type="success" message={formSuccess} />}

      <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" })
              }}
              className={`pl-10 ${fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
          </div>
          {fieldErrors.email && (
            <p id="email-error" className="text-sm text-red-500 mt-1">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </Button>
      </form>
    </AuthFormWrapper>
  )
}

