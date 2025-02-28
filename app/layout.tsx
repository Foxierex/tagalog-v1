import type React from "react"
import type { Metadata } from "next"
import { Lexend } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/context/AuthContext"
import { LanguageProvider } from "@/context/language-context"

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
})

export const metadata: Metadata = {
  title: "TagalogPro - Learn Tagalog Online",
  description: "Master Tagalog through interactive lessons, vocabulary, and exercises.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${lexend.variable} font-sans bg-blue-50`}>
        <LanguageProvider>
          <AuthProvider>
            <Navbar />
            <main className="min-h-screen pt-16">{children}</main>
            <Footer />
            <Toaster />
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}



import './globals.css'