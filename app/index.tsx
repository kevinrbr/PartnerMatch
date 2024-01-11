import { router } from 'expo-router'
import { useEffect } from 'react'

import { supabaseAuth } from '@/services/constants'

export default function IndexPage() {
  useEffect(() => {
    supabaseAuth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(tabs)/home/')
      }
    })

    supabaseAuth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/(tabs)/home/')
      } else {
        router.replace('/(auth)/signIn')
      }
    })
  }, [])
}
