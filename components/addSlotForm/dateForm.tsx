import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

import Header from '@/components/Header'
import TextError from '@/components/TextError'
import Title from '@/components/Title'
import DateInput from '@/components/input/DateInput'

const DateForm = ({ handlePreviousStep }) => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <View>
      <Header
        title="Quand jouez vous ?"
        onBackPress={handlePreviousStep}
        backRoute
        noHorizontalMargin
      />
      <View>
        <Controller
          control={control}
          rules={{
            required: { value: true, message: 'Le champ est requis' },
            minLength: { value: 2, message: 'Renseignez un club' }
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <DateInput
              date={value}
              onInputChange={date => {
                onChange(date)
              }}
            />
          )}
          name="date"
        />
        {errors.date && (
          <TextError errorMsg={errors.date ? errors.date.message?.toString() : undefined} />
        )}
      </View>
    </View>
  )
}

export default DateForm
