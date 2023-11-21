import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import GoogleSvg from './../assets/images/google.svg';
import Title from '../components/Title';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Separator from '../components/Separator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/routes';
import { signUpWithEmail } from '../services/account';
import TextError from '../components/TextError';
import validator from 'validator';

type SignUpNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignUp'>;

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation<SignUpNavigationProp>();

  const handleRegister = async () => {
    setLoading(true)
    const { error, session } = await signUpWithEmail(email, password);
    if (!validator.isEmail(email)) {
      setEmailError('Veuillez entrer une adresse e-mail valide.');
    }

    if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.');
    }
    
    if (!session && !error) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.textContainer}>
        <Title variant='mainTitle'>Je m'inscris</Title>
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
        {emailError && <TextError errorMsg={emailError} />}
        <TextInput
          placeholder="Entrez votre mot de passe"
          onInputChange={(value) => setPassword(value)}
          autoCapitalize="none"
          secureTextEntry={true}
          label='Mot de passe'
        />
        {passwordError && <TextError errorMsg={passwordError} />}
        <Button
          title="S'inscrire"
          accessibilityLabel="Bouton pour se connecter"
          disabled={loading}
          onPress={() => handleRegister()}
        />
        <TouchableOpacity onPress={navigateToSignIn}>
          <View style={styles.redirectSignUpTextContainer}>
            <Text style={styles.redirectSignUpTextLeft}>J'ai déjà un compte</Text>
          </View>
        </TouchableOpacity>
        <Separator text='ou' />
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
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
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
  optionsContainer: {
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgottenPwd: {
    width: 'auto',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
  },
  redirectSignUpTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  redirectSignUpTextLeft: {
    fontSize: 13,
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'italic',
    color: '#4E5D6B',
  },
});

export default SignUp