'use client'
import { getQuestsApi } from '@/components/api/questsApi';
import { BingoCard } from '@/components/challenges/bingo-card';
import { Challenge, TreasureHuntItem } from '@/types/challenges.types';
import { useEffect, useState } from 'react';

const CHALLENGES: Challenge[] = [
  // Original challenges
  {
    id: '1',
    text: 'Film someone getting an ice bath for the first time ',
    points: 200,
    completed: false,
    description:
      'Get a friend to film you getting an ice bath for the first time or the other way around',
    requirements: ['Share the video on Instagram with #AVNTreasureHunt'],
  },
  {
    id: '2',
    text: 'Find and photograph a hidden temple',
    points: 75,
    completed: false,
    description: "Discover one of Da Nang's lesser-known temples.",
    requirements: [
      'Find a temple off the tourist track',
      'Take artistic photos',
      'Learn about its history',
      'Bonus points for filming yourself or a friend lighting incense and saying a prayer +15',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '3',
    text: 'Learn and perform a traditional dance move',
    points: 120,
    completed: false,
    description: 'Connect with local culture through dance.',
    requirements: [
      'Learn from locals',
      'Practice the moves',
      'Record a short performance',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '4',
    text: 'Ask a local their favorite fruit in Vietnamese and then get it for them',
    points: 100,
    completed: false,
    description: "Explore Vietnam's diverse fruit offerings.",
    requirements: [
      'Learn the name of a fruit in Vietnamese or use your favorite translation app',
      'Purchase fruit from a local vendor',
      'Film the interaction',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '5',
    text: 'Invent a new way to take a nap on a motorbike',
    points: 40,
    completed: false,
    description: 'Test your ingenuity and get creative with a motorbike nap',
    requirements: [
      'Film the interaction',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '6',
    text: 'Film yourself or a friend trying to get the rubber band off of a sauce packet without breaking the the bag or rubber band ',
    points: 120,
    completed: false,
    description: 'Practice your Vietnamese survival skills.',
    requirements: [
      'Film the interaction',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '7',
    text: 'Challenge your friends to a spring roll rolling contest',
    points: 110,
    completed: false,
    description: 'Practice your spring roll rolling skills.',
    requirements: [
      'Order some spring rolls or make your own',
      'Film the interaction',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '8',
    text: 'Take a sunset picture with your teammates',
    points: 100,
    completed: false,
    description: "Capture the beauty of Da Nang's sunset.",
    requirements: [
      'Film the interaction',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '9',
    text: 'Take a sunrise picture with your teammates',
    points: 160,
    completed: false,
    description: "Capture the beauty of Da Nang's sunrise.",
    requirements: [
      'Film the interaction',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  // New challenges
  {
    id: '10',
    text: 'Nature Art Installation',
    points: 150,
    completed: false,
    description: 'Create art using natural materials from the beach or park.',
    requirements: [
      'Use only natural materials',
      'Represent team spirit',
      'Document the creation process',
      'Final installation photo',
      'Clean up afterwards',
    ],
  },
  {
    id: '11',
    text: 'Take a video of your team doing the Vietnamese Cheers (MOT-HAI-BAI-YO)',
    points: 180,
    completed: false,
    description: 'Practice your Vietnamese cheers skills.',
    requirements: [
      'Film the interaction',
      'Bonus points for doing a Boomerang +10',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '12',
    text: 'Film yourself doing the the A-P-T dance with your favorite barista',
    points: 120,
    completed: false,
    description: 'Practice your dance skills and make a new memory',
    requirements: [
      'The APT dance was made popular by Rosie and Bruno Mars',
      'Film the interaction',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
  {
    id: '13',
    text: 'Get a Surf Lesson',
    points: 150,
    completed: false,
    description: 'Get some exercise and learn a new skill',
    requirements: [
      'Film the interaction',
      'Bonus points for a Party Wave +30',
      'Share the video on Instagram with #AVNTreasureHunt',
    ],
  },
];

const BONUS_CHALLENGE: Challenge = {
  id: 'bonus',
  text: 'Storytelling Through Photography',
  points: 300,
  isBonus: true,
  completed: false,
  description:
    'Capture five photos that tell a story about your day in Da Nang, focusing on cultural elements, interactions with locals, and unique experiences.',
  requirements: [
    'Include at least one cultural element (temple, market, tradition)',
    'Show meaningful interactions with locals',
    'Capture unique Da Nang experiences',
    'Add thoughtful captions to each photo',
    'Post as a cohesive story sequence with #AVNTreasureHunt',
  ],
};

export default function ChallengePage() {
  const [quests, setQuests] = useState<TreasureHuntItem[]>([]);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await getQuestsApi(1)
        setQuests(data);
      } catch (error) {
        console.log( "Error fetching quest: ",error);
      }
    };
    fetchQuests();
  }, [])

  console.log(quests)

  return (
    <main className='container mx-auto py-8 px-4 mt-20 mb-20'>
      <h1 className='text-3xl font-bold text-center mb-4 text-amber-800'>
        Side Quests
      </h1>
      <p className='text-center mb-8 text-gray-600 max-w-2xl mx-auto'>
        Complete side quests to earn points and move up the leaderboard! Each
        side quest offers unique points, and the Side Quest of the Day comes
        with bonus points. Document your adventures and share them with
        #AVNTreasureHunt
      </p>
      <BingoCard challenges={quests} bonusChallenge={BONUS_CHALLENGE} />
    </main>
  );
}
