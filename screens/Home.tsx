import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../components/Button'
import { signOut } from '../services/account'

const Home = () => {
  return (
    <SafeAreaView>
      <Text>Home</Text>
      <Button title="deconnexion" onPress={signOut} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({})

export default Home