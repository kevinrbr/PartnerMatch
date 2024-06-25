import { useState } from 'react'
import { View, Pressable } from 'react-native'
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
    <View>
      <TextInput
        placeholder="Entrez votre mot de passe"
        onInputChange={onInputChange}
        autoCapitalize="none"
        secureTextEntry={!passwordVisibility}
        label="Mot de passe"
        errorMessage={passwordError}
      >
        <Pressable onPress={handlePasswordVisibility}>
          {passwordVisibility ? (
            <EyeSlashIcon size={22} color="#232323" />
          ) : (
            <EyeIcon size={22} color="#232323" />
          )}
        </Pressable>
      </TextInput>
      {passwordError && <TextError errorMsg={passwordError} />}
    </View>
  )
}

export default PasswordInput
