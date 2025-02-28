"use client"

import type React from "react"
import Link from "next/link"
import { Mic } from "lucide-react"
import { useLanguageContext } from "@/context/language-context"

interface VocabularyEntryProps {
  word: {
    id: number
    tagalog: string
    english: string
    chinese: string
    partOfSpeech: {
      tagalog: string
      english: string
      chinese: string
    }
    meaning: {
      tagalog: string
      english: string
      chinese: string
    }
  }
}

const VocabularyEntry: React.FC<VocabularyEntryProps> = ({ word }) => {
  const { language } = useLanguageContext()

  console.log("VocabularyEntry rendering, current language:", language)

  const playAudio = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log(`Playing audio for: ${word.tagalog}`)
  }

  return (
    <Link href={`/vocabulary/${encodeURIComponent(word.tagalog)}`} passHref>
      <div className="neubrutalism-card h-full cursor-pointer" data-language={language}>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-blue-900">{word.tagalog}</h3>
            <button onClick={playAudio} className="text-blue-700 hover:text-blue-900" aria-label="Play audio">
              <Mic size={20} />
            </button>
          </div>

          <div className="text-sm font-medium px-2 py-1 rounded-full inline-block mb-2 bg-blue-100 text-blue-800 border-2 border-blue-900">
            {language === "en" ? word.partOfSpeech.english : word.partOfSpeech.chinese}
          </div>

          <div className="mt-3">
            <p className="font-semibold">{word.tagalog}</p>
            <p className="text-gray-600">{language === "en" ? word.english : word.chinese}</p>
          </div>

          <div className="mt-3 text-sm text-gray-700">
            {language === "en" ? word.meaning.english : word.meaning.chinese}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default VocabularyEntry

