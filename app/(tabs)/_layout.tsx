import { Tabs } from 'expo-router'
import { View } from 'react-native'
import {
  HomeIcon,
  ChatBubbleOvalLeftIcon,
  UserCircleIcon,
  PlusCircleIcon
} from 'react-native-heroicons/outline'

const StackLayout = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Tabs initialRouteName="home">
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: () => <HomeIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false
          }}
        />
        <Tabs.Screen
          name="messaging"
          options={{
            tabBarIcon: () => <ChatBubbleOvalLeftIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            tabBarIcon: () => <UserCircleIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false
          }}
        />
        <Tabs.Screen
          name="researchForm"
          options={{
            tabBarIcon: () => <PlusCircleIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false
          }}
        />
      </Tabs>
    </View>
  )
}

export default StackLayout
