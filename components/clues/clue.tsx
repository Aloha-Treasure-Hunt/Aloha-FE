import { Button } from '@/components/ui/button';
import { ClueData } from '@/types/challenges.types';
import { useState } from 'react';
import {
  Lightbulb,
  MapPin,
  BarChart2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export interface ClueProps {
  data: ClueData;
}

export function Clue({ data }: ClueProps) {
  const [showHint, setShowHint] = useState(false);

  // Function to get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    if (!difficulty) return 'bg-gray-100 text-gray-600';

    const level = difficulty.toLowerCase();
    if (level.includes('easy')) return 'bg-green-100 text-green-700';
    if (level.includes('medium')) return 'bg-yellow-100 text-yellow-700';
    if (level.includes('hard')) return 'bg-red-100 text-red-700';
    return 'bg-blue-100 text-blue-700';
  };

  return (
    <div className='p-6 rounded-xl border bg-gradient-to-br from-blue-50 via-white to-blue-50 shadow-md hover:shadow-lg transition-all duration-300 border-blue-200'>
      {/* Clue header with colored accent */}
      <div className='flex items-center mb-4'>
        <div className='h-8 w-2 bg-blue-500 rounded-full mr-3'></div>
        <h3 className='text-xl font-semibold text-blue-700 flex items-center gap-2'>
          <span className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-600 text-white shadow-sm'>
            {data.id}
          </span>
          <span className='bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent'>
            Clue
          </span>
        </h3>
      </div>

      <div className='flex flex-col md:flex-row gap-6'>
        <div className='md:w-full space-y-4'>
          {/* Question with decorative quotation marks */}
          <div className='relative pl-6 pr-2'>
            <span className='absolute left-0 top-0 text-3xl text-blue-300'>
              "
            </span>
            <p className='text-gray-800 font-medium py-2'>{data.question}</p>
            <span className='absolute right-0 bottom-0 text-3xl text-blue-300'>
              "
            </span>
          </div>

          {/* Metadata section with badge styling */}
          <div className='flex flex-wrap gap-3 mt-4'>
            {data.destination && (
              <div className='flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm'>
                <MapPin size={16} className='text-blue-500' />
                <span className='font-medium'>Destination:</span>
                <span>{data.destination}</span>
              </div>
            )}

            {data.difficulty && (
              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${getDifficultyColor(
                  data.difficulty
                )}`}
              >
                <BarChart2 size={16} />
                <span className='font-medium'>Difficulty:</span>
                <span>{data.difficulty}</span>
              </div>
            )}
          </div>

          {/* Hint section with improved animation */}
          <div className='relative mt-4'>
            <Button
              onClick={() => setShowHint(!showHint)}
              variant='outline'
              className='text-sm px-4 py-2 rounded-full flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-600 hover:text-white border-none transition-all shadow-sm hover:shadow'
            >
              <Lightbulb size={18} className='text-yellow-200' />
              {showHint ? 'Hide Hint' : 'Show Hint'}
              {showHint ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </Button>

            {showHint && (
              <div className='mt-4 p-4 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 shadow-inner animate-fadeIn'>
                <div className='flex gap-2 items-start'>
                  <div className='h-6 w-6 rounded-full bg-yellow-400 flex items-center justify-center mt-0.5'>
                    <Lightbulb size={14} className='text-white' />
                  </div>
                  <p className='text-sm text-blue-700 flex-1'>
                    <span className='font-bold text-indigo-600'>Hint: </span>
                    {data.hint}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export type { ClueData };
