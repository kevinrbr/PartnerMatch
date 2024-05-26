import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Button from '@/components/Button'
import TextInput from '@/components/input/TextInput'
import { accountStore } from '@/stores/account.store'

const FirstName = () => {
  const { user, updateProfileFirstName } = accountStore()
  const [firstName, setFirstName] = useState(user.firstName)
  return (
    <View style={styles.container}>
      <TextInput onInputChange={v => setFirstName(v)} value={firstName} />
      <Button title="Enregistrer" onPress={() => updateProfileFirstName(firstName)} />
    </View>
  )
}

export default FirstName

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between'
  }
})
