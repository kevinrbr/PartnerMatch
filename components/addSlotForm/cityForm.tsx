import { useFormContext, Controller } from 'react-hook-form'
import { View } from 'react-native'

import TextError from '@/components/TextError'
import Title from '@/components/Title'
import TextInput from '@/components/input/TextInput'

const CityForm = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <View>
      <Title variant="pageTitle">Dans quelle ville ?</Title>
      <View>
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
              errorMessage={errors.city ? errors.city.message?.toString() : undefined}
            />
          )}
          name="city"
        />
        {errors.city && (
          <TextError errorMsg={errors.city ? errors.city.message?.toString() : undefined} />
        )}
      </View>
    </View>
  )
}

export default CityForm
