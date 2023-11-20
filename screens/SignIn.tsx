import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import GoogleSvg from './../assets/images/google.svg';
import Title from '../components/Title';
import TextInput from '../components/TextInput';
import Button from '../components/Button';
import Separator from '../components/Separator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/routes';
import { Alert } from 'react-native';
import { signInWithPassword } from '../services/account';

type SignInNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>;

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false)

  const navigation = useNavigation<SignInNavigationProp>();

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await signInWithPassword(email, password);
    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.forgottenPwd}>Mot de passe oublié</Text>
        </View>
        <Button
          title="Se connecter"
          accessibilityLabel="Bouton pour se connecter"
          disabled={loading} 
          onPress={() => signInWithEmail()}
        />
        <TouchableOpacity onPress={navigateToSignUp}>
          <View style={styles.redirectSignUpTextContainer}>
            <Text style={styles.redirectSignUpTextLeft}>Pas encore de compte ?</Text>
            <Text style={styles.redirectSignUpTextRight}>S'inscrire</Text>
          </View>
        </TouchableOpacity>
        <Separator text='ou'/>
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
  redirectSignUpTextRight: {
    fontSize: 13,
    fontFamily: 'Satoshi-Bold',
    fontStyle: 'italic',
    color: '#182A60',
    marginLeft: 6,
  }
});

export default SignIn