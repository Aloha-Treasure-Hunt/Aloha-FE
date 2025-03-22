'use client';
import { CluesList } from '@/components/clues/clues-list';
import { VerificationForm } from '@/components/clues/verification-form';
import { useEffect, useState } from 'react';
import { getClueApi } from '@/components/api/clueApi';
import { ClueData } from '@/types/challenges.types';
import { getUserProgressByUserId } from '@/components/api/userProgressApi';

export default function CluesComponent() {
  const [clues, setClues] = useState<ClueData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem('id');
    setUserId(storedUserId);
  }, []);
  useEffect(() => {
    async function fetchClues() {
      try {
        if (userId) {
          await getUserProgressByUserId(userId);
        }
        const data = await getClueApi();
        setClues(data);
      } catch (err) {
        setError('Failed to fetch clues');
      } finally {
        setLoading(false);
      }
    }
    fetchClues();
  }, [userId]);
  return (
    <main className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold text-center text-amber-800 mb-8'>
        Treasure Hunt Clues
      </h1>
      {loading && <p className='text-center'>loading...</p>}
      {error && <p className='text-center text-red-500'>{error}</p>}
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        <div className='lg:col-span-1'>
          <VerificationForm clues={clues} />
        </div>

        <div className='lg:col-span-2'>
          <CluesList clues={clues} />
        </div>
      </div>
    </main>
  );
}
