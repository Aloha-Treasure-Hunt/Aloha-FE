export interface Challenge {
  id: string;
  text: string;
  points: number;
  isBonus?: boolean;
  completed: boolean;
  description?: string;
  requirements?: string[];
}

export interface ClueData {
  title: string;
  description: string;
  hint?: string;
}
