import { StyleSheet, Text, View } from 'react-native'

type Separatorprops =  {
    text: string;
  };

const Separator = ({ text }: Separatorprops) => {
  return (
    <View style={styles.separatorContainer}>
        <View style={styles.leftLine} />
        <Text style={styles.text}>ou</Text>
        <View style={styles.rightLine} />
    </View>
  )
}

const styles = StyleSheet.create({
    separatorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    leftLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
    },
    text: {
        textAlign: 'center',
        marginVertical: 8,
        fontFamily: 'Satoshi-Regular',
        fontSize: 16,
        marginHorizontal: 10,
    },
    rightLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'black',
    },
})

export default Separator