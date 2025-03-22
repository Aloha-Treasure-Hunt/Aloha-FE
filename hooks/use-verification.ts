import { PostClue } from '@/components/api/clueApi';
import { toast } from 'react-toastify';
import { create } from 'zustand';

type VerificationStore = {
  verify: (
    clueNumber: number,
    code: string,
    userId: string | null,
    refetch: () => void
  ) => Promise<void>;
};

export const useVerification = create<VerificationStore>(() => ({
  verify: async (clueNumber, code, userId, refetch) => {
    if (!userId) {
      throw new Error('User ID is missing. Please log in.');
    }
    console.log('Verifying clue:', clueNumber, code, userId);

    try {
      const res = await PostClue(clueNumber, code, userId);
      if (res.message.includes('Incorrect')) {
        toast.error('Incorrect code');
      }
      console.log('Verification response:', res);
      refetch();
    } catch (error: any) {
      console.error('Verification failed:', error.message);
      throw new Error(error.response?.data?.message || 'Verification failed');
    }
  },
}));
