import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Session } from '@supabase/supabase-js'
import { useFonts } from 'expo-font'
import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import Home from '@/screens/Home' // Importez votre composant de page d'accueil
import SignIn from '@/screens/SignIn'
import SignUp from '@/screens/SignUp'
import { supabaseAuth } from '@/services/constants'

const Stack = createNativeStackNavigator()

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabaseAuth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabaseAuth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('@/assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('@/assets/fonts/Satoshi-Bold.otf')
  })

  if (!fontsLoaded) {
    return null
  }

  // Ajoutez la redirection conditionnelle ici
  return (
    <View>
      <Text>dzdsds</Text>
    </View>
  )
}
