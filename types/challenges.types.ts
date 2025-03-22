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
  cityId: number;
  question: string;
  answerCode: string;
  hint: string;
  points: number;
  timeBonus: number | null;
  order: number;
  title: string | null;
  destination: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  userProgresses: any[];
  id: number;
}
