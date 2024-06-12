import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import { View, StyleSheet, Text } from 'react-native'

const queryClient = new QueryClient()

export default function Root() {
  const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('@/assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('@/assets/fonts/Satoshi-Bold.otf'),
    'Poppins-Bold': require('@/assets/fonts/Poppins-Bold.ttf')
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Slot />
      </View>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
