import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import {
  TextInput,
  GestureHandlerRootView,
  GestureDetector,
  Gesture
} from 'react-native-gesture-handler'
import { ChevronLeftIcon, ChevronRightIcon } from 'react-native-heroicons/solid' // Importer l'icône de Hero Icons
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedProps
} from 'react-native-reanimated'

const SLIDER_WIDTH = 300
const THUMB_SIZE = 28

Animated.addWhitelistedNativeProps({ text: true })

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput)

const Slider = () => {
  const leftThumbOffset = useSharedValue(0)
  const rightThumbOffset = useSharedValue(SLIDER_WIDTH - THUMB_SIZE)
  const MAX_VALUE = SLIDER_WIDTH - THUMB_SIZE

  const leftPan = Gesture.Pan().onChange(event => {
    // Permettre à la gauche d'aller jusqu'à la droite
    leftThumbOffset.value = Math.min(
      Math.max(0, leftThumbOffset.value + event.changeX),
      rightThumbOffset.value
    )
  })

  const rightPan = Gesture.Pan().onChange(event => {
    // Permettre à la droite d'aller jusqu'à la gauche
    rightThumbOffset.value = Math.max(
      Math.min(MAX_VALUE, rightThumbOffset.value + event.changeX),
      leftThumbOffset.value
    )
  })

  const leftThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: leftThumbOffset.value }]
    }
  })

  const rightThumbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: rightThumbOffset.value }]
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

  const animatedProps = useAnimatedProps(() => {
    const leftValue = Math.round((leftThumbOffset.value / MAX_VALUE) * 10)
    const rightValue = Math.round((rightThumbOffset.value / MAX_VALUE) * 10)

    // Si les deux poignées sont sur la même valeur, afficher une seule valeur
    const displayValue =
      leftValue === rightValue
        ? `Valeur sélectionnée: ${leftValue}`
        : `Plage de valeurs: ${leftValue} - ${rightValue}`

    return {
      text: displayValue,
      defaultValue: displayValue
    }
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
      <AnimatedTextInput
        animatedProps={animatedProps}
        style={styles.boxWidthText}
        editable={false}
      />
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: 1, // Ligne très fine pour la piste
    backgroundColor: '#EBEBEB',
    borderRadius: 5,
    justifyContent: 'center',
    position: 'relative'
  },
  rangeTrack: {
    height: 1, // Même hauteur que la piste
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
    top: -(THUMB_SIZE / 2) + 0.5, // Centré sur la ligne de 1px
    flexDirection: 'row',
    justifyContent: 'center', // Centrer l'icône horizontalement
    alignItems: 'center' // Centrer l'icône verticalement
  },
  boxWidthText: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 18
  }
})

export default Slider
