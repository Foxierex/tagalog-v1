import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// This would come from your API/database in a real application
const getLessonById = (id: number) => {
  // Mock data for demonstration
  return {
    id,
    title: `Lesson ${id}: Sample Grammar Lesson`,
    content: "This is where the detailed content of the grammar lesson would go...",
    examples: [
      { tagalog: "Example sentence in Tagalog", english: "English translation of the example" },
      // More examples...
    ],
    exercises: [
      { question: "Sample exercise question", answer: "Sample answer" },
      // More exercises...
    ],
  }
}

export default function GrammarLessonPage({ params }: { params: { id: string } }) {
  const lessonId = Number(params.id)
  const lesson = getLessonById(lessonId)

  return (
    <div className="min-h-screen bg-blue-50 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/grammar" className="inline-flex items-center text-blue-700 hover:text-blue-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Grammar Lessons
        </Link>

        <div className="neubrutalism-card overflow-hidden">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">{lesson.title}</h1>
            <div className="prose max-w-none">
              <p>{lesson.content}</p>

              <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-900">Examples</h2>
              {lesson.examples.map((example, index) => (
                <div key={index} className="mb-4 neubrutalism-card p-4">
                  <p className="font-medium text-blue-900">{example.tagalog}</p>
                  <p className="text-blue-700">{example.english}</p>
                </div>
              ))}

              <h2 className="text-2xl font-semibold mt-6 mb-4 text-blue-900">Exercises</h2>
              {lesson.exercises.map((exercise, index) => (
                <div key={index} className="mb-4 neubrutalism-card p-4">
                  <p className="font-medium text-blue-900">{exercise.question}</p>
                  <p className="text-blue-700 mt-2">{exercise.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

