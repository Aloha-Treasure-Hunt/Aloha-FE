'use client';
import React from 'react';
import {
  Globe,
  MapPin,
  Compass,
  Award,
  Camera,
  PartyPopper,
} from 'lucide-react';

export default function Leaderboard() {
  type AvatarColor = 'blue' | 'yellow' | 'green';

  const leaderboardData: {
    id: number;
    name: string;
    points: number;
    avatar: AvatarColor;
    destinations: number;
    badge: string;
  }[] = [
    {
      id: 1,
      name: 'Linda',
      points: 1800,
      avatar: 'blue',
      destinations: 9,
      badge: 'Explorer Pro',
    },
    {
      id: 2,
      name: 'Sara',
      points: 1700,
      avatar: 'yellow',
      destinations: 7,
      badge: 'Adventure Seeker',
    },
    {
      id: 3,
      name: 'Nate',
      points: 1500,
      avatar: 'green',
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

        {/* Podium with 3D effect */}
        <div className='flex justify-center items-end mb-12 relative mt-16'>
          {/* 2nd Place */}
          <div className='flex flex-col items-center mr-3'>
            <div className='relative'>
              <div
                className={`w-16 h-16 rounded-full ${avatarGradients.yellow} shadow-lg flex items-center justify-center p-1`}
              >
                <div className='bg-white rounded-full w-full h-full flex items-center justify-center'>
                  <Camera className='h-7 w-7 text-orange-500' />
                </div>
              </div>
              <span className='absolute -bottom-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md text-sm font-bold text-gray-700'>
                2
              </span>
            </div>
            <p className='mt-2 font-medium text-gray-800'>
              {leaderboardData[1].name}
            </p>
            <div className='w-20 h-24 mt-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-t-lg shadow-lg flex flex-col items-center justify-center transform perspective-800 rotateX-10'>
              <span className='text-4xl font-bold text-white drop-shadow-md'>
                2
              </span>
              <div className=' rounded-full px-2 py-0.5 mt-1'>
                <span className='text-xs font-medium text-white'>
                  {leaderboardData[1].points} points
                </span>
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className='flex flex-col items-center z-20 -mt-8'>
            <div className='relative'>
              <div className='absolute -top-4 left-1/2 transform -translate-x-1/2 animate-pulse'>
                <Award className='h-8 w-8 mt- text-yellow-500 filter drop-shadow-lg' />
              </div>
              <div
                className={`w-20 h-20 rounded-full ${avatarGradients.blue} shadow-lg flex items-center justify-center p-1`}
              >
                <div className='bg-white rounded-full w-full h-full flex items-center justify-center'>
                  <PartyPopper className='h-10 w-10 text-indigo-700' />
                </div>
              </div>
              <span className='absolute -bottom-1 -right-1 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-md text-sm font-bold text-gray-700'>
                1
              </span>
            </div>
            <p className='mt-2 font-medium text-gray-800'>
              {leaderboardData[0].name}
            </p>
            <div className='w-24 h-36 mt-2 bg-gradient-to-t from-indigo-500 to-purple-600 rounded-t-lg shadow-lg flex flex-col items-center justify-center transform perspective-800 rotateX-10'>
              <span className='text-5xl font-bold text-white drop-shadow-md'>
                1
              </span>
              <div className='rounded-full px-3 py-0.5 mt-1'>
                <span className='text-xs font-medium text-white'>
                  {leaderboardData[0].points} points
                </span>
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className='flex flex-col items-center ml-3'>
            <div className='relative'>
              <div
                className={`w-16 h-16 rounded-full ${avatarGradients.green} shadow-lg flex items-center justify-center p-1`}
              >
                <div className='bg-white rounded-full w-full h-full flex items-center justify-center'>
                  <Compass className='h-7 w-7 text-green-600' />
                </div>
              </div>
              <span className='absolute -bottom-1 -right-1 bg-white rounded-full w-6 h-6 flex items-center justify-center shadow-md text-sm font-bold text-gray-700'>
                3
              </span>
            </div>
            <p className='mt-2 font-medium text-gray-800'>
              {leaderboardData[2].name}
            </p>
            <div className='w-20 h-20 mt-2 bg-gradient-to-b from-green-500 to-emerald-600 rounded-t-lg shadow-lg flex flex-col items-center justify-center transform perspective-800 rotateX-10'>
              <span className='text-4xl font-bold text-white drop-shadow-md'>
                3
              </span>
              <div className='rounded-full px-2 py-0.5 mt-1'>
                <span className='text-xs font-medium text-white'>
                  {leaderboardData[2].points} points
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Table - FIXED VERSION */}
        <div className='mt-2 bg-white rounded-xl overflow-hidden shadow-lg border border-blue-100'>
          {/* Table Header */}
          <div className='bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3'>
            <div className='grid grid-cols-12 gap-2'>
              <div className='col-span-2 text-center font-medium'>Rank</div>
              <div className='col-span-5 text-center font-medium'>Explorer</div>
              <div className='col-span-5 font-medium ml-5'>Badge</div>
            </div>
          </div>

          {/* Table Body */}
          {leaderboardData.map((explorer, index) => (
            <div
              key={explorer.id}
              className='p-3 border-b border-gray-100 hover:bg-blue-50 transition-colors'
            >
              <div className='grid grid-cols-12 gap-2 items-center'>
                {/* Rank Column */}
                <div className='col-span-2'>
                  <div className='w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-700 font-bold border-2 border-blue-100'>
                    {index + 1}
                  </div>
                </div>

                {/* Explorer Column */}
                <div className='col-span-5 flex items-center'>
                  <div
                    className={`w-8 h-8 rounded-full ${
                      avatarGradients[explorer.avatar]
                    } flex items-center justify-center mr-2 shadow-md shrink-0`}
                  >
                    <div className='bg-white rounded-full w-6 h-6 flex items-center justify-center'>
                      {index === 0 ? (
                        <PartyPopper className='h-4 w-4 text-indigo-700' />
                      ) : index === 1 ? (
                        <Camera className='h-4 w-4 text-orange-500' />
                      ) : (
                        <Compass className='h-4 w-4 text-green-600' />
                      )}
                    </div>
                  </div>
                  <div className='min-w-0 flex-1'>
                    <div className='font-medium text-gray-800 truncate'>
                      {explorer.name}
                    </div>
                    <div className='text-xs text-gray-500 flex items-center'>
                      <MapPin className='h-3 w-3 mr-1 text-blue-500 shrink-0' />
                      <span className='truncate'>
                        {explorer.destinations} destinations
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badge Column */}
                <div className='col-span-5 ml-5'>
                  <div
                    className={`${
                      badgeColors[explorer.badge as keyof typeof badgeColors]
                    } text-white text-xs px-2 py-1 rounded-full font-medium truncate w-fit`}
                    title={explorer.badge}
                  >
                    {explorer.badge}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
