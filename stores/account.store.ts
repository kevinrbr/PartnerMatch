// store/accountStore.ts

import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

import { getProfilesDetails, signInWithEmail, updateProfileFirstName } from '@/services/account'
import { userType } from '@/types/user'

interface AccountStore {
  user: userType | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  updateProfileFirstName: (firstName: string) => Promise<void>
  logout: () => void
}

export const accountStore = create<AccountStore>()(
  persist(
    (set, get) => ({
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
      updateProfileFirstName: async firstName => {
        set({ loading: true, error: null })
        try {
          const user = get().user
          if (!user) throw new Error('User not logged in')

          await updateProfileFirstName(user.id, firstName)

          set(state => ({
            user: state.user ? { ...state.user, firstName } : null,
            loading: false
          }))
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
