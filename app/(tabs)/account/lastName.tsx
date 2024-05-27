import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Button from '@/components/Button'
import TextError from '@/components/TextError'
import TextInput from '@/components/input/TextInput'
import { accountStore } from '@/stores/account.store'

const LastName = () => {
  const { user, updateProfileLastName } = accountStore()
  const [lastName, setLastName] = useState(user.lastName)
  const [lastNameError, setLastNameError] = useState('')

  const handleChange = () => {
    if (lastName.length === 0) {
      setLastNameError('Veuillez renseignez votre nom.')
      return
    }
    updateProfileLastName(lastName)
    router.push({ pathname: '/account/accountDetailList/' })
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          onInputChange={v => {
            setLastName(v)
            setLastNameError('')
          }}
          value={lastName}
          errorMessage={lastNameError}
        />
        {lastNameError && <TextError errorMsg={lastNameError} />}
      </View>
      <Button title="Enregistrer" onPress={() => handleChange()} />
    </View>
  )
}

export default LastName

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 26,
    paddingBottom: 36,
    paddingHorizontal: 16
  }
})
