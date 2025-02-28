"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, CheckCircle, XCircle, AlertCircle, Eye, Edit, Check, X } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import ApprovalModal from "@/components/admin/approval-modal"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/hooks/use-language"

// Mock data - in a real app, this would come from your API
const initialPendingContent = {
  grammar: [
    {
      id: 1,
      title: "Verb Conjugation: MAG Verbs",
      submittedBy: "maria_santos",
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: "pending",
      type: "grammar",
    },
    {
      id: 2,
      title: "Adjective Formation with MA-",
      submittedBy: "juan_dela_cruz",
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      status: "pending",
      type: "grammar",
    },
  ],
  lessons: [
    {
      id: 1,
      title: "Shopping at the Market",
      submittedBy: "filipino_teacher",
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: "pending",
      type: "lesson",
    },
    {
      id: 2,
      title: "Asking for Directions",
      submittedBy: "tagalog_expert",
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      status: "pending",
      type: "lesson",
    },
  ],
  vocabulary: [
    {
      id: 1,
      title: "Family Relations Vocabulary",
      submittedBy: "language_lover",
      submittedAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: "pending",
      type: "vocabulary",
    },
    {
      id: 2,
      title: "Weather Terms",
      submittedBy: "manila_resident",
      submittedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      status: "pending",
      type: "vocabulary",
    },
  ],
}

// Recent activity mock data
const recentActivity = [
  {
    id: 1,
    action: "approved",
    contentTitle: "Basic Pronouns",
    contentType: "grammar",
    admin: "admin_user",
    timestamp: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
  },
  {
    id: 2,
    action: "rejected",
    contentTitle: "Food Vocabulary",
    contentType: "vocabulary",
    admin: "admin_user",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
  },
  {
    id: 3,
    action: "approved",
    contentTitle: "Greetings and Introductions",
    contentType: "lesson",
    admin: "super_admin",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
  },
]

function AdminDashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [pendingContent, setPendingContent] = useState([])
  const { toast } = useToast()
  const { language } = useLanguage()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.replace("/dashboard")
    }
    fetchPendingContent()
  }, [loading, user, router])

  const fetchPendingContent = async () => {
    const res = await fetch("/api/content/pending")
    const data = await res.json()
    setPendingContent(data.pendingContent)
  }

  const handleReviewContent = async (id: string, action: "approve" | "reject", feedback: string) => {
    try {
      const res = await fetch("/api/content/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, action, feedback }),
      })

      if (!res.ok) throw new Error("Failed to review content")

      toast({
        title: "Content reviewed",
        description: `The content has been ${action === "approve" ? "approved" : "rejected"}.`,
      })

      fetchPendingContent() // Refresh the pending content list
    } catch (error) {
      console.error("Error reviewing content:", error)
      toast({
        title: "Error",
        description: "Failed to review content. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const handleViewContent = (content: any) => {
    setSelectedContent(content)
    setIsModalOpen(true)
  }

  const handleApproveContent = async (content: any, comments: string) => {
    // In a real app, this would be an API call to update the content status
    console.log(`Approving ${content.type} with ID ${content.id}`, { comments })

    // Mock success response
    alert(`Content "${content.title}" has been approved`)
    setIsModalOpen(false)

    // In a real app, you would refresh the data here
  }

  const handleRejectContent = async (content: any, comments: string) => {
    // In a real app, this would be an API call to update the content status
    console.log(`Rejecting ${content.type} with ID ${content.id}`, { comments })

    // Mock success response
    alert(`Content "${content.title}" has been rejected`)
    setIsModalOpen(false)

    // In a real app, you would refresh the data here
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Clock className="h-3 w-3 mr-1" /> Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" /> Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" /> Rejected
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <AlertCircle className="h-3 w-3 mr-1" /> Unknown
          </Badge>
        )
    }
  }

  const getActionIcon = (action: string) => {
    switch (action) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-blue-900">
            {language === "zh-TW" ? "管理员仪表板" : "Admin Dashboard"}
          </h1>
          <p className="text-blue-700">
            {language === "zh-TW" ? "管理内容提交和批准" : "Manage content submissions and approvals"}
          </p>
        </div>
        <div>
          <p className="text-blue-700">
            {language === "zh-TW" ? `欢迎，管理员 ${user.email}！` : `Welcome, Admin ${user.email}!`}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card className="md:col-span-3 neubrutalism-card">
          <CardHeader>
            <CardTitle className="text-blue-900">
              {language === "zh-TW" ? "内容审批队列" : "Content Approval Queue"}
            </CardTitle>
            <CardDescription className="text-blue-700">
              {language === "zh-TW" ? "审核和批准用户提交的内容" : "Review and approve user-submitted content"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="grammar">
              <TabsList className="mb-4">
                <TabsTrigger value="grammar">
                  {language === "zh-TW" ? "语法" : "Grammar"} ({initialPendingContent.grammar.length})
                </TabsTrigger>
                <TabsTrigger value="lessons">
                  {language === "zh-TW" ? "课程" : "Lessons"} ({initialPendingContent.lessons.length})
                </TabsTrigger>
                <TabsTrigger value="vocabulary">
                  {language === "zh-TW" ? "词汇" : "Vocabulary"} ({initialPendingContent.vocabulary.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grammar">
                <div className="space-y-4">
                  {initialPendingContent.grammar.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 gap-2 md:gap-4">
                            <span>Submitted by: {item.submittedBy}</span>
                            <span>Submitted: {formatDistanceToNow(item.submittedAt)} ago</span>
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm" onClick={() => handleViewContent(item)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/edit/grammar/${item.id}`)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleViewContent(item)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleViewContent(item)}>
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {initialPendingContent.grammar.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No pending grammar content to review</div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="lessons">
                <div className="space-y-4">
                  {initialPendingContent.lessons.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 gap-2 md:gap-4">
                            <span>Submitted by: {item.submittedBy}</span>
                            <span>Submitted: {formatDistanceToNow(item.submittedAt)} ago</span>
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm" onClick={() => handleViewContent(item)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/edit/lessons/${item.id}`)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleViewContent(item)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleViewContent(item)}>
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {initialPendingContent.lessons.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No pending lessons to review</div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="vocabulary">
                <div className="space-y-4">
                  {initialPendingContent.vocabulary.map((item) => (
                    <Card key={item.id} className="p-4">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{item.title}</h3>
                          <div className="flex flex-col md:flex-row md:items-center text-sm text-gray-500 gap-2 md:gap-4">
                            <span>Submitted by: {item.submittedBy}</span>
                            <span>Submitted: {formatDistanceToNow(item.submittedAt)} ago</span>
                            {getStatusBadge(item.status)}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-4 md:mt-0">
                          <Button variant="outline" size="sm" onClick={() => handleViewContent(item)}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/admin/edit/vocabulary/${item.id}`)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleViewContent(item)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => handleViewContent(item)}>
                            <X className="h-4 w-4 mr-1" /> Reject
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                  {initialPendingContent.vocabulary.length === 0 && (
                    <div className="text-center py-8 text-gray-500">No pending vocabulary to review</div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="neubrutalism-card">
          <CardHeader>
            <CardTitle className="text-blue-900">{language === "zh-TW" ? "最近活动" : "Recent Activity"}</CardTitle>
            <CardDescription className="text-blue-700">
              {language === "zh-TW" ? "最新内容审批操作" : "Latest content approval actions"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 pb-3 border-b last:border-b-0 last:pb-0">
                  <div className="mt-0.5">{getActionIcon(activity.action)}</div>
                  <div>
                    <p className="font-medium text-blue-900">
                      {activity.action === "approved"
                        ? language === "zh-TW"
                          ? "已批准"
                          : "Approved"
                        : language === "zh-TW"
                          ? "已拒绝"
                          : "Rejected"}
                      : {activity.contentTitle}
                    </p>
                    <p className="text-sm text-blue-700">
                      {activity.contentType} • {activity.admin} • {formatDistanceToNow(activity.timestamp)}{" "}
                      {language === "zh-TW" ? "前" : "ago"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="neubrutalism-card">
          <CardHeader>
            <CardTitle className="text-blue-900">{language === "zh-TW" ? "审批统计" : "Approval Statistics"}</CardTitle>
            <CardDescription className="text-blue-700">
              {language === "zh-TW" ? "内容审批指标" : "Content approval metrics"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Pending Approvals</span>
                  <span className="text-sm font-medium">
                    {initialPendingContent.grammar.length +
                      initialPendingContent.lessons.length +
                      initialPendingContent.vocabulary.length}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-yellow-500 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        ((initialPendingContent.grammar.length +
                          initialPendingContent.lessons.length +
                          initialPendingContent.vocabulary.length) /
                          10) *
                          100,
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Approved Today</span>
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-green-500 rounded-full" style={{ width: "20%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Rejected Today</span>
                  <span className="text-sm font-medium">1</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-red-500 rounded-full" style={{ width: "10%" }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Average Response Time</span>
                  <span className="text-sm font-medium">1.5 days</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div className="h-2 bg-blue-500 rounded-full" style={{ width: "60%" }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="neubrutalism-card">
          <CardHeader>
            <CardTitle className="text-blue-900">{language === "zh-TW" ? "顶级贡献者" : "Top Contributors"}</CardTitle>
            <CardDescription className="text-blue-700">
              {language === "zh-TW" ? "批准内容最多的用户" : "Users with most approved content"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { username: "maria_santos", approvedContent: 15, contentType: "Grammar" },
                { username: "filipino_teacher", approvedContent: 12, contentType: "Lessons" },
                { username: "tagalog_expert", approvedContent: 10, contentType: "Mixed" },
                { username: "language_lover", approvedContent: 8, contentType: "Vocabulary" },
              ].map((contributor, index) => (
                <div key={index} className="flex items-center justify-between pb-2 border-b last:border-b-0 last:pb-0">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-3">
                      {contributor.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-medium">{contributor.username}</p>
                      <p className="text-xs text-gray-500">Mostly: {contributor.contentType}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium">{contributor.approvedContent} approved</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="neubrutalism-card">
          <CardHeader>
            <CardTitle className="text-blue-900">{language === "zh-TW" ? "快速操作" : "Quick Actions"}</CardTitle>
            <CardDescription className="text-blue-700">
              {language === "zh-TW" ? "常见管理任务" : "Common administrative tasks"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" /> {language === "zh-TW" ? "批准所有语法" : "Approve All Grammar"}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" /> {language === "zh-TW" ? "批准所有课程" : "Approve All Lessons"}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <CheckCircle className="h-4 w-4 mr-2" />{" "}
                {language === "zh-TW" ? "批准所有词汇" : "Approve All Vocabulary"}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertCircle className="h-4 w-4 mr-2" />{" "}
                {language === "zh-TW" ? "查看已举报的内容" : "View Reported Content"}
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Edit className="h-4 w-4 mr-2" /> {language === "zh-TW" ? "编辑审批指南" : "Edit Approval Guidelines"}
              </Button>
              <Link href="/admin/settings" className="block mt-4 text-blue-600 hover:text-blue-800 text-sm">
                {language === "zh-TW" ? "查看所有管理员设置" : "View all admin settings"}
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8 neubrutalism-card">
        <CardHeader>
          <CardTitle className="text-blue-900">
            {language === "zh-TW" ? "待审核内容" : "Pending Content Review"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingContent.length === 0 ? (
            <p>{language === "zh-TW" ? "没有待审核的内容。" : "No content pending review."}</p>
          ) : (
            <ul className="space-y-4">
              {pendingContent.map((content) => (
                <li key={content.id} className="border p-4 rounded-md">
                  <h3 className="font-bold">{content.title}</h3>
                  <p className="text-sm text-gray-500">
                    {content.type} by {content.submitted_by}
                  </p>
                  <p className="mt-2">{content.description}</p>
                  <div className="mt-4 flex space-x-2">
                    <Button onClick={() => handleReviewContent(content.id, "approve", "")}>
                      {language === "zh-TW" ? "批准" : "Approve"}
                    </Button>
                    <Button variant="destructive" onClick={() => handleReviewContent(content.id, "reject", "")}>
                      {language === "zh-TW" ? "拒绝" : "Reject"}
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

      {isModalOpen && selectedContent && (
        <ApprovalModal
          content={selectedContent}
          onClose={() => setIsModalOpen(false)}
          onApprove={handleApproveContent}
          onReject={handleRejectContent}
        />
      )}
    </div>
  )
}

export default function Dashboard() {
  return <AdminDashboardPage />
}

