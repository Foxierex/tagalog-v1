// This file is not needed for our current implementation
// We'll use Supabase Auth directly instead of NextAuth

import { NextResponse } from "next/server"

export async function GET(req: Request) {
  return NextResponse.json({ message: "Auth endpoint" })
}

export async function POST(req: Request) {
  return NextResponse.json({ message: "Auth endpoint" })
}

