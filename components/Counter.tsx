import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

type CounterProps = {
  min: number
  max: number
  value: number
  onChange: (newValue: number) => void
}

const Counter = ({ min, max, value, onChange }: CounterProps) => {
  const increment = () => {
    if (value < max) onChange(value + 1)
  }

  const decrement = () => {
    if (value > min) onChange(value - 1)
  }

  return (
    <View style={styles.counterContainer}>
      <Text style={styles.counterLabel}>Nombre de places disponibles :</Text>
      <View style={styles.counter}>
        {value > min ? (
          <TouchableOpacity onPress={decrement} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.invisibleButton} />
        )}
        <Text style={styles.counterValue}>{value}</Text>
        {value < max ? (
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
