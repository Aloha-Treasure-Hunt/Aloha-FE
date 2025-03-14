export interface Traveller {
  id: number;
  name: string;
  points: number;
  destinations: number;
  avatar: AvatarColor;
  badge: string;
}

type AvatarColor = 'blue' | 'yellow' | 'green';
