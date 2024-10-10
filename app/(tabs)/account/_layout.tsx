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
          header: () => <Header title="Informations personnelles" layoutHeader />
        }}
      />
      <Stack.Screen
        name="firstName"
        options={{
          header: () => <Header title="Quel est votre prénom ?" layoutHeader />
        }}
      />
      <Stack.Screen
        name="lastName"
        options={{
          header: () => <Header title="Quel est votre nom ?" layoutHeader />
        }}
      />
    </Stack>
  )
}
