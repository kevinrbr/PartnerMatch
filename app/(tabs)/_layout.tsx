import { Tabs } from 'expo-router'

const StackLayout = () => {
  return (
    <Tabs initialRouteName="home">
      <Tabs.Screen name="home" />
      <Tabs.Screen name="messaging" />
      <Tabs.Screen name="account" />
      <Tabs.Screen name="researchForm" />
    </Tabs>
  )
}

export default StackLayout
