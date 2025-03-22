'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVerification } from '@/hooks/use-verification';
import Link from 'next/link';
import { ClueData } from '@/types/challenges.types';

export function VerificationForm({
  clues = [],
  userClues = [],
  userId,
  refetch,
}: {
  clues?: ClueData[];
  userClues?: { clueId: number; isSolved: boolean }[];
  userId: string | null;
  refetch: () => void;
}) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [selectedClueId, setSelectedClueId] = useState<number | null>(null);

  const { verify } = useVerification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    console.log('Submitting verification:', { selectedClueId, code, userId });

    if (!selectedClueId) {
      setError('Please select a clue to verify.');
      return;
    }

    try {
      await verify(selectedClueId, code, userId, refetch);
      setCode('');
    } catch {
      setError('Invalid verification code. Please try again.');
    }
  };

  const unlockedStatus = clues.map(({ id }) => {
    const userClue = userClues.find((clue) => clue.clueId === id);
    return {
      number: id,
      unlocked: userClue ? userClue.isSolved : false,
    };
  });

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg border border-amber-200'>
      <h2 className='text-xl font-semibold mb-4 text-amber-800'>
        Unlock More Clues
      </h2>
      <div className='mb-4 flex flex-wrap gap-2'>
        {clues.map(({ id }) => {
          const isSolved = userClues.some(
            (clue) => clue.clueId === id && clue.isSolved
          );
          return (
            <button
              key={id}
              onClick={() => setSelectedClueId(id)}
              className={`px-3 py-1 rounded-full text-sm border transition-all ${
                isSolved
                  ? 'bg-green-100 text-green-800 border-green-300'
                  : 'bg-gray-100 text-gray-600 border-gray-300'
              } ${selectedClueId === id ? 'ring-2 ring-sky-500' : ''}`}
            >
              Clue {id} {isSolved ? '✓' : '🔒'}
            </button>
          );
        })}
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div>
          <Input
            type='text'
            placeholder='Enter verification code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='w-full'
          />
        </div>
        {error && <p className='text-red-500 text-sm'>{error}</p>}
        <Button type='submit' className='w-full bg-sky-200'>
          {/* <Link href={'/fail-clue'}>Verify Code</Link> */}
          Verify Code
        </Button>
      </form>
    </div>
  );
}
