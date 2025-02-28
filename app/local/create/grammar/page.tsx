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

export default function CreateGrammarPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [sections, setSections] = useState([{ title: "", content: "" }])

  const handleAddSection = () => {
    setSections([...sections, { title: "", content: "" }])
  }

  const handleRemoveSection = (index: number) => {
    const newSections = sections.filter((_, i) => i !== index)
    setSections(newSections)
  }

  const handleSectionChange = (index: number, field: string, value: string) => {
    const newSections = [...sections]
    newSections[index][field] = value
    setSections(newSections)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log({ title, description, sections })
    toast({
      title: "Grammar lesson submitted for review",
      description: "Your grammar lesson has been sent to admins for approval.",
    })
    router.push("/local/dashboard")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Create New Grammar Lesson</h1>
      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Grammar Lesson Details</CardTitle>
            <CardDescription>Provide general information about this grammar lesson</CardDescription>
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
                  placeholder="e.g., Verb Conjugation in Present Tense"
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
                  placeholder="Briefly describe this grammar lesson"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Lesson Sections</CardTitle>
            <CardDescription>Add sections to your grammar lesson</CardDescription>
          </CardHeader>
          <CardContent>
            {sections.map((section, index) => (
              <div key={index} className="mb-4 p-4 border rounded">
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Section Title</label>
                  <Input
                    value={section.title}
                    onChange={(e) => handleSectionChange(index, "title", e.target.value)}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">Section Content</label>
                  <Textarea
                    value={section.content}
                    onChange={(e) => handleSectionChange(index, "content", e.target.value)}
                    placeholder="Enter the content for this section"
                    required
                  />
                </div>
                {sections.length > 1 && (
                  <Button type="button" variant="destructive" onClick={() => handleRemoveSection(index)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Remove Section
                  </Button>
                )}
              </div>
            ))}
            <Button type="button" onClick={handleAddSection}>
              <Plus className="mr-2 h-4 w-4" /> Add Section
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

