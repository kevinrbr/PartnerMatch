import React, { ReactNode } from 'react'
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native'

type DismissKeyboardProps = {
  children?: ReactNode
}

const DismissKeyboard = ({ children }: DismissKeyboardProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} accessible={false}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard
