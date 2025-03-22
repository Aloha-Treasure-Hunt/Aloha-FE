'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVerification } from '@/hooks/use-verification';
import Link from 'next/link';
import { ClueData } from '@/types/challenges.types';

export function VerificationForm({ clues = [] }: { clues?: ClueData[] }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { verify, unlockedClues } = useVerification();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await verify(code);
      setCode('');
    } catch {
      setError('Invalid verification code. Please try again.');
    }
  };

  // Show which clues are unlocked
  const unlockedStatus = clues.map(({ id }) => ({
    number: id,
    unlocked: unlockedClues.includes(id),
  }));

  return (
    <div className='max-w-md mx-auto p-6 bg-white rounded-lg border border-amber-200'>
      <h2 className='text-xl font-semibold mb-4 text-amber-800'>
        Unlock More Clues
      </h2>
      <div className='mb-4 flex flex-wrap gap-2'>
        {unlockedStatus.map(({ number, unlocked }) => (
          <div
            key={number}
            className={`px-3 py-1 rounded-full text-sm ${
              unlocked
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-gray-100 text-gray-600 border border-gray-300'
            }`}
          >
            Clue {number} {unlocked ? '✓' : '🔒'}
          </div>
        ))}
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
        <Button type='submit' className='w-full'>
          <Link href={'/fail-clue'}>Verify Code</Link>
        </Button>
      </form>
    </div>
  );
}
