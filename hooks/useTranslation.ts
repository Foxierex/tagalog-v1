import { useLanguage } from "@/context/LanguageContext"

const translations = {
  en: {
    grammar: "Grammar",
    lessons: "Lessons",
    vocabulary: "Vocabulary",
    search: "Search...",
    "view-details": "View Details",
    "play-audio": "Play Audio",
  },
  "zh-TW": {
    grammar: "語法",
    lessons: "課程",
    vocabulary: "詞彙",
    search: "搜尋...",
    "view-details": "查看詳細",
    "play-audio": "播放音頻",
  },
}

export const useTranslation = () => {
  const { language } = useLanguage()

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || key
  }

  return { t }
}

