'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useVerification } from '@/hooks/use-verification';
import { ClueData } from '@/types/challenges.types';
import { KeyRound, Check, Lock, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

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
  const router = useRouter();
  const [code, setCode] = useState('');
  const [selectedClueId, setSelectedClueId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { error, verify, setError } = useVerification();

  // Chuyển userClues thành dạng Map để truy vấn nhanh hơn
  const solvedCluesMap = new Map(
    userClues.map((clue) => [clue.clueId, clue.isSolved])
  );

  // Xác định clue nào có thể chọn dựa trên thứ tự (order)
  const isClueUnlockable = (order: number) => {
    if (order === 1) return true; // Clue đầu tiên luôn mở
    return (
      solvedCluesMap.get(
        clues.find((clue) => clue.order === order - 1)?.id || 0
      ) === true
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedClueId) {
      setError('Please select a clue to verify.');
      return;
    }
    setIsLoading(true);
    try {
      await verify(
        selectedClueId,
        code,
        userId,
        refetch,
        () => {
          router.push('/success-clue');
        },
        setIsLoading
      );
    } catch {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className='max-w-md mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-blue-50 rounded-xl border border-blue-200 shadow-md'>
      {/* Form header with blue accent */}
      <div className='flex items-center mb-6'>
        <div className='h-8 w-2 bg-blue-500 rounded-full mr-3'></div>
        <h2 className='text-xl font-semibold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
          Unlock More Clues
        </h2>
      </div>

      <p className='text-gray-600 mb-4'>
        Select a clue and enter its verification code to unlock it:
      </p>

      {/* Clue selection buttons with enhanced styling */}
      <div className='mb-6 flex flex-wrap gap-2'>
        {clues.map(({ id, order }) => {
          const isSolved = solvedCluesMap.get(id) === true;
          const isUnlockable = isClueUnlockable(order);
          return (
            <button
              key={id}
              onClick={() => isUnlockable && setSelectedClueId(id)}
              className={`px-4 py-2 rounded-full text-sm border transition-all flex items-center gap-1.5 font-medium ${
                isSolved
                  ? 'bg-green-100 text-green-700 border-green-200 hover:bg-green-200'
                  : isUnlockable
                  ? 'bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-200'
                  : 'bg-gray-200 text-gray-500 border-gray-300 cursor-not-allowed'
              } ${
                selectedClueId === id ? 'ring-2 ring-blue-500 shadow-sm' : ''
              }`}
            >
              {isSolved ? (
                <Check size={14} className='text-green-600' />
              ) : (
                <Lock size={14} className='text-blue-600' />
              )}
              Clue {id}
            </button>
          );
        })}
      </div>

      {/* Verification form with enhanced styling */}
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='relative'>
          <KeyRound
            size={18}
            className='text-blue-500 absolute left-3 top-1/2 transform -translate-y-1/2'
          />
          <Input
            type='text'
            placeholder='Enter verification code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className='w-full pl-10 pr-4 py-2 border-blue-200 focus:ring-blue-500 focus:border-blue-500 rounded-lg'
          />
        </div>

        {error && (
          <div className='p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm animate-pulse'>
            {error}
          </div>
        )}

        <Button
          type='submit'
          className='w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors py-2 rounded-lg flex items-center justify-center gap-2 disabled:opacity-100'
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner /> : 'Verify Code'}
          {!isLoading && <ChevronRight size={16} />}
        </Button>

        {selectedClueId && (
          <p className='text-sm text-blue-600 text-center mt-2'>
            Verifying code for Clue {selectedClueId}
          </p>
        )}
      </form>
    </div>
  );
}
