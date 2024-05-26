import { StyleSheet, Text, View } from 'react-native'

const messaging = () => {
  return (
    <View style={styles.container}>
      <Text>messaging</Text>
    </View>
  )
}

export default messaging

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'pink',
    paddingTop: 80
  }
})
