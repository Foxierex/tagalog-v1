import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import type { ReactNode } from "react"

interface AuthFormWrapperProps {
  title: string
  description: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthFormWrapper({ title, description, children, footer }: AuthFormWrapperProps) {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
      <Card className="w-full max-w-md shadow-lg neubrutalism-card">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-blue-900">{title}</CardTitle>
          <CardDescription className="text-center text-blue-700">{description}</CardDescription>
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
    </div>
  )
}

