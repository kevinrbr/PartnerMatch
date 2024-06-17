import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { signUpWithEmail } from '@/services/account'
import { userType } from '@/types/user'

interface AccountStore {
  register: (email: string, password: string) => Promise<string>
}
export const accountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
      register: async (email, password) => {
        set({ loading: true, error: null })
        try {
          const userId = await signUpWithEmail(email, password)
          return userId // Retourner l'ID utilisateur
        } catch (error) {
          set({ error: error.message, loading: false })
        }
      }
    }),
    {
      name: 'account-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
