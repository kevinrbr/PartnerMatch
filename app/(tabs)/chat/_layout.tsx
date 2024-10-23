import { Stack } from 'expo-router/stack'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Header from '@/components/Header'

export default function ChatLayout() {
  const insets = useSafeAreaInsets()

  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header title="Room" style={{ paddingTop: insets.top }} />
        }}
      />
      <Stack.Screen
        name="[room]"
        options={{
          header: () => <Header title="Room" style={{ paddingTop: insets.top }} />
        }}
      />
    </Stack>
  )
}
