import { Text, SafeAreaView, View, StyleSheet } from 'react-native'
import { useState } from 'react'
import LoginSvg from './../assets/images/loginSvg.svg';
import GoogleSvg from './../assets/images/google.svg';
import Title from '../components/Title';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Checkbox from '../components/Checkbox';

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRememberMe, setIsRememberMe] = useState<boolean>(false);
  
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
          autoCapitalize="none"
          autoFocus
          label='Email'
        />
        <TextInput
          placeholder="Entrez votre mot de passe"
          onInputChange={(value) => setPassword(value)}
          autoCapitalize="none"
          secureTextEntry={true}
          label='Mot de passe'
        />
        <View style={styles.optionsContainer}>
          <Checkbox 
            label='Se souvenir de moi'
            onCheckboxChange={(e) => setIsRememberMe(e)}
            value={isRememberMe}
          />
          <Text style={styles.forgottenPwd}>Mot de passe oublié</Text>
        </View>
        <Button
          title="Se connecter"
          accessibilityLabel="Bouton pour se connecter"
        />
        <Text style={styles.orText}>ou</Text>
        <Button
          title="Se connecter avec Google"
          accessibilityLabel="Bouton pour se connecter avec Google"
          variant='transparentSecondary'
        >
          <GoogleSvg />
        </Button>
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
    marginBottom: 30,
  },
  text: {
    color: '#4E5D6B',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    textAlign: 'center',
    maxWidth: 360,
    marginTop: 16,
  },
  orText: {
    width: '100%',
    textAlign: 'center',
    marginVertical: 8,
    fontFamily: 'Satoshi-Regular',
    fontSize: 16,
  },
  optionsContainer: {
    marginVertical: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgottenPwd: {
    width: 'auto',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
  },
});

export default HomeScreen