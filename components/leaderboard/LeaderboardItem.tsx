import { Award } from 'lucide-react';
import React from 'react';

interface LeaderBoardItemProps {
  rank: number;
  name: string;
  points: number;
  avatarGradient: string;
  icon: React.ReactNode;
  size?: 'small' | 'large';
}

export default function LeaderboardItem({
  rank,
  name,
  points,
  avatarGradient,
  icon,
  size = 'small',
}: LeaderBoardItemProps) {
  return (
    <div className='flex flex-col items-center mx-3'>
      <div className='relative'>
        {rank === 1 && (
          <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 animate-pulse'>
            <Award className='h-8 w-8 text-yellow-500 filter drop-shadow-lg' />
          </div>
        )}
        <div
          className={`${
            size === 'large' ? 'w-20 h-20' : 'w-16 h-16'
          } rounded-full ${avatarGradient} shadow-lg flex items-center justify-center p-1 !important`}
        >
          <div className='bg-white rounded-full w-full h-full flex items-center justify-center'>
            {icon}
          </div>
        </div>
        <span className='absolute -bottom-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md text-sm font-bold text-gray-700'>
          {rank}
        </span>
      </div>

      {/* Improved name display with tooltip for long names */}
      <div className='relative group mt-2 w-24 text-center'>
        <p className='font-medium text-gray-800 truncate w-full'>{name}</p>
        {name.length > 12 && (
          <div className='absolute left-1/2 -translate-x-1/2 -bottom-8 invisible group-hover:visible bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10'>
            {name}
          </div>
        )}
      </div>

      <div
        className={`${
          size === 'large'
            ? 'w-24 h-36'
            : rank === 3
            ? 'w-20 h-20'
            : 'w-20 h-24'
        } mt-2 bg-gradient-to-b rounded-t-lg shadow-lg flex flex-col items-center justify-center transform perspective-800 rotateX-10 ${
          rank === 1
            ? 'from-sky-500 to-blue-600'
            : rank === 2
            ? 'from-amber-400 to-orange-500'
            : 'from-green-500 to-emerald-600'
        }`}
      >
        <span
          className={`${
            size === 'large' ? 'text-5xl' : 'text-4xl'
          } font-bold text-white drop-shadow-md`}
        >
          {rank}
        </span>
        <div className='rounded-full px-2 py-0.5 mt-1'>
          <span className='text-xs font-medium text-white'>
            {points} points
          </span>
        </div>
      </div>
    </div>
  );
}
