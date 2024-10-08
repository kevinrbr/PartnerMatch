import { router } from 'expo-router'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, View } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import TextError from '@/components/TextError'
import Title from '@/components/Title'
import DateInput from '@/components/input/DateInput'
import { ESlot } from '@/types/slot'

const DateComponent = () => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      date: new Date('2024-10-01T08:27:24.000Z') // Convertir la chaîne ISO en objet Date
    }
  })

  const handleChangeDate = (field: string, value: Date) => {
    console.log('handleChangeDate', value)
  }

  const onSubmit = (data: any) => {
    router.navigate({ pathname: '/addGame/moreInformationsForm/' })
  }

  const goNext = () => {
    handleSubmit(onSubmit)()
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View>
          <Title variant="pageTitle">Quand jouez vous ?</Title>
          <View style={styles.inputContainer}>
            <Controller
              control={control}
              rules={{
                required: { value: true, message: 'Le champ est requis' },
                minLength: { value: 2, message: 'Renseignez un club' }
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <DateInput
                  label="Date"
                  date={value} // Passer l'objet Date directement
                  onInputChange={date => {
                    onChange(date) // Mettre à jour le champ dans react-hook-form
                    handleChangeDate(ESlot.DATE, date) // Gestion personnalisée
                  }}
                />
              )}
              name="date"
            />
            {errors.date && <TextError errorMsg={errors.date.message} />}
          </View>
        </View>
        <Button title="Suivant" onPress={goNext} />
      </View>
    </DismissKeyboard>
  )
}

export default DateComponent

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
