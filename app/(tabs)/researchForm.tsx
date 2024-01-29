import { useState } from 'react'
import { View, StyleSheet } from 'react-native'

import Button from '@/components/Button'
import DismissKeyboard from '@/components/DismissKeyboard'
import DateInput from '@/components/input/DateInput'
import TextInput from '@/components/input/TextInput'
import { postSlot } from '@/services/slot'
import { ISlot, ESlot } from '@/types/slot'

const ResearchForm = () => {
  const [reservation, setReservation] = useState<ISlot>({
    city: '',
    club: '',
    nbPlaces: '',
    level: '',
    date: new Date()
  })

  const [errorCity, setErrorCity] = useState('')
  const [errorClub, setErrorClub] = useState('')
  const [errorPlace, setErrorPlace] = useState('')
  const [errorLevel, setErrorLevel] = useState('')

  const [error, setError] = useState(false)

  const handleChange = (field: string, value: string | Date) => {
    setError(false)
    if (field === ESlot.CITY) {
      if (!value.match(/^[A-Za-z -]+$/) || value === '') {
        setError(true)
        setErrorCity('Erreur city.')
      } else {
        setErrorCity('')
      }
    }

    if (field === ESlot.CLUB) {
      if (!value.match(/^[A-Za-z -]+$/) || value === '') {
        setError(true)
        setErrorClub('Erreur club.')
      } else {
        setErrorClub('')
      }
    }

    if (field === ESlot.NUMBER_PLACES) {
      if (!value.match(/^[0-9]$/) || +value < 1 || +value > 3 || value === '') {
        setError(true)
        setErrorPlace('Erreur nombre de place.')
      } else {
        setErrorPlace('')
      }
    }

    if (field === ESlot.LEVEL) {
      if (!value.match(/^[0-9]$/) || +value < 1 || +value > 10 || value === '') {
        setError(true)
        setErrorLevel('Erreur level.')
      } else {
        setErrorLevel('')
      }
    }

    setReservation(prevReservation => ({
      ...prevReservation,
      [field]: value
    }))
  }

  const handleSubmit = (reservation: ISlot) => {
    if (!error) {
      postSlot(reservation)
    }
  }

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <TextInput
          placeholder="Nantes"
          onInputChange={city => handleChange(ESlot.CITY, city)}
          label="Ville"
          value={reservation.city}
          errorMessage={errorCity}
        />
        <TextInput
          placeholder="UCPA"
          onInputChange={club => handleChange(ESlot.CLUB, club)}
          label="Club"
          value={reservation.club}
          errorMessage={errorClub}
        />
        <TextInput
          placeholder="2"
          onInputChange={nbPlaces => handleChange(ESlot.NUMBER_PLACES, nbPlaces)}
          label="Nombre de joueurs"
          value={reservation.nbPlaces}
          inputMode="numeric"
          keyboardType="numeric"
          errorMessage={errorPlace}
        />
        <TextInput
          placeholder="2"
          onInputChange={level => handleChange(ESlot.LEVEL, level)}
          label="Niveau"
          value={reservation.level}
          inputMode="numeric"
          keyboardType="numeric"
          errorMessage={errorLevel}
        />
        <DateInput
          label="Date"
          date={reservation.date}
          onInputChange={date => handleChange(ESlot.DATE, date)}
        />
        <Button
          title="Valider"
          accessibilityLabel="Bouton pour se connecter"
          disabled={error}
          onPress={() => handleSubmit(reservation)}
        />
      </View>
    </DismissKeyboard>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  }
})

export default ResearchForm
