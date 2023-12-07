import { useState } from 'react'
import {
  StyleSheet,
  TextInput as NativeInputText,
  TextInputProps as NativeTextInputProps,
  View,
  Text
} from 'react-native'

type TextInputProps = NativeTextInputProps & {
  label?: string
  onInputChange: (value: string) => void
}

const TextInput = ({ label, onInputChange, ...props }: TextInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setFocused] = useState(false)

  const isStylized = (): boolean => {
    return isFocused || inputValue !== ''
  }

  const handleInputChange = (text: string) => {
    setInputValue(text)
    onInputChange(text)
  }

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <NativeInputText
        style={[
          styles.inputText,
          isStylized() && styles.inputTextFocused,
          inputValue !== '' && styles.inputTextNotEmpty
        ]}
        value={inputValue}
        onChangeText={handleInputChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...props}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Satoshi-Regular'
  },
  inputText: {
    fontFamily: 'Satoshi-Regular',
    height: 48,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    borderColor: '#8996A2'
  },
  inputTextFocused: {
    borderColor: '#182A60'
  },
  inputTextNotEmpty: {
    backgroundColor: '#F8F9FC'
  }
})

export default TextInput
