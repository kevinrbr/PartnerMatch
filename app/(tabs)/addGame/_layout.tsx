import { Stack } from 'expo-router/stack'

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
        name="date"
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
