"use client"

import { Button } from "@/components/ui/button"
import { Mail, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { AuthFormWrapper } from "@/components/auth/auth-form-wrapper"

export default function CheckEmailPage() {
  return (
    <AuthFormWrapper
      title="Check Your Email"
      description="We've sent you a verification link"
      footer={
        <Link href="/sign-in" className="flex items-center text-sm text-primary hover:underline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sign In
        </Link>
      }
    >
      <div className="flex flex-col items-center justify-center py-6 space-y-6">
        <div className="h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="h-12 w-12 text-primary" />
        </div>

        <div className="text-center space-y-2">
          <p className="text-muted-foreground">
            We've sent a verification link to your email address. Please check your inbox and click on the link to
            verify your account.
          </p>

          <p className="text-sm text-muted-foreground">
            If you don't see the email, check your spam folder or try again.
          </p>
        </div>

        <Button variant="outline" asChild className="w-full">
          <Link href="/sign-up">Didn't receive an email? Try again</Link>
        </Button>
      </div>
    </AuthFormWrapper>
  )
}

