import { PostClue } from '@/components/api/clueApi';
import { create } from 'zustand';

type VerificationStore = {
  error: string;
  verify: (
    clueNumber: number,
    code: string,
    userId: string | null,
    refetch: () => void
  ) => Promise<void>;
  setError: (message: string) => void;
};

export const useVerification = create<VerificationStore>((set) => ({
  error: '',
  setError: (message) => set({ error: message }),

  verify: async (clueNumber, code, userId, refetch) => {
    if (!userId) {
      set({ error: 'User ID is missing. Please log in.' });
      return;
    }

    console.log('Verifying clue:', clueNumber, code, userId);

    try {
      const res = await PostClue(clueNumber, code, userId);

      if (res.message.includes('Incorrect')) {
        set({ error: 'Invalid verification code. Please try again.' });
        return;
      }

      console.log('Verification response:', res);
      set({ error: '' });
      refetch();
    } catch (error) {
      console.error('Error verifying clue:', error);

      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: 'An unknown error occurred.' });
      }
    }
  },
}));
