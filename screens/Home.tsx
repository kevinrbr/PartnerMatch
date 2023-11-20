import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import { useNavigation } from '@react-navigation/native'
import { signOut } from '../services/account'

const Home = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button title="deconnexion" onPress={signOut}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default Home