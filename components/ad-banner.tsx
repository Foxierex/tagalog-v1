"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  format?: "horizontal" | "vertical" | "rectangle"
  className?: string
}

export default function AdBanner({ format = "horizontal", className = "" }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real application, this would initialize the ad
    // For demo purposes, we'll just simulate an ad with a placeholder

    if (adRef.current) {
      const adElement = adRef.current

      // Simulate ad loading
      setTimeout(() => {
        adElement.innerHTML = `
          <div class="bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 text-sm">
            <span>Advertisement</span>
          </div>
        `
      }, 1000)
    }

    return () => {
      // Cleanup if needed
    }
  }, [])

  const getAdDimensions = () => {
    switch (format) {
      case "horizontal":
        return "h-24 w-full"
      case "vertical":
        return "h-96 w-36"
      case "rectangle":
        return "h-64 w-80"
      default:
        return "h-24 w-full"
    }
  }

  return (
    <div ref={adRef} className={`${getAdDimensions()} ${className}`} aria-label="Advertisement">
      <div className="bg-gray-100 border border-gray-200 h-full w-full flex items-center justify-center text-gray-500 text-sm">
        <span>Advertisement Loading...</span>
      </div>
    </div>
  )
}

