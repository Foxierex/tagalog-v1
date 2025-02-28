import { NextResponse } from "next/server"

// This would connect to your Strapi CMS in production
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const contentType = searchParams.get("contentType")
  const id = searchParams.get("id")

  // Mock data - in production, this would fetch from Strapi CMS
  let data = {}

  if (contentType === "lessons") {
    data = {
      lessons: [
        {
          id: 1,
          title: "Greetings and Introductions",
          description: "Learn how to introduce yourself and greet others in Tagalog",
          level: "Beginner",
          duration: "30 min",
        },
        {
          id: 2,
          title: "Family and Relationships",
          description: "Vocabulary and phrases related to family members and relationships",
          level: "Beginner",
          duration: "45 min",
        },
        // More lessons...
      ],
    }

    if (id) {
      data = {
        lesson: {
          id: Number.parseInt(id),
          title: id === "1" ? "Greetings and Introductions" : "Unknown Lesson",
          description:
            id === "1" ? "Learn how to introduce yourself and greet others in Tagalog" : "Lesson description",
          content: "Lesson content would be here...",
          // More lesson details...
        },
      }
    }
  } else if (contentType === "grammar") {
    data = {
      grammarLessons: {
        beginner: [
          { id: 1, title: "Pronouns", completed: true, locked: false },
          { id: 2, title: "Ang, Ng, and Sa", completed: true, locked: false },
          // More grammar lessons...
        ],
        // More levels...
      },
    }

    if (id) {
      data = {
        grammarLesson: {
          id: Number.parseInt(id),
          title: id === "1" ? "Pronouns" : "Unknown Grammar Lesson",
          description: "Grammar lesson description",
          content: "Grammar lesson content would be here...",
          // More grammar lesson details...
        },
      }
    }
  }

  return NextResponse.json(data)
}

