"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

// This would come from your API/database in a real application
const getLessonBySlug = (slug: string) => {
  // Mock data for demonstration
  return {
    id: 1,
    title: "Greetings and Introductions",
    description: "Learn basic greetings and how to introduce yourself in Tagalog.",
    sections: [
      {
        id: 1,
        title: "Lesson Objectives",
        content: `
          <ul>
            <li>Learn common Tagalog greetings for different times of day</li>
            <li>Understand how to introduce yourself in Tagalog</li>
            <li>Practice basic conversation patterns for introductions</li>
          </ul>
        `,
      },
      {
        id: 2,
        title: "Vocabulary",
        content: `
          <ul>
            <li><strong>Magandang umaga</strong> - Good morning</li>
            <li><strong>Magandang hapon</strong> - Good afternoon</li>
            <li><strong>Magandang gabi</strong> - Good evening</li>
            <li><strong>Kumusta?</strong> - How are you?</li>
            <li><strong>Ako si</strong> - I am</li>
            <li><strong>Ang pangalan ko ay</strong> - My name is</li>
          </ul>
        `,
      },
      {
        id: 3,
        title: "Grammar Points",
        content: `
          <p>In Tagalog, personal pronouns change form based on their role in the sentence:</p>
          <ul>
            <li><strong>Ako</strong> - I (subject)</li>
            <li><strong>Ko</strong> - My (possessive)</li>
            <li><strong>Akin</strong> - Mine (possessive pronoun)</li>
          </ul>
        `,
      },
      {
        id: 4,
        title: "Practice Dialogue",
        content: `
          <div class="bg-blue-100 p-4 rounded-md my-4 border-2 border-blue-900">
            <p><strong>Person A:</strong> Magandang umaga! Kumusta ka?</p>
            <p><strong>Person B:</strong> Magandang umaga! Mabuti naman, salamat. Ikaw?</p>
            <p><strong>Person A:</strong> Mabuti rin. Ako si Maria. Ikaw, ano ang pangalan mo?</p>
            <p><strong>Person B:</strong> Ako si Juan. Ikinagagalak kitang makilala.</p>
            <p><strong>Person A:</strong> Ikinagagalak din kitang makilala.</p>
          </div>
        `,
      },
      {
        id: 5,
        title: "Cultural Notes",
        content: `
          <p>In Filipino culture, it's common to use "po" or "ho" when speaking to elders or people in authority as a sign of respect. For example:</p>
          <ul>
            <li><strong>Magandang umaga po</strong> - Good morning (respectful form)</li>
            <li><strong>Kumusta po kayo?</strong> - How are you? (respectful form)</li>
          </ul>
        `,
      },
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
        type: "fill-in-blank",
        question: 'To introduce yourself, you can say: "_____ si [your name]".',
        correctAnswer: "Ako",
      },
    ],
  }
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLessonBySlug(params.slug)
  const { language } = useLanguage()

  if (!lesson) {
    return <div>Lesson not found</div>
  }

  return (
    <div className="bg-blue-50 min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/lessons" className="inline-flex items-center text-blue-700 hover:text-blue-900 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          {language === "zh-TW" ? "返回课程" : "Back to Lessons"}
        </Link>

        <div className="neubrutalism-card mb-8">
          <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-900 mb-4">
              {language === "zh-TW" ? "课程 " : "Lesson "}{lesson.id}: {lesson.title}
            </h1>
            <p className="text-blue-700 mb-6">{lesson.description}</p>

            <div className="space-y-8">
              {lesson.sections.map((section) => (
                <div key={section.id} className="border-t pt-6 first:border-t-0 first:pt-0 border-blue-200">
                  <h2 className="text-xl font-semibold text-blue-900 mb-4">
                    {section.id}. {section.title}
                  </h2>
                  <div dangerouslySetInnerHTML={{ __html: section.content }} className="prose max-w-none text-blue-700" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="neubrutalism-card">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-blue-900 mb-6">
              {language === "zh-TW" ? "练习" : "Exercises"}
            </h2>
            <div className="space-y-6">
              {lesson.exercises.map((exercise) => (
                <div key={exercise.id} className="neubrutalism-card p-4">
                  <p className="font-medium text-blue-900 mb-4">{exercise.question}</p>
                  {exercise.type === "multiple-choice" && (
                    <div className="space-y-2">
                      {exercise.options.map((option, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-2 p-2 border-2 border-blue-900 rounded-md hover:bg-blue-100 cursor-pointer"
                        >
                          <input type="radio" name={`exercise-${exercise.id}`} className="h-4 w-4 text-blue-700" />
                          <span className="text-blue-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  ))}\
                  {exercise.type === "fill-in-blank" && (
                    <input
                      type="text"
                      className="w-full p-2 neubrutalism-input"
                      placeholder={language === "zh-TW" ? "在此输入答案" : "Type your answer here"}
                    />
                  )}
                  <button className="mt-4 neubrutalism-button">
                    {language === "zh-TW" ? "检查答案" : "Check Answer"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

