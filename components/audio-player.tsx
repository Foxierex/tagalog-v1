"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, Pause } from "lucide-react"

interface AudioPlayerProps {
  word: string
}

export default function AudioPlayer({ word }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // In a real application, this would fetch the audio URL from your API
    // For demo purposes, we'll simulate this with a timeout
    setIsLoading(true)

    const fetchAudio = async () => {
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch(`/api/audio?word=${word}`)
        // const data = await response.json()
        // setAudioUrl(data.audioUrl)

        // For demo purposes, we'll simulate this
        setTimeout(() => {
          setAudioUrl(`/api/audio/files/${word}.mp3`)
          setIsLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching audio:", error)
        setIsLoading(false)
      }
    }

    fetchAudio()
  }, [word])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false)
      })
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("ended", () => {
          setIsPlaying(false)
        })
      }
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current || !audioUrl) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }

    setIsPlaying(!isPlaying)
  }

  return (
    <div>
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="auto" />}

      <button
        onClick={togglePlay}
        disabled={isLoading || !audioUrl}
        className={`flex items-center text-orange-500 hover:text-orange-600 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? (
          <Mic className="h-5 w-5 animate-pulse" />
        ) : isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
        <span className="ml-1">Listen</span>
      </button>
    </div>
  )
}

