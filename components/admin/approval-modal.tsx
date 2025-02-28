"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { formatDistanceToNow } from "date-fns"

interface ApprovalModalProps {
  content: any
  onClose: () => void
  onApprove: (content: any, comments: string) => void
  onReject: (content: any, comments: string) => void
}

export default function ApprovalModal({ content, onClose, onApprove, onReject }: ApprovalModalProps) {
  const [comments, setComments] = useState("")
  const [activeTab, setActiveTab] = useState("preview")

  // Mock content details based on content type
  const getContentDetails = () => {
    if (content.type === "grammar") {
      return {
        title: content.title,
        description:
          "This grammar lesson explains how to use MAG verbs in Tagalog, including conjugation patterns and examples.",
        sections: [
          {
            title: "Introduction to MAG Verbs",
            content:
              "MAG verbs are one of the most common verb types in Tagalog. They typically indicate actions performed by the subject.",
          },
          {
            title: "Conjugation Patterns",
            content: "Present tense: nag- + root\nPast tense: nag- + root\nFuture tense: mag- + root",
          },
          {
            title: "Examples",
            content:
              "Magluto (to cook)\nNagluto ako ng pagkain. (I cooked food.)\nNagluluto ako ng pagkain. (I am cooking food.)\nMagluluto ako ng pagkain. (I will cook food.)",
          },
        ],
      }
    } else if (content.type === "lesson") {
      return {
        title: content.title,
        description: "This lesson teaches practical Tagalog phrases for shopping at local markets in the Philippines.",
        sections: [
          {
            title: "Essential Vocabulary",
            content: "palengke - market\npresyo - price\nmahal - expensive\nmura - cheap\ntinda - goods for sale",
          },
          {
            title: "Useful Phrases",
            content:
              "Magkano ito? - How much is this?\nMahal naman! - That's expensive!\nPwede bang tumawad? - Can I haggle?",
          },
          {
            title: "Practice Dialogue",
            content:
              "Buyer: Magkano ang isang kilo ng mangga?\nSeller: 80 pesos po.\nBuyer: Pwede bang 70 na lang?\nSeller: Sige po, 70 na lang.",
          },
        ],
      }
    } else {
      return {
        title: content.title,
        description: "A collection of Tagalog vocabulary terms related to family relations.",
        words: [
          { word: "magulang", translation: "parents", example: "Mahal ko ang aking mga magulang." },
          { word: "anak", translation: "child", example: "Siya ay anak ng aking kapatid." },
          { word: "kapatid", translation: "sibling", example: "May dalawang kapatid ako." },
          { word: "pinsan", translation: "cousin", example: "Ang pinsan ko ay nakatira sa Maynila." },
          { word: "tito/tita", translation: "uncle/aunt", example: "Bumisita ang aking tito at tita kahapon." },
        ],
      }
    }
  }

  const contentDetails = getContentDetails()

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center justify-between">
            <span>Review Content: {content.title}</span>
            <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700 border-yellow-200">
              Pending Approval
            </Badge>
          </DialogTitle>
          <div className="text-sm text-gray-500 mt-1">
            Submitted by {content.submittedBy} • {formatDistanceToNow(content.submittedAt)} ago
          </div>
        </DialogHeader>

        <Tabs defaultValue="preview" value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList>
            <TabsTrigger value="preview">Preview Content</TabsTrigger>
            <TabsTrigger value="review">Review & Comment</TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="mt-4">
            <div className="border rounded-md p-6 bg-white">
              <h2 className="text-2xl font-bold mb-2">{contentDetails.title}</h2>
              <p className="text-gray-600 mb-6">{contentDetails.description}</p>

              {content.type === "vocabulary" ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Vocabulary Words</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {contentDetails.words.map((word: any, index: number) => (
                      <div key={index} className="border rounded-md p-3">
                        <div className="font-medium">{word.word}</div>
                        <div className="text-gray-600">{word.translation}</div>
                        <div className="text-sm text-gray-500 italic mt-1">{word.example}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {contentDetails.sections.map((section: any, index: number) => (
                    <div key={index}>
                      <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                      <div className="whitespace-pre-line">{section.content}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="review" className="mt-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Admin Comments</h3>
                <Textarea
                  placeholder="Add your comments, suggestions, or reasons for approval/rejection..."
                  className="min-h-[150px]"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <div className="border rounded-md p-4 bg-gray-50">
                <h3 className="text-sm font-medium mb-2">Content Quality Checklist</h3>
                <div className="space-y-2">
                  {[
                    "Content is accurate and factually correct",
                    "Grammar and spelling are correct",
                    "Content is appropriate for the target audience",
                    "Content follows platform guidelines",
                    "Examples are clear and helpful",
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <input type="checkbox" id={`check-${index}`} className="mr-2" />
                      <label htmlFor={`check-${index}`} className="text-sm">
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex justify-between items-center mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            <Button
              variant="destructive"
              onClick={() => onReject(content, comments)}
              disabled={activeTab === "review" && comments.trim() === ""}
            >
              Reject
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => onApprove(content, comments)}>
              Approve
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

