"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Trash2 } from "lucide-react"

export default function CreateVocabularyPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [words, setWords] = useState([{ tagalog: "", english: "", partOfSpeech: "", example: "" }])

  const handleAddWord = () => {
    setWords([...words, { tagalog: "", english: "", partOfSpeech: "", example: "" }])
  }

  const handleRemoveWord = (index: number) => {
    const newWords = words.filter((_, i) => i !== index)
    setWords(newWords)
  }

  const handleWordChange = (index: number, field: string, value: string) => {
    const newWords = [...words]
    newWords[index][field] = value
    setWords(newWords)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ title, description, words })
    toast({
      title: "Vocabulary submitted for review",
      description: "Your vocabulary list has been sent to admins for approval.",
    })
    router.push("/local/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Vocabulary List</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vocabulary List Details</CardTitle>
            <CardDescription>Provide general information about this vocabulary list</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Family Members"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Briefly describe this vocabulary list"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Words</CardTitle>
            <CardDescription>Add words to your vocabulary list</CardDescription>
          </CardHeader>
          <CardContent>
            {words.map((word, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="grid grid-cols-2 gap-4 mb-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Tagalog Word</label>
                    <Input
                      value={word.tagalog}
                      onChange={(e) => handleWordChange(index, "tagalog", e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">English Translation</label>
                    <Input
                      value={word.english}
                      onChange={(e) => handleWordChange(index, "english", e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Part of Speech</label>
                  <Input
                    value={word.partOfSpeech}
                    onChange={(e) => handleWordChange(index, "partOfSpeech", e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Example Sentence</label>
                  <Input value={word.example} onChange={(e) => handleWordChange(index, "example", e.target.value)} />
                </div>
                {words.length > 1 && (
                  <Button type="button" variant="destructive" onClick={() => handleRemoveWord(index)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Remove Word
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={handleAddWord}>
              <Plus className="mr-2 h-4 w-4" /> Add Word
            </Button>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.push("/local/dashboard")}>
            Cancel
          </Button>
          <Button type="submit">Submit for Review</Button>
        </div>
      </form>
    </div>
  )
}

