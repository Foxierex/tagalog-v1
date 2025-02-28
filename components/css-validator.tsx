"use client"

import { useState } from "react"
import { validateCSS } from "@/lib/css-validator"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Check, Copy } from "lucide-react"

interface CSSValidatorProps {
  css: string
}

export default function CSSValidator({ css }: CSSValidatorProps) {
  const [validationResult, setValidationResult] = useState(() => validateCSS(css))
  const [copied, setCopied] = useState(false)

  const handleValidate = () => {
    setValidationResult(validateCSS(css))
  }

  const handleCopy = async () => {
    if (validationResult.formattedCode) {
      await navigator.clipboard.writeText(validationResult.formattedCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          CSS Validation
          {validationResult.isValid ? (
            <Check className="h-5 w-5 text-green-500" />
          ) : (
            <AlertCircle className="h-5 w-5 text-red-500" />
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {validationResult.errors.length > 0 ? (
          <div className="space-y-4">
            <h3 className="font-medium text-red-500">Validation Errors:</h3>
            <ul className="space-y-2">
              {validationResult.errors.map((error, index) => (
                <li key={index} className="bg-red-50 p-3 rounded-md border border-red-200">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-red-700">{error.message}</p>
                      <p className="text-sm text-red-600">
                        Line {error.line}, Column {error.column}
                      </p>
                      <pre className="mt-2 p-2 bg-white rounded border border-red-100 text-sm">{error.source}</pre>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-green-600">No validation errors found.</p>
        )}

        {validationResult.formattedCode && (
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium">Formatted Code:</h3>
              <Button variant="outline" size="sm" onClick={handleCopy}>
                <Copy className="h-4 w-4 mr-2" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <pre className="p-4 bg-gray-50 rounded-md border text-sm overflow-x-auto">
              {validationResult.formattedCode}
            </pre>
          </div>
        )}

        <div className="mt-4">
          <Button onClick={handleValidate}>Validate CSS</Button>
        </div>
      </CardContent>
    </Card>
  )
}

