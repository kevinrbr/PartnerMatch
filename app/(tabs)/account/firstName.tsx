import { router } from 'expo-router'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { View, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import TextError from '@/components/TextError'
import TextInput from '@/components/input/TextInput'
import { useEditUserFirstName } from '@/services/account/useEditUserFirstName'
import { useUser } from '@/services/account/useUser'

const FirstName = () => {
  const { data: user } = useUser()
  const editProfile = useEditUserFirstName()

  const methods = useForm({
    defaultValues: {
      firstName: user.firstName || ''
    }
  })

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = methods

  const onSubmit = (data: any) => {
    editProfile.mutate(data.firstName)
    router.navigate({ pathname: '/account/accountDetailList/' })
  }

  return (
    <DismissKeyboard>
      <FormProvider {...methods}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.container}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0} // Réglage du décalage clavier
        >
          <View style={styles.formContainer}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Le champ est requis' },
                minLength: { value: 2, message: 'Le prénom doit contenir au moins 2 caractères' }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Votre prénom"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.firstName ? errors.firstName.message?.toString() : undefined}
                />
              )}
              name="firstName"
            />
            {errors.firstName && <TextError errorMsg={errors.firstName.message?.toString()} />}
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Enregistrer" onPress={handleSubmit(onSubmit)} />
          </View>
        </KeyboardAvoidingView>
      </FormProvider>
    </DismissKeyboard>
  )
}

export default FirstName

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 12
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    justifyContent: 'flex-end'
  }
})
