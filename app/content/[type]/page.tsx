import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export async function generateStaticParams() {
  return [{ type: "vocabulary" }, { type: "grammar" }, { type: "lesson" }]
}

export default async function ContentPage({ params }: { params: { type: string } }) {
  const { type } = params
  const { data: content, error } = await supabase.from(`${type}s`).select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching content:", error)
    return <div>Error loading content</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{type}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {content.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <Link href={`/content/${type}/${item.id}`} className="text-blue-600 hover:underline">
                View Details
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

