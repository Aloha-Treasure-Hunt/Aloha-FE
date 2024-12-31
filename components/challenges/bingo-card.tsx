'use client'

import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { motion } from 'framer-motion'
import type { Challenge } from '@/app/api/challenges/types'

interface BingoCardProps {
  challenges: Challenge[]
  bonusChallenge?: Challenge
}

export function BingoCard({ challenges, bonusChallenge }: BingoCardProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null)

  return (
    <div className="space-y-8">
      {/* Bonus Challenge */}
      {bonusChallenge && (
        <div className="max-w-3xl mx-auto mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-1"
          >
            <Card className="p-6 bg-white/95 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-bold text-amber-800">
                  Challenge of the Day
                </h3>
                <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {bonusChallenge.points} pts
                </span>
              </div>
              <p className="text-gray-700">{bonusChallenge.text}</p>
              {bonusChallenge.requirements && (
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {bonusChallenge.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              )}
            </Card>
          </motion.div>
        </div>
      )}

      {/* Regular Challenges Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedChallenge(challenge)}
          >
            <Card 
              className={`p-4 min-h-[160px] flex flex-col justify-between cursor-pointer
                ${challenge.completed ? 'bg-amber-50 border-amber-400' : 'bg-white hover:bg-gray-50'}`}
            >
              <p className="text-sm font-medium">{challenge.text}</p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-xs text-gray-500">
                  {challenge.completed ? 'Completed!' : 'Click for details'}
                </span>
                <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold">
                  {challenge.points} pts
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Challenge Details Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-lg max-w-md w-full p-6 space-y-4"
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-amber-800">
                {selectedChallenge.text}
              </h3>
              <span className="bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                {selectedChallenge.points} pts
              </span>
            </div>
            
            {selectedChallenge.description && (
              <p className="text-gray-700">{selectedChallenge.description}</p>
            )}
            
            {selectedChallenge.requirements && (
              <div className="space-y-2">
                <h4 className="font-semibold text-gray-700">Requirements:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  {selectedChallenge.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <button
              onClick={() => setSelectedChallenge(null)}
              className="w-full bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 rounded-lg mt-4"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
} 