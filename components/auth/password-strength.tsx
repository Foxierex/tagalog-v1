"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    if (!password) {
      setStrength(0)
      setFeedback("")
      return
    }

    // Calculate password strength
    let score = 0

    // Length check
    if (password.length >= 8) score += 1
    if (password.length >= 12) score += 1

    // Character variety checks
    if (/[A-Z]/.test(password)) score += 1
    if (/[a-z]/.test(password)) score += 1
    if (/[0-9]/.test(password)) score += 1
    if (/[^A-Za-z0-9]/.test(password)) score += 1

    // Set strength (0-4)
    const normalizedScore = Math.min(4, Math.floor(score / 1.5))
    setStrength(normalizedScore)

    // Set feedback
    switch (normalizedScore) {
      case 0:
        setFeedback("Very weak")
        break
      case 1:
        setFeedback("Weak")
        break
      case 2:
        setFeedback("Fair")
        break
      case 3:
        setFeedback("Good")
        break
      case 4:
        setFeedback("Strong")
        break
      default:
        setFeedback("")
    }
  }, [password])

  const getColor = () => {
    switch (strength) {
      case 0:
        return "bg-red-500"
      case 1:
        return "bg-orange-500"
      case 2:
        return "bg-yellow-500"
      case 3:
        return "bg-blue-500"
      case 4:
        return "bg-green-500"
      default:
        return "bg-gray-200"
    }
  }

  const getTextColor = () => {
    switch (strength) {
      case 0:
        return "text-red-500"
      case 1:
        return "text-orange-500"
      case 2:
        return "text-yellow-500"
      case 3:
        return "text-blue-500"
      case 4:
        return "text-green-500"
      default:
        return "text-gray-500"
    }
  }

  if (!password) return null

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1">
        {[0, 1, 2, 3].map((index) => (
          <div
            key={index}
            className={cn(
              "h-full w-1/4 rounded-full transition-colors duration-300",
              index < strength ? getColor() : "bg-gray-200",
            )}
          />
        ))}
      </div>
      <p className={cn("text-xs", getTextColor())}>{feedback}</p>
    </div>
  )
}

