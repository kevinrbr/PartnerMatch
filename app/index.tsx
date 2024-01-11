import { router } from 'expo-router'
import { useEffect } from 'react'

import { supabaseAuth } from '@/services/constants'

export default function IndexPage() {
  useEffect(() => {
    supabaseAuth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.replace('/(tabs)/home/')
      } else {
        console.log('no user1')
      }
    })

    supabaseAuth.onAuthStateChange((_event, session) => {
      if (session) {
        router.replace('/(tabs)/home/')
      } else {
        console.log('no user2')
        router.replace('/(auth)/signIn')
      }
    })
  }, [])
}
