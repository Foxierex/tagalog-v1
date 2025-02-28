"use client"

import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/hooks/use-language"

// This would come from your API/database in a real application
const lessonSections = [
  {
    id: 1,
    title: "Everyday Interactions",
    lessons: [
      {
        id: 1,
        title: "Greetings and Introductions",
        description: "Learn basic greetings and how to introduce yourself.",
        slug: "greetings-and-introductions",
      },
      {
        id: 2,
        title: "Ordering Food",
        description: "Practice ordering food and using common restaurant phrases.",
        slug: "ordering-food",
      },
      {
        id: 3,
        title: "Asking for Directions",
        description: "Learn how to ask for and understand directions.",
        slug: "asking-for-directions",
      },
      {
        id: 4,
        title: "Shopping at the Market",
        description: "Practice bargaining and buying items at a local market.",
        slug: "shopping-at-the-market",
      },
      {
        id: 5,
        title: "Talking About Family",
        description: "Learn vocabulary for family members and how to describe your family.",
        slug: "talking-about-family",
      },
    ],
  },
  // Additional sections would be added here
]

export default function LessonsPage() {
  const [expandedSections, setExpandedSections] = useState<number[]>([1])
  const { language } = useLanguage()

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  return (
    <div className="min-h-screen bg-blue-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-4">
          {language === "zh-TW" ? "塔加洛语课程：通过日常话题学习" : "Tagalog Lessons: Learn Through Everyday Topics"}
        </h1>
        <p className="text-center text-blue-700 max-w-3xl mx-auto mb-12">
          {language === "zh-TW"
            ? "本页提供实用的塔加洛语课程，专注于日常话题。每节课结合词汇、语法和真实对话，帮助您在语境中学习塔加洛语。"
            : "This page offers practical Tagalog lessons, focusing on everyday topics. Each lesson combines vocabulary, grammar, and real-life dialogues to help you learn Tagalog in context."}
        </p>

        <div className="space-y-8">
          {lessonSections.map((section) => (
            <div key={section.id} className="neubrutalism-card overflow-hidden transition-all duration-300 ease-in-out">
              <div className="p-6">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <h2 className="text-2xl font-bold text-blue-900">
                    {language === "zh-TW" ? "部分 " : "Section "}
                    {section.id}: {section.title}
                  </h2>
                  <ChevronDown
                    className={`h-6 w-6 text-blue-700 transition-transform duration-300 ${
                      expandedSections.includes(section.id) ? "transform rotate-180" : ""
                    }`}
                  />
                </div>

                {expandedSections.includes(section.id) && (
                  <div className="mt-6 space-y-4">
                    {section.lessons.map((lesson) => (
                      <Link
                        key={lesson.id}
                        href={`/lessons/${lesson.slug}`}
                        className="block neubrutalism-card p-4 transition-all duration-300 ease-in-out hover:bg-blue-100"
                      >
                        <h3 className="text-lg font-medium text-blue-900 mb-2">
                          {lesson.id}. {lesson.title}
                        </h3>
                        <p className="text-blue-700">{lesson.description}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

