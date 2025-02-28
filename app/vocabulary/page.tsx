"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import VocabularyEntry from "@/components/vocabulary-entry"
import { useLanguage } from "@/hooks/use-language"

// Sample vocabulary data
const vocabularyWords = [
  {
    id: 1,
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
  },
  {
    id: 2,
    tagalog: "bahay",
    english: "house",
    chinese: "房子",
    partOfSpeech: {
      tagalog: "Pangngalan",
      english: "Noun",
      chinese: "名词",
    },
    meaning: {
      tagalog: "Isang gusali o istruktura na ginagamit bilang tirahan.",
      english: "A building or structure used as a dwelling.",
      chinese: "用作住所的建筑物或结构。",
    },
  },
  {
    id: 3,
    tagalog: "maganda",
    english: "beautiful",
    chinese: "美丽的",
    partOfSpeech: {
      tagalog: "Pang-uri",
      english: "Adjective",
      chinese: "形容词",
    },
    meaning: {
      tagalog: "May katangiang nakaaakit o nakalulugod sa paningin.",
      english: "Having qualities that are pleasing or attractive to look at.",
      chinese: "具有令人愉悦或吸引人的视觉特质。",
    },
  },
  {
    id: 4,
    tagalog: "mabilis",
    english: "quickly",
    chinese: "快速地",
    partOfSpeech: {
      tagalog: "Pang-abay",
      english: "Adverb",
      chinese: "副词",
    },
    meaning: {
      tagalog: "Sa paraang mabilis o sa maikling panahon.",
      english: "In a rapid manner or within a short time.",
      chinese: "以快速的方式或在短时间内。",
    },
  },
  {
    id: 5,
    tagalog: "ako",
    english: "I, me",
    chinese: "我",
    partOfSpeech: {
      tagalog: "Panghalip",
      english: "Pronoun",
      chinese: "代词",
    },
    meaning: {
      tagalog: "Tumutukoy sa sarili bilang tagapagsalita.",
      english: "Refers to oneself as the speaker.",
      chinese: "指代说话者自己。",
    },
  },
]

export default function VocabularyPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const { language } = useLanguage()

  const filteredVocabulary = vocabularyWords.filter(
    (word) =>
      word.tagalog.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.chinese.includes(searchTerm),
  )

  return (
    <div className="bg-blue-50 min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-blue-900 mb-6">
          {language === "zh-TW" ? "塔加洛语词汇" : "Tagalog Vocabulary"}
        </h1>

        <div className="mb-8 max-w-xl mx-auto">
          <div className="relative">
            <Input
              type="text"
              placeholder={language === "zh-TW" ? "搜索词汇..." : "Search words..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="neubrutalism-input pl-10 pr-4 py-2"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredVocabulary.map((word) => (
            <VocabularyEntry key={word.id} word={word} />
          ))}
        </div>

        {filteredVocabulary.length === 0 && (
          <div className="neubrutalism-card p-8 text-center mt-8">
            <p className="text-blue-900 text-lg">
              {language === "zh-TW" ? "没有找到匹配的词汇。" : "No vocabulary words found matching your search."}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

