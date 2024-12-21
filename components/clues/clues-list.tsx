'use client'

import { useState, useEffect } from 'react'
import { Clue } from '@/components/clues/clue'
import { useVerification } from '@/hooks/use-verification'

interface ClueData {
  id: number
  title: string
  content: string
  isLocked: boolean
}

const cluesData: ClueData[] = [
  {
    id: 1,
    title: 'Starting Point',
    content: 'Begin your journey at the Dragon Bridge. Look for the golden scales that point the way...',
    isLocked: false
  },
  {
    id: 2,
    title: 'Second Location',
    content: 'Hidden in plain sight, where marble mountains meet the sky...',
    isLocked: true
  },
  {
    id: 3,
    title: 'Third Secret',
    content: 'Among the ancient temples, seek the one with three doors...',
    isLocked: true
  },
  {
    id: 4,
    title: 'Fourth Mystery',
    content: 'Where the river meets the sea, count the lanterns...',
    isLocked: true
  },
  {
    id: 5,
    title: 'Final Destination',
    content: 'The treasure awaits at the heart of the old market...',
    isLocked: true
  }
]

export function CluesList() {
  const { isVerified } = useVerification()
  const [clues, setClues] = useState<ClueData[]>(cluesData)

  useEffect(() => {
    if (isVerified) {
      setClues(clues.map(clue => ({ ...clue, isLocked: false })))
    }
  }, [isVerified])

  return (
    <div className="space-y-4">
      {clues.map((clue) => (
        <Clue
          key={clue.id}
          title={clue.title}
          content={clue.content}
          isLocked={clue.isLocked}
        />
      ))}
    </div>
  )
} 