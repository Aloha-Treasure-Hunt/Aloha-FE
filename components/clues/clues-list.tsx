'use client';

import { useVerification } from '@/hooks/use-verification';
import { Clue } from './clue';
import type { ClueData } from './clue';
export function CluesList({ clues = [] }: { clues?: ClueData[] }) {
  return (
    <div className='space-y-6'>
      {clues.map((clue) => {
        return <Clue key={clue.id} data={clue} />;
      })}
    </div>
  );
}
