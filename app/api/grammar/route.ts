import { NextResponse } from "next/server"

// This would connect to your Supabase database in production
export async function GET() {
  // Mock data - in production, this would fetch from Supabase
  const grammarLessons = {
    beginner: [
      { id: 1, title: "Pronouns", completed: true, locked: false },
      { id: 2, title: "Ang, Ng, and Sa", completed: true, locked: false },
      { id: 3, title: "Basic Sentence Structure", completed: false, locked: false },
      { id: 4, title: "Adjectives", completed: false, locked: false },
      { id: 5, title: "Basic Verbs", completed: false, locked: true },
      { id: 6, title: "Question Words", completed: false, locked: true },
    ],
    intermediate: [
      { id: 7, title: "Verb Conjugation: MAG Verbs", completed: false, locked: true },
      { id: 8, title: "Verb Conjugation: UM Verbs", completed: false, locked: true },
      { id: 9, title: "Verb Conjugation: I Verbs", completed: false, locked: true },
      { id: 10, title: "Verb Conjugation: AN Verbs", completed: false, locked: true },
      { id: 11, title: "Verb Conjugation: IN Verbs", completed: false, locked: true },
      { id: 12, title: "Aspect vs. Tense", completed: false, locked: true },
    ],
    advanced: [
      { id: 13, title: "Compound Sentences", completed: false, locked: true },
      { id: 14, title: "Complex Sentences", completed: false, locked: true },
      { id: 15, title: "Passive Voice", completed: false, locked: true },
      { id: 16, title: "Conditional Sentences", completed: false, locked: true },
      { id: 17, title: "Idiomatic Expressions", completed: false, locked: true },
      { id: 18, title: "Advanced Verb Forms", completed: false, locked: true },
    ],
  }

  return NextResponse.json({ grammarLessons })
}

