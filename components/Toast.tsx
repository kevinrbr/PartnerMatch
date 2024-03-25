import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'

type ToastProps = {
  message: string
  showToast: boolean
  error?: boolean
  setShowToast: React.Dispatch<React.SetStateAction<boolean>>
}

const Toast = ({ message, showToast, setShowToast, error }: ToastProps) => {
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
        error && styles.errorBtn,
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
    backgroundColor: 'rgba(28,202,87,1)',
    color: 'white',
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 999,
    width: '100%'
  },
  errorBtn: {
    backgroundColor: 'rgba(239,8,8,1)'
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
})

export default Toast
