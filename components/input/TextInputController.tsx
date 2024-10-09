import { ReactNode, useState } from 'react'
import { FieldError } from 'react-hook-form'
import {
  StyleSheet,
  TextInput as NativeInputText,
  TextInputProps as NativeTextInputProps,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

type TextInputProps = NativeTextInputProps & {
  label?: string
  onInputChange?: (value: string) => void
  children?: ReactNode
  hasError?: FieldError
}

const TextInput = ({ children, label, onInputChange, hasError, ...props }: TextInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setFocused] = useState(false)

  const handleInputChange = (value: string) => {
    setInputValue(value)
    onInputChange(value)
  }

  const handleOnClick = () => {
    setFocused(true)
  }

  return (
    <View>
      {label && <Text style={[styles.label, isFocused && styles.labelFocused]}>{label}</Text>}
      <TouchableWithoutFeedback onFocus={handleOnClick}>
        <View style={[styles.inputTextContainer, isFocused && styles.inputTextFocused]}>
          <NativeInputText
            style={styles.inputText}
            value={inputValue}
            onChangeText={handleInputChange}
            onBlur={() => setFocused(false)}
            {...props}
          />
          {children}
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    borderColor: '#E6E6E6',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16,
    marginBottom: 0
  },
  label: {
    marginBottom: 8,
    marginLeft: 2,
    fontSize: 14,
    fontFamily: 'Satoshi-Bold'
  },
  labelError: {
    color: '#FE0E1A'
  },
  inputText: {
    fontFamily: 'Satoshi-Regular',
    height: 48,
    padding: 10,
    flex: 1
  },
  labelFocused: {
    color: '#FF7131'
  },
  inputTextFocused: {
    borderColor: '#FF7131'
  },
  inputTextError: {
    borderColor: '#FE0E1A'
  }
})

export default TextInput
