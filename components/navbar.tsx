"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion } from "framer-motion"
import { AuthStatus } from "@/components/auth/auth-status"
import { useLanguageContext } from "@/context/language-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { language } = useLanguageContext()

  useEffect(() => {
    console.log("Navbar mounted, current language:", language)
  }, [language])

  const navItems = [
    { name: language === "zh-TW" ? "首页" : "Home", href: "/" },
    { name: language === "zh-TW" ? "词汇" : "Vocabulary", href: "/vocabulary" },
    { name: language === "zh-TW" ? "语法" : "Grammar", href: "/grammar" },
    { name: language === "zh-TW" ? "课程" : "Lessons", href: "/lessons" },
  ]

  console.log("Navbar rendering, current language:", language)

  return (
    <header className="fixed w-full bg-white z-50 border-b-4 border-blue-900">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-blue-900 flex items-center">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", repeatDelay: 5 }}
              className="w-10 h-10 bg-blue-700 rounded-lg mr-2 flex items-center justify-center text-white border-2 border-blue-900"
            >
              T
            </motion.div>
            <span>TagalogPro</span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`text-blue-900 font-bold hover:text-blue-700 transition-colors ${
                    pathname === item.href ? "border-b-4 border-blue-700" : ""
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center space-x-4">
            <LanguageToggle />
            <AuthStatus />
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-blue-900 focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t-4 border-blue-900"
        >
          <div className="container mx-auto px-4 py-4">
            <ul className="space-y-4">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block text-blue-900 font-bold hover:text-blue-700 transition-colors ${
                      pathname === item.href ? "border-l-4 border-blue-700 pl-2" : ""
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 space-y-4">
              <LanguageToggle />
              <AuthStatus />
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

