import { Link } from 'expo-router'
import { useState } from 'react'
import { Text, SafeAreaView, View, StyleSheet, Alert, Pressable } from 'react-native'
import validator from 'validator'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import TextError from '@/components/TextError'
import Title from '@/components/Title'
import PasswordInput from '@/components/input/PasswordInput'
import TextInput from '@/components/input/TextInput'
import { useEditProfile } from '@/services/account/useEditProfile'
import { useRegister } from '@/services/account/useRegister'

const SignUp = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [nameError, setNameError] = useState('')

  const { mutate: register } = useRegister()
  const { mutate: editProfile } = useEditProfile()
  const handleRegister = async () => {
    setEmailError('')
    setPasswordError('')
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

    if (firstName.length === 0 || lastName.length === 0) {
      setNameError('Veuillez renseigner votre nom et prénom')
      hasError = true
    }

    if (!hasError) {
      register(
        { email, password },
        {
          onSuccess: async userId => {
            if (userId) {
              editProfile({ firstName, lastName, userId })
            }
            Alert.alert(
              'Inscription',
              'Veuillez vérifier votre boîte de réception pour la vérification de votre e-mail !'
            )
          },
          onError: error => {
            Alert.alert('Inscription', error.message)
          }
        }
      )
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
          <View>
            <View style={[styles.inputContainer]}>
              <View style={styles.inputMultipleContainer}>
                <View style={styles.input50}>
                  <TextInput
                    placeholder="Antoine"
                    onInputChange={value => {
                      setLastName(value)
                      setNameError('')
                    }}
                    autoCapitalize="none"
                    label="Prénom"
                    errorMessage={nameError}
                  />
                </View>
                <View style={styles.input50}>
                  <TextInput
                    placeholder="Pascaud"
                    onInputChange={value => {
                      setFirstName(value)
                      setNameError('')
                    }}
                    autoCapitalize="none"
                    label="Nom"
                    errorMessage={nameError}
                  />
                </View>
              </View>
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
            <Button title="S'inscrire" onPress={handleRegister} />
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
  },
  inputMultipleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 12
  },
  input50: {
    flex: 1
  }
})

export default SignUp
