import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle } from "lucide-react"

interface FormMessageProps {
  type: "error" | "success" | "info"
  message: string
  className?: string
}

export function FormMessage({ type, message, className }: FormMessageProps) {
  if (!message) return null

  const iconMap = {
    error: <AlertCircle className="h-4 w-4" />,
    success: <CheckCircle className="h-4 w-4" />,
    info: <AlertCircle className="h-4 w-4" />,
  }

  const colorMap = {
    error: "text-red-500 bg-red-50 border-red-200",
    success: "text-green-500 bg-green-50 border-green-200",
    info: "text-blue-500 bg-blue-50 border-blue-200",
  }

  return (
    <div className={cn("flex items-center gap-2 text-sm p-2 rounded border mt-2", colorMap[type], className)}>
      {iconMap[type]}
      <span>{message}</span>
    </div>
  )
}

