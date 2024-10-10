import { Controller, useFormContext } from 'react-hook-form'
import { View } from 'react-native'

import Header from '@/components//Header'
import TextError from '@/components/TextError'
import TextInput from '@/components/input/TextInput'

const ClubForm = ({ handlePreviousStep }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <View>
      <Header title="Dans quel club ?" onBackPress={handlePreviousStep} />
      <View>
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
              errorMessage={errors.club ? errors.club.message?.toString() : undefined}
            />
          )}
          name="club"
        />
        {errors.club && (
          <TextError errorMsg={errors.club ? errors.club.message?.toString() : undefined} />
        )}
      </View>
    </View>
  )
}

export default ClubForm
