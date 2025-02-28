"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { FormMessage } from "@/components/auth/form-message"
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper"
import { PasswordStrength } from "@/components/auth/password-strength"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  const [fieldErrors, setFieldErrors] = useState({ password: "", confirmPassword: "" })
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Check if we have a valid reset token
  useEffect(() => {
    const hasResetToken = searchParams.has("token") || searchParams.has("code")

    if (!hasResetToken) {
      setFormError("Invalid or missing reset token. Please request a new password reset link.")
      toast({
        title: "Invalid reset link",
        description: "Please request a new password reset link.",
        variant: "destructive",
      })
    }
  }, [searchParams, toast])

  const validateForm = () => {
    const errors = { password: "", confirmPassword: "" }
    let isValid = true

    // Password validation
    if (!password) {
      errors.password = "Password is required"
      isValid = false
    } else if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
      isValid = false
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match"
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
      const { error } = await supabase.auth.updateUser({ password })

      if (error) throw error

      setFormSuccess("Password has been reset successfully.")
      toast({
        title: "Password reset successful",
        description: "Your password has been reset. You can now sign in with your new password.",
      })

      // Redirect to sign in page after a short delay
      setTimeout(() => {
        router.push("/sign-in")
      }, 2000)
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
      title="Reset Password"
      description="Create a new password for your account"
      footer={
        <div className="text-center w-full text-sm">
          <Link href="/sign-in" className="text-primary hover:underline">
            Back to Sign In
          </Link>
        </div>
      }
    >
      {formError && <FormMessage type="error" message={formError} />}
      {formSuccess && <FormMessage type="success" message={formSuccess} />}

      <form onSubmit={handleResetPassword} className="space-y-4 mt-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" })
              }}
              className={`pl-10 pr-10 ${fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <PasswordStrength password={password} />
          {fieldErrors.password && (
            <p id="password-error" className="text-sm text-red-500 mt-1">
              {fieldErrors.password}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: "" })
              }}
              className={`pl-10 pr-10 ${fieldErrors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={fieldErrors.confirmPassword ? "confirm-password-error" : undefined}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              disabled={isLoading}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldErrors.confirmPassword && (
            <p id="confirm-password-error" className="text-sm text-red-500 mt-1">
              {fieldErrors.confirmPassword}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Resetting Password...
            </>
          ) : (
            "Reset Password"
          )}
        </Button>
      </form>
    </AuthFormWrapper>
  )
}

