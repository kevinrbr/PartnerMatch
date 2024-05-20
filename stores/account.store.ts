import { create } from 'zustand'

import { signInWithEmail } from '@/services/account'

interface AccountStore {
  user: { email: string } | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAccountStore = create<AccountStore>(set => ({
  user: null,
  loading: false,
  error: null,
  login: async (email, password) => {
    set({ loading: true, error: null })
    try {
      await signInWithEmail(email, password)
      set({ user: { email }, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },
  logout: () => set({ user: null })
}))
