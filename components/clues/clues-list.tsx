import { Clue } from './clue';
import type { ClueData } from './clue';
export function CluesList({
  clues = [],
  userClues,
}: {
  clues?: ClueData[];
  userClues: { clueId: number; isSolved: boolean }[];
}) {
  return (
    <div className='space-y-6'>
      {clues.map((clue, index) => {
        // const isSolved = userClues.some(
        //   (uc) => uc.clueId === clue.id && uc.isSolved
        // );
        const previousClueSolved =
          index === 0 ||
          userClues.some(
            (uc) => uc.clueId === clues[index - 1].id && uc.isSolved
          );
        return (
          <Clue
            key={clue.id}
            data={clue}
            // isSolved={isSolved}
            previousClueSolved={previousClueSolved}
          />
        );
      })}
    </div>
  );
}
