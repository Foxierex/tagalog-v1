"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mic } from "lucide-react"
import { useTranslations, TrilingualText } from "@/hooks/use-translations"

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
  const { t } = useTranslations()
  const [isHovered, setIsHovered] = useState(false)

  const playAudio = () => {
    console.log(`Playing audio for: ${word.tagalog}`)
  }

  return (
    <Card className="relative" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{word.tagalog}</span>
          <button onClick={playAudio} className="text-indigo-600 hover:text-indigo-800">
            <Mic size={20} />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          <TrilingualText
            tagalog={word.partOfSpeech.tagalog}
            english={word.partOfSpeech.english}
            chinese={word.partOfSpeech.chinese}
          />
        </p>
        <p>
          <TrilingualText
            tagalog={word.meaning.tagalog}
            english={word.meaning.english}
            chinese={word.meaning.chinese}
          />
        </p>
      </CardContent>
      {isHovered && (
        <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">{word.tagalog}</h3>
            <button onClick={playAudio} className="text-indigo-600 hover:text-indigo-800 mb-2">
              <Mic size={24} />
            </button>
            <p className="mb-2">
              {t("vocabulary.meaning")}:
              <TrilingualText
                tagalog={word.meaning.tagalog}
                english={word.meaning.english}
                chinese={word.meaning.chinese}
              />
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700">
              {t("vocabulary.viewFullEntry")}
            </button>
          </div>
        </div>
      )}
    </Card>
  )
}

export default VocabularyEntry

