import React, { ReactNode } from 'react'
import { Keyboard, TouchableWithoutFeedback } from 'react-native'

type DismissKeyboardProps = {
  children?: ReactNode
}

const DismissKeyboard = ({ children }: DismissKeyboardProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard
