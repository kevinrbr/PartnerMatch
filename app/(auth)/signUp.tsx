import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, SafeAreaView, View, StyleSheet, Alert, Pressable } from 'react-native'
import validator from 'validator'

import GoogleSvg from '@/assets/images/google.svg'
import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import Separator from '@/components/Separator'
import TextError from '@/components/TextError'
import Title from '@/components/Title'
import PasswordInput from '@/components/input/PasswordInput'
import TextInput from '@/components/input/TextInput'
import { signUpWithEmail } from '@/services/account'

const SignUp = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [nameError, setNameError] = useState('')
  const [loading, setLoading] = useState<boolean>()

  const handleRegister = async () => {
    setLoading(true), setEmailError('')
    setPasswordError('')
    setNameError('')
    setNameError('')
    let hasError = false

    if (!validator.isEmail(email)) {
      setEmailError('Veuillez entrer une adresse e-mail valide.')
      hasError = true
    }

    if (password.length < 6) {
      setPasswordError('Le mot de passe doit contenir au moins 6 caractères.')
      hasError = true
    }

    if (name.length < 3) {
      setNameError('Incorrect changez wording')
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
        .then(() => {
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
      <SafeAreaView>
        <View style={styles.textContainer}>
          <Title variant="mainTitle">Créer un compte</Title>
          <Text style={styles.text}>
            Trouvez des partenaires de padel passionnés près de chez vous !
          </Text>
        </View>
        <View>
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Antoine Pascaud"
                onInputChange={value => {
                  setName(value)
                  setNameError('')
                }}
                autoCapitalize="none"
                label="Nom et prénom"
                errorMessage={nameError}
              />
              {nameError && <TextError errorMsg={nameError} />}
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="monemail@gmail.com"
                onInputChange={value => {
                  setEmail(value)
                  setEmailError('')
                }}
                autoCapitalize="none"
                label="Email"
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
          </View>
          <View style={styles.loginButton}>
            <Button title="S'inscrire" onPress={() => handleRegister()} />
          </View>
          <Link href="/signIn" asChild>
            <Pressable style={styles.redirectSignUpTextContainer}>
              <Text style={styles.redirectSignUpTextLeft}>Déjà un compte ?</Text>
              <Text style={styles.redirectSignUpTextRight}>Je me connecte</Text>
            </Pressable>
          </Link>
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

export default SignUp
