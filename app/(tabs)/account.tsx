import { Session } from '@supabase/supabase-js'
import { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Button from '@/components/Button'
import TextInput from '@/components/input/TextInput'
import { signOut, updateProfile } from '@/services/account'
import { supabaseAuth } from '@/services/constants'

const Account = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [session, setSession] = useState<Session | null>(null)

  supabaseAuth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  const saveInfos = () => {
    updateProfile(firstName, lastName)
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Prénom"
        onInputChange={setFirstName}
        label="Prénom"
        value={firstName}
      />
      <TextInput placeholder="Nom" onInputChange={setLastName} label="Nom" value={lastName} />
      <Button title="Enregister" onPress={saveInfos} />
      <Button title="deconnexion" onPress={signOut} />
    </View>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 26,
    paddingTop: 30
  }
})
