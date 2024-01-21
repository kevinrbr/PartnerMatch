import { ReactNode, useState } from 'react'
import {
  StyleSheet,
  TextInput as NativeInputText,
  TextInputProps as NativeTextInputProps,
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

import TextError from '../TextError'

type TextInputProps = NativeTextInputProps & {
  label?: string
  onInputChange: (value: string) => void
  children?: ReactNode
  max?: number
  min?: number
}

const TextInput = ({ children, label, onInputChange, max, min, ...props }: TextInputProps) => {
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setFocused] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const isStylized = (): boolean => {
    return isFocused || inputValue !== ''
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
    onInputChange(value)
    setErrorMsg('')

    if ((max && +value > max) || (min && +value < min)) {
      setErrorMsg('ERREUR MA GUEULE')
    }
  }

  const handleOnClick = () => {
    setFocused(true)
  }

  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableWithoutFeedback onFocus={handleOnClick}>
        <View
          style={[
            styles.inputTextContainer,
            isStylized() && styles.inputTextFocused,
            inputValue !== '' && styles.inputTextNotEmpty
          ]}
        >
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
      <TextError errorMsg={errorMsg} />
    </View>
  )
}

const styles = StyleSheet.create({
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: 12,
    height: 48,
    borderColor: '#8996A2',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 16
  },
  label: {
    marginBottom: 6,
    marginLeft: 4,
    fontSize: 16,
    fontFamily: 'Satoshi-Regular'
  },
  inputText: {
    fontFamily: 'Satoshi-Regular',
    height: 48,
    flex: 1,
    padding: 10
  },
  inputTextFocused: {
    borderColor: '#182A60'
  },
  inputTextNotEmpty: {
    backgroundColor: '#F8F9FC'
  }
})

export default TextInput
