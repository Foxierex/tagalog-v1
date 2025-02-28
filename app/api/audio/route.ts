import { NextResponse } from "next/server"

// This would connect to your audio files stored in Supabase Storage
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const word = searchParams.get("word")

  if (!word) {
    return NextResponse.json({ error: "Word parameter is required" }, { status: 400 })
  }

  // In a real application, this would generate a signed URL to the audio file in Supabase Storage
  const audioUrl = `/api/audio/files/${word}.mp3`

  return NextResponse.json({ audioUrl })
}

