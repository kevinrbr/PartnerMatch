import { Stack } from 'expo-router/stack'

import Header from '@/components/Header'

export default function ChatLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen
        name="index"
        options={{
          header: () => <Header title="Messages" />
        }}
      />
      <Stack.Screen
        name="[room]"
        options={{
          header: () => <Header title="Room" backRoute />
        }}
      />
    </Stack>
  )
}
