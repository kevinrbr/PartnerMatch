import { StyleSheet, Text, View } from 'react-native'

type Separatorprops = {
  text: string
}

const Separator = ({ text }: Separatorprops) => {
  return (
    <View style={styles.separatorContainer}>
      <View style={styles.line} />
      <Text style={styles.text}>ou</Text>
      <View style={styles.line} />
    </View>
  )
}

const styles = StyleSheet.create({
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8
  },
  line: {
    flex: 1,
    height: 0.5,
    backgroundColor: 'black'
  },
  text: {
    textAlign: 'center',
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
    marginHorizontal: 10,
    marginBottom: 5
  }
})

export default Separator
