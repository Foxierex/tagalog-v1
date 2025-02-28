interface CSSValidationError {
  line: number
  column: number
  message: string
  source: string
}

interface CSSValidationResult {
  isValid: boolean
  errors: CSSValidationError[]
  formattedCode?: string
}

export function validateCSS(css: string): CSSValidationResult {
  const errors: CSSValidationError[] = []
  const lines = css.split("\n")

  // Check for common syntax errors
  lines.forEach((line, index) => {
    // Check for missing semicolons
    if (
      line.trim().length > 0 &&
      !line.trim().endsWith("{") &&
      !line.trim().endsWith("}") &&
      !line.trim().endsWith(";")
    ) {
      errors.push({
        line: index + 1,
        column: line.length,
        message: "Missing semicolon at end of declaration",
        source: line,
      })
    }

    // Check for unclosed brackets
    const openBrackets = (line.match(/{/g) || []).length
    const closeBrackets = (line.match(/}/g) || []).length
    if (openBrackets !== closeBrackets) {
      errors.push({
        line: index + 1,
        column: 1,
        message: "Unmatched brackets",
        source: line,
      })
    }

    // Check for invalid @apply syntax in Tailwind
    if (line.includes("@apply")) {
      const applyContent = line.split("@apply")[1]
      if (applyContent.includes("[") && !applyContent.includes("]")) {
        errors.push({
          line: index + 1,
          column: line.indexOf("["),
          message: "Invalid @apply syntax: Unclosed square bracket",
          source: line,
        })
      }
    }

    // Check for missing @layer directives
    if (line.includes("shadow-[") && !css.includes("@layer")) {
      errors.push({
        line: index + 1,
        column: line.indexOf("shadow-["),
        message: "Custom utilities must be defined within a @layer directive",
        source: line,
      })
    }
  })

  // Format the CSS code
  const formattedCode = formatCSS(css)

  return {
    isValid: errors.length === 0,
    errors,
    formattedCode,
  }
}

function formatCSS(css: string): string {
  let formatted = ""
  let indent = 0
  const lines = css.split("\n")

  lines.forEach((line) => {
    const trimmedLine = line.trim()

    // Decrease indent for closing braces
    if (trimmedLine.includes("}")) {
      indent = Math.max(0, indent - 2)
    }

    // Add the line with proper indentation
    if (trimmedLine.length > 0) {
      formatted += " ".repeat(indent) + trimmedLine + "\n"
    }

    // Increase indent for opening braces
    if (trimmedLine.includes("{")) {
      indent += 2
    }
  })

  return formatted
}

