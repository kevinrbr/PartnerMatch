import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

type CounterProps = {
  min: number
  max: number
}

const Counter = ({ min, max }: CounterProps) => {
  const [count, setCount] = useState(1)

  const increment = () => {
    if (count < max) setCount(prev => prev + 1)
  }

  const decrement = () => {
    if (count > min) setCount(prev => prev - 1)
  }

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterLabel}>Nombre de places disponibles :</Text>
      <View style={styles.counter}>
        {count > min ? (
          <TouchableOpacity onPress={decrement} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.invisibleButton} />
        )}
        <Text style={styles.counterValue}>{count}</Text>
        {count < max ? (
          <TouchableOpacity onPress={increment} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.invisibleButton} />
        )}
      </View>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  counter: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  counterLabel: {
    fontFamily: 'Satoshi-Regular',
    fontSize: 16
  },
  button: {
    marginHorizontal: 12
  },
  buttonText: {
    fontFamily: 'Satoshi-Regular',
    color: '#191822',
    fontSize: 32
  },
  counterValue: {
    fontFamily: 'Satoshi-Bold',
    fontSize: 26,
    fontWeight: 'bold'
  },
  invisibleButton: {
    width: 22,
    marginHorizontal: 12
  }
})
