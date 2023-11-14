import { Text, SafeAreaView, View, StyleSheet } from 'react-native'
import React from 'react'
import LoginSvg from './../assets/images/loginSvg.svg';
import Title from '../components/Title';
import TextInput from '../components/TextInput';
import Button from '../components/Button';

const HomeScreen = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.svgContainer}>
        <LoginSvg 
          width={100}
        />
      </View>
      <View style={styles.textContainer}>
        <Title variant='mainTitle'>Je me connecte</Title>
        <Text style={styles.text}>La recherche de partenaires de padel est désormais facile</Text>
      </View>
      <View>
        <TextInput 
          placeholder="monemail@gmail.com" 
          onInputChange={(value) => setEmail(value)}
        />
        <TextInput
          placeholder="Entrez votre mot de passe"
          secureTextEntry={true}
          onInputChange={(value) => setPassword(value)}
        />
        <Button
          title="Learn More"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
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
});

export default HomeScreen