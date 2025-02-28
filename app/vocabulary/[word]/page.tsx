"use client"

import { useState } from "react"
import { Volume2, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/hooks/use-language"
import { useParams } from "next/navigation"

// Word class color mapping
const wordClassColors = {
  "Pandiwa (Verb)": "text-word-class-verb",
  "Pangngalan (Noun)": "text-word-class-noun",
  "Pang-uri (Adjective)": "text-word-class-adjective",
  "Pang-abay (Adverb)": "text-word-class-adverb",
  "Panghalip (Pronoun)": "text-word-class-pronoun",
  "Pang-ukol (Preposition)": "text-word-class-preposition",
}

// Word class icon mapping
const wordClassIcons = {
  "Pandiwa (Verb)": "📝",
  "Pangngalan (Noun)": "📦",
  "Pang-uri (Adjective)": "🎨",
  "Pang-abay (Adverb)": "⏱️",
  "Panghalip (Pronoun)": "👤",
  "Pang-ukol (Preposition)": "🔄",
}

// This would come from your API/database in a real application
const getWordDetails = (word: string) => {
  // Mock data for demonstration
  return {
    word: "umalis",
    rootWord: "alis",
    affixes: ["-um-"],
    wordClass: "Pandiwa (Verb)",
    definition: {
      tagalog: "Ang paglisan o pag-alis sa isang lugar o posisyon",
      english: "To leave or depart from a place or position",
    },
    conjugations: [
      { tense: "Past", form: "umalis" },
      { tense: "Present", form: "umaalis" },
      { tense: "Future", form: "aalis" },
    ],
    examples: [
      {
        tagalog: "Aalis ako mamaya.",
        english: "I will leave later.",
      },
      {
        tagalog: "Umalis siya kahapon.",
        english: "He/She left yesterday.",
      },
      {
        tagalog: "Umaalis sila tuwing umaga.",
        english: "They leave every morning.",
      },
    ],
  }
}

export default function WordPage() {
  const params = useParams()
  const wordDetails = getWordDetails(params.word as string)
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)
  const { language } = useLanguage()

  const playAudio = (identifier: string) => {
    console.log(`Playing audio for: ${identifier}`)
    setPlayingAudio(identifier)

    // Simulate audio playing for 2 seconds
    setTimeout(() => {
      setPlayingAudio(null)
    }, 2000)
  }

  const wordClassColor = wordClassColors[wordDetails.wordClass as keyof typeof wordClassColors] || "text-gray-600"
  const wordClassIcon = wordClassIcons[wordDetails.wordClass as keyof typeof wordClassIcons] || "📄"

  return (
    <div className="min-h-screen bg-blue-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/vocabulary" className="inline-flex items-center text-blue-700 hover:text-blue-900 mb-6">
          <ArrowLeft className="mr-2" /> {language === "zh-TW" ? "返回词汇表" : "Back to Vocabulary"}
        </Link>

        <div className="neubrutalism-card mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{wordDetails.word}</h1>
            <p className="text-blue-700 mb-6">{language === "zh-TW" ? "塔加洛语单词" : "Tagalog Word"}</p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {/* Root Word */}
              <div className="neubrutalism-card p-4">
                <p className="text-sm text-blue-800 mb-2">{language === "zh-TW" ? "词根" : "Root Word"}</p>
                <div className="flex items-center">
                  <span className="text-blue-700 mr-2">🌱</span>
                  <span className="font-medium">{wordDetails.rootWord}</span>
                </div>
              </div>

              {/* Affixes */}
              <div className="neubrutalism-card p-4">
                <p className="text-sm text-blue-800 mb-2">{language === "zh-TW" ? "词缀" : "Affixes"}</p>
                <div className="flex items-center">
                  <span className="text-blue-700 mr-2">+</span>
                  <span className="font-medium text-blue-700">{wordDetails.affixes.join(", ")}</span>
                </div>
              </div>

              {/* Word Class */}
              <div className="neubrutalism-card p-4">
                <p className="text-sm text-blue-800 mb-2">{language === "zh-TW" ? "词类" : "Word Class"}</p>
                <div className="flex items-center">
                  <span className={`${wordClassColor} mr-2`}>{wordClassIcon}</span>
                  <span className={`font-medium ${wordClassColor}`}>{wordDetails.wordClass}</span>
                </div>
              </div>
            </div>

            {/* Definition */}
            <div className="neubrutalism-card p-4 mb-6">
              <p className="text-sm text-blue-800 mb-2">{language === "zh-TW" ? "定义" : "Definition"}</p>
              <div className="flex justify-between items-start">
                <p className="font-medium">{wordDetails.definition.tagalog}</p>
                <button onClick={() => playAudio("definition")} className="text-blue-700 hover:text-blue-900">
                  <Volume2 className={`h-5 w-5 ${playingAudio === "definition" ? "animate-pulse" : ""}`} />
                </button>
              </div>
              <p className="text-gray-600 mt-1">{wordDetails.definition.english}</p>
            </div>

            {/* Conjugations */}
            <div className="neubrutalism-card p-4 mb-6">
              <p className="text-sm text-blue-800 mb-2">{language === "zh-TW" ? "词形变化" : "Conjugations"}</p>
              <div className="grid md:grid-cols-3 gap-4">
                {wordDetails.conjugations.map((conj, index) => (
                  <div key={index} className="bg-blue-100 rounded-md p-3 border-2 border-blue-900">
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-blue-800">{conj.tense}</p>
                      <button onClick={() => playAudio(`conj-${index}`)} className="text-blue-700 hover:text-blue-900">
                        <Volume2 className={`h-4 w-4 ${playingAudio === `conj-${index}` ? "animate-pulse" : ""}`} />
                      </button>
                    </div>
                    <p className="font-medium">{conj.form}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Examples */}
            <div className="neubrutalism-card p-4">
              <p className="text-xl font-medium text-blue-900 mb-4">{language === "zh-TW" ? "例句" : "Examples"}</p>
              <div className="space-y-4 divide-y divide-blue-200">
                {wordDetails.examples.map((example, index) => (
                  <div key={index} className={index > 0 ? "pt-4" : ""}>
                    <div className="flex justify-between items-start">
                      <p className="font-medium">{example.tagalog}</p>
                      <button
                        onClick={() => playAudio(`example-${index}`)}
                        className="text-blue-700 hover:text-blue-900"
                      >
                        <Volume2 className={`h-5 w-5 ${playingAudio === `example-${index}` ? "animate-pulse" : ""}`} />
                      </button>
                    </div>
                    <p className="text-gray-600 mt-1">{example.english}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

