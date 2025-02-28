"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

interface AnimatedButtonProps {
  href: string
  children: ReactNode
  className?: string
}

export default function AnimatedButton({ href, children, className = "" }: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="inline-block">
      <Link
        href={href}
        className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg border-4 border-blue-900 shadow-[6px_6px_0px_0px_rgba(30,58,138,1)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(30,58,138,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] ${className}`}
      >
        {children}
      </Link>
    </motion.div>
  )
}

