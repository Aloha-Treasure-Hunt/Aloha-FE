'use client';

import { useVerification } from '@/hooks/use-verification';
import { Clue } from './clue';
import type { ClueData } from './clue';

export function CluesList({ clues = [] }: { clues?: ClueData[] }) {
  const { unlockedClues } = useVerification();

  return (
    <div className='space-y-6'>
      {clues.map((clue) => {
        const isUnlocked = clue.id === 1 || unlockedClues?.includes(clue.id);

        return (
          <Clue key={clue.id} id={clue.id} isLocked={!isUnlocked} data={clue} />
        );
      })}
    </div>
  );
}
