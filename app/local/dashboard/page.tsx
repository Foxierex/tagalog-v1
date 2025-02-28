"use client"

import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus, BookOpen, Book, Bookmark, ClipboardList } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function LocalDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [pendingReviews, setPendingReviews] = useState(3)
  const [contributedContent, setContributedContent] = useState(7)
  const [notifications, setNotifications] = useState([])
  const { toast } = useToast()

  useEffect(() => {
    if (user && user.role !== "local") {
      router.push("/unauthorized")
    }
    fetchNotifications()
  }, [user, user.role, router]) // Added dependencies for user, user.role, and router

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/notifications")
      const data = await res.json()
      if (data.notifications) {
        setNotifications(data.notifications)
      } else {
        setNotifications([])
      }
    } catch (error) {
      console.error("Error fetching notifications:", error)
      toast({
        title: "Error",
        description: "Failed to fetch notifications. Please try again.",
        variant: "destructive",
      })
      setNotifications([])
    }
  }

  if (!user || user.role !== "local") {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Local Contributor Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pending Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-blue-600 mb-2">{pendingReviews}</p>
            <p>Content items waiting for your review</p>
            <Button className="mt-4" asChild>
              <Link href="/local/reviews">Review Content</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Contributions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold text-green-600 mb-2">{contributedContent}</p>
            <p>Pieces of content you've contributed</p>
            <Button className="mt-4" asChild>
              <Link href="/local/contributions">View Contributions</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Create New Content</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full justify-start" asChild>
                <Link href="/local/create/vocabulary">
                  <Plus className="mr-2 h-4 w-4" /> Create Vocabulary
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/local/create/grammar">
                  <Plus className="mr-2 h-4 w-4" /> Create Grammar
                </Link>
              </Button>
              <Button className="w-full justify-start" asChild>
                <Link href="/local/create/lesson">
                  <Plus className="mr-2 h-4 w-4" /> Create Lesson
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4 text-blue-500" />
                <span>Created new vocabulary: "Pamilya" (Family)</span>
              </li>
              <li className="flex items-center">
                <Book className="mr-2 h-4 w-4 text-green-500" />
                <span>Updated grammar lesson: "Verb Conjugation"</span>
              </li>
              <li className="flex items-center">
                <Bookmark className="mr-2 h-4 w-4 text-yellow-500" />
                <span>Submitted lesson for review: "Greetings and Introductions"</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center">
                <ClipboardList className="mr-2 h-4 w-4 text-purple-500" />
                <span>Review and update "Common Phrases" lesson</span>
              </li>
              <li className="flex items-center">
                <ClipboardList className="mr-2 h-4 w-4 text-purple-500" />
                <span>Create new vocabulary list for "Weather Terms"</span>
              </li>
              <li className="flex items-center">
                <ClipboardList className="mr-2 h-4 w-4 text-purple-500" />
                <span>Proofread grammar explanation for "Adjectives"</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <p>No new notifications.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((notification) => (
                <li key={notification.id} className="p-2 bg-gray-100 rounded-md">
                  <p>{notification.message}</p>
                  <p className="text-xs text-gray-500">{new Date(notification.created_at).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

