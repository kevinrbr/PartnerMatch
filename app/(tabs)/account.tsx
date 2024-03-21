import { Session } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { StyleSheet, Pressable, Text, ScrollView } from 'react-native'
import { ArrowLeftStartOnRectangleIcon } from 'react-native-heroicons/outline'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import SlotList from '@/components/SlotList'
import TextInput from '@/components/input/TextInput'
import { signOut, updateProfile } from '@/services/account'
import { supabaseAuth } from '@/services/constants'
import { getBookingByUserId, getSlotsByUserId } from '@/services/slot'

const Account = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [session, setSession] = useState<Session | null>(null)

  const slotsByUserId = useQuery({
    queryKey: ['slotsByUserId'],
    queryFn: getSlotsByUserId
  })

  const bookingByUserId = useQuery({
    queryKey: ['bookingByUserId'],
    queryFn: getBookingByUserId
  })

  supabaseAuth.getSession().then(({ data: { session } }) => {
    setSession(session)
  })

  const saveInfos = () => {
    updateProfile(firstName, lastName)
  }

  return (
    <DismissKeyboard>
      <ScrollView style={styles.container}>
        <TextInput
          placeholder="Prénom"
          onInputChange={setFirstName}
          label="Prénom"
          value={firstName}
        />
        <TextInput placeholder="Nom" onInputChange={setLastName} label="Nom" value={lastName} />
        <Button title="Enregister" onPress={saveInfos} />
        <Pressable style={styles.disconnectLinkContainer} onPress={signOut}>
          <ArrowLeftStartOnRectangleIcon color="#182A60" />
          <Text style={styles.disconnectLink}>Se deconnecter</Text>
        </Pressable>
        <SlotList slots={slotsByUserId} />
        <SlotList slots={bookingByUserId} />
      </ScrollView>
    </DismissKeyboard>
  )
}

export default Account

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 26,
    paddingTop: 30
  },
  disconnectLinkContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16
  },
  disconnectLink: {
    marginLeft: 8,
    color: '#4E5D6B',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular'
  }
})
