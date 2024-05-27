import { Stack } from 'expo-router/stack'

import Header from '@/components/Header'

export default function AccountLayout() {
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
        name="firstName"
        options={{
          header: () => <Header title="Quel est votre prénom ?" />
        }}
      />
      <Stack.Screen
        name="lastName"
        options={{
          header: () => <Header title="Quel est votre nom ?" />
        }}
      />
    </Stack>
  )
}
