import { StyleSheet, TextInput as NativeInputText, TextInputProps as NativeTextInputProps } from 'react-native'
import React, { useState } from 'react'

type TextInputProps = NativeTextInputProps & {
  onInputChange: (value: string) => void;
};

const TextInput = ({ onInputChange, ...props }: TextInputProps) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
    onInputChange(text);
  }

  return (
      <NativeInputText 
        style={styles.inputText}
        value={inputValue}
        onChangeText={handleInputChange}
        {...props}
      />
  )
}

const styles = StyleSheet.create({
  inputText: {
    fontFamily: 'Satoshi-Regular',
    height: 48,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
})

export default TextInput