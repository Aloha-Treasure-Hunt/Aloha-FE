import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface VerificationStore {
  isVerified: boolean
  verify: (code: string) => Promise<void>
}

export const useVerification = create<VerificationStore>()(
  persist(
    (set) => ({
      isVerified: false,
      verify: async (code: string) => {
        // In a real app, you would verify this code with your backend
        if (code === 'TREASURE2024') { // Example verification code
          set({ isVerified: true })
        } else {
          throw new Error('Invalid code')
        }
      },
    }),
    {
      name: 'verification-storage',
    }
  )
) 