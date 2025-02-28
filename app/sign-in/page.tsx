"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, Loader2 } from "lucide-react"
import { useAuth } from "@/context/AuthContext"
import { FormMessage } from "@/components/auth/form-message"
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper"
import { Separator } from "@/components/ui/separator"
import { useLanguage } from "@/hooks/use-language"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [fieldErrors, setFieldErrors] = useState({ email: "", password: "" })
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const { signIn } = useAuth()
  const { language } = useLanguage()

  // Check for redirect message
  useEffect(() => {
    const redirectReason = searchParams.get("reason")
    if (redirectReason === "unauthorized") {
      toast({
        title: "Authentication required",
        description: "Please sign in to access that page.",
        variant: "default",
      })
    }

    const verified = searchParams.get("verified")
    if (verified === "true") {
      toast({
        title: "Email verified",
        description: "Your email has been verified. You can now sign in.",
        variant: "default",
      })
    }
  }, [searchParams, toast])

  const validateForm = () => {
    const errors = { email: "", password: "" }
    let isValid = true

    // Email validation
    if (!email) {
      errors.email = "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address"
      isValid = false
    }

    // Password validation
    if (!password) {
      errors.password = "Password is required"
      isValid = false
    }

    setFieldErrors(errors)
    return isValid
  }

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError("")

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const user = await signIn(email, password)

      toast({
        title: language === "zh-TW" ? "登录成功" : "Sign in successful",
        description: language === "zh-TW" ? `欢迎回来，${user.email}！` : `Welcome back, ${user.email}!`,
      })

      // Redirect to dashboard or the page they were trying to access
      const redirectTo = searchParams.get("redirectTo") || "/dashboard"
      router.push(redirectTo)
    } catch (error: any) {
      console.error("Sign in error:", error)

      // Handle specific error cases
      if (error.message?.includes("Invalid login credentials")) {
        setFormError(language === "zh-TW" ? "邮箱或密码无效。请重试。" : "Invalid email or password. Please try again.")
      } else if (error.message?.includes("Email not confirmed")) {
        setFormError(
          language === "zh-TW"
            ? "请在登录前验证您的电子邮件地址。"
            : "Please verify your email address before signing in.",
        )
      } else {
        setFormError(
          error.message ||
            (language === "zh-TW" ? "登录时发生错误。请重试。" : "An error occurred during sign in. Please try again."),
        )
      }

      toast({
        title: language === "zh-TW" ? "登录失败" : "Sign in failed",
        description: language === "zh-TW" ? "请检查您的凭据并重试。" : "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthFormWrapper
      title={language === "zh-TW" ? "欢迎回来" : "Welcome Back"}
      description={
        language === "zh-TW" ? "登录您的账户以继续学习塔加洛语" : "Sign in to your account to continue learning Tagalog"
      }
      footer={
        <div className="flex justify-between w-full text-sm">
          <Link href="/sign-up" className="text-blue-700 hover:underline">
            {language === "zh-TW" ? "没有账户？注册" : "Don't have an account? Sign up"}
          </Link>
          <Link href="/forgot-password" className="text-blue-700 hover:underline">
            {language === "zh-TW" ? "忘记密码？" : "Forgot password?"}
          </Link>
        </div>
      }
    >
      {formError && <FormMessage type="error" message={formError} />}

      <form onSubmit={handleSignIn} className="space-y-4 mt-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="email"
              placeholder={language === "zh-TW" ? "电子邮件" : "Email"}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: "" })
              }}
              className={`neubrutalism-input pl-10 ${fieldErrors.email ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
            />
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700" size={18} />
          </div>
          {fieldErrors.email && (
            <p id="email-error" className="text-sm text-red-500 mt-1">
              {fieldErrors.email}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder={language === "zh-TW" ? "密码" : "Password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: "" })
              }}
              className={`neubrutalism-input pl-10 pr-10 ${fieldErrors.password ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.password}
              aria-describedby={fieldErrors.password ? "password-error" : undefined}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700" size={18} />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700 hover:text-blue-900"
              disabled={isLoading}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {fieldErrors.password && (
            <p id="password-error" className="text-sm text-red-500 mt-1">
              {fieldErrors.password}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full neubrutalism-button" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {language === "zh-TW" ? "登录中..." : "Signing In..."}
            </>
          ) : language === "zh-TW" ? (
            "登录"
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="relative my-4">
          <Separator />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="bg-white px-2 text-xs text-blue-700">
              {language === "zh-TW" ? "或继续使用" : "OR CONTINUE WITH"}
            </span>
          </div>
        </div>

        <Button variant="outline" type="button" className="w-full neubrutalism-button" disabled={isLoading}>
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          {language === "zh-TW" ? "使用 Google 登录" : "Sign in with Google"}
        </Button>
      </form>
    </AuthFormWrapper>
  )
}

