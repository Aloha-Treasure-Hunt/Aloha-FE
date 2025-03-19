'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Challenge } from '@/types/challenges.types';
import Link from 'next/link';

interface BingoCardProps {
  challenges: Challenge[];
  bonusChallenge?: Challenge;
}

export function BingoCard({ challenges, bonusChallenge }: BingoCardProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [media, setMedia] = useState<{ [key: string]: File | null }>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, challengeId: string) => {
    if (event.target.files && event.target.files.length > 0) {
      if (event.target.files) {
        setMedia((prev) => ({ ...prev, [challengeId]: event.target.files?.[0] || null }));
      }
    }
  };

  return (
    <div className='space-y-8'>
      {/* Bonus Challenge */}
      {bonusChallenge && (
        <div className='max-w-3xl mx-auto mb-8'>
          <motion.div whileHover={{ scale: 1.02 }} className='bg-gradient-to-r from-amber-500 to-amber-600 rounded-lg p-1'>
            <Card className='p-6 bg-white/95 space-y-3'>
              <div className='flex justify-between items-start'>
                <h3 className='text-lg font-bold text-amber-800'>Side Quest of the Day</h3>
                <span className='bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>{bonusChallenge.points} pts</span>
              </div>
              <p className='text-gray-700'>{bonusChallenge.text}</p>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Regular Challenges Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-3xl mx-auto'>
        {challenges.map((challenge) => (
          <motion.div key={challenge.id} whileHover={{ scale: 1.02 }} onClick={() => setSelectedChallenge(challenge)}>
            <Card className='p-4 min-h-[160px] flex flex-col justify-between cursor-pointer bg-white hover:bg-gray-50'>
              <p className='text-sm font-medium'>{challenge.text}</p>
              <div className='flex justify-between items-center mt-3'>
                <span className='text-xs text-gray-500'>Click for details</span>
                <span className='bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-semibold'>{challenge.points} pts</span>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Challenge Details Modal */}
      {selectedChallenge && (
        <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className='bg-white rounded-lg max-w-md w-full p-6 space-y-4'>
            <div className='flex justify-between items-start'>
              <h3 className='text-lg font-bold text-amber-800'>{selectedChallenge.text}</h3>
              <span className='bg-amber-500 text-white px-3 py-1 rounded-full text-sm font-semibold'>{selectedChallenge.points} pts</span>
            </div>

            {/* Image/Video Upload */}
            <div className='space-y-2'>
              <h4 className='font-semibold text-gray-700'>Upload Image/Video:</h4>
              <input type='file' accept='image/*,video/*' onChange={(e) => handleFileChange(e, selectedChallenge.id)} className='block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-100 file:text-amber-800 hover:file:bg-amber-200' />
              {media[selectedChallenge.id] && (
                <p className='text-sm text-gray-600 mt-2'>Selected: {media[selectedChallenge.id]?.name}</p>
              )}
            </div>

            <Link href={'/success-status'}>
            <button className='w-full bg-amber-400 hover:bg-amber-500 text-amber-800 py-2 rounded-lg mt-4'>Submit</button>
            </Link>
            <button onClick={() => setSelectedChallenge(null)} className='w-full bg-amber-100 hover:bg-amber-200 text-amber-800 py-2 rounded-lg mt-4'>Close</button>
          </motion.div>
        </div>
      )}
    </div>
  );
}