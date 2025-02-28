"use client"

import { useLanguageContext } from "@/context/language-context"
import { Button } from "@/components/ui/button"
import { Globe } from "lucide-react"
import { useState, useEffect } from "react"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguageContext()
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log("LanguageToggle effect, isOpen:", isOpen)
  }, [isOpen])

  const handleTriggerClick = () => {
    console.log("Language toggle button clicked, current isOpen:", isOpen)
    setIsOpen((prevIsOpen) => !prevIsOpen)
  }

  const handleLanguageChange = (newLanguage: "en" | "zh-TW") => {
    console.log(`Language changed to: ${newLanguage}`)
    setLanguage(newLanguage)
    setIsOpen(false)
  }

  console.log("Rendering LanguageToggle, current language:", language, "isOpen:", isOpen)

  return (
    <div className="relative">
      <Button variant="ghost" size="sm" className="flex items-center" onClick={handleTriggerClick}>
        <Globe className="h-4 w-4 mr-1" />
        {language === "en" ? "English" : "中文"}
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleLanguageChange("en")}
          >
            English
          </button>
          <button
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            onClick={() => handleLanguageChange("zh-TW")}
          >
            中文 (Chinese)
          </button>
        </div>
      )}
    </div>
  )
}

