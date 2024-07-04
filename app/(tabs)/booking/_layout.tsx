import { Stack } from 'expo-router/stack'

import Header from '@/components/Header'

export default function BookingLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' } }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="manageMySlots"
        options={{
          header: () => <Header title="Gérer mes annonces" />
        }}
      />
      <Stack.Screen
        name="manageMyBookings"
        options={{
          header: () => <Header title="Gérer mes réservations" />
        }}
      />
    </Stack>
  )
}