// This file represents the database schema for the content approval system
// In a real application, this would be implemented with Prisma, TypeORM, or another ORM

export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "contributor" | "user"
  createdAt: Date
  updatedAt: Date
}

export interface ContentBase {
  id: string
  title: string
  description: string
  createdById: string
  createdAt: Date
  updatedAt: Date
  status: "draft" | "pending" | "approved" | "rejected"
  publishedAt?: Date
  rejectedAt?: Date
  rejectionReason?: string
  reviewedById?: string
  reviewedAt?: Date
  views: number
}

export interface GrammarLesson extends ContentBase {
  sections: GrammarSection[]
  level: "beginner" | "intermediate" | "advanced"
  tags: string[]
}

export interface GrammarSection {
  id: string
  grammarLessonId: string
  title: string
  content: string
  order: number
}

export interface Lesson extends ContentBase {
  sections: LessonSection[]
  vocabulary: LessonVocabulary[]
  exercises: LessonExercise[]
  level: "beginner" | "intermediate" | "advanced"
  estimatedDuration: number // in minutes
  tags: string[]
}

export interface LessonSection {
  id: string
  lessonId: string
  title: string
  content: string
  order: number
}

export interface LessonVocabulary {
  id: string
  lessonId: string
  word: string
  translation: string
  example?: string
  exampleTranslation?: string
}

export interface LessonExercise {
  id: string
  lessonId: string
  type: "multiple-choice" | "fill-in-blank" | "matching"
  question: string
  options?: string[]
  correctAnswer: string | number
  explanation?: string
}

export interface VocabularyList extends ContentBase {
  category: string
  words: VocabularyWord[]
  tags: string[]
}

export interface VocabularyWord {
  id: string
  vocabularyListId: string
  word: string
  translation: string
  partOfSpeech: string
  example?: string
  exampleTranslation?: string
  audioUrl?: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "approval" | "rejection" | "system" | "comment"
  read: boolean
  contentId?: string
  contentType?: "grammar" | "lesson" | "vocabulary"
  createdAt: Date
}

export interface ContentRevision {
  id: string
  contentId: string
  contentType: "grammar" | "lesson" | "vocabulary"
  revisionNumber: number
  changes: string // JSON string of changes
  createdById: string
  createdAt: Date
  comments?: string
}

export interface ContentComment {
  id: string
  contentId: string
  contentType: "grammar" | "lesson" | "vocabulary"
  userId: string
  comment: string
  createdAt: Date
  updatedAt: Date
  isAdminComment: boolean
}

