import { BingoCard } from "@/components/challenges/bingo-card"

const BINGO_SQUARES = [
  { text: "Take a photo with 3 different street food vendors", completed: false },
  { text: "Find and photograph a hidden temple", completed: false },
  { text: "Learn and perform a traditional dance move", completed: false },
  { text: "Try 5 different local fruits", completed: false },
  { text: "Take a team photo at Dragon Bridge", completed: false },
  { text: "Order food in Vietnamese", completed: false },
  { text: "Find a local crafts workshop", completed: false },
  { text: "Visit Marble Mountains", completed: false },
  { text: "Complete a beach cleanup challenge", completed: false },
]

export default function ChallengePage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-amber-800">Team Challenges</h1>
      <p className="text-center mb-8 text-gray-600">Complete challenges to fill your bingo card!</p>
      <BingoCard squares={BINGO_SQUARES} />
    </main>
  )
} 