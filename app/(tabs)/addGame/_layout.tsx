import { Stack } from 'expo-router/stack'

export default function AddGameLayout() {
  return (
    <Stack screenOptions={{ contentStyle: { backgroundColor: '#fff' }, animation: 'none' }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  )
}
