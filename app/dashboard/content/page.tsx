"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit, Eye, Trash2, AlertCircle } from "lucide-react"
import Link from "next/link"
import ContentStatusBadge from "@/components/content-status-badge"

// Mock data - in a real app, this would come from your API
const userContent = {
  grammar: [
    {
      id: 1,
      title: "Basic Pronouns",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      status: "approved",
      views: 245,
    },
    {
      id: 2,
      title: "Verb Conjugation: MAG Verbs",
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      status: "pending",
      views: 0,
    },
    {
      id: 3,
      title: "Adjective Formation with MA-",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: "rejected",
      rejectionReason: "Content needs more examples and clearer explanations.",
      views: 0,
    },
  ],
  lessons: [
    {
      id: 1,
      title: "Greetings and Introductions",
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
      status: "approved",
      views: 532,
    },
    {
      id: 2,
      title: "Shopping at the Market",
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      status: "pending",
      views: 0,
    },
  ],
  vocabulary: [
    {
      id: 1,
      title: "Food Vocabulary",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      status: "approved",
      views: 378,
    },
    {
      id: 2,
      title: "Family Relations Vocabulary",
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      status: "pending",
      views: 0,
    },
    {
      id: 3,
      title: "Weather Terms",
      createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      status: "draft",
      views: 0,
    },
  ],
}

export default function UserContentPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(date)
  }

  const filterContent = (content: any[]) => {
    return content.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Content</h1>
          <p className="text-gray-600">Manage your contributions to the platform</p>
        </div>

        <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-2">
          <Button asChild>
            <Link href="/create/grammar">
              <Plus className="h-4 w-4 mr-2" /> Create Grammar
            </Link>
          </Button>
          <Button asChild>
            <Link href="/create/lesson">
              <Plus className="h-4 w-4 mr-2" /> Create Lesson
            </Link>
          </Button>
          <Button asChild>
            <Link href="/create/vocabulary">
              <Plus className="h-4 w-4 mr-2" /> Create Vocabulary
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input placeholder="Search content..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="grammar">
        <TabsList className="mb-6">
          <TabsTrigger value="grammar">Grammar ({userContent.grammar.length})</TabsTrigger>
          <TabsTrigger value="lessons">Lessons ({userContent.lessons.length})</TabsTrigger>
          <TabsTrigger value="vocabulary">Vocabulary ({userContent.vocabulary.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="grammar">
          <div className="space-y-4">
            {filterContent(userContent.grammar).map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <ContentStatusBadge status={item.status} />
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {formatDate(item.createdAt)} • Views: {item.views}
                      </div>
                      {item.status === "rejected" && (
                        <div className="mt-2 flex items-start gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                          <AlertCircle className="h-4 w-4 mt-0.5" />
                          <span>{item.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      {item.status === "approved" && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/grammar/${item.id}`}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Link>
                        </Button>
                      )}
                      {(item.status === "draft" || item.status === "rejected") && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/edit/grammar/${item.id}`}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Link>
                        </Button>
                      )}
                      {item.status === "draft" && (
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filterContent(userContent.grammar).length === 0 && (
              <div className="text-center py-8 text-gray-500">No grammar content found matching your filters</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="lessons">
          <div className="space-y-4">
            {filterContent(userContent.lessons).map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <ContentStatusBadge status={item.status} />
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {formatDate(item.createdAt)} • Views: {item.views}
                      </div>
                      {item.status === "rejected" && item.rejectionReason && (
                        <div className="mt-2 flex items-start gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                          <AlertCircle className="h-4 w-4 mt-0.5" />
                          <span>{item.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      {item.status === "approved" && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/lessons/${item.id}`}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Link>
                        </Button>
                      )}
                      {(item.status === "draft" || item.status === "rejected") && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/edit/lessons/${item.id}`}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Link>
                        </Button>
                      )}
                      {item.status === "draft" && (
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filterContent(userContent.lessons).length === 0 && (
              <div className="text-center py-8 text-gray-500">No lessons found matching your filters</div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="vocabulary">
          <div className="space-y-4">
            {filterContent(userContent.vocabulary).map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <ContentStatusBadge status={item.status} />
                      </div>
                      <div className="text-sm text-gray-500">
                        Created: {formatDate(item.createdAt)} • Views: {item.views}
                      </div>
                      {item.status === "rejected" && item.rejectionReason && (
                        <div className="mt-2 flex items-start gap-2 text-sm text-red-600 bg-red-50 p-2 rounded">
                          <AlertCircle className="h-4 w-4 mt-0.5" />
                          <span>{item.rejectionReason}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-4 md:mt-0">
                      {item.status === "approved" && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/vocabulary/${item.id}`}>
                            <Eye className="h-4 w-4 mr-1" /> View
                          </Link>
                        </Button>
                      )}
                      {(item.status === "draft" || item.status === "rejected") && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/edit/vocabulary/${item.id}`}>
                            <Edit className="h-4 w-4 mr-1" /> Edit
                          </Link>
                        </Button>
                      )}
                      {item.status === "draft" && (
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            {filterContent(userContent.vocabulary).length === 0 && (
              <div className="text-center py-8 text-gray-500">No vocabulary found matching your filters</div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

