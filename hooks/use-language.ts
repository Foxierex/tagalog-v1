"use client"

import { useLanguageContext } from "@/context/language-context"

export function useLanguage() {
  return useLanguageContext()
}

