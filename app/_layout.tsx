import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import { View, StyleSheet } from 'react-native'

export default function Root() {
  const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('@/assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('@/assets/fonts/Satoshi-Bold.otf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf')
  })

  if (!fontsLoaded) {
    return null
  } else {
    return (
      <View style={styles.container}>
        <Slot />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
