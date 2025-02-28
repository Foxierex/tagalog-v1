"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const toggleLanguage = (lang: "en" | "zh") => {
    setLanguage(lang)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button className="flex items-center text-gray-500 hover:text-gray-700" onClick={() => setIsOpen(!isOpen)}>
        <Globe className="h-5 w-5 mr-1" />
        <span>{language === "en" ? "English" : "中文"}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
          <div className="py-1">
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${language === "en" ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => toggleLanguage("en")}
            >
              English
            </button>
            <button
              className={`block px-4 py-2 text-sm w-full text-left ${language === "zh" ? "bg-indigo-50 text-indigo-700" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => toggleLanguage("zh")}
            >
              中文 (Chinese)
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

