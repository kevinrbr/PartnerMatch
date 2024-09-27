import { Stack } from 'expo-router/stack'

import Header from '@/components/Header'

export default function AddGameLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="clubForm"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="moreInformationsForm"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
