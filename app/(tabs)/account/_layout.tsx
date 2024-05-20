import { Stack } from 'expo-router/stack'

import Header from '@/components/Header'

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="accountDetailList"
        options={{
          header: () => <Header title="Informations personnelles" />
        }}
      />
    </Stack>
  )
}
