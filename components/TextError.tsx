import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type TextErrorProps = {
    errorMsg: string;
}

const TextError = ({errorMsg}: TextErrorProps) => {
  return (
      <Text style={styles.error}>{errorMsg}</Text>
  )
}

export default TextError;

const styles = StyleSheet.create({
    error: {
        color: 'red',
        fontSize: 13,
        fontFamily: 'Satoshi-Regular',
    },
});