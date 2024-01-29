import { Session } from '@supabase/supabase-js'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, View } from 'react-native'

import Button from '@/components/Button'
import { signOut } from '@/services/account'
import { supabaseAuth } from '@/services/constants'

const Account = () => {
  const [session, setSession] = useState<Session | null>(null)

  supabaseAuth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  return (
    <View>
      <Text>account</Text>
      <Button title="deconnexion" onPress={signOut} />
      <Link href="/signIn" asChild>
        <Button title="Connexion" />
      </Link>
    </View>
  )
}

export default Account
