import { BingoCard } from "@/components/challenges/bingo-card"
import type { Challenge } from '@/app/api/challenges/types'

const CHALLENGES: Challenge[] = [
  // Original challenges
  {
    id: '1',
    text: "Take a photo with 3 different street food vendors",
    points: 100,
    completed: false,
    description: "Find and interact with local street food vendors around the city.",
    requirements: [
      "Photos with 3 different vendors",
      "Try at least one item from each",
      "Note the location",
      "Tag the vendors if possible"
    ]
  },
  {
    id: '2',
    text: "Find and photograph a hidden temple",
    points: 150,
    completed: false,
    description: "Discover one of Da Nang's lesser-known temples.",
    requirements: [
      "Find a temple off the tourist track",
      "Take artistic photos",
      "Learn about its history",
      "Show respect to local customs"
    ]
  },
  {
    id: '3',
    text: "Learn and perform a traditional dance move",
    points: 120,
    completed: false,
    description: "Connect with local culture through dance.",
    requirements: [
      "Learn from locals",
      "Practice the moves",
      "Record a short performance",
      "Share the experience"
    ]
  },
  {
    id: '4',
    text: "Try 5 different local fruits",
    points: 100,
    completed: false,
    description: "Explore Vietnam's diverse fruit offerings.",
    requirements: [
      "Visit local fruit markets",
      "Try 5 unique fruits",
      "Document each fruit",
      "Rate your favorites"
    ]
  },
  {
    id: '5',
    text: "Take a team photo at Dragon Bridge",
    points: 100,
    completed: false,
    description: "Capture your team's spirit at this iconic location.",
    requirements: [
      "Creative group pose",
      "Include the dragon",
      "Both day and night photos",
      "Share the story"
    ]
  },
  {
    id: '6',
    text: "Order food in Vietnamese",
    points: 120,
    completed: false,
    description: "Practice your Vietnamese language skills.",
    requirements: [
      "Learn basic food vocabulary",
      "Order without English",
      "Record the interaction",
      "Thank the vendor in Vietnamese"
    ]
  },
  {
    id: '7',
    text: "Find a local crafts workshop",
    points: 150,
    completed: false,
    description: "Discover traditional Vietnamese crafts.",
    requirements: [
      "Locate a workshop",
      "Learn about the craft",
      "Try making something",
      "Document the process"
    ]
  },
  {
    id: '8',
    text: "Visit Marble Mountains",
    points: 200,
    completed: false,
    description: "Explore this historic and spiritual site.",
    requirements: [
      "Climb to viewpoints",
      "Visit caves",
      "Learn about history",
      "Respectful photography"
    ]
  },
  {
    id: '9',
    text: "Complete a beach cleanup challenge",
    points: 150,
    completed: false,
    description: "Help keep Da Nang's beaches beautiful.",
    requirements: [
      "30 minutes minimum",
      "Sort recyclables",
      "Document before/after",
      "Inspire others to join"
    ]
  },
  // New challenges
  {
    id: '10',
    text: "Nature Art Installation",
    points: 150,
    completed: false,
    description: "Create art using natural materials from the beach or park.",
    requirements: [
      "Use only natural materials",
      "Represent team spirit",
      "Document the creation process",
      "Final installation photo",
      "Clean up afterwards"
    ]
  },
  {
    id: '11',
    text: "Cultural Costume Photo Shoot",
    points: 180,
    completed: false,
    description: "Find a local shop, rent traditional Vietnamese attire, and take creative photos.",
    requirements: [
      "Wear traditional Ao Dai",
      "Visit iconic locations",
      "Group photos in costume",
      "Learn about the costume's history",
      "Tag the rental shop"
    ]
  },
  {
    id: '12',
    text: "Street Food Sampling",
    points: 120,
    completed: false,
    description: "Try three different types of street food and document your experience.",
    requirements: [
      "Try 3 different dishes",
      "Note dish names",
      "Document flavors",
      "Photo with vendors",
      "Rate each dish"
    ]
  },
  {
    id: '13',
    text: "Language Exchange",
    points: 150,
    completed: false,
    description: "Learn and practice five common Vietnamese phrases with locals.",
    requirements: [
      "Learn 5 phrases",
      "Practice with locals",
      "Record short videos",
      "Write down translations",
      "Use in conversation"
    ]
  },
  {
    id: '14',
    text: "Local Recipe Hunt",
    points: 160,
    completed: false,
    description: "Visit a local market and learn a recipe from a vendor.",
    requirements: [
      "Find a local vendor",
      "Get a recipe",
      "Buy ingredients",
      "Photo documentation",
      "Write down recipe steps"
    ]
  }
]

const BONUS_CHALLENGE: Challenge = {
  id: 'bonus',
  text: "Storytelling Through Photography",
  points: 300,
  isBonus: true,
  completed: false,
  description: "Capture five photos that tell a story about your day in Da Nang, focusing on cultural elements, interactions with locals, and unique experiences.",
  requirements: [
    "Include at least one cultural element (temple, market, tradition)",
    "Show meaningful interactions with locals",
    "Capture unique Da Nang experiences",
    "Add thoughtful captions to each photo",
    "Post as a cohesive story sequence with #AVNTreasureHunt"
  ]
}

export default function ChallengePage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-4 text-amber-800">Team Challenges</h1>
      <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
        Complete challenges to earn points and unlock special rewards! Each challenge offers unique points,
        and the Challenge of the Day comes with bonus points. Document your adventures and share them with
        #AVNTreasureHunt
      </p>
      <BingoCard challenges={CHALLENGES} bonusChallenge={BONUS_CHALLENGE} />
    </main>
  )
} 