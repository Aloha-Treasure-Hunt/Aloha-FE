export interface Challenge {
  id: string;
  text: string;
  points: number;
  isBonus?: boolean;
  completed: boolean;
  description?: string;
  requirements?: string[];
}
export interface TreasureHuntItem {
  id: number;
  cityId: number;
  title: string;
  description: string;
  points: number;
  requirement: string[];
}

export interface ClueData {
  title: string;
  description: string;
  hint?: string;
}
