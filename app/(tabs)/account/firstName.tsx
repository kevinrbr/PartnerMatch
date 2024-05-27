import { router } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import Button from '@/components/Button'
import TextError from '@/components/TextError'
import TextInput from '@/components/input/TextInput'
import { accountStore } from '@/stores/account.store'

const FirstName = () => {
  const { user, updateProfileFirstName } = accountStore()
  const [firstName, setFirstName] = useState(user.firstName)
  const [firstNameError, setFirstNameError] = useState('')

  const handleChange = () => {
    if (firstName.length === 0) {
      setFirstNameError('Veuillez renseignez votre prénom.')
      return
    }
    updateProfileFirstName(firstName)
    router.navigate({ pathname: '/account/accountDetailList/' })
  }
  return (
    <View style={styles.container}>
      <View>
        <TextInput
          onInputChange={v => {
            setFirstName(v)
            setFirstNameError('')
          }}
          value={firstName}
          errorMessage={firstNameError}
        />
        {firstNameError && <TextError errorMsg={firstNameError} />}
      </View>
      <Button title="Enregistrer" onPress={() => handleChange()} />
    </View>
  )
}

export default FirstName

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
