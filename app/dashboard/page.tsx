"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState(false)
  const { language } = useLanguage()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/sign-in")
      } else {
        setIsAdmin(user.role === "admin")
      }
    }
  }, [user, loading, router])

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">
        {language === "zh-TW" ? `欢迎，${user.email}` : `Welcome, ${user.email}`}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="neubrutalism-card">
          <CardHeader>
            <CardTitle className="text-blue-900">{language === "zh-TW" ? "您的进度" : "Your Progress"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              {language === "zh-TW" ? "在这里跟踪您的学习进度。" : "Track your learning progress here."}
            </p>
            <Button className="neubrutalism-button">{language === "zh-TW" ? "查看进度" : "View Progress"}</Button>
          </CardContent>
        </Card>

        <Card className="neubrutalism-card">
          <CardHeader>
            <CardTitle className="text-blue-900">{language === "zh-TW" ? "最新课程" : "Latest Lessons"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              {language === "zh-TW" ? "查看我们最新的塔加洛语课程。" : "Check out our newest Tagalog lessons."}
            </p>
            <Button className="neubrutalism-button">{language === "zh-TW" ? "开始学习" : "Start Learning"}</Button>
          </CardContent>
        </Card>

        <Card className="neubrutalism-card">
          <CardHeader>
            <CardTitle className="text-blue-900">{language === "zh-TW" ? "练习练习" : "Practice Exercises"}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-4">
              {language === "zh-TW" ? "通过练习练习提高您的技能。" : "Improve your skills with practice exercises."}
            </p>
            <Button className="neubrutalism-button">{language === "zh-TW" ? "开始练习" : "Start Practicing"}</Button>
          </CardContent>
        </Card>
      </div>

      {isAdmin && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-blue-900">
            {language === "zh-TW" ? "管理员操作" : "Admin Actions"}
          </h2>
          <Button asChild className="neubrutalism-button">
            <Link href="/admin/dashboard">{language === "zh-TW" ? "转到管理员仪表板" : "Go to Admin Dashboard"}</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  return <DashboardPage />
}

