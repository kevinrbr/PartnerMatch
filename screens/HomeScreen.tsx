import { Text, SafeAreaView, View, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import TestSvg from './../assets/images/monsvg.svg';
import { title1 } from './../common/styles';

const HomeScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.svgContainer}>
        <TestSvg 
          width={100}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={title1}>Je me connecte</Text>
        <Text style={styles.text}>La recherche de partenaires de padel est désormais facile</Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholder="monemail@gmail.com"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Entrez votre mot de passe"
          onChangeText={setPassword}
          value={password}
          secureTextEntry={true}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
  },
  svgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    color: '#4E5D6B',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    textAlign: 'center',
    maxWidth: 360,
    marginTop: 20
  },
  input: { 
    height: 48,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
  },
});

export default HomeScreen