import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, Animated } from 'react-native'
import { CheckBadgeIcon, ExclamationCircleIcon } from 'react-native-heroicons/solid'

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
      {error ? (
        <ExclamationCircleIcon style={styles.icon} color="#fff" />
      ) : (
        <CheckBadgeIcon style={styles.icon} color="#12e354" />
      )}
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#08bd41',
    color: 'white',
    padding: 12,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    zIndex: 999,
    width: '100%',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  errorBtn: {
    backgroundColor: 'rgba(239,8,8,1)'
  },
  icon: {
    marginRight: 8
  },
  text: {
    color: '#fff',
    fontSize: 16
  }
})

export default Toast
