import { Session } from '@supabase/supabase-js'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, View, Button } from 'react-native'

import { signOut } from '@/services/account'
import { supabaseAuth } from '@/services/constants'
import { supabase } from '@/supabase'

const Home = () => {
  const [session, setSession] = useState<Session | null>(null)

  supabaseAuth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  return (
    <View>
      <Text>home</Text>
      {session && <Text>Session active</Text>}
      <Button title="deconnexion" onPress={signOut} />
      <Link href="/signIn" asChild>
        <Button title="Connexion" />
      </Link>
    </View>
  )
}

export default Home
