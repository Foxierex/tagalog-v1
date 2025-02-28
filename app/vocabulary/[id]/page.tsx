"use client"

import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mic, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useTranslations } from "@/hooks/use-translations"

// This is a mock function to get word details. In a real app, you'd fetch this from an API or database.
const getWordDetails = (id: string) => {
  // Mock data - replace with actual data fetching logic
  return {
    id: Number.parseInt(id),
    tagalog: "kumain",
    english: "to eat",
    chinese: "吃",
    partOfSpeech: {
      tagalog: "Pandiwa",
      english: "Verb",
      chinese: "动词",
    },
    meaning: {
      tagalog: "Ang pagkain o paglamon ng pagkain.",
      english: "The act of consuming food.",
      chinese: "食用或吞咽食物的行为。",
    },
    examples: [
      {
        tagalog: "Kumain ako ng mangga.",
        english: "I ate a mango.",
        chinese: "我吃了一个芒果。",
      },
      {
        tagalog: "Kumakain sila sa restawran.",
        english: "They are eating at the restaurant.",
        chinese: "他们在餐厅吃饭。",
      },
    ],
  }
}

export default function WordPage() {
  const params = useParams()
  const wordId = params.id as string
  const word = getWordDetails(wordId)
  const { t, language } = useTranslations()

  const playAudio = () => {
    console.log(`Playing audio for: ${word.tagalog}`)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/vocabulary" className="text-blue-600 hover:underline mb-6 inline-flex items-center">
        <ArrowLeft className="mr-2" /> {language === "zh-TW" ? "返回詞彙表" : "Back to Vocabulary"}
      </Link>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="text-3xl font-bold text-blue-900">{word.tagalog}</span>
            <Button onClick={playAudio} variant="outline" size="icon">
              <Mic className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xl mb-1">{word.english}</p>
            <p className="text-lg text-gray-600">{word.chinese}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{language === "zh-TW" ? "詞性:" : "Part of Speech:"}</h3>
            <p>
              {word.partOfSpeech.english} ({word.partOfSpeech.tagalog}) - {word.partOfSpeech.chinese}
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-1">{language === "zh-TW" ? "含義:" : "Meaning:"}</h3>
            <p className="mb-1">{word.meaning.english}</p>
            <p className="mb-1">{word.meaning.tagalog}</p>
            <p>{word.meaning.chinese}</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-2">{language === "zh-TW" ? "例句:" : "Examples:"}</h3>
            <ul className="space-y-4">
              {word.examples.map((example, index) => (
                <li key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-1">{example.tagalog}</p>
                  <p className="text-gray-600">{example.english}</p>
                  <p className="text-gray-600">{example.chinese}</p>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

