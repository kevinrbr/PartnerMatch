import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { getProfilesDetails, signInWithEmail } from '@/services/account'
import { userType } from '@/types/user'

interface AccountStore {
  user: userType | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAccountStore = create<AccountStore>()(
  persist(
    set => ({
      user: null,
      loading: false,
      error: null,
      login: async (email, password) => {
        set({ loading: true, error: null })
        try {
          await signInWithEmail(email, password)
          const profileDetails = await getProfilesDetails()
          console.log('Profile Details:', profileDetails)
          set({ user: { ...profileDetails, email }, loading: false })
        } catch (error: any) {
          set({ error: error.message, loading: false })
        }
      },
      logout: () => set({ user: null })
    }),
    {
      name: 'account-storage',
      storage: createJSONStorage(() => AsyncStorage)
    }
  )
)
