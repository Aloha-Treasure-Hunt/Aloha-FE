import { Traveler } from '@/types/traveler.types';

export const LOCATIONS = {
  HCMC: {
    name: 'Ho Chi Minh City',
    center: [10.7769, 106.7009] as [number, number],
    markers: [
      {
        position: [10.7769, 106.7009] as [number, number],
        radius: 6000,
        color: '#008080',
        name: 'HCMC Hunt Area',
        description: 'Find treasures in this exciting urban adventure!',
      },
    ],
  },
  DANANG: {
    name: 'Da Nang',
    center: [16.0712, 108.2336] as [number, number],
    markers: [
      {
        position: [16.0712, 108.2336] as [number, number],
        radius: 5000,
        color: '#FF8C00',
        name: 'Da Nang Hunt Area',
        description: 'Beach and mountain treasures await explorers!',
      },
    ],
  },
  HANOI: {
    name: 'Hanoi',
    center: [21.0285, 105.8542] as [number, number],
    markers: [
      {
        position: [21.0285, 105.8542] as [number, number],
        radius: 5500,
        color: '#9370DB',
        name: 'Hanoi Hunt Area',
        description: 'Historic treasures hidden throughout the city!',
      },
    ],
  },
};

export const leaderboardData: Traveler[] = [
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

export const avatarGradients = {
  blue: 'bg-gradient-to-br from-indigo-500 to-purple-600',
  yellow: 'bg-gradient-to-br from-amber-200 to-orange-400',
  green: 'bg-gradient-to-br from-green-300 to-emerald-500',
};

export const badgeColors = {
  'Explorer Pro': 'bg-gradient-to-r from-indigo-500 to-purple-600',
  'Adventure Seeker': 'bg-gradient-to-r from-amber-500 to-orange-500',
  'Nature Lover': 'bg-gradient-to-r from-green-500 to-emerald-600',
};
