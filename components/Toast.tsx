import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'

const Toast = ({ message, showToast, setShowToast }) => {
  const [fadeAnim] = useState(new Animated.Value(0))

  useEffect(() => {
    let timer

    if (showToast) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true
      }).start(() => {
        timer = setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          }).start(() => {
            setShowToast(false)
          })
        }, 2000)
      })
    }

    return () => {
      clearTimeout(timer)
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true
      }).start()
    }
  }, [showToast])

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim
        }
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 999
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
})

export default Toast
