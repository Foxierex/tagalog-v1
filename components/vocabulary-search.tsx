"use client"

import { useState, useEffect } from "react"
import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import AudioPlayer from "./audio-player"

interface VocabularyItem {
  id: number
  word: string
  translation: string
  category: string
}

export default function VocabularySearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<VocabularyItem[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    if (searchTerm.length < 2) {
      setResults([])
      setShowResults(false)
      return
    }

    const fetchResults = async () => {
      setIsSearching(true)

      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch(`/api/vocabulary?search=${searchTerm}`)
        // const data = await response.json()
        // setResults(data.items)

        // For demo purposes, we'll simulate this
        setTimeout(() => {
          const mockResults = [
            { id: 1, word: "magsalita", translation: "to speak", category: "verbs" },
            { id: 4, word: "bahay", translation: "house", category: "nouns" },
            { id: 7, word: "maganda", translation: "beautiful", category: "adjectives" },
          ].filter(
            (item) =>
              item.word.includes(searchTerm.toLowerCase()) || item.translation.includes(searchTerm.toLowerCase()),
          )

          setResults(mockResults)
          setIsSearching(false)
          setShowResults(true)
        }, 300)
      } catch (error) {
        console.error("Error fetching search results:", error)
        setIsSearching(false)
      }
    }

    const debounceTimer = setTimeout(() => {
      fetchResults()
    }, 300)

    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  const handleClearSearch = () => {
    setSearchTerm("")
    setResults([])
    setShowResults(false)
  }

  return (
    <div className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search for words..."
          className="pl-10 pr-10 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => {
            if (results.length > 0) {
              setShowResults(true)
            }
          }}
        />
        {searchTerm && (
          <button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {showResults && (
        <Card className="absolute z-10 w-full mt-1 max-h-80 overflow-y-auto shadow-lg">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : results.length > 0 ? (
            <div>
              {results.map((item) => (
                <Link
                  key={item.id}
                  href={`/vocabulary/${item.word}`}
                  className="flex justify-between items-center p-3 hover:bg-gray-50 border-b last:border-b-0"
                  onClick={() => setShowResults(false)}
                >
                  <div>
                    <p className="font-medium text-indigo-600">{item.word}</p>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600">{item.translation}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded ml-2">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <AudioPlayer word={item.word} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500">No results found</div>
          )}
        </Card>
      )}
    </div>
  )
}

