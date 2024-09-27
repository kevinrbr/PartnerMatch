import { router } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { View, StyleSheet } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import TextError from '@/components/TextError'
import Title from '@/components/Title'
import TextInput from '@/components/input/TextInput'

const ResearchForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      city: ''
    }
  })

  const onSubmit = data => {
    console.log(data)
    router.navigate({ pathname: '/addGame/clubForm/' })
  }

  const goNext = () => {
    handleSubmit(onSubmit)()
    console.log(errors.city)
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View>
          <Title variant="pageTitle">Dans quelle ville ?</Title>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Le champ est requis' },
                minLength: { value: 2, message: 'Renseignez une ville' }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Nantes"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  errorMessage={errors.city}
                />
              )}
              name="city"
            />
            {errors.city && <TextError errorMsg={errors.city.message} />}
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

export default ResearchForm
