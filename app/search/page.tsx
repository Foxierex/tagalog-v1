"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

interface SearchResult {
  id: string
  title: string
  type: "vocabulary" | "lesson" | "grammar"
  description: string
}

export default function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")
  const [results, setResults] = useState<SearchResult[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true)
      // In a real application, you would call your API here
      // For now, we'll simulate an API call with a timeout and mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const mockResults: SearchResult[] = [
        { id: "1", title: "Basic Greetings", type: "lesson", description: "Learn common Tagalog greetings" },
        { id: "2", title: "Kumusta", type: "vocabulary", description: "How are you / How is it going" },
        { id: "3", title: "Verb Conjugation", type: "grammar", description: "Understanding Tagalog verb conjugation" },
      ]

      setResults(mockResults)
      setLoading(false)
    }

    if (query) {
      fetchSearchResults()
    }
  }, [query])

  if (!query) {
    return <div className="container mx-auto px-4 py-8">No search query provided.</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Search Results for "{query}"</h1>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul className="space-y-4">
          {results.map((result) => (
            <li key={result.id} className="border p-4 rounded-md">
              <Link
                href={`/${result.type}/${result.id}`}
                className="text-lg font-semibold text-blue-600 hover:underline"
              >
                {result.title}
              </Link>
              <p className="text-sm text-gray-500 capitalize">{result.type}</p>
              <p className="mt-2">{result.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  )
}

