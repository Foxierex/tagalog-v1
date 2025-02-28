"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, Save, AlertCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ContentStatusBadge from "@/components/content-status-badge"

export default function CreateVocabularyPage() {
  const router = useRouter()
  const { toast } = useToast()

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [words, setWords] = useState([
    { word: "", translation: "", partOfSpeech: "", example: "", exampleTranslation: "" },
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const addWord = () => {
    setWords([...words, { word: "", translation: "", partOfSpeech: "", example: "", exampleTranslation: "" }])
  }

  const removeWord = (index: number) => {
    const newWords = [...words]
    newWords.splice(index, 1)
    setWords(newWords)
  }

  const updateWord = (index: number, field: string, value: string) => {
    const newWords = [...words]
    newWords[index] = { ...newWords[index], [field]: value }
    setWords(newWords)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // In a real app, this would be an API call to submit the vocabulary
      // await fetch('/api/vocabulary', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ title, description, category, words }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "Vocabulary submitted for review",
        description: "Your vocabulary list has been submitted and is pending approval.",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("Error submitting vocabulary:", error)
      toast({
        title: "Error submitting vocabulary",
        description: "There was an error submitting your vocabulary. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = async () => {
    try {
      // In a real app, this would be an API call to save the draft
      // await fetch('/api/vocabulary/draft', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ title, description, category, words }),
      // })

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      toast({
        title: "Draft saved",
        description: "Your vocabulary draft has been saved.",
      })
    } catch (error) {
      console.error("Error saving draft:", error)
      toast({
        title: "Error saving draft",
        description: "There was an error saving your draft. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Create Vocabulary List</h1>
          <p className="text-gray-600">Add new vocabulary words to the platform</p>
        </div>
        <ContentStatusBadge status="draft" />
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-6 flex items-start">
        <AlertCircle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5" />
        <div>
          <h3 className="font-medium text-yellow-800">Content Approval Required</h3>
          <p className="text-yellow-700 text-sm">
            Your vocabulary list will be reviewed by an administrator before being published on the platform. You'll
            receive a notification once it's approved or if any changes are needed.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Vocabulary List Details</CardTitle>
            <CardDescription>Provide general information about this vocabulary list</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Family Relations Vocabulary"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe this vocabulary list and its purpose"
                required
              />
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily-life">Daily Life</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="travel">Travel</SelectItem>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="emotions">Emotions</SelectItem>
                  <SelectItem value="nature">Nature</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Vocabulary Words</CardTitle>
            <CardDescription>Add words, translations, and examples</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {words.map((word, index) => (
              <div key={index} className="p-4 border rounded-md bg-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-medium">Word {index + 1}</h3>
                  {words.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeWord(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tagalog Word</label>
                    <Input
                      value={word.word}
                      onChange={(e) => updateWord(index, "word", e.target.value)}
                      placeholder="e.g., pamilya"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">English Translation</label>
                    <Input
                      value={word.translation}
                      onChange={(e) => updateWord(index, "translation", e.target.value)}
                      placeholder="e.g., family"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Part of Speech</label>
                  <Select
                    value={word.partOfSpeech}
                    onValueChange={(value) => updateWord(index, "partOfSpeech", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select part of speech" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="noun">Noun (Pangngalan)</SelectItem>
                      <SelectItem value="verb">Verb (Pandiwa)</SelectItem>
                      <SelectItem value="adjective">Adjective (Pang-uri)</SelectItem>
                      <SelectItem value="adverb">Adverb (Pang-abay)</SelectItem>
                      <SelectItem value="pronoun">Pronoun (Panghalip)</SelectItem>
                      <SelectItem value="preposition">Preposition (Pang-ukol)</SelectItem>
                      <SelectItem value="conjunction">Conjunction (Pangatnig)</SelectItem>
                      <SelectItem value="interjection">Interjection (Padamdam)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Example Sentence (Tagalog)</label>
                    <Input
                      value={word.example}
                      onChange={(e) => updateWord(index, "example", e.target.value)}
                      placeholder="e.g., Mahalaga ang pamilya sa akin."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Example Translation</label>
                    <Input
                      value={word.exampleTranslation}
                      onChange={(e) => updateWord(index, "exampleTranslation", e.target.value)}
                      placeholder="e.g., Family is important to me."
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button type="button" variant="outline" onClick={addWord} className="w-full">
              <Plus className="h-4 w-4 mr-2" /> Add Another Word
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={handleSaveDraft}>
            <Save className="h-4 w-4 mr-2" /> Save Draft
          </Button>
          <div className="space-x-2">
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

