import { NextResponse } from "next/server"

// This would connect to your Supabase database in production
export async function GET(request: Request) {
  // Mock data - in production, this would fetch from Supabase
  const vocabularyItems = [
    { id: 1, word: "magsalita", translation: "to speak", category: "verbs" },
    { id: 2, word: "kumain", translation: "to eat", category: "verbs" },
    { id: 3, word: "matulog", translation: "to sleep", category: "verbs" },
    { id: 4, word: "bahay", translation: "house", category: "nouns" },
    { id: 5, word: "pamilya", translation: "family", category: "nouns" },
    { id: 6, word: "kaibigan", translation: "friend", category: "nouns" },
    { id: 7, word: "maganda", translation: "beautiful", category: "adjectives" },
    { id: 8, word: "mabait", translation: "kind", category: "adjectives" },
    { id: 9, word: "mabilis", translation: "fast", category: "adjectives" },
    { id: 10, word: "mabagal", translation: "slow", category: "adverbs" },
    { id: 11, word: "kahapon", translation: "yesterday", category: "adverbs" },
    { id: 12, word: "bukas", translation: "tomorrow", category: "adverbs" },
  ]

  // Get search query and category filter from URL
  const { searchParams } = new URL(request.url)
  const search = searchParams.get("search")
  const category = searchParams.get("category")

  // Filter results based on search query and category
  let filteredItems = vocabularyItems

  if (search) {
    const searchLower = search.toLowerCase()
    filteredItems = filteredItems.filter(
      (item) => item.word.toLowerCase().includes(searchLower) || item.translation.toLowerCase().includes(searchLower),
    )
  }

  if (category && category !== "all") {
    filteredItems = filteredItems.filter((item) => item.category === category)
  }

  return NextResponse.json({ items: filteredItems })
}

