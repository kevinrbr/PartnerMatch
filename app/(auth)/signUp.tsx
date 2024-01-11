import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import validator from 'validator'

import GoogleSvg from '@/assets/images/google.svg'
import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import Separator from '@/components/Separator'
import TextError from '@/components/TextError'
import TextInput from '@/components/TextInput'
import Title from '@/components/Title'
import { signUpWithEmail } from '@/services/account'
import { RootStackParamList } from '@/types/routes'

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleRegister = async () => {
    setLoading(true)
    setEmailError('')
    setPasswordError('')
    let hasError = false

    if (!validator.isEmail(email)) {
      setEmailError('Veuillez entrer une adresse e-mail valide.')
      hasError = true
    }

    if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.')
      hasError = true
    }

    if (hasError) {
      setLoading(false)
      return
    }

    if (hasError) {
      setLoading(false)
    } else {
      signUpWithEmail(email, password)
        .then(value => {
          Alert.alert('Please check your inbox for email verification!')
        })
        .catch(() => {
          Alert.alert('Inscription', "Une erreur s'est produite lors de l'inscription.")
        })
        .finally(() => setLoading(false))
    }
  }

  return (
    <DismissKeyboard>
      <SafeAreaView style={styles.container}>
        <View style={styles.textContainer}>
          <Title variant="mainTitle">Je m'inscris</Title>
          <Text style={styles.text}>La recherche de partenaires de padel est désormais facile</Text>
        </View>
        <View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="monemail@gmail.com"
                onInputChange={value => setEmail(value)}
                autoCapitalize="none"
                label="Email"
              />
              {emailError && <TextError errorMsg={emailError} />}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Entrez votre mot de passe"
                onInputChange={value => setPassword(value)}
                autoCapitalize="none"
                secureTextEntry
                label="Mot de passe"
              />
              {passwordError && <TextError errorMsg={passwordError} />}
            </View>
            <Button
              title="S'inscrire"
              accessibilityLabel="Bouton pour se connecter"
              disabled={loading}
              onPress={() => handleRegister()}
            />
            <Link href="/signIn" asChild>
              <View style={styles.redirectSignUpTextContainer}>
                <Text style={styles.redirectSignUpTextLeft}>J'ai déjà un compte</Text>
              </View>
            </Link>
          </View>
          <Separator text="ou" />
          <Button
            title="Se connecter avec Google"
            accessibilityLabel="Bouton pour se connecter avec Google"
            variant="transparentSecondary"
          >
            <GoogleSvg />
          </Button>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    display: 'flex',
    justifyContent: 'center',
    height: '100%'
  },
  formContainer: {
    marginBottom: 10
  },
  svgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  textContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  text: {
    color: '#4E5D6B',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    textAlign: 'center',
    maxWidth: 360,
    marginTop: 16
  },
  optionsContainer: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  forgottenPwd: {
    width: 'auto',
    fontSize: 14,
    fontFamily: 'Satoshi-Regular'
  },
  redirectSignUpTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center'
  },
  redirectSignUpTextLeft: {
    fontSize: 13,
    fontFamily: 'Satoshi-Regular',
    fontStyle: 'italic',
    color: '#4E5D6B'
  },
  inputContainer: {
    marginVertical: 8
  }
})

export default SignUp