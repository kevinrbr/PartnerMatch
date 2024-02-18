import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
const queryClient = new QueryClient()

export default function Root() {
  const [fontsLoaded] = useFonts({
    'Satoshi-Regular': require('@/assets/fonts/Satoshi-Regular.otf'),
    'Satoshi-Bold': require('@/assets/fonts/Satoshi-Bold.otf')
  })

  if (!fontsLoaded) {
    return null
  }
  return <Slot />
}
