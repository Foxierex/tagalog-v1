"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { FormMessage } from "@/components/auth/form-message"
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper"
import { PasswordStrength } from "@/components/auth/password-strength"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { useLanguage } from "@/hooks/use-language"

export default function SignUpPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState("")
  const [formSuccess, setFormSuccess] = useState("")
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  })
  const [acceptTerms, setAcceptTerms] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const { language } = useLanguage()

  // Clear form success message after 5 seconds
  useEffect(() => {
    if (formSuccess) {
      const timer = setTimeout(() => {
        setFormSuccess("")
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [formSuccess])

  const validateForm = () => {
    const errors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: "",
    }
    let isValid = true

    // Name validation
    if (!name.trim()) {
      errors.name = language === "zh-TW" ? "请输入姓名" : "Name is required"
      isValid = false
    }

    // Email validation
    if (!email) {
      errors.email = language === "zh-TW" ? "请输入电子邮件地址" : "Email is required"
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = language === "zh-TW" ? "请输入有效的电子邮件地址" : "Please enter a valid email address"
      isValid = false
    }

    // Password validation
    if (!password) {
      errors.password = language === "zh-TW" ? "请输入密码" : "Password is required"
      isValid = false
    } else if (password.length < 8) {
      errors.password = language === "zh-TW" ? "密码必须至少8个字符" : "Password must be at least 8 characters"
      isValid = false
    }

    // Confirm password validation
    if (!confirmPassword) {
      errors.confirmPassword = language === "zh-TW" ? "请确认您的密码" : "Please confirm your password"
      isValid = false
    } else if (password !== confirmPassword) {
      errors.confirmPassword = language === "zh-TW" ? "密码不匹配" : "Passwords do not match"
      isValid = false
    }

    // Terms validation
    if (!acceptTerms) {
      errors.terms = language === "zh-TW" ? "您必须接受条款和条件" : "You must accept the terms and conditions"
      isValid = false
    }

    setFieldErrors(errors)
    return isValid
  }

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormError("")
    setFormSuccess("")

    if (!validateForm()) return

    setIsLoading(true)

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback?verified=true`,
        },
      })

      if (error) throw error

      setFormSuccess(
        language === "zh-TW"
          ? "注册成功！请检查您的电子邮件以验证您的账户。"
          : "Sign up successful! Please check your email to verify your account.",
      )
      toast({
        title: language === "zh-TW" ? "注册成功" : "Sign up successful",
        description:
          language === "zh-TW"
            ? "请检查您的电子邮件以验证您的账户。"
            : "Please check your email to verify your account.",
      })

      // Clear form
      setName("")
      setEmail("")
      setPassword("")
      setConfirmPassword("")
      setAcceptTerms(false)

      // Redirect to check email page after a short delay
      setTimeout(() => {
        router.push("/check-email")
      }, 2000)
    } catch (error: any) {
      console.error("Sign up error:", error)

      // Handle specific error cases
      if (error.message?.includes("already registered")) {
        setFormError(
          language === "zh-TW"
            ? "此电子邮件已注册。请改为登录。"
            : "This email is already registered. Please sign in instead.",
        )
      } else {
        setFormError(
          error.message ||
            (language === "zh-TW"
              ? "注册过程中发生错误。请重试。"
              : "An error occurred during sign up. Please try again."),
        )
      }

      toast({
        title: language === "zh-TW" ? "注册失败" : "Sign up failed",
        description:
          error.message ||
          (language === "zh-TW"
            ? "注册过程中发生错误。请重试。"
            : "An error occurred during sign up. Please try again."),
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthFormWrapper
      title={language === "zh-TW" ? "创建账户" : "Create an Account"}
      description={language === "zh-TW" ? "注册以开始学习塔加洛语" : "Sign up to start learning Tagalog"}
      footer={
        <div className="text-center w-full text-sm">
          <p>
            {language === "zh-TW" ? "已有账户？" : "Already have an account?"}{" "}
            <Link href="/sign-in" className="text-blue-700 hover:underline">
              {language === "zh-TW" ? "登录" : "Sign in"}
            </Link>
          </p>
        </div>
      }
    >
      {formError && <FormMessage type="error" message={formError} />}
      {formSuccess && <FormMessage type="success" message={formSuccess} />}

      <form onSubmit={handleSignUp} className="space-y-4 mt-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="text"
              placeholder={language === "zh-TW" ? "全名" : "Full Name"}
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: "" })
              }}
              className={`neubrutalism-input pl-10 ${fieldErrors.name ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
            />
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700" size={18} />
          </div>
          {fieldErrors.name && (
            <p id="name-error" className="text-sm text-red-500 mt-1">
              {fieldErrors.name}
            </p>
          )}
        </div>

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
              placeholder={language === "zh-TW" ? "确认密码" : "Confirm Password"}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (fieldErrors.confirmPassword) setFieldErrors({ ...fieldErrors, confirmPassword: "" })
              }}
              className={`neubrutalism-input pl-10 pr-10 ${fieldErrors.confirmPassword ? "border-red-500 focus-visible:ring-red-500" : ""}`}
              disabled={isLoading}
              aria-invalid={!!fieldErrors.confirmPassword}
              aria-describedby={fieldErrors.confirmPassword ? "confirm-password-error" : undefined}
            />
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-700" size={18} />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-700 hover:text-blue-900"
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

        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={acceptTerms}
            onCheckedChange={(checked) => {
              setAcceptTerms(checked as boolean)
              if (fieldErrors.terms) setFieldErrors({ ...fieldErrors, terms: "" })
            }}
            disabled={isLoading}
            aria-invalid={!!fieldErrors.terms}
            aria-describedby={fieldErrors.terms ? "terms-error" : undefined}
          />
          <div className="grid gap-1.5 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {language === "zh-TW" ? "我接受条款和条件" : "I accept the terms and conditions"}
            </label>
            {fieldErrors.terms && (
              <p id="terms-error" className="text-sm text-red-500">
                {fieldErrors.terms}
              </p>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full neubrutalism-button" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {language === "zh-TW" ? "创建账户中..." : "Creating Account..."}
            </>
          ) : language === "zh-TW" ? (
            "创建账户"
          ) : (
            "Create Account"
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
          {language === "zh-TW" ? "使用 Google 注册" : "Sign up with Google"}
        </Button>
      </form>
    </AuthFormWrapper>
  )
}

