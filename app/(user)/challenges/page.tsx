'use client'
import { getQuestsApi } from '@/components/api/questsApi';
import { BingoCard } from '@/components/challenges/bingo-card';
import { Challenge, TreasureHuntItem } from '@/types/challenges.types';
import { useEffect, useState } from 'react';

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
