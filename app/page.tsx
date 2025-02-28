"use client"

import Link from "next/link"
import { ArrowRight, BookOpen, MessageCircle, Database, Languages } from "lucide-react"
import { motion } from "framer-motion"
import VocabularySearch from "@/components/vocabulary-search"

export default function Home() {
  return (
    <div className="bg-blue-50 min-h-screen">
      {/* Hero Section */}
      <section className="pt-20 pb-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl font-bold text-blue-900 mb-4 max-w-4xl mx-auto px-4">
            Maligayang Pagdating! Welcome to Your Tagalog Learning Journey
          </h1>
          <p className="text-lg text-blue-700 max-w-2xl mx-auto px-4">
            Master Tagalog through structured lessons, interactive exercises, and practical vocabulary. Your path to
            Filipino fluency starts here.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto mt-8 px-4">
            <VocabularySearch />
          </div>

          {/* CTA Button */}
          <div className="mt-8">
            <Link href="/lessons" className="neubrutalism-button inline-flex items-center">
              Start Learning Now <ArrowRight className="ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Main Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Grammar",
                description: "Master Tagalog grammar structures through comprehensive lessons and exercises.",
                link: "/grammar",
                count: 100,
              },
              {
                title: "Lessons",
                description: "Practical conversation lessons for real-world situations and daily interactions.",
                link: "/lessons",
                count: 50,
              },
              {
                title: "Vocabulary",
                description: "Essential Tagalog vocabulary with pronunciations and example sentences.",
                link: "/vocabulary",
                count: 1000,
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="neubrutalism-card p-6 h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h2 className="text-xl font-bold text-blue-900">{category.title}</h2>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded border-2 border-blue-900">
                      {category.count}+ {category.title === "Vocabulary" ? "Words" : "Lessons"}
                    </span>
                  </div>
                  <p className="text-blue-700 mb-4">{category.description}</p>

                  <Link href={category.link} className="learn-more">
                    Learn More <ArrowRight className="inline-block" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">Latest Content</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                type: "Grammar",
                title: "Making Requests Politely",
                description: "Learn how to make polite requests using proper Tagalog grammar structures...",
                link: "/grammar/making-requests-politely",
              },
              {
                type: "Lessons",
                title: "Expressing Opinions",
                description: "Master the art of expressing your thoughts and opinions in Tagalog...",
                link: "/lessons/expressing-opinions",
              },
              {
                type: "Vocabulary",
                title: "Kain (Eat)",
                description: "Definition: To take food; Usage examples and common phrases...",
                link: "/vocabulary/kain",
              },
            ].map((content, index) => (
              <motion.div
                key={content.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="neubrutalism-card p-6 h-full">
                  <div className="text-xs text-blue-600 font-medium uppercase mb-2">{content.type}</div>
                  <h3 className="text-lg font-bold text-blue-900 mb-2">{content.title}</h3>
                  <p className="text-blue-700 mb-4">{content.description}</p>
                  <Link href={content.link} className="learn-more">
                    View Full {content.type === "Vocabulary" ? "Entry" : "Lesson"}{" "}
                    <ArrowRight className="inline-block" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Key Features</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              {
                icon: <BookOpen className="h-8 w-8" />,
                title: "Structured Lessons",
                description: "Progressive learning path from basics to advanced",
              },
              {
                icon: <MessageCircle className="h-8 w-8" />,
                title: "Practical Learning",
                description: "Real-world conversation scenarios",
              },
              {
                icon: <Database className="h-8 w-8" />,
                title: "Rich Vocabulary",
                description: "Comprehensive word database with audio",
              },
              {
                icon: <Languages className="h-8 w-8" />,
                title: "Translations",
                description: "English and Chinese translations available",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="neubrutalism-card p-6 h-full">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="text-lg font-medium text-blue-900 mb-2">{feature.title}</h3>
                  <p className="text-blue-700 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

