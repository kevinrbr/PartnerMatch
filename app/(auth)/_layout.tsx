import { Slot } from 'expo-router'
import { View } from 'react-native'

export default function AuthLayout() {
  return (
    <View style={{ marginTop: 80, marginHorizontal: 16 }}>
      <Slot />
    </View>
  )
}
