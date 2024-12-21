'use client'

import { useVerification } from '@/hooks/use-verification'
import { Clue } from './clue'
import type { ClueData } from './clue'

export function CluesList({ clues = [] }: { clues?: ClueData[] }) {
  const { unlockedClues } = useVerification()

  return (
    <div className="space-y-6">
      {clues.map((clue, index) => {
        const clueNumber = index + 1
        const isUnlocked = clueNumber === 1 || unlockedClues.includes(clueNumber)

        return (
          <Clue
            key={clueNumber}
            number={clueNumber}
            isLocked={!isUnlocked}
            data={clue}
          />
        )
      })}
    </div>
  )
} 