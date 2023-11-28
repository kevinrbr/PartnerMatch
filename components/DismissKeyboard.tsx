import { StyleSheet, Text, View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React, { ReactNode } from 'react'

type DismissKeyboardProps = {
    children?: ReactNode;
}

const DismissKeyboard = ({ children }: DismissKeyboardProps) => {
  return (
   <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children }
    </TouchableWithoutFeedback>
  )
}

export default DismissKeyboard

const styles = StyleSheet.create({})