import { router } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { View, StyleSheet, Text } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import TextError from '@/components/TextError'
import Title from '@/components/Title'
import TextInput from '@/components/input/TextInput'

const ClubForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      club: ''
    }
  })

  const onSubmit = data => {
    router.navigate({ pathname: '/addGame/moreInformationsForm/' })
  }

  const goNext = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View>
          <Title variant="pageTitle">Dans quelle club ?</Title>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Le champ est requis' },
                minLength: { value: 2, message: 'Renseignez un club' }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="UCPA"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.club}
                />
              )}
              name="club"
            />
            {errors.club && <TextError errorMsg={errors.club.message} />}
          </View>
        </View>
        <Button title="Suivant" onPress={goNext} />
      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 80,
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 16
  },
  inputContainer: {
    marginBottom: 24
  }
})

export default ClubForm
