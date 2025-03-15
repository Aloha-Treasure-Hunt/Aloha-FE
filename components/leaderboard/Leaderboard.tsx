'use client';
import React from 'react';
import { Globe, MapPin, Compass, Camera, PartyPopper } from 'lucide-react';
import LeaderboardItem from './LeaderboardItem';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
import { Traveller } from '@/app/api/travellers/types';

export default function Leaderboard() {
  const leaderboardData: Traveller[] = [
    {
      id: 1,
      name: 'Linda',
      points: 1800,
      destinations: 9,
      badge: 'Explorer Pro',
    },
    {
      id: 2,
      name: 'Sara',
      points: 1700,
      destinations: 7,
      badge: 'Adventure Seeker',
    },
    {
      id: 3,
      name: 'Nate',
      points: 1500,
      destinations: 6,
      badge: 'Nature Lover',
    },
  ];

  const avatarGradients = {
    blue: 'bg-gradient-to-br from-indigo-500 to-purple-600',
    yellow: 'bg-gradient-to-br from-amber-200 to-orange-400',
    green: 'bg-gradient-to-br from-green-300 to-emerald-500',
  };

  const badgeColors = {
    'Explorer Pro': 'bg-gradient-to-r from-indigo-500 to-purple-600',
    'Adventure Seeker': 'bg-gradient-to-r from-amber-500 to-orange-500',
    'Nature Lover': 'bg-gradient-to-r from-green-500 to-emerald-600',
  };

  return (
    <div className='flex flex-col'>
      {/* Header with travel theme */}
      <div className='w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-t-xl p-5 shadow-lg'>
        <div className='flex items-center justify-center space-x-2'>
          <Globe className='text-white h-6 w-6' />
          <h1 className='text-white text-2xl font-bold tracking-wider'>
            Explorer Ranking
          </h1>
        </div>
        <p className='text-blue-100 text-sm mt-1 text-center'>
          Top players in treasure hunt
        </p>
      </div>

      {/* Top 3 Explorers */}
      <div className='w-full bg-gradient-to-b from-white to-blue-50 rounded-b-2xl p-6 shadow-xl '>
        {/* Destinations explored counter */}
        <div className='flex justify-center mb-6'>
          <div className='bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-1 rounded-full shadow flex items-center'>
            <MapPin className='h-4 w-4 mr-1' />
            <span className='text-sm'>Ho Chi Minh City</span>
          </div>
        </div>

        {/* Podium */}
        <div className='flex justify-center items-end mb-12 relative mt-16'>
          {/* 2nd Place */}
          <LeaderboardItem
            rank={2}
            name={leaderboardData[1].name}
            points={leaderboardData[1].points}
            avatarGradient={avatarGradients.yellow}
            icon={<Camera className='h-7 w-7 text-orange-500' />}
          />

          {/* 1st Place */}
          <LeaderboardItem
            rank={1}
            name={leaderboardData[0].name}
            points={leaderboardData[0].points}
            avatarGradient={avatarGradients.blue}
            icon={<PartyPopper className='h-10 w-10 text-indigo-700' />}
            size='large'
          />

          {/* 3rd Place */}
          <LeaderboardItem
            rank={3}
            name={leaderboardData[2].name}
            points={leaderboardData[2].points}
            avatarGradient={avatarGradients.green}
            icon={<Compass className='h-7 w-7 text-green-600' />}
          />
        </div>

        {/* Leaderboard Table - FIXED VERSION */}
        <LeaderboardTable
          leaderboardData={leaderboardData}
          avatarGradients={avatarGradients}
          badgeColors={badgeColors}
        />

        {/* Bottom call to action */}
        <div className='mt-6 relative z-10'>
          <button className='bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-full shadow-md flex items-center justify-center mx-auto transition-all'>
            <Globe className='h-4 w-4 mr-2' />
            Start Your Journey
          </button>
          <p className='text-gray-500 text-sm mt-2 text-center'>
            Explore more destinations to climb the ranking!
          </p>
        </div>
      </div>
    </div>
  );
}
