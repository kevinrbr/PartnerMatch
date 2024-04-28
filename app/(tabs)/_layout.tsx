import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Tabs } from 'expo-router'
import { View, StyleSheet } from 'react-native'
import {
  HomeIcon,
  ChatBubbleOvalLeftIcon,
  UserCircleIcon,
  PlusCircleIcon,
  BookmarkIcon
} from 'react-native-heroicons/outline'
const queryClient = new QueryClient()
const StackLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <View style={{ flex: 1, marginTop: 64 }}>
        <View style={{ flex: 1, marginHorizontal: 16 }}>
          <Tabs initialRouteName="home">
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
                headerShown: false
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
      </View>
    </QueryClientProvider>
  )
}

export default StackLayout
