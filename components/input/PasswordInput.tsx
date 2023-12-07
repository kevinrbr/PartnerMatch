import { useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import TextInput from './TextInput'
import TextError from '../TextError'

type PasswordInputProps = {
  passwordError?: string
  onInputChange: (value: string) => void
}

const PasswordInput = ({ passwordError, onInputChange }: PasswordInputProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)
  const [icon, setIcon] = useState('eye')

  const handlePasswordVisibility = () => {
    if (passwordVisibility) {
      setIcon('eye-off')
    } else {
      setIcon('eye')
    }

    setPasswordVisibility(!passwordVisibility)
  }

  return (
    <View style={styles.passwordContainer}>
      <TextInput
        placeholder="Entrez votre mot de passe"
        onInputChange={onInputChange}
        autoCapitalize="none"
        secureTextEntry={passwordVisibility}
        label="Mot de passe"
      />
      <Pressable onPress={handlePasswordVisibility}>
        <Icon name={icon} size={22} color="#232323" />
      </Pressable>
      {passwordError && <TextError errorMsg={passwordError} />}
    </View>
  )
}

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row'
  }
})

export default PasswordInput
