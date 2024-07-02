import { useQueryClient } from '@tanstack/react-query'
import { router } from 'expo-router'
import { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import TextError from '@/components/TextError'
import DateInput from '@/components/input/DateInput'
import TextInput from '@/components/input/TextInput'
import { usePostSlot } from '@/services/slots/usePostSlot'
import { ISlot, ESlot, ERROR_MESSAGES } from '@/types/slot'

const ResearchForm = () => {
  const { mutate: post } = usePostSlot()
  const [reservation, setReservation] = useState<ISlot>({
    city: '',
    club: '',
    nbPlaces: '',
    level: '',
    date: new Date()
  })

  const [errorFields, setErrorFields] = useState({
    city: false,
    club: false,
    nbPlaces: false,
    level: false
  })

  const [isErrorForm, setIsErrorForm] = useState(false)

  const queryClient = useQueryClient()
  queryClient.invalidateQueries({
    queryKey: ['slots']
  })

  const handleChange = (field: string, value: string) => {
    setIsErrorForm(!validateField(field, value))
    setErrorField(field, isErrorForm)

    setReservation(prevReservation => ({
      ...prevReservation,
      [field]: value
    }))
  }

  const handleChangeDate = (field: string, value: Date) => {
    setReservation(prevReservation => ({
      ...prevReservation,
      [field]: value
    }))
  }

  const handleSubmit = (reservation: ISlot) => {
    if (!isError()) {
      post(reservation)
      const toast = { showToastParams: 'true', message: 'Publié avec succès' }
      router.push({ pathname: '/(tabs)/home/', params: toast })
    }
  }

  const isError = () => {
    return (
      Object.values(errorFields).some(field => field) ||
      !Object.values(reservation).every(value => value)
    )
  }

  const validateField = (field: string, value: string) => {
    switch (field) {
      case ESlot.CITY:
      case ESlot.CLUB:
        return !!value.match(/^[A-Za-zÀ-ÖØ-öø-ÿ -]+$/) && value
      case ESlot.NUMBER_PLACES:
        return !!value.match(/^[0-9]$/) && +value >= 1 && +value <= 3 && value
      case ESlot.LEVEL:
        return !!value.match(/^[0-9]$/) && +value >= 1 && +value <= 10 && value
      default:
        return false
    }
  }

  const setErrorField = (field: string, isError: boolean) => {
    setErrorFields(prevErrorFields => ({
      ...prevErrorFields,
      [field]: isError
    }))
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Nantes"
            onInputChange={city => handleChange(ESlot.CITY, city)}
            label="Ville"
            value={reservation.city}
            errorMessage={errorFields.city ? ERROR_MESSAGES.CITY : ''}
          />
          {errorFields.city && <TextError errorMsg={ERROR_MESSAGES.CITY} />}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="UCPA"
            onInputChange={club => handleChange(ESlot.CLUB, club)}
            label="Club"
            value={reservation.club}
            errorMessage={errorFields.club ? ERROR_MESSAGES.CLUB : ''}
          />
          {errorFields.club && <TextError errorMsg={ERROR_MESSAGES.CLUB} />}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="2"
            onInputChange={nbPlaces => handleChange(ESlot.NUMBER_PLACES, nbPlaces)}
            label="Nombre de joueurs"
            value={reservation.nbPlaces}
            inputMode="numeric"
            keyboardType="numeric"
            errorMessage={errorFields.nbPlaces ? ERROR_MESSAGES.NUMBER_PLACES : ''}
          />
          {errorFields.nbPlaces && <TextError errorMsg={ERROR_MESSAGES.NUMBER_PLACES} />}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="2"
            onInputChange={level => handleChange(ESlot.LEVEL, level)}
            label="Niveau"
            value={reservation.level}
            inputMode="numeric"
            keyboardType="numeric"
            errorMessage={errorFields.level ? ERROR_MESSAGES.LEVEL : ''}
          />
          {errorFields.level && <TextError errorMsg={ERROR_MESSAGES.LEVEL} />}
        </View>
        <View style={styles.inputContainer}>
          <DateInput
            label="Date"
            date={reservation.date}
            onInputChange={date => handleChangeDate(ESlot.DATE, date)}
          />
        </View>
        <Button
          title="Valider"
          accessibilityLabel="Bouton pour se connecter"
          onPress={() => handleSubmit(reservation)}
        />
      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 80
  },
  inputContainer: {
    marginBottom: 24
  }
})

export default ResearchForm
