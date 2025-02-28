"use client"

import { useState, useEffect } from "react"
import { Volume2, X } from "lucide-react"

interface WordDetailsModalProps {
  word: {
    id: number
    prefix: string
    word: string
    translation: string
    partOfSpeech: string
    level: string
    example: {
      tagalog: string
      english: string
    }
    // Add more properties as needed for full details
    definition?: string
    synonyms?: string[]
    antonyms?: string[]
    conjugations?: { tense: string; form: string }[]
  }
  onClose: () => void
}

export default function WordDetailsModal({ word, onClose }: WordDetailsModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for the fade-out animation
  }

  const playAudio = () => {
    console.log(`Playing audio for: ${word.word}`)
    // Implement actual audio playback here
  }

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 transition-all duration-300 ${isVisible ? "scale-100" : "scale-95"}`}
      >
        <div className="flex justify-between items-start p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">{word.word}</h2>
          <button onClick={handleClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm font-medium text-blue-600">{word.prefix}</p>
              <p className="text-xl text-gray-900">{word.translation}</p>
            </div>
            <button onClick={playAudio} className="text-blue-600 hover:text-blue-700">
              <Volume2 className="h-6 w-6" />
            </button>
          </div>

          <div className="flex gap-2 mb-4">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {word.partOfSpeech}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {word.level}
            </span>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Definition</h3>
            <p className="text-gray-700">{word.definition || "Definition not available."}</p>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Example</h3>
            <p className="text-gray-700">{word.example.tagalog}</p>
            <p className="text-gray-600 italic">{word.example.english}</p>
          </div>

          {word.synonyms && word.synonyms.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Synonyms</h3>
              <p className="text-gray-700">{word.synonyms.join(", ")}</p>
            </div>
          )}

          {word.antonyms && word.antonyms.length > 0 && (
            <div className="mb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Antonyms</h3>
              <p className="text-gray-700">{word.antonyms.join(", ")}</p>
            </div>
          )}

          {word.conjugations && word.conjugations.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Conjugations</h3>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tense
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Form
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {word.conjugations.map((conj, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{conj.tense}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{conj.form}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

