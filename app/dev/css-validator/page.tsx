"use client"

import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import CSSValidator from "@/components/css-validator"

export default function CSSValidatorPage() {
  const [css, setCSS] = useState("")

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">CSS Validator</h1>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Input CSS</h2>
          <Textarea
            value={css}
            onChange={(e) => setCSS(e.target.value)}
            className="h-[500px] font-mono"
            placeholder="Paste your CSS here..."
          />
        </div>
        <div>
          <CSSValidator css={css} />
        </div>
      </div>
    </div>
  )
}

