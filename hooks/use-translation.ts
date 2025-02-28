"use client"

import { useLanguage } from "./use-language"

// This would be replaced with actual translations from your API or database
const translations = {
  en: {
    "home.hero.title": "Learn Tagalog Interactively",
    "home.hero.subtitle":
      "Master Tagalog with our comprehensive platform featuring interactive lessons, vocabulary with audio pronunciation, and practical exercises.",
    "home.features.title": "Platform Features",
    "home.features.subtitle": "Everything you need to master Tagalog",
    // Add more translations as needed
  },
  zh: {
    "home.hero.title": "互动学习塔加洛语",
    "home.hero.subtitle": "通过我们全面的平台掌握塔加洛语，包括互动课程、带有音频发音的词汇和实用练习。",
    "home.features.title": "平台功能",
    "home.features.subtitle": "掌握塔加洛语所需的一切",
    // Add more translations as needed
  },
}

export function useTranslation() {
  const { language } = useLanguage()

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return { t }
}

