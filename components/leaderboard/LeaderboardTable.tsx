import { LeaderboardProps } from '@/types/leaderboard.types';
import { Camera, Compass, MapPin, PartyPopper } from 'lucide-react';
import React from 'react';

interface LeaderboardTableProps {
  leaderboardData: LeaderboardProps[];
  avatarGradients: Record<string, string>;
  badgeColors: Record<string, string>;
}

export default function LeaderboardTable({
  leaderboardData,
  avatarGradients,
  badgeColors,
}: LeaderboardTableProps) {
  return (
    <div className='mt-2 bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100'>
      {/* Table Header */}
      <div className='bg-gradient-to-r from-[#3498db] to-[#2980b9] text-white p-3'>
        <div className='grid grid-cols-12 gap-2'>
          <div className='col-span-2 text-center font-medium'>Rank</div>
          <div className='col-span-5 text-center font-medium'>Traveler</div>
          <div className='col-span-5 text-center font-medium ml-5'>Prize</div>
        </div>
      </div>

      {/* Table Body */}
      {leaderboardData.map((user, index) => {
        const prize =
          user.rank === 1
            ? '10 vouchers'
            : user.rank === 2
            ? '5 vouchers'
            : user.rank === 3
            ? '2 vouchers'
            : 'No Prize';
        return (
          <div
            key={user.rank}
            className='p-3 border-b border-gray-100 hover:bg-blue-50 transition-colors'
          >
            <div className='grid grid-cols-12 gap-2 items-center'>
              {/* Rank Column */}
              <div className='col-span-2'>
                <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold border-2 border-blue-100'>
                  {index + 1}
                </div>
              </div>

              {/* traveller Column */}
              <div className='col-span-5 flex items-center'>
                <div
                  className={`w-8 h-8 rounded-full ${
                    avatarGradients[user.rank]
                  } flex items-center justify-center mr-2 shadow-md shrink-0 mt-1`}
                >
                  <div className='bg-white rounded-full w-6 h-6 flex items-center justify-center'>
                    {index === 0 ? (
                      <PartyPopper className='h-4 w-4 ' />
                    ) : index === 1 ? (
                      <Camera className='h-4 w-4 text-orange-500' />
                    ) : (
                      <Compass className='h-4 w-4 text-green-600' />
                    )}
                  </div>
                </div>
                <div className='min-w-0 flex-1 justify-center'>
                  <div className='font-medium text-gray-800 truncate'>
                    {user.userName}
                  </div>
                  <div className='text-xs text-gray-500 flex items-center'>
                    <MapPin className='h-3 w-3 mr-1 text-blue-500 shrink-0' />
                    <span className='truncate'>{user.totalPoints} points</span>
                  </div>
                </div>
              </div>

              {/* Badge Column */}
              <div className='col-span-5 flex items-center justify-center'>
                <div
                  className={`${badgeColors[prize]} text-white text-xs px-2 py-1 rounded-full font-medium truncate w-fit ml-5`}
                  title={prize}
                >
                  {prize}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
