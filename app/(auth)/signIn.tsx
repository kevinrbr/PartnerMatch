import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Link } from 'expo-router'
import { useEffect, useState } from 'react'
import { Text, SafeAreaView, View, StyleSheet, Alert, Pressable } from 'react-native'
import validator from 'validator'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import TextError from '@/components/TextError'
import Title from '@/components/Title'
import PasswordInput from '@/components/input/PasswordInput'
import TextInput from '@/components/input/TextInput'
import { accountStore } from '@/stores/account.store'
import { RootStackParamList } from '@/types/routes'

type SignInNavigationProp = NativeStackNavigationProp<RootStackParamList, 'SignIn'>

const PASSWORD_MINIMUM_LENGTH = 6

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { login, loading, error } = accountStore()
  const navigation = useNavigation<SignInNavigationProp>()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setEmail('')
      setPassword('')
      setEmailError('')
      setPasswordError('')
    })

    return unsubscribe
  }, [navigation])

  const handleLogin = async () => {
    setEmailError('')
    setPasswordError('')
    let hasError = false

    if (!validator.isEmail(email)) {
      setEmailError('Veuillez entrer une adresse e-mail valide.')
      hasError = true
    }

    if (password.length < PASSWORD_MINIMUM_LENGTH) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.')
      hasError = true
    }

    if (!hasError) {
      await login(email, password)
      if (error) {
        if (error.includes('Invalid login credentials')) {
          Alert.alert(
            'Connexion',
            'Identifiants invalides. Veuillez vérifier votre email et votre mot de passe.'
          )
        } else {
          Alert.alert('Connexion', "Une erreur s'est produite lors de la connexion.")
        }
      }
    }
  }

  return (
    <DismissKeyboard>
      <SafeAreaView>
        <View style={styles.textContainer}>
          <Title variant="mainTitle">Connexion</Title>
          <Text style={styles.text}>
            Trouvez des partenaires de padel passionnés près de chez vous !
          </Text>
        </View>
        <View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="monemail@gmail.com"
                onInputChange={value => {
                  setEmail(value)
                  setEmailError('')
                }}
                autoCapitalize="none"
                label="Email"
                value={email}
                errorMessage={emailError}
              />
              {emailError && <TextError errorMsg={emailError} />}
            </View>
            <PasswordInput
              onInputChange={value => {
                setPassword(value)
                setPasswordError('')
              }}
              passwordError={passwordError}
            />
            <Text style={styles.forgottenPwd}>Mot de passe oublié</Text>
            <View style={styles.loginButton}>
              <Button title="Se connecter" onPress={handleLogin} disabled={loading} />
            </View>
            <Link href="/signUp" asChild>
              <Pressable style={styles.redirectSignUpTextContainer}>
                <Text style={styles.redirectSignUpTextLeft}>Pas encore de compte ?</Text>
                <Text style={styles.redirectSignUpTextRight}>Je m'inscris</Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 10
  },
  textContainer: {
    marginBottom: 48
  },
  text: {
    color: '#4E5D6B',
    fontSize: 16,
    fontFamily: 'Satoshi-Regular',
    textAlign: 'left',
    maxWidth: 360,
    marginTop: 16
  },
  forgottenPwd: {
    textAlign: 'right',
    fontSize: 13,
    fontFamily: 'Satoshi-Bold',
    color: '#FF7131',
    marginTop: 12
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
    color: '#737373'
  },
  redirectSignUpTextRight: {
    fontSize: 13,
    fontFamily: 'Satoshi-Bold',
    color: '#FF7131',
    marginLeft: 4
  },
  inputContainer: {
    marginBottom: 24
  },
  loginButton: {
    marginTop: 28,
    marginBottom: 16
  }
})

export default SignIn
