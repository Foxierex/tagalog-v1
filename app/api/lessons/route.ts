import { NextResponse } from "next/server"

// This would connect to your Supabase database in production
export async function GET() {
  // Mock data - in production, this would fetch from Supabase
  const lessons = [
    {
      id: 1,
      title: "Greetings and Introductions",
      description: "Learn how to introduce yourself and greet others in Tagalog",
      level: "Beginner",
      duration: "30 min",
      progress: 100,
      completed: true,
    },
    {
      id: 2,
      title: "Family and Relationships",
      description: "Vocabulary and phrases related to family members and relationships",
      level: "Beginner",
      duration: "45 min",
      progress: 60,
      completed: false,
    },
    {
      id: 3,
      title: "Numbers and Counting",
      description: "Learn how to count and use numbers in Tagalog",
      level: "Beginner",
      duration: "25 min",
      progress: 0,
      completed: false,
    },
    {
      id: 4,
      title: "Food and Dining",
      description: "Vocabulary and phrases for ordering food and dining out",
      level: "Beginner",
      duration: "40 min",
      progress: 0,
      completed: false,
    },
    {
      id: 5,
      title: "Daily Activities",
      description: "Talk about your daily routine and activities in Tagalog",
      level: "Intermediate",
      duration: "50 min",
      progress: 0,
      completed: false,
    },
    {
      id: 6,
      title: "Travel and Transportation",
      description: "Essential vocabulary and phrases for traveling in the Philippines",
      level: "Intermediate",
      duration: "45 min",
      progress: 0,
      completed: false,
    },
  ]

  return NextResponse.json({ lessons })
}

