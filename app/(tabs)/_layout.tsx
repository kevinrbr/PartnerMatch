import { Tabs, useSegments } from 'expo-router'
import { View } from 'react-native'
import {
  HomeIcon,
  ChatBubbleOvalLeftIcon,
  UserCircleIcon,
  PlusCircleIcon,
  BookmarkIcon
} from 'react-native-heroicons/outline'

const StackLayout = () => {
  const segments = useSegments()
  return (
    <View style={{ flex: 1 }}>
      <Tabs initialRouteName="messaging" sceneContainerStyle={{ backgroundColor: '#fff' }}>
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: () => <HomeIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="messaging"
          options={{
            tabBarIcon: () => <ChatBubbleOvalLeftIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="booking"
          options={{
            tabBarIcon: () => <BookmarkIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false,
            headerShown: false
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            tabBarIcon: () => <UserCircleIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false,
            headerShown: false,
            tabBarStyle: {
              display: segments[1] === 'account' && segments[2] ? 'none' : 'flex'
            }
          }}
        />
        <Tabs.Screen
          name="researchForm"
          options={{
            tabBarIcon: () => <PlusCircleIcon color="#182A60" strokeWidth="1" />,
            tabBarShowLabel: false,
            headerShown: false
          }}
        />
      </Tabs>
    </View>
  )
}

export default StackLayout
