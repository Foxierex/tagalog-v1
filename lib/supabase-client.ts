"use client"

import { createClient } from "@supabase/supabase-js"

// Create a single supabase client for browser-side usage
export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
)

