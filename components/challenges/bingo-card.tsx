'use client'

import { Card } from "@/components/ui/card"

type BingoSquare = {
  text: string
  completed: boolean
}

type BingoCardProps = {
  squares: BingoSquare[]
}

export function BingoCard({ squares }: BingoCardProps) {
  return (
    <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
      {squares.map((square, index) => (
        <Card 
          key={index}
          className={`p-4 h-32 flex items-center justify-center text-center cursor-default
            ${square.completed ? 'bg-amber-200 border-amber-400' : 'bg-white'}`}
        >
          <p className="text-sm font-medium">{square.text}</p>
        </Card>
      ))}
    </div>
  )
} 