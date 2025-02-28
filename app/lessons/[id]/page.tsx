import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import AudioPlayer from "@/components/audio-player"

// This is a placeholder. In a real application, you would fetch this data from your backend or CMS.
const getLessonById = (id: number) => {
  const lessons = [
    { id: 1, title: "Basic Greetings", content: "In this lesson, we'll learn basic Tagalog greetings..." },
    { id: 2, title: "Numbers and Counting", content: "Let's explore the Tagalog number system..." },
    // Add more lessons as needed
    {
      id: 1,
      title: "Greetings and Introductions",
      description: "Learn how to introduce yourself and greet others in Tagalog",
      sections: [
        {
          id: 1,
          title: "Common Greetings",
          content: `
          <p>In Tagalog, there are several common greetings used in different situations:</p>
          <ul>
            <li><strong>Magandang umaga</strong> - Good morning</li>
            <li><strong>Magandang hapon</strong> - Good afternoon</li>
            <li><strong>Magandang gabi</strong> - Good evening</li>
            <li><strong>Kumusta?</strong> - How are you?</li>
            <li><strong>Mabuti naman</strong> - I'm fine</li>
          </ul>
        `,
        },
        {
          id: 2,
          title: "Introducing Yourself",
          content: `
          <p>To introduce yourself in Tagalog, you can use these phrases:</p>
          <ul>
            <li><strong>Ako si [name]</strong> - I am [name]</li>
            <li><strong>Ang pangalan ko ay [name]</strong> - My name is [name]</li>
            <li><strong>Ikinagagalak kitang makilala</strong> - Nice to meet you</li>
          </ul>
        `,
        },
        {
          id: 3,
          title: "Practice Dialogue",
          content: `
          <p>Here's a simple dialogue using the greetings and introductions you've learned:</p>
          <div class="bg-gray-50 p-4 rounded-md my-4">
            <p><strong>Person A:</strong> Magandang umaga! Kumusta ka?</p>
            <p><strong>Person B:</strong> Magandang umaga! Mabuti naman, salamat. Ikaw?</p>
            <p><strong>Person A:</strong> Mabuti rin. Ako si Maria. Ikaw, ano ang pangalan mo?</p>
            <p><strong>Person B:</strong> Ako si Juan. Ikinagagalak kitang makilala.</p>
            <p><strong>Person A:</strong> Ikinagagalak din kitang makilala.</p>
          </div>
        `,
        },
      ],
      vocabulary: [
        { word: "magandang umaga", translation: "good morning" },
        { word: "magandang hapon", translation: "good afternoon" },
        { word: "magandang gabi", translation: "good evening" },
        { word: "kumusta", translation: "how are you" },
        { word: "mabuti naman", translation: "I'm fine" },
        { word: "ako si", translation: "I am" },
        { word: "pangalan", translation: "name" },
        { word: "ikinagagalak", translation: "pleased/happy" },
        { word: "makilala", translation: "to meet" },
        { word: "salamat", translation: "thank you" },
      ],
      exercises: [
        {
          id: 1,
          type: "multiple-choice",
          question: 'How do you say "Good morning" in Tagalog?',
          options: ["Magandang gabi", "Magandang hapon", "Magandang umaga", "Kumusta ka"],
          correctAnswer: 2,
        },
        {
          id: 2,
          type: "multiple-choice",
          question: 'Which phrase means "My name is"?',
          options: ["Ako si", "Kumusta ka", "Ang pangalan ko ay", "Ikinagagalak kitang makilala"],
          correctAnswer: 2,
        },
        {
          id: 3,
          type: "fill-in-blank",
          question: 'To ask someone how they are, you say: "_____ ka?"',
          correctAnswer: "Kumusta",
        },
      ],
    },
  ]
  return lessons.find((lesson) => lesson.id === id)
}

export default function LessonPage({ params }: { params: { id: string } }) {
  const lessonId = Number.parseInt(params.id)
  const lesson = getLessonById(lessonId)

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link href="/lessons" className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Lessons
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-gray-900">
            Lesson {lessonId}: {lesson.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">{lesson.content}</div>
          <div className="mt-6">
            <Progress value={0} className="h-2" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="md:col-span-2 space-y-8">
              {lesson.sections &&
                lesson.sections.map((section) => (
                  <Card key={section.id} className="p-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">{section.title}</h2>
                    <div dangerouslySetInnerHTML={{ __html: section.content }} className="prose max-w-none" />
                  </Card>
                ))}
              <Card className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Exercises</h2>
                <div className="space-y-6">
                  {lesson.exercises &&
                    lesson.exercises.map((exercise) => (
                      <div key={exercise.id} className="border rounded-md p-4">
                        <p className="font-medium mb-4">{exercise.question}</p>

                        {exercise.type === "multiple-choice" && (
                          <div className="space-y-2">
                            {exercise.options.map((option, index) => (
                              <label
                                key={index}
                                className="flex items-center space-x-2 p-2 border rounded-md hover:bg-gray-50 cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  name={`exercise-${exercise.id}`}
                                  className="h-4 w-4 text-indigo-600"
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {exercise.type === "fill-in-blank" && (
                          <div>
                            <input
                              type="text"
                              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Type your answer here"
                            />
                          </div>
                        )}

                        <div className="mt-4">
                          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                            Check Answer
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
            <div className="space-y-8">
              <Card className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Vocabulary</h2>
                <div className="space-y-4">
                  {lesson.vocabulary &&
                    lesson.vocabulary.map((item, index) => (
                      <div key={index} className="border-b pb-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-indigo-600">{item.word}</p>
                            <p className="text-gray-600 text-sm">{item.translation}</p>
                          </div>
                          <AudioPlayer word={item.word.replace(/\s+/g, "-")} />
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

