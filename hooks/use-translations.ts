"use client"

import { useLanguage } from "@/context/language-context"

type TranslationKey = string

// Simple translations object
const translations = {
  en: {
    "vocabulary.viewFullEntry": "View Full Entry",
    "vocabulary.meaning": "Meaning",
    "vocabulary.word": "Word",
    "vocabulary.translation": "Translation",
    "vocabulary.partOfSpeech": "Part of Speech",
    "vocabulary.example": "Example",
  },
  "zh-TW": {
    "vocabulary.viewFullEntry": "查看完整條目",
    "vocabulary.meaning": "含義",
    "vocabulary.word": "單詞",
    "vocabulary.translation": "翻譯",
    "vocabulary.partOfSpeech": "詞性",
    "vocabulary.example": "例句",
  },
}

export function useTranslations() {
  const { language } = useLanguage()

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || key
  }

  return { t, language }
}

export function TrilingualText({
  tagalog,
  english,
  chinese,
}: {
  tagalog: string
  english: string
  chinese: string
}) {
  const { language } = useLanguage()

  return (
    <div className="trilingual-text">
      <div className="tagalog">{tagalog}</div>
      <div className="translation">{language === "zh-TW" ? chinese : english}</div>
    </div>
  )
}

