import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

type TextErrorProps = TextProps & {
  errorMsg: string
}

const TextError = ({ errorMsg, ...props }: TextErrorProps) => {
  return (
    <Text {...props} style={styles.error}>
      {errorMsg}
    </Text>
  )
}

export default TextError

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 12,
    fontFamily: 'Satoshi-Regular',
    marginTop: 6
  }
})
