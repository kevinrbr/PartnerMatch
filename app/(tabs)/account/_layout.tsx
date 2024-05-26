import { Stack } from 'expo-router/stack'

import Header from '@/components/Header'

export default function Layout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
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
      <Stack.Screen
        name="FirstName"
        options={{
          header: () => <Header title="Quel est votre prénom ?" />
        }}
      />
    </Stack>
  )
}
