'use client';
import React, { useEffect, useState } from 'react';
import { Globe, MapPin, Compass, Camera, PartyPopper } from 'lucide-react';
import LeaderboardItem from './LeaderboardItem';
import LeaderboardTable from '@/components/leaderboard/LeaderboardTable';
// import { leaderboardData } from '@/lib/mockData';
import { avatarGradients, badgeColors } from '@/lib/leaderBoard';
import { getTop3UserByCityId } from '@/components/api/userProgressApi';
import { LeaderboardProps } from '@/types/leaderboard.types';
import Link from 'next/link';

export default function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardProps[]>(
    []
  );
  const [firstPlace, setFirstPlace] = useState<LeaderboardProps | null>(null);
  const [secondPlace, setSecondPlace] = useState<LeaderboardProps | null>(null);
  const [thirdPlace, setThirdPlace] = useState<LeaderboardProps | null>(null);

  useEffect(() => {
    if (leaderboardData.length >= 3) {
      setFirstPlace(leaderboardData.find((user) => user.rank === 1) || null);
      setSecondPlace(leaderboardData.find((user) => user.rank === 2) || null);
      setThirdPlace(leaderboardData.find((user) => user.rank === 3) || null);
    }
  }, [leaderboardData]);
  console.log('firstPlace', firstPlace);
  console.log('secondPlace', secondPlace);
  console.log('thirdPlace', thirdPlace);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTop3UserByCityId(1);
        console.log('response:', response);
        if (response?.data) {
          setLeaderboardData(response.data);
        }
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className='flex flex-col'>
      {/* Header with travel theme */}
      <div className='w-full bg-gradient-to-r from-[#3498db] to-[#2980b9] rounded-t-xl p-5 shadow-lg'>
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
      {leaderboardData.length >= 3 && (
        <div key='leaderboard' className='w-full rounded-b-2xl p-6 shadow-xl '>
          {/* Destinations explored counter */}
          <div className='flex justify-center mb-6'>
            <div className='bg-[#3498db] text-white px-6 py-1 rounded-full shadow flex items-center'>
              <MapPin className='h-4 w-4 mr-1' />
              <span className='text-sm'>Ho Chi Minh City</span>
            </div>
          </div>

          {/* Podium */}
          <div className='flex justify-center items-end mb-12 relative mt-16'>
            {/* 2nd Place */}
            {secondPlace && (
              <LeaderboardItem
                rank={2}
                name={secondPlace.userName}
                points={secondPlace.totalPoints}
                avatarGradient={avatarGradients.yellow}
                icon={<Camera className='h-7 w-7 text-orange-500' />}
              />
            )}

            {/* 1st Place */}
            {firstPlace && (
              <LeaderboardItem
                rank={1}
                name={firstPlace.userName}
                points={firstPlace.totalPoints}
                avatarGradient={avatarGradients.blue}
                icon={<PartyPopper className='h-10 w-10' />}
                size='large'
              />
            )}

            {/* 3rd Place */}
            {thirdPlace && (
              <LeaderboardItem
                rank={3}
                name={thirdPlace.userName}
                points={thirdPlace.totalPoints}
                avatarGradient={avatarGradients.green}
                icon={<Compass className='h-7 w-7 text-green-600' />}
              />
            )}
          </div>

          {/* Leaderboard Table */}
          <LeaderboardTable
            leaderboardData={leaderboardData}
            avatarGradients={avatarGradients}
            badgeColors={badgeColors}
          />

          {/* Bottom call to action */}
          <div className='mt-6 relative z-10'>
            <Link
              href={'/clues'}
              className='bg-gradient-to-r from-[#3498db] to-[#2980b9] text-white font-medium py-2 px-6 rounded-full shadow-md flex items-center justify-center mx-auto transition-all'
            >
              <Globe className='h-4 w-4 mr-2' />
              Start Your Journey
            </Link>
            <p className='text-gray-500 text-sm mt-2 text-center'>
              Explore more destinations to climb the ranking!
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
