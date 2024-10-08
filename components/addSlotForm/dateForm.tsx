import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { StyleSheet, View } from 'react-native'

import TextError from '@/components/TextError'
import Title from '@/components/Title'
import DateInput from '@/components/input/DateInput'
import { ESlot } from '@/types/slot'

const DateForm = () => {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  const handleChangeDate = (field: string, value: Date) => {
    console.log('handleChangeDate', value)
  }

  return (
    <View>
      <Title variant="pageTitle">Quand jouez vous ?</Title>
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
                handleChangeDate(ESlot.DATE, date)
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

const styles = StyleSheet.create({})
