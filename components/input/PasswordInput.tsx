import { useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { EyeIcon, EyeSlashIcon } from 'react-native-heroicons/outline'

import TextError from '@/components/TextError'
import TextInput from '@/components/input/TextInput'

type PasswordInputProps = {
  passwordError?: string
  onInputChange: (value: string) => void
}

const PasswordInput = ({ passwordError, onInputChange }: PasswordInputProps) => {
  const [passwordVisibility, setPasswordVisibility] = useState(false)

  const handlePasswordVisibility = () => {
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
        {passwordVisibility ? (
          <EyeSlashIcon size={22} color="#232323" />
        ) : (
          <EyeIcon size={22} color="#232323" />
        )}
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
