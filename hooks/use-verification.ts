import { create } from 'zustand'

type VerificationStore = {
  unlockedClues: number[]
  verify: (code: string) => Promise<void>
}

// Simple verification codes for testing
const VERIFICATION_CODES = {
  'FATCAT': 2,
  'SPRINGROLL': 3,
  'GODANA': 4,
  'SPACEG': 5,
  'WOLFY': 6,
}

export const useVerification = create<VerificationStore>((set) => ({
  unlockedClues: [1], // Clue 1 is unlocked by default
  verify: async (code: string) => {
    const normalizedCode = code.trim().toUpperCase()
    const clueNumber = VERIFICATION_CODES[normalizedCode as keyof typeof VERIFICATION_CODES]

    if (!clueNumber) {
      throw new Error('Invalid verification code')
    }

    set((state) => ({
      unlockedClues: [...new Set([...state.unlockedClues, clueNumber])]
    }))
  }
})) 