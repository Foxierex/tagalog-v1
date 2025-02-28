"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, ChevronRight } from "lucide-react"
import { useLanguage } from "@/hooks/use-language"

// Grammar sections data
const grammarSections = [
  {
    id: 1,
    title: "Word Formation and Basic Structures",
    lessons: [
      {
        id: 1,
        title: "Introduction to Tagalog Roots and Affixes",
        description: "Learn the fundamental building blocks of Tagalog words and how they combine to create meaning.",
      },
      {
        id: 2,
        title: "Sound Changes in Word Formation",
        description: "Understand how sounds change when different word parts come together in Tagalog.",
      },
      {
        id: 3,
        title: "Basic Word Patterns",
        description: "Explore common patterns in Tagalog word formation and their usage.",
      },
    ],
    lessonRange: "Lessons 1-15",
  },
  {
    id: 2,
    title: "Basic Sentences",
    lessons: [
      {
        id: 4,
        title: "Simple Sentence Structure",
        description: "Learn how to form basic sentences in Tagalog.",
      },
      {
        id: 5,
        title: "Subject and Predicate",
        description: "Understand the relationship between subjects and predicates in Tagalog sentences.",
      },
      {
        id: 6,
        title: "Word Order",
        description: "Explore the flexible word order in Tagalog sentences.",
      },
    ],
    lessonRange: "Lessons 16-30",
  },
  {
    id: 3,
    title: "Verb Conjugation",
    lessons: [
      {
        id: 7,
        title: "Introduction to Tagalog Verbs",
        description: "Learn about the different types of verbs in Tagalog.",
        isLocked: true,
        progress: 0,
      },
      {
        id: 8,
        title: "Actor Focus Verbs",
        description: "Understand how to conjugate actor focus verbs in Tagalog.",
        isLocked: true,
        progress: 0,
      },
      {
        id: 9,
        title: "Object Focus Verbs",
        description: "Explore object focus verb conjugations in Tagalog.",
        isLocked: true,
        progress: 0,
      },
    ],
    lessonRange: "Lessons 31-45",
  },
  {
    id: 4,
    title: "Pronouns",
    lessons: [
      {
        id: 10,
        title: "Personal Pronouns",
        description: "Learn about personal pronouns in Tagalog.",
        isLocked: true,
        progress: 0,
      },
      {
        id: 11,
        title: "Demonstrative Pronouns",
        description: "Understand how to use demonstrative pronouns in Tagalog.",
        isLocked: true,
        progress: 0,
      },
      {
        id: 12,
        title: "Interrogative Pronouns",
        description: "Explore question words and interrogative pronouns in Tagalog.",
        isLocked: true,
        progress: 0,
      },
    ],
    lessonRange: "Lessons 46-60",
  },
]

// Sidebar categories
const sidebarCategories = ["Word Formation", "Basic Sentences", "Verb Conjugation", "Pronouns"]

export default function GrammarPage() {
  const [expandedSections, setExpandedSections] = useState<number[]>([1])
  const [animatedLessons, setAnimatedLessons] = useState<number[]>([])
  const { language } = useLanguage()

  const toggleSection = (sectionId: number) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      const allLessonIds = grammarSections.flatMap((section) => section.lessons.map((lesson) => lesson.id))
      setAnimatedLessons(allLessonIds)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-blue-50 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-blue-900 text-center mb-4 animate-fade-in">
          {language === "zh-TW" ? "塔加洛语语法：结构化课程" : "Tagalog Grammar: Structured Lessons"}
        </h1>
        <p className="text-center text-blue-700 max-w-3xl mx-auto mb-12 animate-fade-in">
          {language === "zh-TW"
            ? "通过我们全面、结构化的方法掌握塔加洛语语法。每节课都建立在前一节的基础上，带您从基本概念到高级语言能力。"
            : "Master Tagalog grammar through our comprehensive, structured approach. Each lesson builds upon the previous, taking you from basic concepts to advanced language proficiency."}
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="neubrutalism-card p-4 sticky top-20">
              <h2 className="text-lg font-semibold text-blue-900 mb-4">
                {language === "zh-TW" ? "跳转到部分" : "Jump to Section"}
              </h2>
              <ul className="space-y-2">
                {grammarSections.map((section) => (
                  <li key={section.id}>
                    <Link
                      href={`#section-${section.id}`}
                      className="flex items-center text-blue-700 hover:text-blue-900 transition-colors"
                    >
                      <ChevronRight className="h-4 w-4 mr-2" />
                      <span>{section.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-8">
            {grammarSections.map((section) => (
              <div
                key={section.id}
                id={`section-${section.id}`}
                className="neubrutalism-card overflow-hidden transition-all duration-300 ease-in-out"
              >
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
                  <p className="text-sm text-blue-700 mt-2">{section.lessonRange}</p>

                  {expandedSections.includes(section.id) && (
                    <div className="mt-6 space-y-4">
                      {section.lessons.map((lesson) => (
                        <Link
                          key={lesson.id}
                          href={`/grammar/${lesson.id}`}
                          className={`block neubrutalism-card p-4 transition-all duration-500 ease-in-out hover:bg-blue-100 ${
                            animatedLessons.includes(lesson.id)
                              ? "opacity-100 translate-y-0"
                              : "opacity-0 translate-y-4"
                          }`}
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
    </div>
  )
}

