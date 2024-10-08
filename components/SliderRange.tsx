import React, { useState } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { GestureHandlerRootView, GestureDetector, Gesture } from 'react-native-gesture-handler'
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useDerivedValue,
  runOnJS
} from 'react-native-reanimated'

const SLIDER_WIDTH = 300
const THUMB_SIZE = 28

const Slider = () => {
  const [selectedValue, setSelectedValue] = useState('0 - 10')

  const leftThumbOffset = useSharedValue(0)
  const rightThumbOffset = useSharedValue(SLIDER_WIDTH - THUMB_SIZE)
  const MAX_VALUE = SLIDER_WIDTH - THUMB_SIZE

  const leftPan = Gesture.Pan().onChange(event => {
    leftThumbOffset.value = Math.min(
      Math.max(0, leftThumbOffset.value + event.changeX),
      rightThumbOffset.value
    )
  })

  const rightPan = Gesture.Pan().onChange(event => {
    rightThumbOffset.value = Math.max(
      Math.min(MAX_VALUE, rightThumbOffset.value + event.changeX),
      leftThumbOffset.value
    )
  })

  const leftThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(leftThumbOffset.value) }]
    }
  })

  const rightThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withSpring(rightThumbOffset.value) }]
    }
  })

  const rangeStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: leftThumbOffset.value + THUMB_SIZE / 2,
      width: rightThumbOffset.value - leftThumbOffset.value,
      backgroundColor: '#FF7131'
    }
  })

  useDerivedValue(() => {
    const leftValue = Math.round((leftThumbOffset.value / MAX_VALUE) * 10)
    const rightValue = Math.round((rightThumbOffset.value / MAX_VALUE) * 10)
    const value = leftValue === rightValue ? `${leftValue}` : `${leftValue} - ${rightValue}`

    runOnJS(setSelectedValue)(value)
  })

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.sliderTrack}>
        <Animated.View style={[styles.rangeTrack, rangeStyle]} />
        <GestureDetector gesture={leftPan}>
          <Animated.View style={[styles.sliderHandle, leftThumbStyle]}>
            <ChevronLeftIcon color="#fff" size={12} />
            <ChevronRightIcon color="#fff" size={12} />
          </Animated.View>
        </GestureDetector>
        <GestureDetector gesture={rightPan}>
          <Animated.View style={[styles.sliderHandle, rightThumbStyle]}>
            <ChevronLeftIcon color="#fff" size={12} />
            <ChevronRightIcon color="#fff" size={12} />
          </Animated.View>
        </GestureDetector>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textLabel}>Je recherche des joueurs de niveaux :</Text>
        <Text style={styles.textValue}>{selectedValue}</Text>
      </View>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: 1,
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    justifyContent: 'center',
    position: 'relative'
  },
  rangeTrack: {
    height: 1,
    borderRadius: 5,
    position: 'absolute',
    top: 0
  },
  sliderHandle: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    backgroundColor: '#FF7131',
    borderRadius: THUMB_SIZE / 2,
    position: 'absolute',
    top: -(THUMB_SIZE / 2) + 0.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContainer: {
    marginTop: 28,
    alignItems: 'center'
  },
  textLabel: {
    color: '#4E5D6B',
    fontSize: 14,
    fontFamily: 'Satoshi-Regular',
    textAlign: 'center'
  },
  textValue: {
    fontSize: 16,
    fontFamily: 'Satoshi-Bold',
    textAlign: 'center',
    marginTop: 8
  }
})

export default Slider
