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
    backgroundColor: 'linear-gradient(90deg, rgba(255,255,255,1) 20%, rgba(250,250,250,1) 100%);',
    paddingTop: 80
  }
})
